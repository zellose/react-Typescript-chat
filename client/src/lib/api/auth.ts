import axios from 'axios';

interface ILocal {
	email: string;
	display_name?: string;
	password: string;
}

export const checkEmailExists = (email: string): Promise<any> => {
	return axios.get(`/api/auth/exists/email/${email}`);
};

export const checkUserExists = (username: string): Promise<any> => {
	return axios.get(`/api/auth/exists/username/${username}`);
};

export const localRegister = ({ email, display_name, password }: ILocal): Promise<any> => {
	return axios.post('/api/auth/register/local', { email, display_name, password });
};

export const localLogin = ({ email, password }: ILocal): Promise<any> => {
	return axios.post('/api/auth/login/local', { email, password });
};

export const checkStatus = (): Promise<any> => {
	return axios.get(`/api/auth/check`);
};

export const logout = (): Promise<any> => {
	return axios.post(`/api/auth/logout`);
};