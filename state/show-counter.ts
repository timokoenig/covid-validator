import { entity, persistence } from 'simpler-state'
import { reset } from './counter'

export const showCounter = entity(false, [persistence('show-counter')])

export const toggle = () => {
  reset()
  showCounter.set(!showCounter.get())
}
