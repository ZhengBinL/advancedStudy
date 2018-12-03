import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function hsNoList (query,resData) {
  return http.post(`${apiUrl}HS/HSList?user=${userCert}&&accesstoken=${accessToken}`,{
    HSNo:query.HSNo,
    Kumhs:query.Kumhs,
    PageIndex:resData.currentPage,
    PageSize:resData.pageSize
  })
}

//新增
export function hsNoAdd (query) {
  return http.post(`${apiUrl}HS/AddHS?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function hsNoUpdate (query, itemID) {
  return http.post(`${apiUrl}HS/UpdateHS?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function hsNoDel (query) {
  return http.post(`${apiUrl}HS/DeleteHS?user=${userCert}&&accesstoken=${accessToken}`,query)
}

