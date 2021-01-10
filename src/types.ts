export const isOfType = <T>(varToBeChecked: any, propertyToCheckFor: string): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined
