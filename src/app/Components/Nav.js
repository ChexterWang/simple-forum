import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { Storage } from '../../commons/storage';
import { useAuth } from "../../commons/auth";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
    },
    setSearch: {
      color: 'inherit',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
      margin: theme.spacing(0, 0, 1, 0),
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
    login: {
        color: 'inherit',
    },
}));

export default function Nav ({ user }) {
    const { setCurrentUser } = useAuth();
    const classes = useStyles();
    const [search, setSearch] = useState(false);

    const logout = () => {
      Storage.set('token', '');
      Storage.set('user', '');
      setCurrentUser(null);
      setSearch(false);
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={Link} to='/' className={classes.title} color='inherit' variant="h6" noWrap>
              APCS CAMP Forum
            </Typography>
            {
              (user) ? (
                <>
                  <IconButton className={classes.setSearch} onClick={(e) => {setSearch(!search)}}>
                    <SearchIcon />
                  </IconButton>
                  <Button component={Link} to='/'
                    onClick={logout}
                    className={classes.login}>
                      {user.username}
                  </Button>
                </>
              ) : []
            }
            </Toolbar>
            {
              (search) ? [(
                <Toolbar key={'nav-srchbar'}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      autoFocus
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      onBlur={() => setSearch(false)}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                </Toolbar>
              )] : []
            }
        </AppBar>
      </div>
    );
  }