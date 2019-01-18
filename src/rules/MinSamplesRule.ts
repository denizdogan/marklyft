import { Rule } from '../Rule'
import { Unit } from '../Unit'

export class MinSamplesRule extends Rule {
  private limit: number

  constructor(limit: number) {
    super()
    this.limit = limit
  }

  public passes(unit: Unit): boolean {
    return unit.runtimes.length >= this.limit
  }
}
