import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Typography, Link } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function PrimarySearchAppBar() {

  // const classes = useStyles();

  const { notification } = useSelector((state) => state.form)
  const jobsCount = notification.length

  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography class="ml-5 mr-5">
          <Link onClick={() => history.push("/jobs/view")} color="inherit">
            Jobs
          </Link>
        </Typography>
        <Typography class="ml-5 mr-5">
          <Link onClick={() => history.push("/user")} color="inherit">
            User
          </Link>
        </Typography>
        <Typography class="ml-5 mr-5">
          <Link onClick={() => history.push("/")} color="inherit">
            Create Job
          </Link>
        </Typography>
        <IconButton color="inherit" id="demo-controlled-open-select-label">
          <Badge badgeContent={jobsCount} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          {
            notification.map(job => {
              return (
                <>
                <MenuItem value=""> {job.title}</MenuItem>
                <MenuItem value=""> {job.message}</MenuItem>
                </>
              )
            })
          }
        </Select>
      </Toolbar>
    </AppBar>
  );
}
