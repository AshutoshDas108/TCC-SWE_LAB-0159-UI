import React from "react";

function BranchDetails({ branch }) {
    console.log(branch);
  return (
    <div className="flex items-center justify-center h-full mt-4">
      <div className="max-w-sm bg-gradient-to-r from-green-400 to-blue-500 shadow-xl rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Branch Details</h2>
        <p className="text-white">Location: {branch.loc}</p>
        <p className="text-white">Branch ID: {branch.branchId}</p>
        <p className="text-white">Head Office: {branch.isHeadOffice ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default BranchDetails;
