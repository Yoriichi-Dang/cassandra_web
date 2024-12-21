import ProductImage from './product_image';
import ProductReview from './product_reviews';

type Product = {
  id: string;
  name: string;
  url_path: string;
  short_url: string;
  short_description: string;
  price: number;
  original_price: number;
  thumbnail_url: string;
  description: string;
  author_name?: string;
  images: ProductImage[];
  product_reviews?: ProductReview;
};
export default Product;
