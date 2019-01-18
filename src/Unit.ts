import microtime from 'microtime'
import { computed, observable } from 'mobx'
import { Rule } from './Rule'
import * as util from './util'

export class Unit {
  public name: string
  public func: (...args: any[]) => any
  public rules: Rule[]
  public firstRunTime?: number
  @observable public runtimes: number[] = []

  constructor(
    name: string,
    func: ((...args: any[]) => any),
    rules: Rule[] = []
  ) {
    this.name = name
    this.func = func
    this.rules = rules
  }

  public async run(): Promise<void> {
    if (!this.firstRunTime) {
      this.firstRunTime = microtime.now()
    }
    const t1 = microtime.now()
    await this.func()
    const t2 = microtime.now()
    const runtime = t2 - t1
    this.runtimes.push(runtime)
  }

  @computed get isDone(): boolean {
    return this.rules.every(rule => rule.passes(this))
  }

  @computed get moe(): number {
    return util.moe(this.runtimes, 99)
  }
}
