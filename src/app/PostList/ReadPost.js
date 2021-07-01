import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Posts } from "../../commons/api";
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplyIcon from '@material-ui/icons/Reply';
import { ReadPostItem } from './ReadPostItem';
import { EditPost } from './EditPost'
// import { testanswer, testpost } from '../tests/Constants';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
    container: {
        maxWidth: '750px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
    },
    postTitle: {
        padding: theme.spacing(1, 0),
        flex: '1 1 100%',
    },
    content: {
        padding: theme.spacing(1),
    },
    title: {
        marginLeft: theme.spacing(1),
    }
}));

export const ReadPost = () => {
    const [post, setPost] = useState(null);
    const [ans, setAns] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [isPost, setIsPost] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [reload, setReload] = useState(false);
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        Posts.getPost(id)
        .then(res => {
            setPost(res);
            setAns(res.answers);
        })
        .catch(() => {
            // TODO: post not found or cant see.
        });
        // setPost(testpost);
        // setAns(testanswer);
        if(reload) setReload(false);
    }, [id, reload])

    const handleOpenEdit = (e,index,add=false) => {
        // TODO: check if the user is admin or author
        if(add){
            // reply
            setIsAdd(true);
            setIsPost(false);
            setEditPost(null);
        }
        else if(index===-1){
            // edit post
            setIsAdd(false);
            setIsPost(true);
            setEditPost(post);
        }
        else{
            // edit answer
            setIsAdd(false);
            setIsPost(false);
            setEditPost(ans[index]);
        }
        setOpenEdit(true);
    }

    return (
        <>
            <Box className={classes.root}>
                <EditPost
                    isAdd={isAdd} isPost={isPost} postId={post?._id}
                    post={editPost} open={openEdit} setOpen={setOpenEdit} setReload={setReload}/>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <IconButton component={Link} to='/posts'>
                            <ArrowBackIosIcon/>
                        </IconButton>
                        <Typography variant='h5' className={classes.postTitle}>
                            Posts
                        </Typography>
                        <IconButton onClick={e => handleOpenEdit(e,0,true)}>
                            <ReplyIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <Typography variant='h4' className={classes.title}>{post?.title}</Typography>
                        <ReadPostItem post={post} handleEdit={e => handleOpenEdit(e,-1)}/>
                        {ans?.map((el,i) =>(
                            <ReadPostItem key={'rpi-'+i} post={el} handleEdit={e => handleOpenEdit(e,i)}/>
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
}