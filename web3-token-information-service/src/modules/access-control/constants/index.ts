export const WINDOW_SIZE = 60000
export const getRateLimitid = (token: string) => {
  return `rate-limit:${token}`;
};

export const getAccessKeyId = (token: string) => {
  return `access-key:${token}`;
};

export const getTTL = (expiry: string) => {
  return Math.round((new Date(expiry).getTime() - Date.now()) / 1000);
};
