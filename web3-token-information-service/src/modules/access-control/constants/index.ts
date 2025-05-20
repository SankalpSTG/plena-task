export const WINDOW_SIZE = 60000

export const getTTL = (expiry: string) => {
  return Math.round((new Date(expiry).getTime() - Date.now()) / 1000);
};
