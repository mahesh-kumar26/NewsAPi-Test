import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    // FIXME: Remove key before pushing
    'X-Api-key': 'ca3bf594893d4778a7a131543bd04558',
  },
});
