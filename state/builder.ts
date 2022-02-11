import { entity, persistence } from 'simpler-state'
import { CustomRules } from '../utils/certlogic'

export type BuilderState = {
  rules: CustomRules[]
}

export const builder = entity<BuilderState>({ rules: [] }, [persistence('builder')])

export const setRules = (rules: CustomRules[]) => {
  builder.set({ ...builder.get(), rules })
}
