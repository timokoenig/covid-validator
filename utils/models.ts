/**
 * State type
 */
export type State = {
  code: string
  name: string
  updated: Date
}

/**
 * Country type
 */
export type Country = {
  code: string
  name: string
  states: State[]
}

/**
 * Purpose type
 */
export type Purpose = {
  title: string
  info: string
}
