import { entity, persistence } from 'simpler-state'

export type BuilderState = {
  rules: string[]
}

export const builder = entity<BuilderState>({ rules: [] }, [persistence('builder')])

export const setRules = (rules: string[]) => {
  builder.set({ ...builder.get(), rules })
}
