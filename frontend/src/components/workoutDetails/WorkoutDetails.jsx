// import React from 'react'

// const WorkoutDetails = ({workout}) => {
//   return (
//     <div>
//       <div className="relative bg-gradient-to-br from-pastel-blue to-pastel-purple shadow-lg rounded-2xl p-10 border border-gray-200 max-w-2xl mx-auto transition-all transform hover:scale-105 hover:shadow-2xl overflow-hidden">
  
//   {/* Decorative Background Elements */}
//   <div className="absolute inset-0 pointer-events-none">
//     <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full blur-3xl"></div>
//     <div className="absolute bottom-10 right-10 w-24 h-24 bg-pastel-pink opacity-30 rounded-full blur-2xl"></div>
//     <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pastel-yellow opacity-30 rounded-full blur-2xl"></div>
//   </div>

//   <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-wide relative uppercase">
//     {workout.title}
//     <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-full transform -translate-x-1/2"></span>
//   </h1>

//   <div className="flex flex-row justify-between items-center gap-8 bg-white bg-opacity-80 rounded-xl p-8 shadow-md">
//     <div className="w-1/2 text-center">
//       <h2 className="text-xl font-semibold text-gray-900 bg-pastel-green rounded-lg px-6 py-3 shadow">
//         Reps
//       </h2>
//       <p className="mt-4 text-2xl font-medium text-gray-700 bg-gray-50 rounded-lg px-8 py-4 shadow-inner">
//         {workout.reps}
//       </p>
//     </div>
//     <div className="w-1/2 text-center">
//       <h2 className="text-xl font-semibold text-gray-900 bg-pastel-orange rounded-lg px-6 py-3 shadow">
//         Load
//       </h2>
//       <p className="mt-4 text-2xl font-medium text-gray-700 bg-gray-50 rounded-lg px-8 py-4 shadow-inner">
//         {workout.load} kg
//       </p>
//     </div>
//   </div>

//   <div className="mt-10 flex justify-center">
//     <button className="px-10 py-4 bg-gradient-to-r from-pastel-purple to-pastel-blue text-gray-900 font-semibold rounded-full shadow-lg hover:from-pastel-blue hover:to-pastel-purple transition-all transform hover:scale-110">
//       View Details
//     </button>
//   </div>
// </div>


//     </div>
//   )
// }

// export default WorkoutDetails
import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa"; // Icons for load and date
import { MdFitnessCenter, MdDelete } from "react-icons/md"; // Icons for workout name and delete
import { BiDetail } from "react-icons/bi"; // Icon for description

import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
// import {toast} from "react-toastify";
import {toast} from "react-toastify";


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      toast.error("Please login to delete the workout");
      return;
    }
    const response = await fetch(`https://mern-workout-backend-qr10.onrender.com/api/kimara/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token in the headers
      },
      // 'Authorization':`Bearer ${user.token}`,
    });

    if (!response.ok) {
      toast.error("Failed to delete workout. Please try again.");
      return;
    }

    dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });
    // toast.success("Workout deleted successfully! 🗑️");
    toast.success("Workout is deleted successfully!");
  };

  // Format the date
  const formattedDate = new Date(workout.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-[#A7C7E7] to-[#B5EAD7] p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 relative">
      {/* Delete Icon */}
      <span
        className="absolute top-4 right-4 bg-[#FF9AA2] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-red-600 transition duration-200"
        onClick={handleClick}
      >
        <MdDelete className="text-xl" />
      </span>

      {/* Workout Name */}
      <div className="flex items-center space-x-4 mb-6">
        <MdFitnessCenter className="text-[#4F86C6] text-4xl" />
        <h1 className="text-gray-800 text-3xl font-bold">{workout.title}</h1>
      </div>

      {/* Workout Description */}
      <div className="flex items-start space-x-4 mb-4">
        <BiDetail className="text-[#6A5ACD] text-3xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Reps:</span> {workout.reps}
        </p>
      </div>

      {/* Workout Load */}
      <div className="flex items-center space-x-4 mb-4">
        <FaDumbbell className="text-[#B5EAD7] text-3xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Load:</span> {workout.load} kg
        </p>
      </div>

      {/* Created At */}
      <div className="flex items-center space-x-4">
        <FaCalendarAlt className="text-[#FFD700] text-3xl" />
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Created At:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;

