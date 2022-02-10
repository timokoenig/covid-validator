import { entity, persistence } from 'simpler-state'

export const counter = entity(0, [persistence('counter')])

export const reset = () => {
  counter.set(0)
}

export const decrease = () => {
  if (counter.get() == 0) return
  counter.set(counter.get() - 1)
}

export const increase = () => {
  counter.set(counter.get() + 1)
}
