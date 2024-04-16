import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  console.log(id)
  console.log(typeof id);

  const user = useSelector(state => state.user.user)

  const [isAssigning, setIsAssigning] = useState(false);
 

  const navigate = useNavigate()

  const handleAssignClick = () => {
    (user.role === 'ROLE_MANAGER')?setIsAssigning(true):navigate('/error');
  };

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:8070/api/employees/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSave = async () => {

    if (!id) {
      alert("Please enter a valid office ID.");
      return;
    }

    try {
      const jwtToken = localStorage.getItem("jwt");
      console.log(jwtToken);
      const response = await fetch(
        `http://localhost:8070/admin/api/assign-office/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          // body: JSON.stringify({ officeId: newOfficeId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign new office ID");
      }

      setIsAssigning(false);
      alert("Office ID assigned successfully!");
      fetchData()
    } catch (error) {
      alert("Error assigning office ID: " + error.message);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-50 to-blue-600 shadow-xl ">
        <div className="max-w-md w-full bg-gradient-to-r from-blue-50 to-blue-600 shadow-xl rounded-lg overflow-hidden mt-3 mb-3">
          <h1 className="text-center text-2xl bg-slate-700 text-white py-4">
            Employee Details
          </h1>
          <div className="bg-gradient-to-r from-white to-blue-200 items-center shadow-md rounded-lg p-4">
            <div className="font-bold text-2xl mb-2 text-red-600 text-center">
              {employee.empName}
            </div>
            <div className="text-gray-700 text-center">
              <p>
                <span className="text-lg font-bold">Email:</span>{" "}
                {employee.email}
              </p>
              <p>
                <span className="text-lg font-bold">User Role:</span>{" "}
                {employee.userRole}
              </p>
              <p>
                <span className="text-lg font-bold">Branch Office ID:</span>{" "}
                {employee.branchOfficeId == null
                  ? "N/A"
                  : employee.branchOfficeId}
              </p>
              <p>
                <span className="text-lg font-bold">Date Of Joining:</span>{" "}
                {new Date(employee.dateOfJoining).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* Display other details as needed */}
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-white to-blue-600">
        {employee.branchOfficeId === null && !isAssigning && (
          <button
            onClick={handleAssignClick}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Assign Office
          </button>
        )}
        {isAssigning && (
          <div className="mt-4 h-full w-full">
            <input
              type="text"
              value={id}
              // onChange={}
              placeholder="Enter new office ID"
              className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleSave}
              className="  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
