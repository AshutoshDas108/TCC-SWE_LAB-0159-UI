import React from 'react'

function EmployeeDetails({employees}) {
  console.log(employees)
  return (
    
    <div className="flex items-center justify-center h-full">
    <div className="bg-gradient-to-r from-yellow-400 to-red-500 shadow-xl rounded-lg p-6 mt-4 max-w-lg">
      <div>
        {employees.length === 0 && (
          <h2 className="text-xl font-bold text-white mb-4 text-center">NO EMPLOYEES CURRENTLY</h2>
        )}
      </div>
      {employees.length > 0 && (
        <h2 className="text-xl font-bold text-white mb-4">Employee Details</h2>
      )}
      {employees.map((employee, index) => (
        <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
          <p className="text-white">Employee ID: {employee.empId}</p>
          <p className="text-white">Name: {employee.empName || "N/A"}</p>
          <p className="text-white">Email: {employee.email}</p>
          <p className="text-white">Role: {employee.userRole}</p>
          <p className="text-white">Branch ID: {employee.branchOfficeId}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default EmployeeDetails
