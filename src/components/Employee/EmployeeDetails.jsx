import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  console.log(id);
  console.log(typeof id);

  useEffect(() => {
    // Fetch data for the specific employee your Spring Boot backend
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

    fetchData();
  }, [id]);

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
      
    </div>
  );
};

export default EmployeeDetail;
