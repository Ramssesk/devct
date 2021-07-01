import axios from 'axios';

const cx = axios.create({
    baseURL : "http://192.168.5.59:4000"
});

export default cx;