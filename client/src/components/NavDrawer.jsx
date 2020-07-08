import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import StyledLink from './Link'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

export const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

const NavDrawer = () => {
  const classes = useStyles()
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h7">Kevin Huang</Typography>
      </Toolbar>
      <Divider />
      <List>
        <StyledLink to="/">
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/events">
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
        </StyledLink>
      </List>
    </Drawer>
  )
}

const StyledContainer = styled(Container)`
  text-align: center;
`

export default NavDrawer
