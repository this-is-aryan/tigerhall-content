import { deviceWidth } from '../utils'

export const GRAPHQL_URL = 'https://api.tigerhall.net/v2/'

export const MAX_CHARACTERS_ALLOWED = 50

export enum TIGERHALL_CONTENT_TYPES {
  PODCAST = 'PODCAST'
}
export const CARD_IMAGE_HEIGHT = 150

export const CARD_IMAGE_WIDTH = deviceWidth - 32

export const LIMIT = 5

export const MAX_RETRIES = 3
