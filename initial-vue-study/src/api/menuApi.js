import axios from 'axios';
/**
 * 查询登陆权限
 * @returns {AxiosPromise}
 */
const findMenuByUser = () => {
  return axios.get('/menus');
};

/**
 * 获取所有菜单
 * @returns {AxiosPromise}
 */
const findAllMenu = () => {
  return axios.get('/menu/findByAll');
  // return axios.get('/userRole/findAll');
};

/**
 * 根据Id查询菜单
 * @param id 菜单id
 * @returns {AxiosPromise}
 */
// const findById = (id) => {
//   return axios.get(`/auth/menu/findById?id=${id}`);
// };

/**
 * 增加菜单
 * @param menu 菜单
 * {
    menuName:'菜单名字',
	menuPath:'链接',
	parentId:'父级菜单id'
	menuIcon:'',
	order:'排序'
  }
 */
const addMenu = (menu) => {
  return axios.post('/menu/add', menu);
};

/**
 * 修改菜单
 * @param menu 菜单
 * {
    id:'必须',
    menuName:'菜单名字',
	menuPath:'链接',
	parentId:'父级菜单id'
	menuIcon:'',
	order:'排序'
  }
 * @returns {AxiosPromise}
 */
const updateMenu = (menu) => {
  return axios.post('/menu/edit', menu);
};

/**
 * 删除菜单
 * @param id 菜单ID
 * @returns {AxiosPromise}
 */
// const deleteById = (id) => {
//   return axios.get(`/auth/menu/deleteById?id=${id}`);
// };

export default {
  findAllMenu,
  addMenu,
  updateMenu,
  findMenuByUser,
}
