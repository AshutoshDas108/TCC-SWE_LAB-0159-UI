import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Trucks = () => {
 const [trucks, setTrucks] = useState([]);

  //handles addition of new trucks
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    capacity : ""
  });

 useEffect(() => {
    fetchTrucks();
 }, []);

 const fetchTrucks = async () => {
  try {
    const jwtToken = localStorage.getItem("jwt")
    if(jwtToken == null) {
      alert('PLEASE SIGN IN')
   }
    const response = await fetch('http://localhost:8070/api/trucks' , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setTrucks(data);
  } catch (error) {
    console.error('Error fetching trucks:', error);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const jwtToken = localStorage.getItem("jwt");
    // Send new office data to the backend
    await fetch("http://localhost:8070/admin/api/truck/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(formData),
    });

    // Refresh the trucks list
    fetchTrucks()

    // Reset the form data and hide the form
    setFormData({
     capacity:""
    });
    setShowForm(false);
  } catch (error) {
    console.error("Error adding truck:", error);
  }
};

const handleInputChange = (e) => {
  setFormData({
     ...formData,
     [e.target.name]: e.target.value,
  });
 };
 

 return (
  <>
  <h2 className='text-3xl text-center bg-slate-700 p-4 font-bold text-white'>List Of Trucks</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
      {trucks.map(truck => (
        <div key={truck.truckId} className="hover:text-red-600 bg-gradient-to-r from-white to-blue-200 shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4">
          <Link to={`/trucks/${truck.truckId}`}>
            <div className="font-bold text-xl mb-2">Truck ID: {truck.truckId}</div>
          </Link>
            <p className="text-gray-700">Capacity: {truck.capacity} Cubic Metres</p>
          </div>
        </div>
      ))}
    </div>


    <div className="text-center">
        {/* Add new office button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add New Truck
        </button>
      </div>


      {/* New office form popup */}
      {showForm && (
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
                      htmlFor="capacity"
                    >
                     Capacity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="capacity"
                      type="text"
                      placeholder="Capacity"
                      name="capacity"
                      value={formData.capacity}
                     onChange={handleInputChange}
                      required
                    />
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

export default Trucks;
