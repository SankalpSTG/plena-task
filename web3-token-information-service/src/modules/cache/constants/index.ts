export const getRateLimitid = (token: string) => {
  return `rate-limit:${token}`;
};

export const getAccessKeyId = (token: string) => {
  return `access-key:${token}`;
};

export const getCoinId = (token: string) => {
  return `coin:${token}`;
};

export const CACHE_EXPIRY_MINUTE = 60