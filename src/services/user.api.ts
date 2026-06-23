import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');

export const getChildCount =(role: string)=>{
    const res = axios.get(`${BASE_URL}/user/countChild/${role}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } );
    
    return res ;
}