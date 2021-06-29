// import axios from "axios";
// import React, { useState } from "react";

// export async function getAllExerciseIds() {
//     //const [exercises, setExercises] = useState({})
//     const { dataArray } = await axios.get('http://localhost:5000/exercises')
//     //setExercises(data)

//     return dataArray.map(data => {
//         return {
//             params: {
//                 id: data._id.toString()
//             }
//         }
//     })
// }

// export async function getExerciseData(id) {
//     const data = await axios.get(`http://localhost:5000/exercises/${id}`)
//     return {
//         id,
//         ...data
//     }
// }