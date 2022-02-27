import { entity, persistence } from 'simpler-state'
import { CustomRule } from '../utils/certlogic'

export type BuilderState = {
  customRules: CustomRule[]
}

export const builder = entity<BuilderState>({ customRules: [] }, [persistence('builder')])

export const setRules = (customRules: CustomRule[]) => {
  builder.set({ ...builder.get(), customRules })
}
