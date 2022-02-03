export type State = {
  code: string
  name: string
  updated: Date
}

export type Country = {
  code: string
  name: string
  states: State[]
}
