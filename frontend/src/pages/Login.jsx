import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const formData = new URLSearchParams()
    formData.append("username", username)
    console.log("Username:", username)
    formData.append("password", password)
    console.log("Password:", password)
    formData.append("grant_type", "password")

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("role", data.role)
      navigate("/")
    } else {
      alert("Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl w-80">
        <h2 className="text-2xl text-blue-500 mb-6">Login</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-700"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 rounded bg-slate-700"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login