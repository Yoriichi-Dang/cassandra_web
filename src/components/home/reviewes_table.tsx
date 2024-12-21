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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'name_reviewer',
    header: 'Reviewer',
  },
  {
    accessorKey: 'content',
    header: 'Content',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    accessorKey: 'predict', // Cột mới cho nút bấm
    header: 'Predict',
    cell: ({ row }) => (
      <Button
        onClick={() => {
          handlePredict(row.original as Review);
        }}
        className="px-4 py-2 bg-white text-black rounded-m"
      >
        Predict
      </Button>
    ),
  },
];

const handlePredict = async (review: Review) => {
  console.log('Predicting review:', review);
  const result = await fetchModel(review.content);
  console.log('Predict result:', result);
};

const ReviewsTable: React.FC<DataTableProps<Review, unknown>> = ({
  columns,
  data,
}) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10, // Default page size
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Add other plugins like sorting, filtering if needed
  });

  return (
    <div className="w-full">
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
