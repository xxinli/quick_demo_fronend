import fetch from 'node-fetch';

const preFix = 'http://localhost:3001/api/';
export const request = async (path) => {
    return fetch(preFix + path, {
        method: 'get'
    }).then(res => res.json());
};