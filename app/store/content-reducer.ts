export const initialState = {
  searchValue: '',
  isListRefreshing: false,
  isLoadingMore: false,
  offset: 0,
  hasMore: true,
  debouncedSearchValue: ''
}

export const contentReducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.value }
    case 'SET_DEBOUNCED_SEARCH_VALUE':
      return { ...state, debouncedSearchValue: action.value }
    case 'SET_LIST_REFRESHING':
      return { ...state, isListRefreshing: action.value }
    case 'SET_LOADING_MORE':
      return { ...state, isLoadingMore: action.value }
    case 'SET_OFFSET':
      return { ...state, offset: action.value }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.value }
    default:
      return state
  }
}
