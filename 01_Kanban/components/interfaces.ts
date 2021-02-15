import { SORT } from '@/components/constants'

export interface iCard {
  _uui: string
  id: number
  text: string
}

export interface iColumn {
  _uui: string
  id: number
  title: string
  cards: iCard[]
}

export type tSort = typeof SORT[keyof typeof SORT]
