import { NextResponse } from 'next/server';
import axios from 'axios';

// Define the structure of the Tiki API response
interface TikiReview {
  id: string;
  content: string;
  rating: number;
  title: string;
  created_by: {
    full_name: string;
  };
}

interface TikiApiResponse {
  data: TikiReview[];
  stars: Record<string, { count: number }>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('product_id');
  const page = searchParams.get('page');

  if (!productId || !page) {
    return NextResponse.json(
      { error: 'Missing product_id or page parameter' },
      { status: 400 },
    );
  }

  const baseUrl = `https://tiki.vn/api/v2/reviews?include=comments,contribute_info,attribute_vote_summary`;

  try {
    const response = await axios.get<TikiApiResponse>(
      `${baseUrl}&page=${page}&product_id=${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    // Return data to the client
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching Tiki API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Tiki API' },
      { status: error.response?.status || 500 },
    );
  }
}
