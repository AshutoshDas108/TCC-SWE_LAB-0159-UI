import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Offices = () => {
  const [branchOffices, setBranchOffices] = useState([]);

  //handles addition of new office
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    branchId: "",
    isHeadOffice: false,
    loc: "",
  });

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //function to handle action when we press save :

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem("jwt");
      if(jwtToken == null) {
        alert('PLEASE SIGN IN')
     }
      // Send new office data to the backend
      await fetch("http://localhost:8070/admin/api/office/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      // Refresh the branch offices list
      fetchBranchOffices();

      // Reset the form data and hide the form
      setFormData({
        branchId: "",
        isHeadOffice: false,
        loc: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding branch office:", error);
    }
  };

  const fetchBranchOffices = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8070/api/offices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setBranchOffices(data);
    } catch (error) {
      console.error("Error fetching branch offices:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.name === 'isHeadOffice' ? e.target.value === 'true' : e.target.value;
    setFormData({
       ...formData,
       [e.target.name]: value
    });
   };
   

  useEffect(() => {
    fetchBranchOffices();
  }, []);

  return (
    <>
    <h2 className='text-3xl text-center bg-slate-700 p-4 font-bold text-white'>List Of Branch Offices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branchOffices.map((branch) => (
          <div
            key={branch.branchId}
            className="bg-gradient-to-r from-white to-blue-300 shadow-xl rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
              <Link className="hover:text-red-600" to={(user.role === 'ROLE_MANAGER') ? `/offices/${branch.branchId}` : `/offices`}>{branch.loc}</Link>
              </div>
              <p className="text-gray-700">Branch ID: {branch.branchId}</p>
              <p className="text-gray-700">
                Head Office: {branch.isHeadOffice ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        {/* Add new office button */}
        <button
          onClick={() => (user.role === 'ROLE_MANAGER')?setShowForm(true):alert("NOT AUTHORIZED")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add New Office
        </button>
      </div>

      {/* New office form popup */}
      {showForm && 
      (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  {/* Form fields */}
                
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="loc"
                    >
                      Location
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="loc"
                      type="text"
                      placeholder="Location"
                      name="loc"
                      value={formData.loc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="isHeadOffice"
                    >
                      Head Office
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="isHeadOffice"
                      name="isHeadOffice"
                      value={formData.isHeadOffice}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offices;
