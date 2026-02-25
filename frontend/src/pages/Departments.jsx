// import { useEffect, useState } from "react"

// function Departments() {
//   const [departments, setDepartments] = useState([])
//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [editingId, setEditingId] = useState(null)

//   useEffect(() => {
//   fetch("http://127.0.0.1:8000/departments")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("API DATA:", data)
//       setDepartments(data)
//     })
//     .catch((err) => console.error(err))
//   }, [])

// const handleDelete = (id) => {
//   fetch(`http://127.0.0.1:8000/departments/${id}`, {
//     method: "DELETE",
//   })
//     .then(() => {
//       setDepartments(prev =>
//         prev.filter((dept) => dept.id !== id)
//       )
//     })
//     .catch((err) => console.error(err))
// }


//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-blue-500 mb-6">
//         Departments
//       </h1>

//       {/* Add Department Form */}
//       <div className="bg-slate-800 p-6 rounded-xl mb-8">
//         <h2 className="text-xl mb-4">Add Department</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Department Name"
//             className="p-2 rounded bg-slate-700 text-white"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Description"
//             className="p-2 rounded bg-slate-700 text-white"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
// {/* 
// <button
//   onClick={() => {
//     fetch("http://127.0.0.1:8000/departments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, description }),
//     })
//       .then((res) => res.json())
//       .then((newDept) => {
//         setDepartments([...departments, newDept])
//         setName("")
//         setDescription("")
//       })
//       .catch((err) => console.error(err))
//   }}
//   className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
// >
//   Add Department
// </button> */}

// <button
//   onClick={() => {
//     if (editingId) {
//       fetch(`http://127.0.0.1:8000/departments/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, description }),
//       })
//         .then((res) => res.json())
//         .then((updatedDept) => {
//           setDepartments((prev) =>
//             prev.map((dept) =>
//               dept.id === editingId ? updatedDept : dept
//             )
//           )
//           setEditingId(null)
//           setName("")
//           setDescription("")
//         })
//     } else {
//       fetch("http://127.0.0.1:8000/departments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, description }),
//       })
//         .then((res) => res.json())
//         .then((newDept) => {
//           setDepartments((prev) => [...prev, newDept])
//           setName("")
//           setDescription("")
//         })
//     }
//   }}
//   className={`mt-4 px-4 py-2 rounded ${
//     editingId
//       ? "bg-yellow-500 hover:bg-yellow-600"
//       : "bg-blue-500 hover:bg-blue-600"
//   }`}
// >
//   {editingId ? "Update Department" : "Add Department"}
// </button>

//       </div>

//       {/* Departments Table */}
//       <div className="bg-slate-800 p-6 rounded-xl">
//         <h2 className="text-xl mb-4">Department List</h2>

//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b border-slate-600">
//               <th className="py-2">ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {departments.map((dept) => (
//               <tr key={dept.id} className="border-b border-slate-700">
//                 <td className="py-2">{dept.id}</td>
//                 <td>{dept.name}</td>
//                 <td>{dept.description}</td>
//               </tr>
//             ))}
//           </tbody> */}


// <tbody>
//   {departments.map((dept) => (
//     <tr key={dept.id} className="border-b border-slate-700">
//       <td className="py-2">{dept.id}</td>
//       <td>{dept.name}</td>
//       <td>{dept.description}</td>
//       <td className="space-x-2">
//         <button
//           onClick={() => {
//             setName(dept.name)
//             setDescription(dept.description)
//             setEditingId(dept.id)
//           }}
//           className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
//         >
//           Edit
//         </button>

//         <button
//           onClick={() => handleDelete(dept.id)}
//           className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>    
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Departments



import { useEffect, useState } from "react"

function Departments() {
  const [departments, setDepartments] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState(null)

useEffect(() => {
  fetch("http://127.0.0.1:8000/departments")
    .then(res => res.json())
    .then(data => {
      console.log("Departments from API:", data)
      setDepartments(data)
    })
    .catch(err => console.error(err))
}, [])

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/departments/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDepartments((prev) =>
          prev.filter((dept) => dept.id !== id)
        )
      })
      .catch((err) => console.error(err))
  }

  const handleSubmit = () => {
    if (editingId) {
      fetch(`http://127.0.0.1:8000/departments/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      })
        .then((res) => res.json())
        .then((updatedDept) => {
          setDepartments((prev) =>
            prev.map((dept) =>
              dept.id === editingId ? updatedDept : dept
            )
          )
          setEditingId(null)
          setName("")
          setDescription("")
        })
    } else {
      fetch("http://127.0.0.1:8000/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      })
        .then((res) => res.json())
        .then((newDept) => {
          setDepartments((prev) => [...prev, newDept])
          setName("")
          setDescription("")
        })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Departments
      </h1>

      {/* Form */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl mb-4">
          {editingId ? "Update Department" : "Add Department"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Department Name"
            className="p-2 rounded bg-slate-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            className="p-2 rounded bg-slate-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className={`mt-4 px-4 py-2 rounded ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editingId ? "Update Department" : "Add Department"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null)
              setName("")
              setDescription("")
            }}
            className="ml-3 mt-4 bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl mb-4">Department List</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b border-slate-700">
                <td className="py-2">{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.description}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => {
                      setName(dept.name)
                      setDescription(dept.description)
                      setEditingId(dept.id)
                    }}
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Departments