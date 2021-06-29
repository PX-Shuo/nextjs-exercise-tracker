import axios from "axios"
import React, { Component } from "react"
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
const withStyleHook = Component => {
    return(props) => {
        const styles = useStyles()
        return <Component styles={styles} {...props} />
    }
}

class CreateExerciseForm extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Logs</h3>
                <form className={this.props.styles.root} onSubmit={this.onSubmit}>
                    <div>
                        <label>Username: </label>
                        <select ref="userInput" required value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        {/* <label>Description: </label> */}
                        <TextField id="standard-basic" label="Description" value={this.state.description} onChange={this.onChangeDescription} required />
                        {/* <input type="text" required value={this.state.description} onChange={this.onChangeDescription} /> */}
                    </div>
                    <div>
                        {/* <label>Duration (in minutes): </label> */}
                        <TextField id="standard-basic" label="Duration" value={this.state.duration} onChange={this.onChangeDuration} required />
                        {/* <input type="text" required value={this.state.duration} onChange={this.onChangeDuration} /> */}
                    </div>
                    <div>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChangeDate={this.onChangeDate} />
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Create Exercise Log" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withStyleHook(CreateExerciseForm)