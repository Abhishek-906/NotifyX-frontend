import { useState } from "react";
import { loginUser } from '../services/auth.api'
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import {connectSocket} from "../services/socket.ts"

function LoginPage() {
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
  
    e.preventDefault();
  
    try {
      const result = await loginUser(formData);

      if(result){
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        connectSocket(result.data.token);
       //   connectSocket(result.data.user._id);
        toast.success("Login successfull");
        navigation('/dashboard');  
      }

   } catch(err){
    if(axios.isAxiosError(err)){
      toast.error( err.response?.data.message)
      console.log(
         err.response?.data.message
      );
   }
   }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center" >Login Page</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2 font-medium"  >Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className=" mb-4 relative">
          <label className="block mb-2 font-medium"  >Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}            
            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/3.9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" type="submit">
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Don't  have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;