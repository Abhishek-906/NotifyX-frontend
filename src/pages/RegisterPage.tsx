import { useState } from "react";
import { registerUser } from '../services/auth.api'
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom'

function RegisterPage() {

  const [formData, setFormData] = useState({
    fullName: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(formData);
    console.log("formData", formData);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center" >Register Page</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2 font-medium" >Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          <label className="block mb-2 font-medium"  >Email</label>
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
          Register
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;