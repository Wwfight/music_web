import request from '../utils/request'

export function getAction(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

export function postAction(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function deleteAction(url, data) {
  return request({
    url: url,
    method: 'delete',
    data
  })
}

export function login(params) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: params
  })
}

export function getCaptcha(params) {
  return request({
    url: '/captcha/sent',
    method: 'post',
    data: params
  })
}

export function verifyCaptcha(params) {
  return request({
    url: '/captcha/verify',
    method: 'post',
    data: params
  })
}

export function search(params) {
  return request({
    url: '/search',
    method: 'get',
    params
  })
}
