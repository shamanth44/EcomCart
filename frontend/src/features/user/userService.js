import axios from 'axios'
import baseURL from '../../config';

axios.defaults.withCredentials = true
const register = async(userData)=>{
    try {
        const response = await axios.post(`${baseURL}/api/user/register`, userData);
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}

const login = async(userData)=>{
    try {
        const response = await axios.post(`${baseURL}/api/user/login`, userData);
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


const logout = async()=>{
    try {
        const response = await axios.post(`${baseURL}/api/user/logout`);
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


const getUser = async()=>{
    try {
        const response = await axios.get(`${baseURL}/api/user/get-user`);
        if(response.data){
            return {response: response.data, success: true}
        }
    } catch (error) {
        return {response: error.response.data, success: false}
    }
}


export const authService = {
    register,
    login,
    getUser,
    logout
}