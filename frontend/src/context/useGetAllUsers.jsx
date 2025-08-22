import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/user/getUserProfile', {
                    withCredentials: true
                });
                console.log(response.data.filteredUsers,'response');
                setAllUsers(response.data.filteredUsers);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            } 
        };
        fetchAllUsers();
    }, []);

    return [allUsers, loading, error];
}
