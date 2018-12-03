import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取aside
export function getUser() {
  return http.post(`${apiUrl}Login/UserInfo`)
}

//获取role list
export function roleList () {
  return http.post(`${apiUrl}Role/RoleList?user=${userCert}&&accesstoken=${accessToken}`)
}

//新增
export function roleAdd (query) {
  return http.post(`${apiUrl}Role/AddRole?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//编辑
export function roleUpdate (query) {
  return http.post(`${apiUrl}Role/UpdateRole?user=${userCert}&&accesstoken=${accessToken}`,query)
}

//删除
export function roleDelete (id) {
  return http.post(`${apiUrl}Role/DeleteRole?user=${userCert}&&accesstoken=${accessToken}`,{
    RoleID: id
  })
}

//获取 privilege list
export function rolePrivilege (id) {
  return http.post(`${apiUrl}Role/PermissionList?user=${userCert}&&accesstoken=${accessToken}`, {
    RoleID: id
  })
}
//保存角色 privilege
export function savePrivilege (roleId, permissionIds) {
  return http.post(`${apiUrl}Role/SavePermission?user=${userCert}&&accesstoken=${accessToken}`,{
    RoleID: roleId,
    PermissionID: permissionIds
  })
}
