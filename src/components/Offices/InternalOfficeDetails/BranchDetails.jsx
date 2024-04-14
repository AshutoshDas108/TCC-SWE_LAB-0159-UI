import React from "react";

function BranchDetails({ branch }) {
  return (
    <div className="flex items-center justify-center h-full mt-4">
      <div className="max-w-lg bg-gradient-to-r from-slate-500 to-slate-800 shadow-xl rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Branch Details</h2>
        <p className="text-white">Location: {branch.loc}</p>
        <p className="text-white">Branch ID: {branch.branchId}</p>
        <p className="text-white">Head Office: {branch.isHeadOffice ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default BranchDetails;
