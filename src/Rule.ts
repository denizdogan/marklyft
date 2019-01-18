import { Unit } from './Unit'

export abstract class Rule {
  public abstract passes(unit: Unit): boolean
}
