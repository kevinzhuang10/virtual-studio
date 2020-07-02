import React, { useState } from 'react'
import { TextField, Button, Container } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import MenuItem from '@material-ui/core/MenuItem'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const durations = [
  {
    value: 15,
    label: '15 mins',
  },
  {
    value: 30,
    label: '30 mins',
  },
  {
    value: 45,
    label: '45 mins',
  },
  {
    value: 60,
    label: '1 hr',
  },
]
// , $startTime: String!, $endTime: String!, $description: String!
export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($title: String!) {
    createEvent(title: $title) {
      success
      message
      data {
        id
        title
        host {
          id
          name
        }
      }
    }
  }
`

const UpdateEventPage = () => {
  let history = useHistory()
  const [title, setTitle] = useState('')
  // get local time from browser, use as init time
  const [startTime, setStartTime] = useState('2020-07-01T09:00')
  const [duration, setDuration] = useState(60)
  const [description, setDescription] = useState('')
  const [pricingConfig, setPricingConfig] = useState('fixed')
  const [createEvent, { data, loading, error }] = useMutation(
    CREATE_EVENT_MUTATION,
    {
      onCompleted({ createEvent }) {
        console.log('event created', createEvent)
        history.push('/')
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit to create!')
    createEvent({
      variables: {
        title,
      },
    })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="startTime"
            label="Start Time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="duration"
            select
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {durations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="description"
            label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Price</FormLabel>
            <RadioGroup
              aria-label="Price"
              name="pricingConfig"
              value={pricingConfig}
              onChange={(e) => setPricingConfig(e.target.value)}
            >
              <FormControlLabel
                value="fixed"
                control={<Radio />}
                label="Fixed"
              />
              <FormControlLabel
                value="flexible"
                control={<Radio />}
                label="Flexible"
              />
              <FormControlLabel value="free" control={<Radio />} label="Free" />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Container>
  )
}

export default UpdateEventPage
