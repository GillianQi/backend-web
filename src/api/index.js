import { httpGet, httpPost, httpPostJSON } from '../utils/request';

export const loginApi = data => httpPost('/user/login', data)
export const getCompanyList = data => httpPostJSON('/companyInfo/getCompanyList', data) // 获取公司列表
export const handleAuthApi = data => httpPost('/companyInfo/authCompany', data) // 认证同意或拒绝
export const rechargeApplyListApi = data => httpGet('/companyInfo/getCompanyAccountApplyList', data) // 充值申请列表
export const rechargeHistoryListApi = data => httpPostJSON('/companyInfo/getCompanyRecorder', data) // 公司充值记录
export const getWorkerListApi = data => httpGet('/worker/page', data) // 工人列表
export const getProjectListApi = data => httpGet('/companyInfo/getCompanyWoekList', data) // 公司下施工队列表
export const assignWorkersApi = data => httpPost('/companyInfo/staffAssignment', data) // 给项目分配员工-包括单个和批量分配
export const removeWorkerdApi = data => httpPost('/companyInfo/unstaffAssignment', data) // 从项目踢出员工-包括单个和批量踢出
export const getSalaryListApi = data => httpPostJSON('/salaryInfo/getUndelSalaryList', data) // 获取工资单列表
