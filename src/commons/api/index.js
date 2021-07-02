
import axios from 'axios';
import { Post, PostItem, User } from '../../models';
import { Storage } from '../storage';

const api_url = 'https://c6b96d706a5d.jp.ngrok.io/api';

function getAuthHeader() {
  return {
    'Authorization': 'Bearer ' + Storage.get('token'),
  }
}

const api = axios.create({
  baseURL: api_url,
  // headers: getAuthHeader(),
});

api.interceptors.request.use(config => {
  config.headers = getAuthHeader();
  return config;
});

export const Sessions = {
  newSession(username, password) {
    return api.post('/sessions', { username, password }).then(res => ({
      user: new User(res.data.user),
      token: res.data.token,
    }));
  },
};

export const Posts = {
  getPosts({ offset = 0, limit = 20 } = {}) {
    return api.get(`/posts?offset=${offset}&limit=${limit}`).then(res => res.data.map(j => new PostItem(j)));
  },
  getPost(_id) {
    return api.get('/posts/'+_id).then(res => new Post(res.data));
  },
  addPost(title, content, tags){
    return api.post('/posts', { title, content, tags });
  },
  addAnswer(_id, content){
    return api.post('/posts/'+_id+'/answers', { content });
  },
  editPost(_id, title, content, tags ){
    return api.put('/posts/'+_id, { title, content, tags });
  },
  editAnswer(_id, _aid, content){
    return api.put('/posts/'+_id+'/answers/'+_aid, { content });
  },
  deletePost(_id){
    return api.delete('/posts/'+_id);
  }
};