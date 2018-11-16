import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from "react-router-dom"


export const mainListItems = (classes, handleNestedClick, openNested) => (
  <div>
    <ListItem component={Link} to="/" button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Data Series" />
    </ListItem>
    {/* <ListItem component={Link} to="/create" button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon> */}
      {/* <ListItemText primary="Create/Load Series" /> */}
    {/* </ListItem> */}
    <ListItem button onClick={handleNestedClick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText inset primary="New Series" />
      {openNested ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openNested} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}
          component={Link} to="/create">
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText inset primary="Generate" />
        </ListItem>
        <ListItem button className={classes.nested}
          component={Link} to="/import">
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText inset primary="Import" />
        </ListItem>        
      </List>
    </Collapse>    
    <ListItem component={Link} to="/custom" button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Customize Faults" />
    </ListItem>
  </div>
);