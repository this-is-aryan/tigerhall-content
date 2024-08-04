import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Podcast } from './content-card.types'
import { styles } from './content-card.styles'
import { images } from '../../utils'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'

export const ContentCard = (props: Podcast) => {
  const { categories, image, name, participants } = props
  return (
    <View style={styles.ContentCardContainer}>
      <ImageBackground resizeMode={'cover'} style={styles.ContentImage} source={image || images.image_tigerhall_logo}>
        <View style={styles.ProgressContainer}>
          <Ionicons name="pie-chart-outline" size={20} color={palette.orange69} />
          <Text style={styles.Progress}>{`30% Completed`}</Text>
        </View>
      </ImageBackground>
      <View style={styles.ContentContainer}>
        {!!categories[0]?.name && (
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.CategoryText}>
            {categories[0]?.name?.trim()}
          </Text>
        )}
        {!!name && (
          <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.ContentName}>
            {name?.trim()}
          </Text>
        )}
        <Text style={styles.Participant}>{`${participants[0]?.firstName?.trim()} ${participants[0]?.lastName?.trim()}`}</Text>
        {!!participants[0]?.company && <Text style={styles.Company}>{`${participants[0]?.company?.trim()}`}</Text>}
      </View>
    </View>
  )
}
