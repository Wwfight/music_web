import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: 'https://netease-cloud-music-api-chi-teal.vercel.app/',
  // baseURL: 'http://58.210.98.62:8090/musicApi',
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    // config.params.timestamp = new Date().valueOf()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code!==200){
      ElMessage({type: 'error', grouping: true, message: res.message})
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return response
  },(error)=>{
    const message = error.request.response?JSON.parse(error.request.response)?.message: error.message
    ElMessage({type: 'error', grouping: true, message: message})
    return Promise.reject(error)
  }
)
function filter(obj, predicate) {
  return Object.keys(obj)
    .filter(key => predicate(key, obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})
}
filter.notEmpty = (key, val) => val !== null && val !== undefined && val !== ''
export function paramsStringify(options) {
  if (options !== Object(options)) {
    return encodeURIComponent(options)
  }
  return `${Object.keys(filter(options, filter.notEmpty))
    .map(key => `${key}=${encodeURIComponent(options[key])}`)
    .join('&')}`
}
export default service
