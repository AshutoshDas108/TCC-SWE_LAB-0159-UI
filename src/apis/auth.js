const API_URL = "http://localhost:8070/auth";

// fetchWrapper.js

// function authHeader() {
//   // Retrieve the JWT token from local storage
//   const token = localStorage.getItem('token');
//   // Return the Authorization header with the JWT token
//   return token ? { Authorization: `Bearer ${token}` } : {};
//  }

//  async function fetchWrapper(url, options = {}) {

//   // Merge the provided options with the default options
//   const requestOptions = {
//      ...options,
//      headers: {
//        ...options.headers,
//        ...authHeader(),
//      },
//   };

//   try {
//      const response = await fetch(url, requestOptions);
//      if (!response.ok) {
//        // Handle non-2xx responses
//        throw new Error('Network response was not ok');
//      }
//      return await response.json();
//    } catch (error) {
//      console.error('There was a problem with your fetch operation:', error);
//      throw error;
//    }
//  }

const AuthService = {
  signUp: async (userData) => {

    try {

      const response = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization" : `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error signing up: ${JSON.stringify(errorData)}`);
      }
      // return response.json();
      const data = await response.json();
      console.log(data);
      // Save the JWT token to local storage or a cookie
      // if(data.token != null){
      // localStorage.setItem("token", data.token);
      // }
      if(data.jwt != null){
        localStorage.setItem("jwt", data.jwt);
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  },

  //  logIn: async (userData) => {
  //   try {
  //     const response = await fetchWrapper(`${API_URL}/sign-in`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     // Handle the response as needed
  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //     throw error;
  //   }
  // },

  logIn: async (userData) => {
    
    try {

      // const jwtToken = localStorage.getItem("jwt");

      const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  "Authorization" : `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error logging in: ${JSON.stringify(errorData)}`);
      }
      const data = await response.json();
      console.log(data);
      // Save the JWT token to local storage or a cookie

      if(data.jwt != null) {
      localStorage.setItem("jwt", data.jwt);
      }
      return data;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  },
};

export default AuthService;
