import { reaction } from 'mobx'
import { Suite } from '..'
import { Plugin } from '../Plugin'
import * as util from '../util'

export class DefaultOutputPlugin extends Plugin {
  public setup(suite: Suite): this {
    reaction(
      () => suite.status,
      (status, reaction) => {
        if (!status.started) {
          return
        }

        // get the units that have completed
        const completed = suite.units
          .filter(u => u.isDone)
          .sort((a, b) => (a.firstRunTime || 0) - (b.firstRunTime || 0))
          .reverse()

        // process the last unit that was started
        const u = completed[0]
        const mean = util.mean(u.runtimes)
        const hz = (1 * 1000 * 1000) / mean
        const moe = util.moe(u.runtimes, 99)
        console.log(`${u.name} x ${hz} ops/sec (mean: ${mean}, moe: ${moe})`)

        if (status.done) {
          reaction.dispose()
        }
      }
    )
    return this
  }
}
