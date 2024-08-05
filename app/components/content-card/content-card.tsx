import React, { memo } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Podcast } from './content-card.types'
import { styles } from './content-card.styles'
import { resizeImageUrl } from '../../utils'
import Ionicons from '@expo/vector-icons/Ionicons'
import { palette } from '../../theme'
import { ProgressBar } from '../progress-bar'
import { CARD_IMAGE_HEIGHT, CARD_IMAGE_WIDTH } from '../../constants'

const TigerHallContentCard = (props: Podcast) => {
  const { categories, image, name, length, timeSpentOnByUsers, participants } = props
  const progressPercentage = Math.floor((timeSpentOnByUsers / length) * 100)
  const duration = Math.floor(length / 60)
  const imageURL = resizeImageUrl(image.uri, CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT)

  return (
    <View style={styles.ContentCardContainer}>
      <ImageBackground resizeMode={'contain'} style={styles.ContentImage} source={{ uri: imageURL }}>
        <View style={styles.ProgressContainer}>
          <Ionicons name="pie-chart-outline" size={20} color={palette.orange69} />
          <Text style={styles.Progress}>{`${progressPercentage}% Completed`}</Text>
        </View>
        <View style={styles.ContentSpecsContainer}>
          <View style={styles.Audio}>
            <Ionicons name={'headset-outline'} size={25} color={palette.white} />
          </View>
          <View style={styles.ContentLengthContainer}>
            <Ionicons name={'time-outline'} size={16} color={palette.white} />
            <Text style={styles.ContentLength}>{`${duration}m`}</Text>
          </View>
        </View>
        <ProgressBar progressPercentage={Math.min(progressPercentage, 100)} />
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
        {!!participants[0]?.company && (
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.Company}>{`${participants[0]?.company?.trim()}`}</Text>
        )}
        <View style={styles.ShareAndSaveContainer}>
          <Ionicons style={styles.ShareIcon} name="share-social-outline" size={22} color={palette.orange29} />
          <Ionicons name="bookmark-outline" size={22} color={palette.orange29} />
        </View>
      </View>
    </View>
  )
}

export const ContentCard = memo(TigerHallContentCard)
