// 文件: src/utils/recruitService.js

import axios from '../axios';

const RECRUIT_API = '/api/recruit';
const ADMIN_API = '/api/admin';

export const getRecruitDeadline = () => {
    return axios.get(`${RECRUIT_API}/getDeadline`);
};

export const setRecruitDeadline = (deadlineDate) => {
    return axios.post(`${ADMIN_API}/setRecruitDeadline`, {
        deadline: deadlineDate
    });
};