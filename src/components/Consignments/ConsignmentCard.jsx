import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConsignmentCard({ consignment, fetchConsignments }) {
  const [showAssignOfficePopup, setShowAssignOfficePopup] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(consignment.isDelivered);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleDeleteConsignment = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this consignment?"
    );
    if (confirmDelete) {
      try {
        const jwtToken = localStorage.getItem("jwt");
        const response = await fetch(
          `http://localhost:8070/admin/api/consignments/delete/${consignment.consignmentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.ok) {
          fetchConsignments();
        } else {
          throw new Error("Failed to delete the consignment");
        }
      } catch (error) {
        console.error("Error deleting consignment:", error);
      }
    }
  };

  const handleCreateAndRedirectToBill = async () => {
    const jwtToken = localStorage.getItem("jwt");

    if (user.role === "ROLE_MANAGER") {
      try {
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

        if (response.ok) {
          navigate(`/bills`);
          fetchConsignments();
        } else {
          throw new Error("Failed to create bill");
        }
      } catch (error) {
        console.error("Error creating bill:", error);
      }
    } else {
      alert("NOT AUTHORIZED TO USE THIS FEATURE");
    }
  };

  const handleAssignOffice = async (e) => {
    e.preventDefault();
    if (user.role === "ROLE_MANAGER") {
      try {
        const jwtToken = localStorage.getItem("jwt");
        await fetch(
          `http://localhost:8070/admin/api/consignments/assign-office/${consignment.consignmentId}/${branchId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setShowAssignOfficePopup(false);
        fetchConsignments();
      } catch (error) {
        console.error("Error assigning office:", error);
      }
    } else {
      alert("NOT AUTHORIZED TO USE THIS FEATURE");
    }
  };

  const toggleDeliveryStatus = async () => {
    if(user.role === "ROLE_MANAGER") {
    const newStatus = !deliveryStatus;
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:8070/admin/api/consignments/update/${consignment.consignmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ isDelivered: newStatus }),
        }
      );

      if (response.ok) {
        setDeliveryStatus(newStatus);
        fetchConsignments();
      } else {
        throw new Error("Failed to update delivery status");
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  }
  else{
  alert("NOT AUTHORIZED");
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

  return (
    <div className="relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-4">
      <button
        onClick={ ()=> { (user.role === 'ROLE_MANAGER') ? handleDeleteConsignment() : alert("NOT AUTHORIZED TO USE THIS FEATURE") }}
        className="absolute top-0 right-0 p-2 text-white bg-red-600 hover:bg-red-700 rounded-bl-lg"
      >
        X
      </button>
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
          Distance: {consignment.distanceBwSenderReceiver}km
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
        <p className="mb-3 flex items-center font-bold text-gray-700 dark:text-gray-400">
          Is Delivered:
          <button
            onClick={toggleDeliveryStatus}
            className={`ml-2 text-sm px-3 py-1 rounded-lg ${
              deliveryStatus
                ? "text-green-700 bg-green-200 hover:bg-green-300"
                : "text-red-700 bg-red-200 hover:bg-red-300"
            }`}
          >
            {deliveryStatus ? "Delivered" : "NOT delivered"}
          </button>
        </p>
        <div className="flex justify-between items-center">
          {!consignment.isBillGenerated && (
            <button
              onClick={handleCreateAndRedirectToBill}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Generate Bill
            </button>
          )}
          {consignment.branchOffice == null && (
            <button
              onClick={() => (user.role === 'ROLE_MANAGER')? setShowAssignOfficePopup(true): alert("NOT AUTHORIZED")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Assign Office
            </button>
          )}
          {consignment.truck == null && (
            <button
              onClick={handleAssignTruck}
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Assign Truck
            </button>
          )}
        </div>
      </div>
      {showAssignOfficePopup && (
        <form onSubmit={handleAssignOffice} className="p-4">
          <input
            type="text"
            placeholder="Enter Branch ID"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="text-black border border-gray-300 rounded-lg p-2"
          />

          <button
            type="submit"
            className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Assign
          </button>
          <button
            onClick={() => setShowAssignOfficePopup(false)}
            className="ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ConsignmentCard;
