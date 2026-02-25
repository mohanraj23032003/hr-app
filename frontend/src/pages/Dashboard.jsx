import { useEffect, useState } from "react"
import EmployeeDashboard from "./EmployeeDashboard"

function Dashboard() {

const role = localStorage.getItem("role")

if (role === "employee") {
  return <EmployeeDashboard />
}


const [stats, setStats] = useState({
  total_employees: 0,
  total_departments: 0,
  total_payrolls: 0,
  highest_salary: 0
})

useEffect(() => {
  fetch("http://127.0.0.1:8000/dashboard-stats")
    .then(res => res.json())
    .then(data => setStats(data))
}, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Total Employees</h2>
          <p className="text-2xl font-bold mt-2">{stats.total_employees}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Departments</h2>
          <p className="text-2xl font-bold mt-2">{stats.total_departments}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Payroll Records</h2>
          <p className="text-2xl font-bold mt-2">{stats.total_payrolls}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Highest Salary</h2>
          <p className="text-2xl font-bold mt-2 text-green-400">
            ₹ {stats.highest_salary}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard