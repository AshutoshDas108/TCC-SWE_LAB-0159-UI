const API_URL = "http://localhost:8070/auth";



const AuthService = {
  signUp: async (userData) => {

    try {

      const jwtToken = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/admin/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwtToken}`,
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
      if(data.jwt != null){
        localStorage.setItem("jwt", data.jwt);
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  },



  logIn: async (userData) => {
    
    try {

      // const jwtToken = localStorage.getItem("jwt");

      const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  "Authorization" : `Bearer ${jwtToken}`, NO AUTHORIZATION NEEDED TO LOG IN
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error logging in: ${JSON.stringify(errorData)}`);
      }
      const data = await response.json();
      console.log(data);
     

      //SAVE TO LOCAL STORAGE
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
