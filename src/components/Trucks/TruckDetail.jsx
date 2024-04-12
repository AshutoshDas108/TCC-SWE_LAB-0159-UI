import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"

function TruckDetail({trucks}) {
 
  const [truck, setTruck] = useState(null)
  const { id } = useParams();
  console.log(id);
  console.log(typeof id);

  useEffect(() => {
    // Fetch data for the specific truck your Spring Boot backend
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwt");
        const response = await fetch(
          `http://localhost:8070/api/trucks/${id}`,
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
        setTruck(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!truck) {
    return <div>Loading...</div>;
  }




  return (
    <div>
      <div className="flex items-center justify-center h-full bg-gradient-to-r from-white to-blue-400 shadow-xl">
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg rounded-lg p-6 mt-4 mb-4 max-w-sm w-screen">
        <h2 className="text-3xl font-bold text-white text-center mb-4 w-full">Truck Details</h2>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <p className="text-white mb-2 font-serif text-xl">Truck ID: {truck.truckId}</p>
          {/* <p className="text-white mb-2">Consignment Received: {truck.consignmentReceived}</p> */}
          <p className="text-white font-serif text-xl mb-2">Consignment Volume: {truck.consignmentVolume}</p>
          <p className="text-white mb-2 font-serif text-xl">Distance Travelled: {(truck.distanceTravelled == null)? 0 : truck.distanceTravelled}</p>
          <p className="text-white mb-2 font-serif text-xl">Consignments Received: {(truck.consignmentIds == null )? 0 :truck.consignmentIds.length}</p>
          <p className="text-white font-serif text-xl">Truck Capacity: {truck.capacity} m³</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default TruckDetail
