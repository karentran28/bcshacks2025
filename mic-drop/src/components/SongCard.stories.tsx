import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SongCard, { SongCardProps } from './SongCard'

export default {
  title: 'Components/SongCard',
  component: SongCard,
} as Meta<typeof SongCard>

const Template: StoryFn<SongCardProps> = (args) => <SongCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  year: 1975,
  albumCoverUrl: 'https://via.placeholder.com/80',
  onClick: () => alert('Song clicked!'),
}
