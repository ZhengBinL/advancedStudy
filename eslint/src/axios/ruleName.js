import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function ruleNameList (query,resData) {
  return http.post(`${apiUrl}Rule/RuleList?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//新增
export function ruleNameAdd (query) {
  return http.post(`${apiUrl}Rule/AddRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function ruleNameUpdate (query) {
  return http.post(`${apiUrl}Rule/UpdateRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function ruleNameDel (query) {
  return http.post(`${apiUrl}Rule/DeleteRule?user=${userCert}&&accesstoken=${accessToken}`,query)
}

