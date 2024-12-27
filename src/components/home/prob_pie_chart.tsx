'use client';

import * as React from 'react';
import { Pie, PieChart, Label, Cell } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ProbPieChart({ data }: { data: { prob: number } }) {
  // Tính phần trăm Positive và Negative
  const negativePercentage = 100 - Math.round(data.prob * 100);
  const positivePercentage = Math.round(data.prob * 100);

  // Dữ liệu biểu đồ
  const chartData = [
    {
      name: 'Positive',
      value: positivePercentage,
      fill: '#79D7BE', // Màu xanh lá
    },
    {
      name: 'Negative',
      value: negativePercentage,
      fill: '#FB4141', // Màu đỏ
    },
  ];

  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Pie Chart - Sentiment Analysis</CardTitle>
        <CardDescription>Positive vs Negative</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center pb-0">
        <div className="mx-auto aspect-square max-h-[600px] flex items-center justify-center">
          <PieChart width={500} height={500}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={140} // Tăng kích thước bán kính bên trong
              outerRadius={180} // Tăng kích thước bán kính bên ngoài
              paddingAngle={5}
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              {/* Hiển thị giá trị ở tâm */}
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {positivePercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground text-xl"
                        >
                          Positive
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Positive: {positivePercentage}% | Negative: {negativePercentage}%
        </div>
      </CardFooter>
    </Card>
  );
}
