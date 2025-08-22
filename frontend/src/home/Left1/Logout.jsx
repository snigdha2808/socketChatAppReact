import axios from "axios";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/user/logout', {
        withCredentials: true
      });
      navigate('/login')
      localStorage.removeItem('chatApp');
      Cookies.remove('jwt');
      toast.success('Logged out successfully');
      setAuthUser(null);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Logout failed');
    } finally {
      setLoading(false);
    }
  }
    return (
      <>
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-700">Logging out...</p>
            </div>
          </div>
        )}
        <div className='w-[4%] bg-slate-900 text-white flex flex-col justify-end'>
          Logout
          <div className="p-3 align-bottom"></div>
          <button onClick={handleLogout} disabled={loading}>
            <TbLogout2 className="text-5xl p-2 hover:bg-gray-600 rounded-lg" />
          </button>
        </div>
      </>
    )
  }
  