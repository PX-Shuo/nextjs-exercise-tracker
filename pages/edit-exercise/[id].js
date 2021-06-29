import Head from 'next/head'
import Layout from '../../components/layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export async function getStaticPaths() {
    const res = await fetch('http://localhost:5000/exercises')
    const data = await res.json();

    const paths = data.map(exercise => {
        return {
            params: { id: exercise._id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id
    const res = await fetch(`http://localhost:5000/exercises/${id}`)
    const data = await res.json()

    return {
        props: {
            exercise: data
        }
    }
}

export default function EditExercise({ exercise }) {
    const styles = useStyles()

    const [id, setId] = useState()
    const [username, setUsername] = useState()
    const [description, setDescription] = useState()
    const [duration, setDuration] = useState()
    const [date, setDate] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        setId(exercise._id);
        setUsername(exercise.username);
        setDescription(exercise.description);
        setDuration(exercise.duration);
        setDate(new Date(exercise.date));
        // console.log(exercise);
        // fetch('http://localhost:5000/users')
        //     .then(result => {
        //         setUsers(result.data.map(user => user.username))
        //     })
        axios.get('http://localhost:5000/users')
            .then(response => {
                if(response.data.length > 0){
                    setUsers(response.data.map(user => user.username))
                }
            })
    }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    const onChangeDate = (date) => {
        setDate(date)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const editedExercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        // console.log("saved!")
        // console.log(editedExercise)
        // console.log(`http://localhost:5000/exercises/update/${id}`)
        users.map(user => {
            console.log(user.username)
        })
        axios.post(`http://localhost:5000/exercises/update/${id}`, editedExercise)
            .then(res => console.log(res.data))
        window.location = '/'
    }

    return (
        <Layout>
            <Head></Head>
            <section className="form">
            <h3>Edit Exercise Logs</h3>
            <form className={styles.root} onSubmit={onSubmit}>
                <div>
                    <label>Username: </label>
                    <select value={username} onChange={onChangeUsername}>
                        {
                            users.map(user => {
                                return <option value={user}>{user}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    {/* <label>Description: </label>
                    <input type="text" value={description} onChange={onChangeDescription} /> */}
                    <TextField id="standard-basic" label="Description" value={description} onChange={onChangeDescription} required />
                </div>
                <div>
                    {/* <label>Duration (in minutes): </label>
                    <input type="text" value={duration} onChange={onChangeDuration} /> */}
                    <TextField id="standard-basic" label="Duration" value={duration} onChange={onChangeDuration} required />
                </div>
                <div>
                    <label>Date: </label>
                    <DatePicker selected={date} onChangeDate={onChangeDate} />
                </div>
                <div>
                    <input type="submit" value="Edit Exercise Log" />
                </div>
            </form>
                {/* <div>
                    <h3>Edit Exercise Logs</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select ref="userInput"
                                required className="form-control"
                                value={state.username}
                                onChange={onChangeUsername}>
                                {
                                    users.map(function (user) {
                                        return <option key={user.username} value={user.username}>{user.username}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" required className="form-control" value={state.description} onChange={onChangeDescription} />
                        </div>
                        <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input type="text" className="form-control" value={state.duration} onChange={onChangeDuration} />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker selected={state.date} onChangeDate={onChangeDate} />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                        </div>
                    </form>
                </div> */}
            </section>
        </Layout>
    )
}