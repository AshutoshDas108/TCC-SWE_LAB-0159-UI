// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }
//   }, []);

//   const login = (user) => {
//     localStorage.setItem('user', JSON.stringify(user));
//     setCurrentUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
