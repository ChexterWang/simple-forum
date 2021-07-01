import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useAuth } from "../../commons/auth";
import { Sessions } from "../../commons/api";
import { Storage } from '../../commons/storage';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    margin: 'auto',
    maxWidth: '300px',
    padding: theme.spacing(5, 3),
  },
  text: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  errtext: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
  btn: {
    width: '100%',
  },
}));

export const Login = withRouter(({ history, location }) => {
  const { setCurrentUser } = useAuth();
  const referer = location?.state?.referer || '/posts';
  const [username, setUsername] = useState('');
  const [rawPassword, setRawPassword] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const token = Storage.get('token');
    if (token) {
      const user = JSON.parse(Storage.get('user'));

      setCurrentUser(user);

      history.push(referer);
    }
  });

  const onClick = async () => {
    setMessage('');
    try {
      const { user, token } = await Sessions.newSession(username, rawPassword);

      Storage.set('user', JSON.stringify(user));
      Storage.set('token', token);
      setCurrentUser(user);

      history.push(referer);
    } catch (e) {
      // maybe wrong username or password or something
      setMessage('Username or password invalid.');
    }
  };

  return (
    <Box className={classes.root}>
      <Paper variant='outlined' className={classes.card}>
        <Typography variant='h4' className={classes.text}>登入</Typography>
        <Typography variant='h6' className={classes.text}>輸入使用者資訊以繼續使用</Typography>
        <TextField
          variant='outlined'
          className={ classes.text }
          label={ 'Username' }
          value={ username }
          onChange={(e) => setUsername(e.target.value)}/>
        <TextField
          variant='outlined'
          className={ classes.text }
          label={ 'Password' }
          value={ rawPassword }
          type='password'
          onChange={(e) => setRawPassword(e.target.value)}/>
        <Typography variant='body1' className={classes.errtext}>{message}</Typography>
        <Button
          variant='contained'
          color='primary'
          className={ classes.btn }
          onClick={ onClick } > LOGIN </Button>
      </Paper>
    </Box>
  );
});