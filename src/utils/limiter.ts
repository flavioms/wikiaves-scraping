import pLimit from 'p-limit';
import { config } from '../config/index';

export function createLimiter() {
  return pLimit(config.concurrency);
}
