import React, { useState, useMemo } from 'react';
import Review from '@/models/review';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { DataTablePagination } from './reviews_table_paging';
import { Button } from '../ui/button';
import { fetchModel } from '@/app/actions/fetch_model';
import Spinner from './spinner';

interface DataTableProps<TData> {
  data: TData[];
}

const ReviewsTable: React.FC<DataTableProps<Review>> = ({
  data: initialData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Review[]>(initialData);
  const [pageIndex, setPageIndex] = useState<number>(0); // Lưu trạng thái trang hiện tại
  const [pageSize, setPageSize] = useState<number>(5); // Lưu trạng thái kích thước trang

  const handlePredict = useMemo(
    () => async (review: Review) => {
      try {
        setLoading(true);
        const result = await fetchModel(review.content);
        if (result) {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === review.id ? { ...item, sentiment: result } : item,
            ),
          );
        }
      } catch (error) {
        console.error('Error predicting sentiment:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Memo hóa cột để tránh tái tạo không cần thiết
  const columns = useMemo<ColumnDef<Review>[]>(
    () => [
      {
        accessorKey: 'name_reviewer',
        header: 'Reviewer',
        accessorFn: (row) => row.name_reviewer,
      },
      {
        accessorKey: 'content',
        header: 'Content',
        accessorFn: (row) => row.content,
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        accessorFn: (row) => row.rating,
      },
      {
        accessorKey: 'sentiment',
        header: 'Sentiment',
        cell: ({ row }) =>
          row.original.sentiment ? (
            <span>{row.original.sentiment}</span>
          ) : (
            <Button
              onClick={async () => {
                await handlePredict(row.original as Review);
              }}
              disabled={loading}
              className="px-4 py-2 bg-white text-black rounded-md"
            >
              Predict
            </Button>
          ),
      },
    ],
    [handlePredict, loading],
  );

  // Memo hóa dữ liệu để tránh tái tạo không cần thiết
  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Ngăn không cho bảng tự động reset pageIndex khi dữ liệu thay đổi
    autoResetPageIndex: false,
  });

  return (
    <div className="w-full">
      {loading && <Spinner />}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-black divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-normal text-sm text-white"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DataTablePagination table={table} />
    </div>
  );
};

export default ReviewsTable;
