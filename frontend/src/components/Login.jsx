import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    mode: "onSubmit" // This shows validation errors only on submit
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5002/api/user/login', data);
      if (response.data) {
        console.log(response, 'res');
        localStorage.setItem("chatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
        toast.success("Login successful!");
        navigate('/chat');
        setAuthUser(response.data);
      }
    } catch (error) {
      console.log(error, 'err');
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1877f2]">
          EchoFlow Chat
        </h2>
        <h2 className="mt-6 text-center text-xl text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1877f2] focus:border-[#1877f2] sm:text-sm"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password", { 
                    required: "Password is required"
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1877f2] focus:border-[#1877f2] sm:text-sm"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1877f2] hover:bg-[#166fe5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877f2]"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don&apos;t have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#42b72a] hover:bg-[#36a420] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#42b72a]"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
