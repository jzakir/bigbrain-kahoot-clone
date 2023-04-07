import axios from 'axios';

const port = 5005;

const instance = axios.create({
  baseURL: 'http://localhost:' + port
});

instance.defaults.headers.put['Content-Type'] = 'application/json';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.delete['Content-Type'] = 'application/json';

export default instance;
