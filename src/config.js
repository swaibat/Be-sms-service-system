const axios = require('axios');

const Router = axios.create({
	baseURL: 'https://api.rmlconnect.net',
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
        params: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
	},
});

export default Router;
