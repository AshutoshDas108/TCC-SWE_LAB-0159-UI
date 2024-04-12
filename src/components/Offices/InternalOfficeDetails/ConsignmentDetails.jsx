import React from 'react'

function ConsignmentDetails({consignments}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl rounded-lg p-6 mt-4">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Consignments</h2>
        {consignments.map((consignment, index) => (
          <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
            <p className="text-white">Consignment ID: {consignment.consignmentId}</p>
            <p className="text-white">Sender Address: {consignment.senderAddress}</p>
            <p className="text-white">Receiver Address: {consignment.receiverAddress}</p>
            <p className="text-white">Distance: {consignment.distanceBwSenderReceiver} KM</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConsignmentDetails
