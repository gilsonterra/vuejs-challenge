import { iColumn, tSort } from '@/components/interfaces'
import { SORT } from './constants'

const SESSION_STORAGE_NAME = 'KANBAN_TALENTIFY'

export const sortArrayObject = <T>(
  array: T[],
  type: tSort,
  column: string
): T[] => {
  return array.sort((a: any, b: any) => {
    if (a[column] === b[column]) {
      return 0
    }

    if (type === SORT.DESC) {
      return a[column] < b[column] ? -1 : 1
    } else {
      return a[column] > b[column] ? -1 : 1
    }
  })
}

export const generateUniqueID = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}

export const saveColumnsInSessionStorage = (columns: iColumn[]) => {
  sessionStorage.setItem(SESSION_STORAGE_NAME, JSON.stringify(columns))
}

export const getColumnsInSessionStorage = (): iColumn[] => {
  const columnsJson = sessionStorage.getItem(SESSION_STORAGE_NAME) as string
  return JSON.parse(columnsJson)
}

export const clearColumnsInSessionStorage = () => {
  sessionStorage.clear()
}
