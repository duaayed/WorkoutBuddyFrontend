import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ax from 'axios'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      setIsLoading(true)
      setError(null)

      const response = await ax.post(import.meta.env.VITE_URI + '/api/user/signup', { email, password })

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))
      setIsLoading(false)
      navigate('/')
      window.location.reload();
    
    } catch (error) {

      setIsLoading(false)
      setError(error.response.data.error)
    }

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup