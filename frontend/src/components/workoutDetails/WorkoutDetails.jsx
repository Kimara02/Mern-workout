import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa"; // Icons for load and date
import { MdFitnessCenter, MdDelete } from "react-icons/md"; // Icons for workout name and delete
import { BiDetail } from "react-icons/bi"; // Icon for description

import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
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

