import React, { useState } from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image, Text } from 'react-native'
import { images } from '../../utils'
import { ContentList, ContentLoader, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars } from '../../components/content-card/content-card.types'
import { TIGERHALL_CONTENT_TYPES } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'

const ErrorView = () => (
  <View style={styles.ErrorContainer}>
    <Ionicons color={palette.red05} size={100} name={'alert-circle-outline'} />
    <Text style={styles.ErrorText}>{`Oops! An error has occurred. Please try again later.`}</Text>
  </View>
)

export const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isListRefreshing, setIsListRefreshing] = useState<boolean>(false)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const { loading, error, data, refetch } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: searchValue,
        limit: 10,
        offset: 0,
        types: [TIGERHALL_CONTENT_TYPES.PODCAST]
      }
    }
  })

  const handleRefresh = async () => {
    setIsListRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsListRefreshing(false)
    }
  }

  const handleLoadMore = () => {}

  const ScreenContent = () => {
    if (error) return <ErrorView />
    if (loading || isListRefreshing) return <ContentLoader />
    if (data)
      return (
        <ContentList
          isRefreshing={isListRefreshing}
          onRefresh={handleRefresh}
          listData={data}
          onEndReached={handleLoadMore}
          isLoadingMore={loadingMore}
        />
      )
  }

  return (
    <>
      <SafeAreaView style={styles.SceneContainer}>
        <View style={styles.HeaderContainer}>
          <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
          <SearchInput searchInput={searchValue} onChangeSearchInput={setSearchValue} />
        </View>
        <ScreenContent />
      </SafeAreaView>
    </>
  )
}
