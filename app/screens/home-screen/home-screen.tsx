import React, { useRef, useState } from 'react'
import { styles } from './home-screen.styles'
import { View, SafeAreaView, Image, FlatList, Text } from 'react-native'
import { images } from '../../utils'
import { ContentCard, SearchInput } from '../../components'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from '../../services/graphql/queries'
import { ContentCardsData, ContentCardsVars, Podcast } from '../../components/content-card/content-card.types'

export const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { loading, error, data } = useQuery<ContentCardsData, ContentCardsVars>(GET_CONTENTS, {
    variables: {
      filter: {
        keywords: '',
        limit: 10,
        offset: 0,
        types: ['PODCAST']
      }
    }
  })
  if (error) console.log('Error')
  if (loading) console.log('Loading')
  if (data) console.log(JSON.stringify(data))

  const renderItem = ({ item, index }: { item: Podcast; index: number }) => <ContentCard key={index} {...item} />

  const ListHeaderComponent = useRef(() => <Text style={styles.ListHeader}>{`Tigerhall Library`}</Text>).current
  return (
    <>
      <SafeAreaView style={styles.SceneContainer}>
        <View style={styles.HeaderContainer}>
          <Image style={styles.Logo} source={images.image_tigerhall_logo} resizeMode={'contain'} />
          <SearchInput searchInput={searchValue} onChangeSearchInput={setSearchValue} />
        </View>
        <FlatList
          data={data?.contentCards?.edges}
          renderItem={renderItem}
          contentContainerStyle={styles.ContentList}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          ListHeaderComponent={ListHeaderComponent}
        />
      </SafeAreaView>
    </>
  )
}
