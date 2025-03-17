import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const users = JSON.parse(localStorage.getItem('user'))

    const handleClick = ()=> {
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
           <nav>
                {
                    users && (
                        <div className='user'>
                            <span>{users.email}</span>
                            <button className='nav-item' onClick={handleClick}>Log out</button>
                        </div>
                    )
                }
                {
                    !users && (
                        <div className='user'>
                            <Link className='nav-item' to="/login">Login</Link>
                            <Link className='nav-item' to="/signup">Signup</Link>
                        </div>
                    )
                }
            </nav>
            </div>
            
        </header>
    )
}
export default Navbar