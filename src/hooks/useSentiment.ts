import { useState, useCallback } from 'react';
import Review from '@/models/review';
import { fetchModel } from '@/app/actions/fetch_model';

interface UseSentimentAllReturn {
  onPending: boolean;
  numberCompleted: number;
  error: string | null;
  predictAll: () => Promise<void>;
}

export function useSentimentAll(reviews: Review[]): UseSentimentAllReturn {
  const [onPending, setOnPending] = useState<boolean>(false);
  const [numberCompleted, setNumberCompleted] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const predictAll = useCallback(async () => {
    setOnPending(true);
    setNumberCompleted(0);
    setError(null);

    for (const review of reviews) {
      try {
        const result = await fetchModel(review.content);
        if (result) {
          review.sentiment = result;
          setNumberCompleted((prev) => prev + 1);
        }
      } catch (err) {
        console.error(
          `Error predicting sentiment for review ID: ${review.id}`,
          err,
        );
        setError(`Error predicting sentiment for review ID: ${review.id}`);
        break; // Dừng quá trình nếu có lỗi
      }
    }

    setOnPending(false);
  }, [reviews]);

  return { onPending, numberCompleted, error, predictAll };
}
