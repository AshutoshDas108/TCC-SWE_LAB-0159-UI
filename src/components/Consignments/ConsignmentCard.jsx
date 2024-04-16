import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConsignmentCard({ consignment, fetchConsignments }) {
  const [showAssignOfficePopup, setShowAssignOfficePopup] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(consignment.isDelivered);
  //const [generateBill, setGenerateBill] = useState(true)

  const navigate = useNavigate();
  // console.log(consignment.isDelivered)
  // console.log(consignment.consignmentId)
  // const [formData, setFormData] = useState({
  //   isDelivered : false,
  // })

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleCreateAndRedirectToBill = async () => {
    const jwtToken = localStorage.getItem("jwt");

    if (user.role === "ROLE_MANAGER") {
      try {
        // Call to create a new bill
        const response = await fetch(
          `http://localhost:8070/admin/api/consignments/cost/${consignment.consignmentId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create bill");
        }

        // Optionally fetch new data or update local state
        fetchConsignments();
        //setGenerateBill(false);

        // Redirect to the bill generation page
        navigate(`/bills`);
      } catch (error) {
        console.error("Error creating bill:", error);
      }
    } else {
      //navigate("/error");
    alert("NOT AUTHORIZED TO USE THIS FEATURE"); 
    }
  };

  const handleAssignOffice = async (e) => {
    e.preventDefault();
    // Call API to assign office here
    if (user.role === "ROLE_MANAGER") {
      try {
        const jwtToken = localStorage.getItem("jwt");
        // Send new consignment data to the backend
        await fetch(
          `http://localhost:8070/admin/api/consignments/assign-office/${
            consignment.consignmentId ? consignment.consignmentId : null
          }/${branchId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            //body: JSON.stringify(formData),
          }
        );

        setShowAssignOfficePopup(false);
        fetchConsignments();
      } catch (error) {
        console.error("Error adding consignment:", error);
      }
    } else {
     // navigate("/error");
     alert("NOT AUTHORIZED TO USE THIS FEATURE"); 
    }
  };

  const handleAssignTruck = async (e) => {
    e.preventDefault();
    // Call API to assign office here
    if (user.role === "ROLE_MANAGER") {
      try {
        const jwtToken = localStorage.getItem("jwt");
        // Send new consignment data to the backend
        await fetch(
          `http://localhost:8070/admin/api/consignments/assign-truck/${consignment.consignmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            //body: JSON.stringify(formData),
          }
        );

        setShowAssignOfficePopup(false);
        fetchConsignments();
      } catch (error) {
        console.error("Error adding consignment:", error);
      }
    } else {
     // navigate("/error");
     alert("NOT AUTHORIZED TO USE THIS FEATURE"); 
    }
  };

  const handleDeliveryStatus = async (e) => {
    e.preventDefault();
    if (user.role === "ROLE_MANAGER") {
      try {
        const jwtToken = localStorage.getItem("jwt");
        // Calling API to update the delivery status
        console.log(consignment.consignmentId);
        const response = await fetch(
          `http://localhost:8070/admin/api/consignments/update/${consignment.consignmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          // Assuming the API returns the updated consignment data
          // This step may vary depending on how your backend is implemented
          const updatedConsignment = await response.json();

          //toggle the delivery status
          setDeliveryStatus(updatedConsignment.isDelivered);

          // Update the local state or trigger a re-fetch here sice we are keeping a list of consignments we nneed this step
          fetchConsignments();

          return updatedConsignment;
        } else {
          throw new Error("Failed to update delivery status");
        }
      } catch (error) {
        console.error("Error updating delivery status:", error);
      }
    } else {
      //navigate("/error");
      alert("NOT AUTHORIZED TO USE THIS FEATURE"); 
    }
  };

  return (
    <>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-4">
        {/* Existing card content */}
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-4">
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {consignment.senderName}
            </h5>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Sender Address: {consignment.senderAddress}
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {consignment.receiverName}
            </h5>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Receiver Address: {consignment.receiverAddress}
            </p>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Distance: {consignment.distanceBwSenderReceiver} km
            </p>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Volume: {consignment.volume} cubic meters
            </p>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Assigned Truck ID:{" "}
              {consignment.truck == null ? "N/A" : consignment.truck.truckId}
            </p>
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Assigned Office ID:{" "}
              {consignment.branchOffice == null
                ? "N/A"
                : consignment.branchOffice.branchId}
            </p>

            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Delivery Status:{" "}
              {deliveryStatus == true ? (
                <button
                  onClick={handleDeliveryStatus}
                  className="text-green-600 font-bold"
                >
                  Deliverd
                </button>
              ) : (
                <button
                  onClick={handleDeliveryStatus}
                  className="text-red-600 font-bold"
                >
                  Not Deliverd
                </button>
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          {consignment.truck == null && (
            <button
              onClick={handleAssignTruck}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Assign Truck
            </button>
          )}

          {consignment.branchOffice == null && (
            <>
              <button
                onClick={() => {
                  user.role === "ROLE_MANAGER"
                    ? setShowAssignOfficePopup(true)
                    : alert("NOT AUTHORIZED TO USE THIS FEATURE");
                }}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Assign Office
              </button>

              {showAssignOfficePopup && (
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                  id="my-modal"
                >
                  <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <h3 className="text-lg font-bold text-gray-900">
                      Assign Office
                    </h3>
                    <input
                      type="text"
                      placeholder="Branch ID"
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="mt-2 mb-4 p-2 w-full border rounded"
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowAssignOfficePopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAssignOffice}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {!consignment.isBillGenerated && (
            <button
              onClick={handleCreateAndRedirectToBill}
              className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Generate Bill
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ConsignmentCard;

/*


  <div className="max-w-sm bg-gradient-to-r from-white to-blue-200 shadow-xl  rounded-lg border border-gray-300 p-5 m-4 hover:shadow-xl transition-shadow duration-300">
      <div>
        <h5 className="text-2xl font-bold text-gray-900 mb-2">
          {consignment.senderName}
          <FaMapMarkerAlt className="inline-block ml-2" />
        </h5>
        <p className="text-gray-600 flex items-center">
          <FaBuilding className="mr-2" /> {consignment.senderAddress}
        </p>
        <p className="text-gray-600 flex items-center mt-2">
          <FaTruck className="mr-2" /> {consignment.receiverName}
        </p>
        <p className="text-gray-600 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {consignment.receiverAddress}
        </p>
        <p className="text-gray-600 flex items-center mt-2">
          <BiCube className="mr-2" /> {consignment.distanceBwSenderReceiver} km
        </p>
        <p className="text-gray-600 flex items-center">
          <MdOutlineLocalShipping className="mr-2" /> Volume: {consignment.volume} m³
        </p>
        <p className="text-gray-600 flex items-center">
          <MdOutlineBusinessCenter className="mr-2" /> Truck ID: {consignment.truck ? consignment.truck.truckId : "N/A"}
        </p>
        <p className="text-gray-600 flex items-center">
          <FaBuilding className="mr-2" /> Office ID: {consignment.branchOffice ? consignment.branchOffice.branchId : "N/A"}
        </p>
        <p className="flex items-center mt-4">
          Delivery Status: 
          {deliveryStatus ? (
            <IoIosCheckmarkCircleOutline className="ml-2 text-green-500" size="1.5em" />
          ) : (
            <IoIosCloseCircleOutline className="ml-2 text-red-500" size="1.5em" />
          )}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleDeliveryStatus}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Update Status
        </button>
       {consignment.branchOffice == null && <button
          onClick={() => setShowAssignOfficePopup(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Assign Office
        </button> }
      </div>
    </div>


*/
