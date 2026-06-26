import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface createUserData {
      fullName: string,
      email: string,
      password: string
}

export const getChildCount =()=>{
    const token = localStorage.getItem('token');


    const res = axios.get(`${BASE_URL}/user/countChild`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } );
    
    return res ;
}

export const createUser =(data :createUserData)=>{
    const token = localStorage.getItem('token');

    const res = axios.post(`${BASE_URL}/user/createUser`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } );
    return res ;
}