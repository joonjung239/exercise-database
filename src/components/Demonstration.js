import React from "react";

function Demonstration({demo, exercises}) {
    return (
        <div class="Demo">
            <h3 style={{display: exercises.length === 0 ? 'none' : ''}}
>Demonstration</h3>
            <img class ="gif" src={demo} />
        </div>
    )
}

export default Demonstration