import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function functionList (query) {
  return http.post(`${apiUrl}Function/FunctionList?user=${userCert}&&accesstoken=${accessToken}`,{
    FunctionName: query.FunctionName
  })
}

//添加Function
export function functionAdd (data) {
  return http.post(`${apiUrl}Function/AddFunction?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//修改Function
export function functionEdit (data) {
  return http.post(`${apiUrl}Function/UpdateFunction?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//删除Function
export function functionDelete (id) {
  return http.post(`${apiUrl}Function/DeleteFunction?user=${userCert}&&accesstoken=${accessToken}`,{
    FunctionID: id
  })
}
