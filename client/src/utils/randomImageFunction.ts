import { randomImages } from '../constants/images'

export function randomImage (): {uri: string} {
  return randomImages[Math.floor(Math.random() * randomImages.length)]
}
