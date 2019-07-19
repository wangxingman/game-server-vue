import axios from 'axios';
const findAllDept= () => {
    return axios.get('/dept/findByAll');
};

export default {
    findAllDept,
}
