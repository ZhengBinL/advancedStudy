import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function requestList (query, resData) {
  return http.post(`${apiUrl}Request/RequestList?user=${userCert}&&accesstoken=${accessToken}`,{
    FileName: query.FileName,
    UploadUser: query.UploadUser,
    UploadTimeS: query.UploadTimeS,
    UploadTimeE: query.UploadTimeE,
    Approve: query.Approve,
    DownLoad: query.DownLoad,
    PageIndex: resData.currentPage,
    pageSize: resData.pageSize
  })
}

//上传文件
// export function uploadAdd (data) {
//   return http.post(`${apiUrl}Request/Upload?user=${userCert}&&accesstoken=${accessToken}`,data)
// }

//上传文件成功后提交用户及文件名信息
export function excelAdd (data) {
  return http.post(`${apiUrl}Request/AddExcel?user=${userCert}&&accesstoken=${accessToken}`,data)
}

// approveProcess
export function approveProcess(fileName) {
  return http.post(`${apiUrl}Request/ApproveProcess?user=${userCert}&&accesstoken=${accessToken}`,{
    FileName: fileName
  })
}

// ApproveDownload
export function approveDownload(fileName) {
  return http.post(`${apiUrl}Request/ApproveDownload?user=${userCert}&&accesstoken=${accessToken}`,{
    FileName: fileName
  })
}

// need review
export function needReview(id,query,resData) {
  return http.post(`${apiUrl}Request/NeedReview?user=${userCert}&&accesstoken=${accessToken}`,{
    FileID: id,
    PartNo: query.PartNo,
    PartName: query.PartName,
    FunctionID: query.FunctionID,
    MaterialID: query.MaterialID,
    InstallationID: query.InstallationID,
    PageSize: resData.pageSize,
    PageIndex: resData.currentPage
  })
}

// review save
export function reviewSave(partId, hsId) {
  return http.post(`${apiUrl}Request/SavePartHS?user=${userCert}&&accesstoken=${accessToken}`,{
    HSID: hsId,
    PartID: partId
  })
}
