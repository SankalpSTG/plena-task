export type AccessKeyType = {
  key: string,
  rateLimit: number,
  expiresAt: string,
  enabled: boolean
}

export type DeleteAccessKeyType = {
  key: string,
}