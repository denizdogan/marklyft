import { Rule } from '../Rule'
import { Unit } from '../Unit'
import * as util from '../util'

export type Confidence = 80 | 90 | 95 | 98 | 99

export const zTable: { [C in Confidence]: number } = {
  80: 1.28,
  90: 1.645,
  95: 1.96,
  98: 2.33,
  99: 2.58
}

export class MaxMarginOfError extends Rule {
  private limit: number

  constructor(limit: number) {
    super()
    this.limit = limit
  }

  public passes(unit: Unit): boolean {
    return util.moe(unit.runtimes, 95) < this.limit
  }
}
