'use server';

import { ModelApi } from '@/constants/model_api';
export type PredictResponse = {
  label: string;
  prob: number;
};
export async function fetchModel(
  content: string,
  model: string,
): Promise<PredictResponse | null> {
  try {
    // Thêm giao thức "http://"
    const baseUrl = `http://${ModelApi.baseUrl}:${ModelApi.port}/${ModelApi.nameServer}/${model}`;
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product reviews`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
