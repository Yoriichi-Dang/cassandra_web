'use server';

import { ModelApi } from '@/constants/model_api';

export async function fetchModel(content: string): Promise<string | null> {
  try {
    // Thêm giao thức "http://"
    const baseUrl = `http://${ModelApi.baseUrl}:${ModelApi.port}/${ModelApi.nameServer}/${ModelApi.cassandra}`;
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
    return result['result'];
  } catch (error) {
    console.error(error);
    return null;
  }
}
