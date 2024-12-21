'use server';

import { TikiRequest } from '@/constants/tiki_request';
import Product from '@/models/product';
import ProductImage from '@/models/product_image';
import { extractProductId } from '@/utils/product_id';

export async function fetchProductAction(
  productUrl: string,
): Promise<Product | null> {
  try {
    // Kiểm tra URL hợp lệ
    if (!productUrl || !productUrl.startsWith('https://tiki.vn')) {
      throw new Error('Invalid URL');
    }

    // Lấy `spid` từ URL
    const productId = extractProductId(productUrl);

    const baseUrl = TikiRequest.productBaseUrl;
    const apiUrl = `${baseUrl}/products/${productId}`;

    const headers = TikiRequest.headers;
    // Gửi yêu cầu tới API
    const response = await fetch(apiUrl, { method: 'GET', headers });

    // Dữ liệu JSON từ API
    const productData = await response.json();
    const imageProduct: ProductImage[] = productData.images.map(
      (image: ProductImage) => {
        return {
          thumbnail_url: image.thumbnail_url,
          large_url: image.large_url,
          base_url: image.base_url,
        };
      },
    );
    const productModel: Product = {
      id: productData.id,
      name: productData.name,
      url_path: productData.url_path,
      short_url: productData.short_url,
      short_description: productData.short_description,
      original_price: productData.original_price,
      price: productData.price,
      thumbnail_url: productData.thumbnail_url,
      description: productData.description,
      images: imageProduct,
    };
    return productModel;
  } catch (error) {
    console.log(error);
    return null;
  }
}
