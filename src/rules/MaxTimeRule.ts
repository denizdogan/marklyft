import microtime from 'microtime'

import { Rule } from '../Rule'
import { Unit } from '../Unit'

export class MaxTimeRule extends Rule {
  private limit: number

  constructor(limit: number) {
    super()
    this.limit = limit
  }

  public passes(unit: Unit): boolean {
    return (
      !!unit.firstRunTime && microtime.now() - unit.firstRunTime > this.limit
    )
  }
}
