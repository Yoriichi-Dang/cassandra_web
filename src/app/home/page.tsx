'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useProduct } from '@/hooks/useProduct';
import Product from '@/models/product';
import { ReviewsChart } from '@/components/home/reviews_chart';
import ReviewsTable, { columns } from '@/components/home/reviewes_table';
import { DrawerDialogDemo } from '@/components/home/drawer_popup';

function Home() {
  const { product, loading, error, setUrl } = useProduct('');
  const inputRef = useRef<HTMLInputElement | null>(null); // Fix missing inputRef
  const prevProductRef = useRef<Product | null>(null);

  useEffect(() => {
    if (prevProductRef.current !== product) {
      console.log(product?.product_reviews?.reviews.length); // Log only when product changes

      prevProductRef.current = product;
    }
  }, [product]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-5/6 min-h-5/6 bg-black rounded-md p-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-md text-white">
            <div className="grid min-w-full max-w-sm items-center gap-1.5">
              <div className="flex min-w-full justify-between gap-3 mb-8">
                <Input
                  className="border-white"
                  type="text"
                  placeholder="Enter product URL"
                  ref={inputRef}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (inputRef.current) {
                      setUrl(inputRef.current.value.trim());
                    }
                  }}
                >
                  {loading ? 'Crawling...' : 'Crawl'}
                </Button>
              </div>
              {error && <p className="text-red-500">Error: {error}</p>}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="leading-6">
                  {product?.name || 'No product found'}
                </CardTitle>
                <CardDescription>
                  {product?.short_description ||
                    'Please enter a valid product URL'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {product?.thumbnail_url ? (
                  <Image
                    src={product.thumbnail_url}
                    alt="Product Thumbnail"
                    width={400}
                    height={400}
                    className="rounded-md"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="grid col-span-2 p-4 rounded-md">
            <DrawerDialogDemo>
              <ReviewsChart />
            </DrawerDialogDemo>
            <ReviewsTable
              columns={columns}
              data={product?.product_reviews?.reviews || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
