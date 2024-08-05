import React, { useMemo, useCallback, memo, useEffect, useState } from 'react'
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import { debounce, images } from '../../utils'
import { ContentList, ContentLoader, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars } from '../../components/content-card/content-card.types'
import { LIMIT, MAX_RETRIES, TIGERHALL_CONTENT_TYPES } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'
import { styles } from './home-screen.styles'

// ErrorView Component
const ErrorView = ({ retry, canRetry }: { retry: () => void; canRetry: boolean }) => (
  <View style={styles.ErrorContainer}>
    <Ionicons color={palette.red05} size={100} name={'alert-circle-outline'} />
    <Text style={styles.ErrorText}>{`Oops! An error has occurred. Please try again later.`}</Text>
    {canRetry ? (
      <TouchableOpacity style={styles.RetryButton} onPress={retry}>
        <Text style={styles.RetryText}>Retry</Text>
      </TouchableOpacity>
    ) : (
      <></>
    )}
  </View>
)

const HomeScreenComponent = () => {
  // Initial States
  const [searchValue, setSearchValue] = useState('')
  const [isListRefreshing, setIsListRefreshing] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  // Apollo Client query hook for fetching contents
  const { loading, error, data, refetch, fetchMore } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: debouncedSearchValue,
        limit: LIMIT,
        offset: 0,
        types: [TIGERHALL_CONTENT_TYPES.PODCAST]
      }
    }
  })

  // Debounced version of search query
  const debounceSearch = debounce((value: string) => {
    setDebouncedSearchValue(value)
  }, 300)

  // Update debounced value when searchValue changes
  useEffect(() => {
    debounceSearch(searchValue)
  }, [searchValue, debounceSearch])

  // Trigger data refresh and pagination reset when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue !== '') {
      refetch().then(() => {
        setOffset(0)
        setHasMore(true)
      })
    }
  }, [debouncedSearchValue, refetch])

  // Handle refreshing the list
  const handleRefresh = useCallback(async () => {
    setIsListRefreshing(true)
    try {
      await refetch()
      setOffset(0)
      setHasMore(true)
    } finally {
      setIsListRefreshing(false)
    }
  }, [refetch])

  // Load more data when reaching the end of the list
  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return

    try {
      await fetchMore({
        variables: {
          filter: {
            keywords: debouncedSearchValue,
            limit: LIMIT,
            offset: offset + LIMIT,
            types: [TIGERHALL_CONTENT_TYPES.PODCAST]
          }
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.contentCards.edges.length) {
            setHasMore(false) // No more data to load
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
      setOffset(offset + LIMIT) // Increment offset for pagination
    } catch (error) {
      console.error('Error loading more data:', error)
    }
  }, [hasMore, fetchMore, debouncedSearchValue, offset])

  // Retry fetching data in case of error
  const retryFetch = useCallback(async () => {
    setRetryCount(retryCount + 1)
    await refetch()
  }, [refetch, retryCount])

  // Memoized rendering of screen content based on query state
  const ScreenContent = useMemo(() => {
    if (error) {
      return <ErrorView retry={retryFetch} canRetry={retryCount < MAX_RETRIES} />
    }
    if (loading || isListRefreshing) return <ContentLoader />
    if (data) {
      return (
        <ContentList
          isRefreshing={isListRefreshing}
          onRefresh={handleRefresh}
          listData={data}
          onEndReached={handleLoadMore}
          isLoadingMore={hasMore}
        />
      )
    }
    return null
  }, [error, loading, isListRefreshing, data, handleRefresh, handleLoadMore, retryFetch])

  return (
    <SafeAreaView style={styles.SceneContainer}>
      <View style={styles.HeaderContainer}>
        <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
        <SearchInput searchInput={searchValue} onChangeSearchInput={(value) => setSearchValue(value)} />
      </View>
      {ScreenContent}
    </SafeAreaView>
  )
}

export const HomeScreen = memo(HomeScreenComponent)
