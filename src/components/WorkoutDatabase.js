import React, { useEffect } from "react";
import { useState } from 'react';
import SearchBar from './SearchBar'
import ExerciseList from './ExerciseList'
import Demonstration from "./Demonstration";
import MyExercises from "./MyExercises";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";

  

function WorkoutDatabase() {

    const [exercises, setExercises] = useState([])
    const options = {
      method: 'GET',
      headers: {
    //     'X-RapidAPI-Key': '56937c8580msh33b28bde42bdc9fp106d6ejsn3fe184dea559',
    // 'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };
  
    function onHandleSubmit(newSearchTerm) {
            setDemo([])
            fetch('https://exercisedb.p.rapidapi.com/exercises/name/' + newSearchTerm, options)
            .then(res => res.json())
            .then(data => setExercises(data))
    }

    const [demo, setDemo] = useState([])
    function onSetDemo(newExercise) {
        setDemo(newExercise)
    }

    const [currentWorkout, setCurrentWorkout] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/workout')
        .then(res => res.json())
        .then(data => setCurrentWorkout(data))
    },[])

    function onAddToWorkout(newExercise) {
        if(currentWorkout.includes(newExercise)) return null

        setCurrentWorkout([...currentWorkout, newExercise])
    }

    function onRemoveFromWorkout(deletedExercise) {
        const exercisesToDisplay = currentWorkout.filter(exercise => exercise !== deletedExercise)
        setCurrentWorkout(exercisesToDisplay)
    }

    function onHandleFilter(target, equipment) {
        setDemo([])
        fetch('https://exercisedb.p.rapidapi.com/exercises', options)
        .then(response => response.json())
        .then(data => {
            if(target === "Target Area") {
                const exercisesToDisplay = data.filter(exercise => exercise.equipment === equipment)
                setExercises(exercisesToDisplay)
            } else if(equipment === "Equipment") {
                const exercisesToDisplay = data.filter(exercise => exercise.target === target)
                setExercises(exercisesToDisplay)
            } else if(target === "Target Area" && equipment === "Equipment") {
                alert('Please select target area or equipment')
            } else {
                const exercisesToDisplay = data.filter(exercise => exercise.target === target && exercise.equipment === equipment)
                setExercises(exercisesToDisplay)
            }
        })    
    }

    function onRouteChange() {
        setExercises([])
            setDemo([])
    }


    return (
        
        <Router>
        <div>
    <nav class="navbar fixed-top">
          <NavLink exact to="/" onClick={onRouteChange}>Home</NavLink>
          <NavLink to="/exercises"> Search Exercise</NavLink>
          <NavLink to="/myworkouts" onClick={onRouteChange}>My Workout</NavLink>
    </nav>
        <Switch>
            <Route exact path= "/">
            <HomePage/>
            </Route>
          <Route path="/myworkouts">
            <MyExercises exercises={currentWorkout} onRemoveFromWorkout={onRemoveFromWorkout}/>
          </Route>
          <div class="Exercise">
          <Route path="/exercises" >
            <SearchBar onHandleSubmit={onHandleSubmit} onHandleFilter={onHandleFilter} onRouteChange={onRouteChange}/>
            <ExerciseList exercises={exercises} onSetDemo={onSetDemo} onAddToWorkout={onAddToWorkout} onRemoveFromWorkout={onRemoveFromWorkout}/>
            <Demonstration demo={demo} exercises={exercises}/>
          </Route>
          </div>
        </Switch>
        </div>
        </Router>
        
    )
}

export default WorkoutDatabase