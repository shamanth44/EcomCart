// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/user/get-user`, { withCredentials: true });
//         setIsAuthenticated(response.data.authenticated);
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally{
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   return { isAuthenticated, loading};
// };

// export default useAuth;
