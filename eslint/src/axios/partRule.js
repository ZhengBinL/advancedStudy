import http from '@/axios/common/http'
import {userCert,accessToken, apiUrl} from '@/axios/common/common.js'

//获取list
export function partRuleList (query) {
  return http.post(`${apiUrl}Rule/PartRuleList?user=${userCert}&&accesstoken=${accessToken}`,{
    PartPattern: query.PartPattern,
    RuleID: query.RuleID
  })
}

//添加partRule
export function partRuleAdd (data) {
  return http.post(`${apiUrl}Rule/AddPartRule?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//修改partRule
export function partRuleEdit (data) {
  return http.post(`${apiUrl}Rule/UpdatePartRule?user=${userCert}&&accesstoken=${accessToken}`,data)
}

//删除partRule
export function partRuleDelete (id) {
  return http.post(`${apiUrl}Rule/DeletePartRule?user=${userCert}&&accesstoken=${accessToken}`,{
    KRuleID: id
  })
}
