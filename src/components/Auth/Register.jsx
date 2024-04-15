import React, { useState } from "react";
import AuthService from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [empName, setempName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const user = useSelector(state => state.user.user)

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(user.role === 'ROLE_MANAGER'){
    try {
      const userData = { empName, email, password, userRole };
      const response = await AuthService.signUp(userData);
      console.log("Registration successful:", response);

      //NAVIGATE TO LOGIN PAGE ON SUCCESSFUL REGISTRATION
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }

    console.log("Username:", empName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", userRole);
    }
    else{
      alert("NOT AUTHORIZED");
    }
  
  

  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-blue-600 shadow-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="space-y-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={empName}
                  onChange={(e) => setempName(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a role</option>
                  <option value="ROLE_MANAGER">ROLE_MANAGER</option>
                  <option value="ROLE_ITSTAFF">ROLE_ITSTAFF</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={()=>(user.role === 'ROLE_ITSTAFF') && navigate('/error')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
