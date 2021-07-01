import React from 'react';
import { useEffect, useState } from "react";
import { Posts } from "../../commons/api";
import PostListItem from './PostListItem';
import { EditPost } from './EditPost';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import { postitems } from '../tests/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: '20px',
  },
  max: {
    width: '100%',
    maxWidth: '750px',
    margin: '0 auto',
  },
  title: {
    display: 'flex',
  },
  text: {
    padding: theme.spacing(1,2),
    flex: '1 1 100%',
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [reload, setReload] = useState(false);

  const fetch = () => {
    Posts.getPosts().then(setPosts);
  };

  useEffect(() => {
    fetch();
  }, [])

  useEffect(() => {
    fetch();
    if(reload) setReload(false);
  }, [reload]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EditPost
        isAdd={true} isPost={true} open={openEdit}
        setOpen={setOpenEdit} setReload={setReload}/>
      <div className={classes.max}>
        <div className={classes.title}>
          <Typography className={classes.text} variant="h5" display='inline'>
            Post List
          </Typography>
          <IconButton
            variant="contained"
            onClick={() => setOpenEdit(true)}
            color='primary'>
            <AddIcon/>
          </IconButton>
        </div>
        <List className={classes.list}>
          {posts.map((el, i) => (
            <React.Fragment key={'pli-'+i}>
              <PostListItem content={el}/>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}