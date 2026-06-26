import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware for chat endpoint.
 * Restricts requests to 15 requests per minute per IP address.
 */
export const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 15, // limit each IP to 15 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    reply: "Too many requests. Please wait a minute before sending another message."
  }
});
