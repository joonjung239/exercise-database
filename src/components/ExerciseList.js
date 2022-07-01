
import React from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList({exercises, onSetDemo, onAddToWorkout, onRemoveFromWorkout}) {
    return (
        <div class="exerciselist">
            <h3 class="results" style={{display: exercises.length === 0 ? 'none' : ''}}>Search Results</h3>
            <h5 class='directions' style={{display: exercises.length === 0 ? 'none' : ''}}>*Please Click on the Exercise to see a Demonstration</h5>
            <ul className="searchlist">
                {exercises.map(exercise => {
                    return <ExerciseCard exercise={exercise} key={exercise.id} onSetDemo={onSetDemo} onAddToWorkout={onAddToWorkout} onRemoveFromWorkout={onRemoveFromWorkout}/>
                })}
            </ul>
        </div>
    )
}

export default ExerciseList