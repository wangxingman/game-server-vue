import axios from 'axios';

/**
 * 登录方法
 * @param loginName 用户名
 * @param password 密码
 * @returns {AxiosPromise}
 */
// const login = (loginName,password) => {
//   return axios.post('/login', {loginName:loginName, password:password});
// };
// const login = (loginName, password) => {
//   return axios.post('/gateway/login', {loginName, password});
// };
const login = (username,password) => {
  window.console.log(username+"-------"+password);
  return axios.get(`/user/fastLogin?username=${username}&password=${password}`);
};

/**
 * 获取所有菜单
 * @returns {AxiosPromise}
 */
// const menus = () => {
//   return axios.get('/menus');
// };

/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
// const userInfo = () => {
//   return axios.get('/gateway/userInfo');
// };

/**
 * 登出
 * @returns {AxiosPromise}
 */
const logout = () => {
  return axios.get('/loginOut');
};


export default {
  login,
  logout,
}
