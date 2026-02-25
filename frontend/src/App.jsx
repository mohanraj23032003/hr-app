// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// // function App() {
// //   return (
// //     <div className="bg-slate-900 text-white h-screen flex items-center justify-center">
// //       <h1 className="text-4xl font-bold text-blue-500">
// //         HR Management System
// //       </h1>
// //     </div>
// //   )
// // }

// // export default App

// // import Layout from "./layout/Layout"

// // function App() {
// //   return (
// //     <Layout>
// //       <h1 className="text-3xl font-bold text-blue-500">
// //         Dashboard
// //       </h1>
// //     </Layout>
// //   )
// // }
// // export default App

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Departments from "./pages/Departments";
// import Employees from "./pages/Employees";
// import Payroll from "./pages/Payroll";
// import Layout from "./layout/Layout";

// // function Dashboard() {
// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold text-blue-500 mb-6">Dashboard</h1>

// //       <div className="grid grid-cols-4 gap-6">
// //         <div className="bg-slate-800 p-6 rounded-xl">
// //           <h2 className="text-gray-400">Total Employees</h2>
// //           <p className="text-2xl font-bold mt-2">20</p>
// //         </div>

// //         <div className="bg-slate-800 p-6 rounded-xl">
// //           <h2 className="text-gray-400">Departments</h2>
// //           <p className="text-2xl font-bold mt-2">0</p>
// //         </div>

// //         <div className="bg-slate-800 p-6 rounded-xl">
// //           <h2 className="text-gray-400">Payroll Records</h2>
// //           <p className="text-2xl font-bold mt-2">0</p>
// //         </div>

// //         <div className="bg-slate-800 p-6 rounded-xl">
// //           <h2 className="text-gray-400">Highest Salary</h2>
// //           <p className="text-2xl font-bold mt-2 text-green-400">₹ 0</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Departments() {
// //   return <h1 className="text-3xl font-bold text-blue-500">Departments</h1>;
// // }

// // function Employees() {
// //   return <h1 className="text-3xl font-bold text-blue-500">Employees</h1>;
// // }

// // function Payroll() {
// //   return <h1 className="text-3xl font-bold text-blue-500">Payroll</h1>;
// // }

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/departments" element={<Departments />} />
//           <Route path="/employees" element={<Employees />} />
//           <Route path="/payroll" element={<Payroll />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Departments from "./pages/Departments"
import Employees from "./pages/Employees"
import Payroll from "./pages/Payroll"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        {/* <Route path="/departments" element={<Departments />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="employees" element={<Employees />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={["admin", "hr"]}>
              <Layout>
                <Departments />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["admin", "hr"]}>
              <Layout>
                <Employees />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Layout>
                <Payroll />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App