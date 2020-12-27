import axios from 'axios';

export default class ApiService {
    async getMessage() {
        return axios.get('/api/message');
    }
}