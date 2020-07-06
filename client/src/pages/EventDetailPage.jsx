import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import EventDetail from '../components/EventDetail'
import { useParams } from 'react-router-dom'

const EventDetailPage = (props) => {
  let { eventId } = useParams()
  const { data, loading, error } = useQuery(GET_EVENT_DETAIL, {
    variables: { eventId },
  })

  if (loading) return <p>Loading</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Not found</p>

  return (
    <Fragment>
      <EventDetail event={data.getEventById} />
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
    }
  }
`

export default EventDetailPage
