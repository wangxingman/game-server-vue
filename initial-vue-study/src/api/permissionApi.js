import axios from "axios";

/**
 *  @Author  : wx
 *  @Desc    :
 *  @Date    :  下午 4:48 2019/9/3 0003
 *  @explain :  全部菜单
 */
const findAllPermission = () => {
    return axios.get('/permission/findByAll');
};

export default {
    findAllPermission
}
