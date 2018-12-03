import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function partNoList (query,resData) {
  return http.post(`${apiUrl}Part/PartList?user=${userCert}&&accesstoken=${accessToken}`,{
    PartNo:query.PartNo,
    PartName:query.PartName,
    FunctionID: query.FunctionID,
    MaterialID: query.MaterialID,
    InstallationID: query.InstallationID,
    PageIndex:resData.currentPage,
    PageSize:resData.pageSize
  })
}

//新增
export function partNoAdd (query) {
  return http.post(`${apiUrl}Part/AddPart?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function partNoUpdate (query) {
  return http.post(`${apiUrl}Part/UpdatePart?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function partNoDel (id) {
  return http.post(`${apiUrl}Part/DeletePart?user=${userCert}&&accesstoken=${accessToken}`,{
    PartID: id
  })
}

