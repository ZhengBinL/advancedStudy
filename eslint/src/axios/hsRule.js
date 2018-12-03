import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function hsRuleList (query,resData) {
  return http.post(`${apiUrl}Rule/HSRuleList?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//新增
export function hsRuleAdd (query) {
  return http.post(`${apiUrl}Rule/AddHSRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function hsRuleUpdate (query, itemID) {
  return http.post(`${apiUrl}Rule/UpdateHSRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function hsRuleDel (query) {
  return http.post(`${apiUrl}Rule/DeleteHSRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

