import { useRoute } from 'vue-router'

export function useRouterHelper() {
  const route = useRoute()

  function getQueryParam<T extends string | never>(parameterName: string, allowedStringValues?: readonly T[], canBeNumber?: true): T | number | undefined
  function getQueryParam<T extends string | never>(parameterName: string, allowedStringValues?: readonly T[], canBeNumber?: false): T | undefined
  function getQueryParam<T extends string | never>(parameterName: string, allowedStringValues?: readonly T[], canBeNumber?: boolean): T | number | undefined {
    const parameter = route.query[parameterName]
    if (parameter === undefined) return undefined

    let result
    if (Array.isArray(parameter)) {
      if (parameter[0] === null) return undefined
      result = parameter[0]
    } else {
      if (parameter === null) return undefined
      result = parameter
    }
    if (allowedStringValues !== undefined && !canBeNumber && !(allowedStringValues as readonly string[]).includes(result)) return undefined
    if (canBeNumber) {
      result = Number(result)
      return isNaN(result) ? undefined : result
    }
    return result as T
  }

  function getQueryParamList(parameterName: string): string[] {
    const parameter = route.query[parameterName]
    if (parameter === undefined) return []

    if (Array.isArray(parameter)) {
      return parameter.filter<string>(
        (value): value is string => value !== null
      )
    } else {
      if (parameter === null) return []
      return [parameter]
    }
  }

  return { getQueryParam, getQueryParamList }
}
