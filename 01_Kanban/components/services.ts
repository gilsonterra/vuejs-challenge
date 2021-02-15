import { iColumn, iCard } from '@/components/interfaces'
import { generateUniqueID } from '@/components/helpers'

export const createColumn = (title: string, cards: iCard[] = []): iColumn => {
  return {
    _uui: generateUniqueID(),
    title,
    cards,
  } as iColumn
}

export const createCard = (id: number, text: string = ''): iCard => {
  return {
    _uui: generateUniqueID(),
    id,
    text,
  } as iCard
}
