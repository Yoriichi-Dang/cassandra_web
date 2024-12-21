function extractProductId(url: string): string | null {
  // Tìm `p` và các chữ số ngay sau đó trước `.html`
  const match = url.match(/p(\d+)\.html/);
  return match ? match[1] : null; // Trả về `id` nếu tìm thấy, nếu không trả về `null`
}

export { extractProductId };
