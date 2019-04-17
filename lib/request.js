import request from 'axios'

let r = {
  ...request
}

const prefix = (typeof window != 'undefined') ? '/api' : (
  process.env.SERVICES_HOST || 'http://localhost:3001');

['get', 'post', 'put', 'delete', 'patch', 'head', 'options'].forEach(method => {
  let oldMethod = r[method]
  r[method] = (url, options) => {
    return oldMethod.call(request, prefix + url, options)
  }
})

export default r