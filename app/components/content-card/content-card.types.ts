export interface Image {
  uri: string
}

export interface Category {
  name: string
}

export interface Participant {
  firstName: string
  lastName: string
  company: string
}

export interface Podcast {
  id: string
  name: string
  image: Image
  categories: Category[]
  participants: Participant[]
  timeSpentOnByUsers: number
  length: number
}

export interface ContentCardsData {
  contentCards: {
    edges: Podcast[]
  }
}

export interface ContentCardsVars {
  filter: {
    keywords: string
    limit: number
    offset: number
    types: string[]
  }
}
