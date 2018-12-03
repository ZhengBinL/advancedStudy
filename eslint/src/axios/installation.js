import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function installationList (query) {
  return http.post(`${apiUrl}Installation/InstallationList?user=${userCert}&&accesstoken=${accessToken}`,{
    InstallatioName: query.InstallatioName
  })
}

//添加installation
export function installationAdd (data) {
  return http.post(`${apiUrl}Installation/AddInstallation?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//修改installation
export function installationEdit (data) {
  return http.post(`${apiUrl}Installation/UpdateInstallation?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//删除installation
export function installationDelete (id) {
  return http.post(`${apiUrl}Installation/DeleteInstallation?user=${userCert}&&accesstoken=${accessToken}`,{
    InstallationID: id
  })
}
