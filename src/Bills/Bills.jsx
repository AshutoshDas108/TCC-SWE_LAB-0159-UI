import React, { useState, useEffect } from 'react';  
import BillCards from './BillCrads';

function Bills() {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    const jwtToken = localStorage.getItem("jwt")
    try {
      const response = await fetch(`http://localhost:8070/admin/api/bills`, {
          method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setBills(data);
      }
      else {
        console.error("Received data is not an array:", data);
        setBills([]); // Handle non-array data appropriately
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);  // The empty dependency array ensures this effect runs only once after the initial render

  return (
    <>
    <h2 className="text-3xl text-center bg-slate-800 p-4 font-bold text-white">
          List Of Bills
        </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {(bills.length ==0)?`NO BILLS AVAILABLE CURRENTLY`:  bills.map(bill => (
        <BillCards key={bill.billId} bill={bill} />
      ))}
    </div>
    </>
  );
}

export default Bills;
