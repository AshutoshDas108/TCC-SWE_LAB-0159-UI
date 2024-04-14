import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BranchDetails from "./InternalOfficeDetails/BranchDetails";
import EmployeeDetail from "../Employee/EmployeeDetails";
import EmployeeDetails from "./InternalOfficeDetails/EmployeeDetails";
import TruckDetails from "./InternalOfficeDetails/TruckDetails";
import ConsignmentDetails from "./InternalOfficeDetails/ConsignmentDetails";


function OfficeDetails() {
    const [office, setOffice] = useState(null);
    const { id } = useParams();
  console.log(id);
  console.log(typeof id);

  
  

  const fetchData = async () => {

    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:8070/api/office/${id}`,
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
      setOffice(data);
      return data;
    } catch (error) {
      console.error("Error fetching Office details:", error);
    }
  };

  
  useEffect(() => {
    // Fetch data for the specific office from Spring Boot backend
    fetchData();
  }, [id]);


  if (!office) {
    return <div>Loading...</div>;
  }

  
  
  return (
    <div>
    <h1 className="text-center text-3xl bg-slate-700 text-white p-4">
        Office Details
      </h1>
    <div className="flex items-center justify-center bg-gradient-to-r h-full w-full  from-blue-100 to-blue-700">
      
    <div className="max-w-lg  h-full w-full">
      
      <BranchDetails branch={office}/>
      <EmployeeDetails employees={office.employees}/>
      <TruckDetails trucks={ office.trucks}/>
      <ConsignmentDetails consignments={ office.consignments}/>
    </div>
    </div>
     </div>
  )
}

export default OfficeDetails
