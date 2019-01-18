import { Rule } from '../Rule'
import { Unit } from '../Unit'

export class ConditionRule extends Rule {
  private condition: (unit: Unit) => boolean

  constructor(condition: (unit: Unit) => boolean) {
    super()
    this.condition = condition
  }

  public passes(unit: Unit): boolean {
    return this.condition(unit)
  }
}
