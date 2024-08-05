import '@testing-library/jest-native/extend-expect'

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons')

jest.mock('./app/utils', () => ({
  ...jest.requireActual('./app/utils'),
  debounce: (fn: any) => fn
}))

jest.mock('./app/services/graphql/queries', () => ({
  GET_CONTENTS: 'mocked-query'
}))
