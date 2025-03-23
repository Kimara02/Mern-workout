import React, { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../../Hooks/UseWorkoutContext';
import WorkoutDetails from '../../Components/WorkoutDetails/WorkoutDetails';
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm';
import { useAuthContext } from '../../Hooks/UseAuthContext';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user}= useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch( 'https://mern-workout-backend-qr10.onrender.com/api/kimara',{
          headers:{
            'Authorization':`Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        console.log("Fetched workouts:", json); // Debugging log

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }

      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
  
    fetchWorkouts();
  
    
  }, []);
  

  return (

<div className="min-h-screen bg-gray-50 py-10">
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
    Your Workouts
  </h1>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Workouts Section */}
    <div className="lg:col-span-2">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>

    {/* Form Section */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl rounded-2xl p-8">
      <WorkoutForm/>
    </div>
  </div>
</div>
</div>

  );
};

export default Home;




