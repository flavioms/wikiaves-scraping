import axios from 'axios';
import axiosRetry from 'axios-retry';
import { config } from '../config/index.js';

const client = axios.create({
  baseURL: config.wikiaves.baseUrl,
  headers: {
    'User-Agent': config.wikiaves.userAgent,
    Accept: 'application/json, text/javascript, */*; q=0.01'
  },
  timeout: 30_000
});

axiosRetry(client, {
  retries: config.retry.retries,
  retryDelay: () => config.retry.delayMs,
  retryCondition: (error) => {
    const isNetworkError = axiosRetry.isNetworkOrIdempotentRequestError(error);
    const isServerError = !!(error.response && error.response.status >= 500);
    const isTimeout = (error.code ?? '') === 'ECONNABORTED';
    return isNetworkError || isServerError || isTimeout;
  }
});

export default client;
