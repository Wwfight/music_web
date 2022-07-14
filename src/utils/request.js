import axios from 'axios'

const service = axios.create({
  // baseURL: 'https://musicapi.benwang.wang',
  baseURL: 'http://58.210.98.62:8090/musicApi',
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
    return response
  },()=>{

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
