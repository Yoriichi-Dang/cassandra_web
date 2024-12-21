import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Review = {
  id: string;
  title: string;
  content: string;
  rating: number; // Rating từ 1 đến 5
  name_reviewer: string;
  sentiment?: string;
};

const reviewChartConfig = {
  '1': {
    label: '1 Star',
    color: '#112D4E',
  },
  '2': {
    label: '2 Stars',
    color: '#3F72AF',
  },
  '3': {
    label: '3 Stars',
    color: '#0F4C75',
  },
  '4': {
    label: '4 Stars',
    color: '#DBE2EF',
  },
  '5': {
    label: '5 Stars',
    color: '#F9F7F7',
  },
};

interface ReviewsChartProps {
  reviews: Review[];
}

export function ReviewsChart({ reviews }: ReviewsChartProps) {
  // Xử lý dữ liệu để tính tổng số lượng đánh giá theo từng sao
  const processedChartData = useMemo(() => {
    const starCounts: { [key: string]: number } = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        starCounts[review.rating.toString()] += 1;
      }
    });
    return Object.entries(starCounts).map(([star, count]) => ({
      star, // Số sao (1-5)
      count, // Số lượng đánh giá
      fill: reviewChartConfig[star as keyof typeof reviewChartConfig].color, // Màu sắc cho cột
    }));
  }, [reviews]);

  return (
    <div className="h-[600px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processedChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="star"
            label={{
              value: 'Stars',
              position: 'insideBottom',
              offset: -5,
              fill: '#555',
            }}
          />
          <YAxis
            label={{
              value: 'Count',
              angle: -90,
              position: 'insideLeft',
              fill: '#555',
            }}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            barSize={40}
            isAnimationActive={false}
            // Gắn màu cho từng cột
            fill={({ payload }) => payload.fill}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
