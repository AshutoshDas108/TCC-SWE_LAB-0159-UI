import React, { useEffect, useState } from "react";
import ConsignmentCard from "./ConsignmentCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Consignments() {
  const [consignments, setConsignments] = useState([]);

  //handles addition of new consignment
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    senderAddress: "",
    senderName: "",
    receiverAddress: "",
    receiverName: "",
    distanceBwSenderReceiver: "",
    volume: "",
  });


  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate()
  
  useEffect(() => {
    fetchConsignments();
  }, []);

  const fetchConsignments = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      if (jwtToken == null) {
        alert("PLEASE SIGN IN");
      }
      const response = await fetch("http://localhost:8070/api/consignments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setConsignments(data);
    } catch (error) {
      console.error("Error fetching trucks:", error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem("jwt");
      // Send new consignment data to the backend
      await fetch("http://localhost:8070/admin/api/consignments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      // Refresh the consignments list
      fetchConsignments();

      // Reset the form data and hide the form
      setFormData({
        senderAddress: "",
        senderName: "",
        receiverAddress: "",
        receiverName: "",
        distanceBwSenderReceiver: "",
        volume: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding consignment:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center bg-slate-700 p-4 font-bold text-white">
        List Of Consignments
      </h2>
      <div className="flex flex-wrap justify-center bg-gradient-to-r from-white to-blue-600 shadow-xl">
        {consignments.map((consignment, index) => (
          <ConsignmentCard
            key={index}
            consignment={consignment}
            fetchConsignments={fetchConsignments}
          />
        ))}
      </div>

      <div className="text-center ">
        {/* Add new office button */}
        <button
          onClick={() => (user.role === 'ROLE_MANAGER')?setShowForm(true):navigate('/error')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add New Consignment
        </button>
      </div>

      {showForm && 
      (
        <div className="mt-4 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Add other input fields*/}
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="senderName"
                >
                  Sender Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="senderName"
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="receiverName"
                >
                  Receiver Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="receiverName"
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="senderAddress"
                >
                  Sender Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="senderAddress"
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="receiverAddress"
                >
                  Receiver Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="receiverAddress"
                  type="text"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="distanceBwSenderReceiver"
                >
                  Distance between Sender and Receiver
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="distanceBwSenderReceiver"
                  type="text"
                  name="distanceBwSenderReceiver"
                  value={formData.distanceBwSenderReceiver}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="volume"
                >
                  Consignment Volume
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="volume"
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowForm(false)} // Assuming setShowForm changes the state to hide the form
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )
     }
    </div>
  );
}

export default Consignments;
