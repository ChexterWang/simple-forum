import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase } from '@material-ui/core';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import DetailsIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import { getTimeString } from './util'

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: '1px solid #ccc',
        marginTop: theme.spacing(3),
        fontSize: '1.2em',
    },
    split: {
        display: 'flex',
    },
    sidebar: {
        width: '48px',
    },
    rating: {
        textAlign: 'center',
    },
    content: {
        flex: '1 1 100%',
        minWidth: '0',
        margin: theme.spacing(2),
    },
    info: {
        textAlign: 'right',
        margin: theme.spacing(2, 0),
    },
    commentList:{
        borderTop: '1px solid #ccc',
    },
    comment: {
        borderBottom: '1px solid #ddd',
        padding: theme.spacing(0.5, 0, 1, 0),
    },
    user: {
        textDecoration: 'none',
        display: 'inline-block',
    },
    addComment: {
        width: '100%',
        '& :focus': {
            borderBottom: '1px solid #ccc',
        },
    },
}));

export const ReadPostItem = ({ post, handleEdit }) => {
    const [comment, setComment] = useState('');
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.split}>
                <div className={classes.sidebar}>
                    <IconButton><ChangeHistoryIcon/></IconButton>
                    <div className={classes.rating}>{post?.rating}</div>
                    <IconButton><DetailsIcon/></IconButton>
                    <IconButton onClick={handleEdit}><EditIcon/></IconButton>
                </div>
                <div className={classes.content}>
                    <ReactMarkdown remarkPlugins={[gfm]} children={post?.content}></ReactMarkdown>
                    <div className={classes.info}>
                        {'by '}
                        <Link className={classes.user} to={'/users/'+post?.author?._id}>{post?.author?.displayName}</Link>
                        {'. Updated at ' + getTimeString(post?.updatedAt)}
                    </div>
                    <div className={classes.commentList}>
                        {post?.comments?.map(el =>(
                            <div className={classes.comment}>
                                <Link className={classes.user} to={'/users/'+el.author._id}>{el?.author?.displayName}</Link>
                                {': '+el?.content}
                            </div>
                        ))}
                        <InputBase
                            multiline
                            className={classes.addComment}
                            placeholder='Add a comment...' value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}