// import Sidebar from "./Sidebar"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Outlet } from "react-router-dom"

// // function Layout({ children }) {
// //   return (
// //     <div className="flex bg-slate-900 text-white min-h-screen">
// //       <Sidebar />

// //       <div className="flex-1 p-6">
// //         {children}
// //       </div>
// //     </div>
// //   )
// // }

// function Layout({ children }) {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate("/login")
//     }
//   }, [])
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-slate-900 text-white min-h-screen">
//         <Outlet />
//       </div>
//     </div>
//   )

// }

// <button
//   onClick={() => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("role")
//     window.location.href = "/login"
//   }}
//   className="absolute top-4 right-6 bg-red-500 px-4 py-2 rounded"
// >
//   Logout
// </button>
// export default Layout



import Sidebar from "./Sidebar"
import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

function Layout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <div className="flex relative">
      <Sidebar />

      <div className="flex-1 p-6 bg-slate-900 text-white min-h-screen">
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-6 bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

        <Outlet />
      </div>
    </div>
  )
}

export default Layout