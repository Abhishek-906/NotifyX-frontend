import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface CreateUserData {
  fullName: string,
  email: string,
  password: string,
  parentId?: string
}

interface GetChildrenData {
  parentId?: string;
  limit?: number;
  page?: number;
  q?: string;
  status?: string;
}

export const getChildCount = async() => {
  const token = localStorage.getItem('token');

  const res = await axios.get(`${BASE_URL}/user/countChild`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data.data ;
}

export const createUser = async(data: CreateUserData) => {
  const token = localStorage.getItem('token');

  const res = await axios.post(`${BASE_URL}/user/createUser`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res;
}

export const blockUser = async(userId: string) => {
  const token = localStorage.getItem('token');

  const res = await axios.get(`${BASE_URL}/user/blockUser/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res;
}

export const getChildren = async(data: GetChildrenData) => {
  const token = localStorage.getItem("token");

  const params: any = {};

  if (data.parentId) params.parentId = data.parentId;
  if (data.limit) params.limit = data.limit;
  if (data.page) params.page = data.page;
  if (data.q) params.q = data.q;
  if (data.status) params.status = data.status;

  return await axios.get(`${BASE_URL}/user/getChildren`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

