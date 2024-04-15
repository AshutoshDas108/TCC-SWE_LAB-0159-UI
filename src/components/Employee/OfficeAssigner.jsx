// import React, { useState } from 'react';

// function OfficeAssigner({emp }) {
//     const [isAssigning, setIsAssigning] = useState(false);
//     const [newOfficeId, setNewOfficeId] = useState('');
//     const [currentOfficeId, setCurrentOfficeId] = useState(emp.branchOfficeId);

//     const handleAssignClick = () => {
//         setIsAssigning(true);
//     };

//     const handleSave = async () => {
//         if (!newOfficeId) {
//             alert("Please enter a valid office ID.");
//             return;
//         }

//         try {
//             const jwtToken = localStorage.get('jwt')
//             const response = await fetch(`http://localhost:8070/admin/api/assign-office/${newOfficeId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${jwtToken}`,
//                 },
//                 body: JSON.stringify({ officeId: newOfficeId }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to assign new office ID');
//             }

//             setCurrentOfficeId(newOfficeId);
//             setIsAssigning(false);
//             alert('Office ID assigned successfully!');
//         } catch (error) {
//             alert('Error assigning office ID: ' + error.message);
//         }
//     };

//     return (
//         <div>
           
//             {currentOfficeId === "N/A" && !isAssigning && (
//                 <button onClick={handleAssignClick}>
//                     Assign Office
//                 </button>
//             )}
//             {isAssigning && (
//                 <div>
//                     <input
//                         type="text"
//                         value={newOfficeId}
//                         onChange={e => setNewOfficeId(e.target.value)}
//                         placeholder="Enter new office ID"
//                     />
//                     <button onClick={handleSave}>Save</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default OfficeAssigner;
