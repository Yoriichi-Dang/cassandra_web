import { fetchProductAction } from '@/app/actions/fetch_product';
import { fetchProductReviewAction } from '@/app/actions/fetch_reviews';
import Product from '@/models/product';
import { useCallback, useEffect, useState } from 'react';

export function useProduct(initialUrl: string | null = null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(initialUrl);

  /**
   * Fetch product data by URL.
   * @param {string} url - Product URL
   */
  const fetchProduct = useCallback(async (url: string): Promise<void> => {
    setProductLoading(true);
    setError(null);

    try {
      const result = await fetchProductAction(url);

      if (result && !('error' in result)) {
        setProduct(result);
      } else {
        throw new Error(result?.error || 'Failed to fetch product');
      }
    } catch (err) {
      setError(
        (err as Error).message ||
          'An error occurred while fetching product data',
      );
    } finally {
      setProductLoading(false);
    }
  }, []);

  const fetchReviews = useCallback(async (): Promise<void> => {
    if (!product?.id) return;

    setReviewsLoading(true);
    try {
      const result = await fetchProductReviewAction(product.id);
      console.log(result);
      if (result && !('error' in result)) {
        setProduct((prev) =>
          prev ? { ...prev, product_reviews: result } : prev,
        );
      } else {
        throw new Error(result?.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError(
        (err as Error).message ||
          'An error occurred while fetching product reviews',
      );
    } finally {
      setReviewsLoading(false);
    }
  }, [product?.id]);

  // Fetch product whenever the URL changes
  useEffect(() => {
    if (url) {
      fetchProduct(url);
    }
  }, [url, fetchProduct]);

  // Fetch reviews whenever the product changes
  useEffect(() => {
    if (product?.id) {
      fetchReviews();
    }
  }, [product?.id, fetchReviews]);

  return {
    product,
    loading: productLoading || reviewsLoading,
    error,
    url,
    fetchProduct,
    setUrl,
    setProduct, // Optional: Consider removing if not needed externally
    setProductLoading, // Optional: Consider removing if not needed externally
  };
}
