import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwt");
        if (jwtToken == null) {
          alert("PLEASE SIGN IN");
        }
        console.log(jwtToken);
        const response = await fetch(
          "http://localhost:8070/admin/api/employees",
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
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 shadow-xl">
        <h2 className="text-3xl text-center bg-slate-800 p-4 font-bold text-white">
          Employee List
        </h2>
        <ul className="space-y-2 p-4">
          {Array.isArray(employees) &&
            employees.map((employee) => (
              <li
                key={employee.empId}
                className="transform hover:scale-105 transition-transform duration-200"
              >
                {employee.empName && (
                  <Link
                    to={`/employees/${employee.empId}`}
                    className="flex items-center justify-center bg-white rounded-lg shadow p-3 text-blue-900 hover:text-red-600 hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c1.856 0 3.63.37 5.121 1.004m-1.755-2.908A6.978 6.978 0 0012 13c-1.486 0-2.847.463-3.964 1.241M15 21h7m-3-3v3m-10 0H2m3-3v3m13-13.194V7a4 4 0 11-8 0v3.194m4 3.806h8m0 0a4 4 0 11-8 0h8z"
                      ></path>
                    </svg>
                    {employee.empName}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>

    // <>
    // <div className='bg-gradient-to-r from-white to-blue-600 shadow-xl'>
    //     <h2 className='text-3xl text-center bg-slate-700 p-4 font-bold text-white'>Employee List</h2>
    //     <ul className='text-center text-red-600 font-semibold text-lg '>
    //         {Array.isArray(employees) && employees.map(employee => (
    //             <li key={employee.empId}>
    //                 <Link to={`/employees/${employee.empId}`}>{employee.empName}</Link>
    //             </li>
    //         ))}
    //     </ul>
    // </div>
    // {/* <div className='text-center'>
    //       <h2>Add New Employee</h2>
    // </div> */}
    // </>
  );
}

export default AllEmployees;
