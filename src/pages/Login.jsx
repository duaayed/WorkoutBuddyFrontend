import { useState } from "react"
import ax from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)// عشان لما يكون لودنغ يعمل ديسيبل للزر البتن

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      setIsLoading(true)
      setError(null)

      const response = await ax.post(import.meta.env.VITE_URI + '/api/user/login', { email, password })//حيروح للسيرفر على لوغن
      //  لانه جوا فايل اليورز حددتله انه امتداد \لوغن روح اعمل هاي الفنكشن اللي بيوزر كونترولر

      localStorage.setItem('user', JSON.stringify(response.data))//بعرف قيمة الريسبونس من userController
      setIsLoading(false)
      navigate('/')
      window.location.reload();// to ensure navigate will work properly


    } catch (error) {

      setIsLoading(false)
      setError(error.response.data.error)// the error from userController file errors (error from the server)
    }

  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login