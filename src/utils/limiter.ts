import pLimit from 'p-limit';
import { config } from '../config/index.js';

export function createLimiter() {
  return pLimit(config.concurrency);
}
