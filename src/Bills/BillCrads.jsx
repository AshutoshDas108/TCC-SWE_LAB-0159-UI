import React from 'react';

const BillCards = ({ bill }) => {
  return (
    <>    
    <div className="max-w-sm mx-auto bg-gradient-to-r from-white to-blue-500 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
    <div className="text-3xl text-center font-bold text-slate-800 mb-4">
      Transport Bill
    </div>
    <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-700">{bill.senderName}</h5>
    
    <div className="mb-3 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
      <p className="font-normal text-gray-700 dark:text-gray-300"><span className="font-semibold text-red-500">From:</span> {bill.senderAddress}</p>
      <p className="font-normal text-gray-700 dark:text-gray-300"><span className="font-semibold text-red-500">To:</span> {bill.receiverAddress}</p>
    </div>
    <div className="mb-3 p-3 bg-green-50 dark:bg-gray-700 rounded-lg">
      <p className="font-normal text-gray-700 dark:text-gray-300"><span className="font-semibold text-red-500">Receiver:</span> {bill.receiverName}</p>
      
      <p className="font-normal text-gray-700 dark:text-gray-300"><span className="font-semibold text-red-500">Distance:</span> {bill.distanceCovered} km</p>
    </div>
    <div className="p-3 bg-purple-50 dark:bg-gray-700 rounded-lg">
      {/* <p className="font-normal text-gray-700 dark:text-gray-300"><span className="font-semibold">Type:</span> {bill.type.replace('_', ' ').toLowerCase()}</p> */}
      <p className="font-bold text-lg text-gray-900 dark:text-white">Total Amount: ₹ {bill.totalAmount.toFixed(2)}</p>
    </div>
</div>
</>

    // <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
    //   <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bill.senderName}</h5>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">From: {bill.senderAddress}</p>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">To: {bill.receiverAddress}</p>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">Receiver: {bill.receiverName}</p>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">Distance: {bill.distanceCovered} km</p>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">Type: {bill.type}</p>
    //   <p className="font-normal text-gray-700 dark:text-gray-400">Total Amount: {bill.totalAmount.toFixed(2)} INR.</p>
    // </div>
  );
};

export default BillCards;
