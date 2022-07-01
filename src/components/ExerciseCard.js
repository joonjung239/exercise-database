import React from "react";

function ExerciseCard({exercise, onSetDemo, onAddToWorkout, onRemoveFromWorkout}) {

    function handleClick() {
        onSetDemo(exercise.gifUrl)
    }

    function handleAdd(e) {
        e.stopPropagation()
        fetch('http://localhost:8000/workout', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise),
        })
        .then(res => res.json())
        .then(data => onAddToWorkout(data))
    }

    function handleRemove(e) {
        e.stopPropagation()
        fetch('http://localhost:8000/workout/' + exercise.id, {
            method:'DELETE'
        })
        onRemoveFromWorkout(exercise)
    }


    return (
        <li onClick={handleClick} className="searchcard">
            {exercise.name}
            <button onClick={handleAdd} className="addbtn">Add to Workout</button>
            <button onClick={handleRemove} className="deletebtn">Remove from Workout</button>
        </li>
    )
}

export default ExerciseCard