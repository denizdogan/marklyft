import { Rule } from '../Rule'
import { Unit } from '../Unit'
import * as util from '../util'

export class MaxStdDevRule extends Rule {
  private limit: number

  constructor(limit: number) {
    super()
    this.limit = limit
  }

  public passes(unit: Unit): boolean {
    const sd = util.sd(unit.runtimes)
    return sd <= this.limit
  }
}
