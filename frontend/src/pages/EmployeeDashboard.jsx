// import React from "react"
// import { useEffect, useState } from "react"

// function EmployeeDashboard() {

// useEffect(() => {
//   const token = localStorage.getItem("token")

//   fetch("http://127.0.0.1:8000/my-profile", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then(res => res.json())
//     .then(data => console.log(data))
// }, [])

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-blue-500 mb-6">
//         Employee Dashboard
//       </h1>

//       <p>Welcome Employee 👋</p>
//     </div>
//   )
// }

import { useEffect, useState } from "react";

function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/my-profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl text-blue-400">Employee Dashboard</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
}

export default EmployeeDashboard;
