import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
})
// !!!Appling HOC for using hook inside class component!!!
const withStyleHook = Component => {
    return(props) => {
        const styles = useStyles()
        return <Component styles={styles} {...props} />
    }
}

const Exercise = props => (
    <TableRow>
        <TableCell>{props.exercise.username}</TableCell>
        <TableCell align="right">{props.exercise.description}</TableCell>
        <TableCell align="right">{props.exercise.duration}</TableCell>
        <TableCell align="right">{props.exercise.date.substring(0,10)}</TableCell>
        <TableCell align="right"><Link href={"/edit-exercise/" + props.exercise._id}><Button>Edit</Button></Link></TableCell>
    </TableRow>
)

class ExercisesList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {exercises: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({
                    exercises: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>

                <TableContainer component={Paper}>
                    <Table className={this.props.styles.table} aria-label="exercise-list">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.exerciseList() }
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table> */}
            </div>
        )
    }
}

export default withStyleHook(ExercisesList)