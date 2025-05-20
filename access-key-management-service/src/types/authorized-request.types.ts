export interface AuthorizedAccessKeyRequest<T = any>{
  accessKey: string
  body: T;
  query: any;
}
export interface AuthorizedRequest<T = any>{
  user: {
    _id: string
  }
  body: T;
  query: any;
}