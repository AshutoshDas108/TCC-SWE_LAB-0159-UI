import React from 'react'

function TruckDetails({trucks}) {
  return (
    <div className="flex items-center justify-center h-full mt-4">
      <div className="max-w-lg bg-gradient-to-r from-slate-500 to-slate-800  shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Trucks</h2>
        {trucks.map((truck, index) => (
          <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
            <p className="text-white">Truck ID: {truck.truckId}</p>
            <p className="text-white">Consignment Volume: {truck.consignmentVolume}</p>
            <p className="text-white">Distance Travelled: {truck.distanceTravelled}</p>
            <p className="text-white">Consignments Received: {(truck.consignmentIds == null )? 0 :truck.consignmentIds.length}</p>
            <p className="text-white">Truck Capacity: {truck.capacity} Cubic Metres</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TruckDetails
