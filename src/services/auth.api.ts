import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type RegisterData = {
    fullName: string;
    email: string;
    password: string;
  };

type LoginData = {
    email: string;
    password: string;
  };

export const  registerUser = async (data: RegisterData )=>{
     const response = await axios.post(`${BASE_URL}/auth/register`, data );
     return response.data;
}

export const  loginUser = async (data: LoginData )=>{
     const response = await axios.post(`${BASE_URL}/auth/login`, data );
     return response.data;
}