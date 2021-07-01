import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../commons/auth/index';
import PrivateRoute from '../commons/auth/PrivateRoute';
import { PostList } from './PostList/PostList';
import { Login } from './Login/Login'
import { ReadPost } from './PostList/ReadPost'
import Nav from './Components/Nav';
import './App.css';
import "antd/dist/antd.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <div className="App">
          <Nav user={currentUser}/>
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/posts" exact component={PostList} />
            <PrivateRoute path="/posts/:id" component={ReadPost} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
