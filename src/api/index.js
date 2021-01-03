import { httpGet, httpPost } from '../utils/request';

// export const fetchData = query => {
//   return request({
//     url: './table.json',
//     method: 'get',
//     params: query
//   });
// };
export const test = data => httpGet('', data)
export const loginApi = data => httpPost('/user/login', data)
export const getCompanyList = data => httpPost('/companyInfo/getCompanyList', data)
export const getList1 = data => httpPost('/', data)
