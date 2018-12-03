import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取 list
export function mediaList (query, resData) {
  return http.post(`${apiUrl}Media/ImageList?user=${userCert}&&accesstoken=${accessToken}`,{
    ImageName: query.ImageName,
    PageIndex: resData.currentPage,
    PageSize: resData.pageSize
  })
}

//上传
export function mediaUpload (query) {
  return http.post(`${apiUrl}Media/Upload?user=${userCert}&&accesstoken=${accessToken}`,query)
}
// 新增
export function mediaAdd(query) {
  return http.post(`${apiUrl}Media/AddImage?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function mediaUpdate (query) {
  return http.post(`${apiUrl}Media/Editmage?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function mediaDelete (id) {
  return http.post(`${apiUrl}Media/DeleteImage?user=${userCert}&&accesstoken=${accessToken}`,{
    ImageID: id
  })
}
