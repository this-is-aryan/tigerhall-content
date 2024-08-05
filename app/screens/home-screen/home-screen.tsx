import React, { useMemo, useCallback, memo, useEffect, useReducer } from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import { debounce, images } from '../../utils'
import { ContentList, ContentLoader, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars } from '../../components/content-card/content-card.types'
import { TIGERHALL_CONTENT_TYPES } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'
import { contentReducer, initialState } from '../../store'

// ErrorView Component
const ErrorView = ({ retry }: { retry: () => void }) => (
  <View style={styles.ErrorContainer}>
    <Ionicons color={palette.red05} size={100} name={'alert-circle-outline'} />
    <Text style={styles.ErrorText}>{`Oops! An error has occurred. Please try again later.`}</Text>
    <TouchableOpacity style={styles.RetryButton} onPress={retry}>
      <Text style={styles.RetryText}>Retry</Text>
    </TouchableOpacity>
  </View>
)

// Initial state and reducer for managing complex state logic

const HomeScreenComponent = () => {
  const [state, dispatch] = useReducer(contentReducer, initialState)

  const { searchValue, isListRefreshing, isLoadingMore, offset, hasMore, debouncedSearchValue } = state

  const { loading, error, data, refetch, fetchMore } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: debouncedSearchValue,
        limit: 5,
        offset: 0,
        types: [TIGERHALL_CONTENT_TYPES.PODCAST]
      }
    }
  })

  // Debounced version of search query
  const debounceSearch = debounce((value: string) => {
    dispatch({ type: 'SET_DEBOUNCED_SEARCH_VALUE', value })
  }, 300)

  // Update debounced value when searchValue changes
  useEffect(() => {
    debounceSearch(searchValue)
  }, [searchValue, debounceSearch])

  const handleRefresh = useCallback(async () => {
    dispatch({ type: 'SET_LIST_REFRESHING', value: true })
    try {
      await refetch()
    } finally {
      dispatch({ type: 'SET_LIST_REFRESHING', value: false })
    }
  }, [refetch])

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return
    dispatch({ type: 'SET_LOADING_MORE', value: true })
    try {
      await fetchMore({
        variables: {
          filter: {
            keywords: searchValue,
            limit: 5,
            offset: offset + 5,
            types: [TIGERHALL_CONTENT_TYPES.PODCAST]
          }
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.contentCards.edges.length) {
            dispatch({ type: 'SET_HAS_MORE', value: false })
            return prevResult
          }
          return {
            ...prevResult,
            contentCards: {
              edges: [...prevResult.contentCards.edges, ...fetchMoreResult.contentCards.edges]
            }
          }
        }
      })
      dispatch({ type: 'SET_OFFSET', value: offset + 5 })
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      dispatch({ type: 'SET_LOADING_MORE', value: false })
    }
  }, [hasMore, isLoadingMore, fetchMore, searchValue, offset])

  const retryFetch = useCallback(async () => {
    await refetch()
  }, [refetch])

  const ScreenContent = useMemo(() => {
    if (error) {
      return <ErrorView retry={retryFetch} />
    }
    if (loading || isListRefreshing) return <ContentLoader />
    if (data) {
      return (
        <ContentList
          isRefreshing={isListRefreshing}
          onRefresh={handleRefresh}
          listData={data}
          onEndReached={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )
    }
    return null
  }, [error, loading, isListRefreshing, data, handleRefresh, handleLoadMore, isLoadingMore, retryFetch])

  return (
    <SafeAreaView style={styles.SceneContainer}>
      <View style={styles.HeaderContainer}>
        <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
        <SearchInput searchInput={searchValue} onChangeSearchInput={(value) => dispatch({ type: 'SET_SEARCH_VALUE', value })} />
      </View>
      {ScreenContent}
    </SafeAreaView>
  )
}

export const HomeScreen = memo(HomeScreenComponent)
