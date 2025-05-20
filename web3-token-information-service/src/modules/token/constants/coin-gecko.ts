export const COIN_GECKO_API_BASE_URL = "https://api.coingecko.com/api/v3"

export const COIN_GECKO_API_ENDPOINTS = {
  getCoinDetails: (id: string) => COIN_GECKO_API_BASE_URL + `/coins/${id}`
}