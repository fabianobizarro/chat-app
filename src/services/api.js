import axios from 'axios';

export function login(username) {

    return new Promise((resolve, reject) => {
        axios.post('/login', { username })
            .then(resolve, reject);
    });

}


export function fetchUsers() {
    return new Promise((resolve, reject) => {
        axios.get('/users')
            .then(result => {
                resolve(result.data);
            }, reject);
    });
}
