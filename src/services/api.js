import axios from 'axios';

export const login = (username) => {

    return new Promise((resolve, reject) => {
        axios.post('/login', { username })
            .then(resolve, reject);
    });

}

