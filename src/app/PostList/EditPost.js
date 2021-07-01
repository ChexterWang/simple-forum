import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui/core';
import { Typography, IconButton, Switch, FormControlLabel } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { EditTags } from './EditTags';
import { Posts } from "../../commons/api";

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: '0',
        width: '100%',
        maxWidth: '750px',
    },
    dialogTitle: {
        display: 'flex',
    },
    dialogTitleText: {
        flex: '1 1 100%',
        padding: theme.spacing(1, 0),
    },
    dialogContent: {
        margin: '0 auto',
        padding: theme.spacing(0, 2),
    },
    postTitle: {
        width: '100%',
    },
    postContent: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    postTags: {
        '& > div > .MuiInputBase-input': {
            display: 'none',
        },
        '& > div': {
            display: 'block',
            padding: theme.spacing(2),
        },
        width: '100%',
        marginTop: theme.spacing(2),
    },
    preview: {
        fontSize: '1.2em',
        wordBreak: 'break-word',
    },
}));

/*
* post => title + content + tags
* answer => content
* add => submit
* edit => delete + submit
*/

export const EditPost = ({ isAdd, isPost, postId, post, open, setOpen, setReload }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState(false);
    const [tags, setTags] = useState([])
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if(post){
            setTitle(post.title);
            setContent(post.content);
            setTags(post.tags);
        }
    }, [post]);

    useEffect(() => {
        if(isAdd){
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [isAdd])

    const handlePublish = async () => {
        try{
            if(isAdd){
                if(isPost) await Posts.addPost(title, content, tags);
                else await Posts.addAnswer(postId, content);
            }
            else{
                if(isPost) await Posts.editPost(post._id, title, content, tags);
                else await Posts.editAnswer(postId, post._id, content);
            }
        } catch (e) {
            console.log(e);
        }
        setOpen(false);
        setReload(true);
    }

    const handleDelete = async () => {
        try {
            if(isPost) {
                await Posts.deletePost(postId);
                setRedirect(true);
            }
            // else await Posts.deleteAnswer(postId, post._id);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Dialog open={open} maxWidth='md' classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle>
                    <div className={classes.dialogTitle}>
                        <IconButton onClick={() => {setOpen(false)}}>
                            <ArrowBackIosIcon fontSize="small"/>
                        </IconButton>
                        <Typography variant='h5' component='div' className={classes.dialogTitleText}>
                            {isAdd && isPost && 'Add Post'}
                            {isAdd && !isPost && 'Reply'}
                            {!isAdd && isPost && 'Edit Post'}
                            {!isAdd && !isPost && 'Edit Answer'}
                        </Typography>
                        {redirect && (
                            <Redirect to='/posts'/>
                        )}
                        {!isAdd && (
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        )}
                        <IconButton onClick={handlePublish}>
                            <PublishIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.dialogContent}>
                        {isPost && (
                            <TextField 
                                value={title}
                                label='Title'
                                variant='outlined'
                                className={classes.postTitle}
                                onChange={(e) => setTitle(e.target.value)}/>
                        )}
                        <TextField 
                            value={content}
                            label='Content'
                            variant='outlined'
                            multiline
                            rows={10}
                            className={isPost ? classes.postContent : classes.postTitle}
                            onChange={(e) => setContent(e.target.value)}/>
                        {isPost && (
                            <TextField 
                                value=' '
                                label='Tags'
                                variant='outlined'
                                InputProps={{ startAdornment: <EditTags tags={tags} setTags={setTags}/>}}
                                className={classes.postTags}/>
                        )}
                        <FormControlLabel
                            control={<Switch checked={preview} onChange={e => setPreview(!preview)}/>}
                            label="Preview"
                        />
                        <div className={classes.preview}>
                            {preview ? (
                                <ReactMarkdown remarkPlugins={[gfm]} children={content}></ReactMarkdown>
                            ) : []}
                        </div>
                        

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}