import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllEmployees() {
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwt'); 
                if(jwtToken == null) {
                   alert('PLEASE SIGN IN')
                }
                console.log(jwtToken);
                const response = await fetch('http://localhost:8070/admin/api/employees', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <div className='bg-gradient-to-r from-white to-blue-600 shadow-xl'>
            <h2 className='text-3xl text-center bg-slate-700 p-4 font-bold text-white'>Employee List</h2>
            <ul className='text-center text-red-600 font-semibold text-lg '>
                {Array.isArray(employees) && employees.map(employee => (
                    <li key={employee.empId}>
                        <Link to={`/employees/${employee.empId}`}>{employee.empName}</Link>
                    </li>
                ))}
            </ul>
        </div>
        {/* <div className='text-center'>
              <h2>Add New Employee</h2>
        </div> */}
        </>
    )
}

export default AllEmployees;
