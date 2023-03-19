import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { length } from '../../matchers/objects/length'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toHaveLength(
      this: Validators<string | any[] | { length: number }, R>,
      length: number,
    ): R
  }
}

registerValidator('toHaveLength', toHaveLength)

export function toHaveLength(control: Control, expected: number) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)
  control.assert({
    success: length(expected)(control.actual),
    reason: `The value ${actualInline} does not have length ${expectedInline}, but it was expected to.`,
    negatedReason: `The value ${actualInline} has length ${expectedInline}, but it was expected not to.`,
    actual: format(getLength(control.actual), null),
    expected: format(expected, null),
  })
}

function getLength(value: unknown) {
  try {
    return (value as any).length
  } catch {
    return undefined
  }
}
