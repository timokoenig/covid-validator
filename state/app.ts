import { entity, persistence } from 'simpler-state'

export type AppState = {
  country: string
  state: string
  purpose: string
}

export const app = entity({ country: 'DE', state: '', purpose: '3G' }, [persistence('app')])

export const setCountry = (country: string) => {
  app.set({ ...app.get(), country })
}

export const setState = (state: string) => {
  app.set({ ...app.get(), state })
}

export const setPurpose = (purpose: string) => {
  app.set({ ...app.get(), purpose })
}
