class TikiRequest {
  // Static properties for URL and headers
  static productBaseUrl = 'https://tiki.vn/api/v2';
  static headers = {
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    Origin: 'https://tiki.vn',
    Referer: 'https://tiki.vn/',
    'sec-ch-ua':
      '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'x-guest-token': 'mr5AvyCplDK7ONX4jRzqfba6HchgLEGi',
    Cookie: `_trackity=12d2fc48-1f4b-0d20-f5bd-eca527e5cd33; _ga=GA1.1.316696579.1730433645; _gcl_au=1.1.1351263792.1730433648; _fbp=fb.1.1730433649173.329126992411919294; ...`, // Thêm đầy đủ cookies hợp lệ ở đây
  };
}

export { TikiRequest };
