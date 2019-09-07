import axios from "axios";

/**
 *  @Author  : wx
 *  @Desc    :
 *  @Date    :  下午 4:39 2019/9/3 0003
 *  @explain :
 */
const findBySearchAll = (page, size) => {
    return axios.get(`/role/findByAllSearch?page=${page}&size=${size}`);
}

/**
 * @Author: wx
 * @Date  : 下午 6:57 2019/7/18 0018
 * @params:
 * @Desc  :
 */
const addByrole = (role) => {
    return axios.post('/role/addByRole', role);
};

/**
 * @Author: wx
 * @Date  : 上午 10:17 2019/7/19 0019
 * @params:
 * @Desc  :
 */
const delByrole = (id) => {
    return axios.get(`/role/deleteByRole?id=${id}`);
};

/**
 * @Author: wx
 * @Date  : 上午 10:28 2019/7/19 0019
 * @params:
 * @Desc  : 修改
 */
const updateByrole = (role) => {
    return axios.post(`/role/updateByRole`, role);
};

/**
 *@Date    :  2019/9/6 0006
 *@Author  :  wx
 *@explain :
 */
const findByAll = (page, size) => {
    return axios.get(`/role/findByAll?page=${page}&size=${size}`);
}

/**
*@Date    :  2019/9/7 0007
*@Author  :  wx
*@explain :  修改权限
*/
const updateByRolePermission = (role) => {
    return axios.post(`/role/updateByRole/permission`, role);
};

/**
*@Date    :  2019/9/7 0007
*@Author  :  wx
*@explain : 修改菜单
*/
const updateByRoleMenu = (role) => {
    return axios.post(`/role/updateByRoleMenu`, role);
};

/**
*@Date    :  2019/9/7 0007
*@Author  :  wx
*@explain :  查询一个角色
*/
const findByOne = (id) => {
    return axios.get(`/role/findByOne?id=${id}`);
};

export default {
    findBySearchAll,
    addByrole,
    delByrole,
    updateByrole,
    findByAll,
    updateByRoleMenu,
    updateByRolePermission,
    findByOne
}
