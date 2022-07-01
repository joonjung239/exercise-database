import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SearchBar({onHandleSubmit, onHandleFilter, onRouteChange}) {

    const [searchQuery, setSearchQuery] = useState("")
    const [targetArea, setTargetArea] = useState("Target Area")
    const [equipmentChoice, setEquipmentChoice] = useState("Equipment")
    const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '56937c8580msh33b28bde42bdc9fp106d6ejsn3fe184dea559',
                    // 'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                        }
            };

    function handleSubmit(e) {
        e.preventDefault()
        onHandleSubmit(searchQuery)
    }

    const [targetList, setTargetList] = useState([])
    useEffect(() => {
            fetch('https://exercisedb.p.rapidapi.com/exercises/targetList', options)
            .then(response => response.json())
            .then(response => setTargetList(response))
            .catch(err => console.error(err));
    }, [])

    const [equipmentList, setEquipmentList] = useState([])
    useEffect(() => {
             fetch('https://exercisedb.p.rapidapi.com/exercises/equipmentList', options)
            .then(response => response.json())
            .then(response => setEquipmentList(response))
            .catch(err => console.error(err));
    }, [])

    function handleFilter(e) {
        e.preventDefault()
        onHandleFilter(targetArea, equipmentChoice)
    }
    

    return (
        <Router>
        <div>
        <h2 class="title">EXERCISES</h2>
      <nav class="searchNavBar">
          <span>
            <Link to="/search" onClick={onRouteChange}>Search by Name</Link>
          </span>
          <span>
            <Link to="/filter" onClick={onRouteChange}>Search by Equipment</Link>
          </span>
      </nav>
      <Switch>
        <Route path="/search">
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => {setSearchQuery(e.target.value)}} class="bar"></input>
            <button class="searchbtn">Search</button>
        </form>
        </Route>
        <Route path="/filter">
        <form onSubmit={handleFilter}>
            <select onChange={(e) => setTargetArea(e.target.value)} class="bar">
                <option>Target Area</option>
                {targetList.map((bodypart, index) => (
                    <option key={index}>{bodypart}</option>
                ))}
            </select>
            <select onChange={(e) => setEquipmentChoice(e.target.value)}class="bar">
                <option>Equipment</option>
                {equipmentList.map((equipment, index) => (
                    <option key={index}>{equipment}</option>
                ))}
            </select>
            <button class="searchbtn">Search</button>
        </form>
        </Route>
      </Switch>
    </div>
  </Router>
    )}

export default SearchBar