// // function Sidebar() {
// //   return (
// //     <div className="w-64 bg-slate-800 h-screen p-5">
// //       <h2 className="text-2xl font-bold text-blue-500 mb-8">
// //         HR System
// //       </h2>
// // {/* 
// //       /* <ul className="space-y-4">
// //         <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
// //         <li className="hover:text-blue-400 cursor-pointer">Departments</li>
// //         <li className="hover:text-blue-400 cursor-pointer">Employees</li>
// //         <li className="hover:text-blue-400 cursor-pointer">Payroll</li>
// //       </ul> */ 
// //       <ul className="space-y-4">
// //         <li>
// //           <Link to="/" className="hover:text-blue-400">Dashboard</Link>
// //         </li>
// //         <li>
// //           <Link to="/departments" className="hover:text-blue-400">Departments</Link>
// //         </li>
// //         <li>
// //           <Link to="/employees" className="hover:text-blue-400">Employees</Link>
// //         </li>
// //         <li>
// //           <Link to="/payroll" className="hover:text-blue-400">Payroll</Link>
// //         </li>
// //       </ul>
// //     </div>
// //   )
// // }
// // export default Sidebar

// import { Link } from "react-router-dom"

// const role = localStorage.getItem("role")

// {role === "admin" && (
//   <Link to="/users">User Management</Link>
// )}

// {role !== "employee" && (
//   <Link to="/employees">Employees</Link>
// )}

// // function Sidebar() {
// //   return (
// //     <div className="w-64 bg-slate-800 h-screen p-5">
// //       <h2 className="text-2xl font-bold text-blue-500 mb-8">
// //         HR System
// //       </h2>

// //       <ul className="space-y-4">
// //         <li>
// //           <Link to="/" className="hover:text-blue-400">
// //             Dashboard
// //           </Link>
// //         </li>
// //         <li>
// //           <Link to="/departments" className="hover:text-blue-400">
// //             Departments
// //           </Link>
// //         </li>
// //         <li>
// //           <Link to="/employees" className="hover:text-blue-400">
// //             Employees
// //           </Link>
// //         </li>
// //         <li>
// //           <Link to="/payroll" className="hover:text-blue-400">
// //             Payroll
// //           </Link>
// //         </li>
// //       </ul>
// //     </div>
// //   )
// // }

// function Sidebar() {

//   return (
//     <div className="w-64 bg-slate-800 h-screen p-5">
//       <h2 className="text-2xl font-bold text-blue-500 mb-8">
//         HR System
//       </h2>

//       <ul className="space-y-4">

//         <li>
//           <Link to="/" className="text-2xl font-bold text-blue-500 mb-8">Dashboard</Link>
//         </li>

//         {role !== "employee" && (
//           <li>
//             <Link to="/employees" className="text-2xl font-bold text-blue-500 mb-8">Employees</Link>
//           </li>
//         )}

//         {role === "admin" && (
//           <li>
//             <Link to="/departments" className="text-2xl font-bold text-blue-500 mb-8">Departments</Link>
//           </li>
//         )}

//         <li>
//           <Link to="/payroll" className="text-2xl font-bold text-blue-500 mb-8">Payroll</Link>
//         </li>

//       </ul>
//     </div>
//   )
// }

// export default Sidebar


import { Link } from "react-router-dom"

function Sidebar() {
  const role = localStorage.getItem("role")

  return (
    <div className="w-60 bg-slate-800 text-white min-h-screen p-4">
      <h2 className="text-xl mb-6 font-bold">HR System</h2>

      {/* ADMIN MENU */}
      {role === "admin" && (
        <>
          <Link to="/" className="block mb-3 hover:text-blue-400">
            Dashboard
          </Link>

          <Link to="/employees" className="block mb-3 hover:text-blue-400">
            Employees
          </Link>

          <Link to="/departments" className="block mb-3 hover:text-blue-400">
            Departments
          </Link>

          <Link to="/payroll" className="block mb-3 hover:text-blue-400">
            Payroll
          </Link>
        </>
      )}

      {/* EMPLOYEE MENU */}
      {role === "employee" && (
        <>
          <Link to="/" className="block mb-3 hover:text-blue-400">
            Employee Dashboard
          </Link>
        </>
      )}

      {/* LOGOUT (COMMON) */}
      <button
        onClick={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          window.location.href = "/login"
        }}
        className="mt-6 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar