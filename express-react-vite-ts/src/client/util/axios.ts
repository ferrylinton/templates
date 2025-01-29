import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: '/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 15000,
	timeoutErrorMessage: 'Request time out',
});
