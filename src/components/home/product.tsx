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
import { Fragment, useEffect, useRef, useState } from 'react';
import { useProduct } from '@/hooks/useProduct';
import ReviewsTable from '@/components/home/reviewes_table';
import { Progress } from '@/components/ui/progress';
import { useSentimentAll } from '@/hooks/useSentiment';
import { ModalPopUp } from '@/components/home/modal_pop_up';
import { ReviewsPieChart } from '@/components/home/reviews_pie_chart';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
function ProductInfo() {
  const { product, loading, error, setUrl } = useProduct();
  const inputRef = useRef<HTMLInputElement | null>(null); // Fix missing inputRef
  const predictAllRef = useRef<HTMLButtonElement | null>(null);
  const [progress, setProgress] = useState(0);

  const [selectedModel, setSelectedModel] = useState('cnn');
  const { predictAll, numberCompleted, onPending } = useSentimentAll(
    product?.product_reviews?.reviews || [],
    selectedModel,
  );
  useEffect(() => {
    if (predictAllRef.current) {
      predictAllRef.current.addEventListener('click', () => {
        if (loading) return;
        predictAll();
      });
    }
  }, [loading, predictAll]);
  console.log(progress);
  useEffect(() => {
    const totalReviews = product?.product_reviews?.reviews?.length ?? 1;
    const completedReviews = Math.min(numberCompleted, totalReviews); // Đảm bảo không vượt quá tổng số
    setProgress((completedReviews / totalReviews) * 100);
  }, [numberCompleted, product?.product_reviews?.reviews]);
  return (
    <div className="w-5/6 min-h-5/6 bg-black rounded-md p-10">
      <div className="grid grid-cols-3 gap-4">
        <div className="grid col-span-3 justify-center">
          <h1 className="font-semibold text-4xl mb-16">Tiki Sentiment</h1>
        </div>
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
            {error && <p className="text-red-500 my-4">Error: {error}</p>}
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
        <div className="grid col-span-2 rounded-md">
          {/* <ModalPopUp>
              <ReviewsChart />
            </ModalPopUp> */}
          <div className="mb-3 flex w-full justify-end items-center gap-4">
            {product?.product_reviews?.reviews?.length && (
              <Fragment>
                <Select onValueChange={(value) => setSelectedModel(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cnn">CNN and BilStem</SelectItem>
                      <SelectItem value="electra">Electra base</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {progress < 100 && (
                  <Button ref={predictAllRef} disabled={onPending}>
                    {onPending ? 'Predicting...' : 'Predict All'}
                  </Button>
                )}
                {!loading && (
                  <ModalPopUp>
                    <ReviewsPieChart
                      reviews={product.product_reviews.reviews}
                    />
                  </ModalPopUp>
                )}
              </Fragment>
            )}
          </div>

          {product?.product_reviews?.reviews && onPending ? (
            <Progress value={progress} className="my-2" />
          ) : null}
          {product?.product_reviews?.reviews ? (
            <ReviewsTable
              data={product.product_reviews.reviews}
              model={selectedModel}
            />
          ) : loading ? (
            <div className="flex justify-center">
              <p className="text-white text-2xl">Crawling...</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-white">No reviews available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
