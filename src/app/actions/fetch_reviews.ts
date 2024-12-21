import { TikiRequest } from '@/constants/tiki_request';
import ProductReview from '@/models/product_reviews';
import Review from '@/models/review';
import ReviewStar from '@/models/review_star';

export async function fetchProductReviewAction(
  productId: string,
): Promise<ProductReview | null> {
  try {
    const baseUrl = TikiRequest.productBaseUrl;
    let currentPage = 1;
    let hasMore = true;

    const accumulatedReviews: Review[] = [];
    const starCountMap: { [key: string]: number } = {};
    const seenReviewIds: Set<string> = new Set(); // Track unique review IDs

    while (hasMore) {
      const apiUrl = `${baseUrl}/reviews?include=comments,contribute_info,attribute_vote_summary&page=${currentPage}&product_id=${productId}`;
      const headers = TikiRequest.headers;
      const response = await fetch(apiUrl, { method: 'GET', headers });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch product reviews on page ${currentPage}`,
        );
      }

      const reviewData = await response.json();

      // Check if there are any reviews
      if (!reviewData.data || reviewData.data.length === 0) {
        hasMore = false;
        break;
      }

      // Accumulate unique reviews with non-empty content
      const productReviews: Review[] = reviewData.data
        .filter((review: any) => {
          if (seenReviewIds.has(review.id)) {
            return false; // Duplicate found, skip
          }
          seenReviewIds.add(review.id);
          return review.content && review.content.trim() !== ''; // Only include non-empty content
        })
        .map((review: any) => ({
          id: review.id,
          content: review.content,
          rating: review.rating,
          title: review.title,
          name_reviewer: review.created_by.full_name,
        }));
      accumulatedReviews.push(...productReviews);

      // Accumulate star counts
      Object.keys(reviewData.stars).forEach((key) => {
        if (starCountMap[key]) {
          starCountMap[key] += reviewData.stars[key].count;
        } else {
          starCountMap[key] = reviewData.stars[key].count;
        }
      });

      currentPage += 1; // Move to the next page
    }

    // Calculate total number of reviews and average rating
    const reviewsCount = accumulatedReviews.length;
    const totalRating = accumulatedReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const ratingAverage = reviewsCount > 0 ? totalRating / reviewsCount : 0;

    // Convert starCountMap to an array of ReviewStar
    const reviewStars: ReviewStar[] = Object.keys(starCountMap).map((key) => ({
      label: key,
      count_star: starCountMap[key],
      percent_star:
        reviewsCount > 0 ? (starCountMap[key] / reviewsCount) * 100 : 0,
    }));

    const productReviewModel: ProductReview = {
      id: productId,
      reviews_count: reviewsCount,
      rating_average: ratingAverage,
      reviews: accumulatedReviews,
      review_stars: reviewStars,
    };
    return productReviewModel;
  } catch (err) {
    console.error(err);
    return null;
  }
}
