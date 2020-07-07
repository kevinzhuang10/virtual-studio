import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import EventDetail from '../components/EventDetail'
import { useParams } from 'react-router-dom'
import { openInNewTab } from '../utils/browser'

const EventDetailPage = (props) => {
  let { eventId } = useParams()
  const { data: eventData, loading, error } = useQuery(GET_EVENT_DETAIL, {
    variables: { eventId },
  })
  const { data: userData } = useQuery(GET_CURRENT_USER)

  const handleStart = (startUrl) => {
    openInNewTab(startUrl)
  }
  const handleShare = (eventId) => {
    console.log('Copied!')
  }
  const handleEdit = (eventId) => {}

  if (loading) return <p>Loading</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!eventData) return <p>Not found</p>

  return (
    <Fragment>
      <EventDetail
        event={eventData.getEventById}
        handleStart={handleStart}
        handleShare={handleShare}
        handleEdit={handleEdit}
      />
    </Fragment>
  )
}

// ========== GraphQL Queries ==========
export const GET_EVENT_DETAIL = gql`
  query getEventById($eventId: ID!) {
    getEventById(eventId: $eventId) {
      id
      title
      startTime
      duration
      description
      startUrl
      participants {
        id
        email
        name
      }
      host {
        id
      }
    }
  }
`

const GET_CURRENT_USER = gql`
  query currentUser {
    me @client {
      id
    }
  }
`

export default EventDetailPage
