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
          `http://localhost:8070/admin/api/employees/${id}`,
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

  

//   function getdateFormat(today) {
//     let dd = today.getDate();
//     let mm = today.getMonth() + 1;

//     let yyyy = today.getFullYear();

//     if (dd < 10) {
//       dd = "0" + dd;
//     }
//     if (mm < 10) {
//       mm = "0" + mm;
//     }
//     today = dd + "/" + mm + "/" + yyyy;
//   }

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-50 to-blue-600 shadow-xl ">
    <div className="max-w-md w-full bg-gradient-to-r from-blue-50 to-blue-600 shadow-xl rounded-lg overflow-hidden">
      <h1 className="text-center text-2xl bg-slate-700 text-white py-4">
        Employee Details
      </h1>
      <div className="bg-white items-center shadow-md rounded-lg p-4 mb-4">
        <div className="font-bold text-2xl mb-2 text-red-600 text-center">
          {employee.empName}
        </div>
        <div className="text-gray-700 text-center">
          <p>
            <span className="text-lg font-bold">Email:</span> {employee.email}
          </p>
          <p>
            <span className="text-lg font-bold">User Role:</span> {employee.userRole}
          </p>
          <p>
            <span className="text-lg font-bold">Branch Office ID:</span> {employee.branchOfficeId == null ? "N/A" : employee.branchOfficeId}
          </p>
          <p>
            <span className="text-lg font-bold">Date Of Joining:</span> {new Date(employee.dateOfJoining).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Display other details as needed */}
    </div>
  </div>
  );
};

export default EmployeeDetail;
