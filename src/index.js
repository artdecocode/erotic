import {
  getEntryStack, getCallerFromArguments,
} from './lib'
import { makeCallback } from './callback'

/**
 * Call this method to get a function that will return an error with a stack
 * trace starting at the line in code when the call was made.
 */
export function erotic() {
  const error = new Error()
  const caller = getCallerFromArguments(arguments)
  const entryStack = getEntryStack(error.stack)

  return makeCallback(caller, entryStack)
}
