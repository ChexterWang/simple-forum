import { useState } from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getTimeString } from './util';

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: '1px solid #ccc',
    },
    rating: {
        flex: '1 0 6ch',
        textAlign: 'center',
    },
    container: {
        flex: '1 1 100%',
        marginLeft: theme.spacing(2),
    },
    title: {
        textDecoration: 'none',
    },
    tag: {
        margin: '6px 0',
    },
    tagBtn: {
        fontSize: '0.6rem',
        padding: '3px 7px',
        marginRight: theme.spacing(0.6),
    }
}));

export default function PostListItem({ content }) {

    const [isHovered, setHovered] = useState(false);
    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.root}>
                <ListItemText className={classes.rating} primary={content.rating} />
                <div className={classes.container}>
                    <ListItemText 
                        className={classes.post} primary={
                            (<Link className={classes.title} to={'/posts/'+content?._id}>{content?.title}</Link>)
                        }
                        secondary={'by ' + content.author.displayName + '. Updated at ' + getTimeString(content.updatedAt, !isHovered)}
                        onMouseEnter={(e)=>{setHovered(true)}}
                        onMouseLeave={(e)=>{setHovered(false)}}
                        onMouseDown={(e)=>{setHovered(!isHovered)}}
                    />
                    <div className={classes.tag}>
                        {content.tags?.map((v, i) => {
                            return (
                                <Button
                                    key={'pli-tgs-'+content?.id+'-'+i}
                                    variant='outlined'
                                    className={classes.tagBtn}
                                    component={Link} to={'/tags/'+v}
                                >{v}</Button>
                            );
                        })}
                    </div>
                </div>
            </ListItem>
        </>
    );
}