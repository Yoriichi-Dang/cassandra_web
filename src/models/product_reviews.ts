import Review from './review';
import ReviewStar from './review_star';

type ProductReview = {
  id: string;
  reviews_count: number;
  rating_average: number;
  reviews: Review[];
  review_stars: ReviewStar[];
};

export default ProductReview;
