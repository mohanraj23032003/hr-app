// function Employees() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-blue-500">
//         Employees
//       </h1>
//     </div>
//   )
// }

// export default Employees


import { useEffect, useState } from "react"

function Employees() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [deptId, setDeptId] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const size = 5

  // Fetch Departments (for dropdown)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/departments")
      .then(res => res.json())
      .then(data => setDepartments(data))
  }, [])

  // Fetch Employees
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/employees?page=1&size=10")
//       .then(res => res.json())
//       .then(data => setEmployees(data.data)) // IMPORTANT: data.data
//   }, [])

useEffect(() => {
  fetch(`http://127.0.0.1:8000/employees?page=${page}&size=${size}`)
    .then(res => res.json())
    .then(data => {
      setEmployees(data.data)
      setTotal(data.total)
    })
}, [page])

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/employees/${id}`, {
      method: "DELETE",
    }).then(() => {
      setEmployees(prev => prev.filter(emp => emp.id !== id))
    })
  }

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      address,
      contact_no: contactNo,
      dept_id: Number(deptId)
    }

    if (editingId) {
      fetch(`http://127.0.0.1:8000/employees/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(updated => {
          setEmployees(prev =>
            prev.map(emp =>
              emp.id === editingId ? updated : emp
            )
          )
          resetForm()
        })
    } else {
      fetch("http://127.0.0.1:8000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(newEmp => {
          setEmployees(prev => [...prev, newEmp])
          resetForm()
        })
    }
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setAddress("")
    setContactNo("")
    setDeptId("")
    setEditingId(null)
  }

  const getDepartmentName = (id) => {
    const dept = departments.find(d => d.id === id)
    return dept ? dept.name : "N/A"
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Employees
      </h1>

      {/* Form */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl mb-4">
          {editingId ? "Update Employee" : "Add Employee"}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Name"
            className="p-2 rounded bg-slate-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="p-2 rounded bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Contact No"
            className="p-2 rounded bg-slate-700 text-white"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />

          <input
            placeholder="Address"
            className="p-2 rounded bg-slate-700 text-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <select
            className="p-2 rounded bg-slate-700 text-white"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-600">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b border-slate-700">
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{getDepartmentName(emp.dept_id)}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => {
                      setName(emp.name)
                      setEmail(emp.email)
                      setAddress(emp.address)
                      setContactNo(emp.contact_no)
                      setDeptId(emp.dept_id)
                      setEditingId(emp.id)
                    }}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

<div className="flex justify-between mt-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>Page {page}</span>

  <button
    disabled={page * size >= total}
    onClick={() => setPage(page + 1)}
    className="bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
      </div>
    </div>
  )
}

export default Employees