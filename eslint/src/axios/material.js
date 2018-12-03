import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function materialList (query,resData) {
  return http.post(`${apiUrl}Material/MaterialList?user=${userCert}&&accesstoken=${accessToken}`,{
    MaterialName: query.MaterialName
  })
}

//新增
export function materialAdd (query) {
  return http.post(`${apiUrl}Material/AddMaterial?user=${userCert}&&accesstoken=${accessToken}`,{
    MaterialName: query.MaterialName,
    Description: query.Description
  })
}

//编辑
export function materialUpdate (query, itemID) {
  return http.post(`${apiUrl}Material/UpdateMaterial?user=${userCert}&&accesstoken=${accessToken}`,{
    MaterialName: query.MaterialName,
    Description: query.Description,
    MaterialID: query.MaterialID
  })
}

//删除
export function materialDel (query) {
  return http.post(`${apiUrl}Material/DeleteMaterial?user=${userCert}&&accesstoken=${accessToken}`,{
    MaterialID: query.MaterialID
  })
}

