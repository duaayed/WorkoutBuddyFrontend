import { useEffect, useState } from "react"
import ax from 'axios'

// components

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


const Home = () => {
    const [workouts, setWorkouts] = useState(null)// workout from DB: title,reps,load
    const [show, setShow] = useState(false)//render base
    
    const users = JSON.parse(localStorage.getItem('user'))//parse to retrieve data

    useEffect (() => {
        const fetchWorkouts = async () => {
            try {
            // let response = await ax.get(import.meta.env.VITE_URI + "/api/workouts"); //here there is no "process"  / meta is a package installed with vite 
            let response = await ax.get(import.meta.env.VITE_URI + "/api/workouts", {
                headers: {'Authorization': `Bearer ${users.token}`}, //user.token from the DB
            })
            setWorkouts (response.data)
            } catch (err) {
            console.log(`ERROR! ${err}`);
            }
        }
       
        if(users){
        fetchWorkouts ()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                <WorkoutDetails workout={workout} setShow={setShow} show={show} key={workout._id} />
            ))}
            </div>
            <WorkoutForm setShow={setShow} show={show} />
        </div>
    )
}
export default Home