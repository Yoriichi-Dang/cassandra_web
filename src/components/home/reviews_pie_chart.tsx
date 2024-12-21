'use client';
import * as React from 'react';
import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Review = {
  id: string;
  title: string;
  content: string;
  rating: number; // Rating từ 1 đến 5
  name_reviewer: string;
  sentiment?: string;
};

const ratingColors = {
  '1': '#FF4C4C', // Red
  '2': '#FFA500', // Orange
  '3': '#FFD700', // Yellow
  '4': '#90EE90', // Light Green
  '5': '#4682B4', // Steel Blue
};

export function ReviewsPieChart({ reviews }: { reviews: Review[] }) {
  // Xử lý dữ liệu Pie Chart
  const pieChartData = React.useMemo(() => {
    const ratingCounts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating] += 1;
      }
    });
    return Object.entries(ratingCounts).map(([rating, count]) => ({
      rating,
      count,
      fill: ratingColors[rating as keyof typeof ratingColors],
    }));
  }, [reviews]);

  const totalReviews = React.useMemo(
    () => pieChartData.reduce((acc, curr) => acc + curr.count, 0),
    [pieChartData],
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Ratings</CardTitle>
        <CardDescription>
          Distribution of ratings (1 to 5 stars)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Tooltip
              formatter={(value, name) => [
                `${value} reviews`,
                `Rating ${name}`,
              ]}
            />
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="rating"
              cx="50%"
              cy="50%"
              innerRadius={130} // Tăng bán kính bên trong
              outerRadius={200} // Tăng bán kính bên ngoài
              stroke="none"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold" // Tăng font chữ
                        >
                          {totalReviews.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 32}
                          className="fill-muted-foreground text-lg" // Tăng font chữ mô tả
                        >
                          Reviews
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
              {pieChartData.map((entry) => (
                <Cell key={`cell-${entry.rating}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Reviews: {totalReviews}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total ratings from your dataset
        </div>
      </CardFooter>
    </Card>
  );
}
