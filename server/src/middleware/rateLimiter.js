import rateLimit from 'express-rate-limit';

export const parentLookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 lookup requests per windowMs
  message: { error: 'Too many lookup requests from this IP, please try again after 15 minutes' }
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later' }
});
