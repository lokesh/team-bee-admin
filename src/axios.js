import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const forceProd = process.env.VUE_APP_USE_PRODUCTION_API === 'true';

const baseURL = (isDev && !forceProd)
  ? 'http://localhost:3000/api'
  : 'https://team-bee-api.herokuapp.com/api';

export default axios.create({
  baseURL,
});
