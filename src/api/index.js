import { httpGet, httpPost, httpPostJSON, httpUpload } from '../utils/request';

export const loginApi = data => httpPost('/user/login', data)
export const getCompanyList = data => httpPostJSON('/companyInfo/getCompanyList', data) // 获取公司列表
export const handleAuthApi = data => httpPost('/companyInfo/authCompany', data) // 认证同意或拒绝
export const rechargeApplyListApi = data => httpGet('/companyInfo/getCompanyAccountApplyList', data) // 充值申请列表
export const handleApplyOptionApi = data => httpPost('/companyInfo/optionApply', data) // 公司充值记录申请操作
export const rechargeHistoryListApi = data => httpPostJSON('/companyInfo/getCompanyRecorder', data) // 公司充值记录
export const getWorkerListApi = data => httpGet('/worker/page', data) // 工人列表
export const getWorkerClockinApi = data => httpPostJSON('/worker/sign/page', data) // 工人打卡列表
export const importWorkersSignApi = data => httpUpload('/worker/sign/upload', data) // 导入工人打卡记录
export const getWorkerEmptyApi = data => httpGet('/worker/listNotWorkWoker', data) // 未在职工人列表
export const getProjectListApi = data => httpGet('/companyInfo/getCompanyWoekList', data) // 公司下施工队列表
export const getWorkersByProjectApi = data => httpPostJSON('/companyInfo/getFinishCompanyWoekDetail', data) // 公司下施工队列表
export const assignWorkersApi = data => httpPost('/companyInfo/staffAssignment', data) // 给项目分配员工-包括单个和批量分配
export const removeWorkerdApi = data => httpPost('/companyInfo/unstaffAssignment', data) // 从项目踢出员工-包括单个和批量踢出
export const getSalaryListApi = data => httpPostJSON('/salaryInfo/getUndelSalaryList', data) // 获取工资单列表
export const getSalaryDetailApi = data => httpPostJSON('/salaryInfo/getUndelSalaryListDetail', data) // 获取薪酬请求下的员工薪酬详情
export const updateSalaryDetailApi = data => httpPostJSON('/salaryInfo/editPerson', data) // 编辑员工薪资详情
export const importWorkersSalaryApi = data => httpUpload('/salaryInfo/batchInsertSalary', data) // 员工薪酬批量导入
export const submitWorkersSalaryApi = data => httpPost('/salaryInfo/submitSalaryDel', data)  // 提交薪资记录
export const getInvoiceListApi = data => httpPostJSON('/invoiceMainPO/getMainListByType', data)  // 获取发票列表
export const getInvoiceDetailApi = data => httpGet('/invoiceMainPO/getInvoiceDetailById', data)  // 获取发票详情
export const getInvoiceTemplateApi = data => httpGet('/invoiceMainPO/getInvoiceDetailBytmp', data)  // 获取发票模板
export const finishInvoiceApproveApi = data => httpPost('/invoiceMainPO/submit', data)  // 提交
export const updateRateApi = data => httpPost('/companyInfo/updateRate', data)  // 修改公司税率

