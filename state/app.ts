import { entity, persistence } from 'simpler-state'

export type AppState = {
  country: string
  state: string
  purpose: string
  counter: number
  showCounter: boolean
  excludeBooster: boolean
  enableScanner: boolean
}

export const app = entity<AppState>(
  {
    country: 'DE',
    state: '',
    purpose: '3G',
    counter: 0,
    showCounter: false,
    excludeBooster: true,
    enableScanner: true,
  },
  [persistence('app')]
)

export const setCountry = (country: string) => {
  app.set({ ...app.get(), country })
}

export const setState = (state: string) => {
  app.set({ ...app.get(), state })
}

export const setPurpose = (purpose: string) => {
  app.set({ ...app.get(), purpose })
}

export const toggleCounter = () => {
  const state = app.get()
  app.set({ ...state, showCounter: !state.showCounter })
}

export const resetCounter = () => {
  app.set({ ...app.get(), counter: 0 })
}

export const decreaseCounter = () => {
  const state = app.get()
  if (state.counter == 0) return
  app.set({ ...state, counter: state.counter - 1 })
}

export const increaseCounter = () => {
  const state = app.get()
  app.set({ ...state, counter: state.counter + 1 })
}

export const toggleExcludeBooster = () => {
  const state = app.get()
  app.set({
    ...state,
    excludeBooster: !state.excludeBooster,
  })
}

export const enableScanner = () => {
  const state = app.get()
  app.set({
    ...state,
    enableScanner: true,
  })
}

export const disableScanner = () => {
  const state = app.get()
  app.set({
    ...state,
    enableScanner: false,
  })
}
