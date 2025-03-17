import { useState } from 'react'
import ax from 'axios'


const WorkoutForm = ({ show, setShow }) => {
    
    
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    
    
    const handleSubmit = async (e) => {
        
        e.preventDefault()// to prevent vanilla js -> reload the page after submitting
        
        const workout = { title, load, reps }
        const users = JSON.parse(localStorage.getItem('user'))

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await ax.post(import.meta.env.VITE_URI + "/api/workouts", workout, { headers: {
                "Authorization" : `Bearer ${users.token}`
            }});
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setShow(!show) 
            console.log('new workout added:')
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('please make sure you add all fields')
        }

    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excersise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm