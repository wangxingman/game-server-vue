import axios from 'axios';

const initData = (url, params) => {
    return axios.get(url, params);
};

export default {
    initData,
}