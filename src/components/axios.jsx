import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000,
});
// Debugging: log requests and responses to help trace login failures
instance.interceptors.request.use(req => {
  try{
    console.debug('[axios] Request:', req.method, req.url, req.data ? req.data : '')
  }catch(e){}
  return req
}, err => { console.debug('[axios] Request error', err); return Promise.reject(err) })

instance.interceptors.response.use(res => {
  try{ console.debug('[axios] Response:', res.status, res.config.url, res.data) }catch(e){}
  return res
}, err => {
  try{ console.debug('[axios] Response error:', err.response?.status, err.response?.data) }catch(e){}
  return Promise.reject(err)
})

export default instance;
