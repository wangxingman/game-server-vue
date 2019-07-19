import axios from 'axios';

/**
 * @Author: wx
 * @Date  : 下午 6:57 2019/7/18 0018
 * @params:
 * @Desc  :
 */
const findAllJob = () => {
    return axios.get('/job/findByAll');
};

/**
 * @Author: wx
 * @Date  : 下午 6:57 2019/7/18 0018
 * @params:
 * @Desc  :
 */
const addByJob = (job) => {
    return axios.post('/job/addByJob', job);
};

/**
 * @Author: wx
 * @Date  : 上午 10:17 2019/7/19 0019
 * @params:
 * @Desc  :
 */
const delByJob = (id) => {
    return axios.get(`/job/delByJob?id=${id}`);
};

/**
 * @Author: wx
 * @Date  : 上午 10:28 2019/7/19 0019
 * @params:
 * @Desc  : 修改
 */
const updateByJob = (job) => {
    return axios.post(`/job/updateByJob`, job);
};

/**
 * @Author: wx
 * @Date  : 下午 2:57 2019/7/19 0019
 * @params:
 * @Desc  :
 */
const findBySearchAll = (page,size) => {
    return axios.get(`/job/findBySearchAll?page=${page}&size=${size}`);
}

export default {
    findBySearchAll,
    findAllJob,
    addByJob,
    delByJob,
    updateByJob
}
