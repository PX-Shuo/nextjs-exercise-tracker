import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Navbar() {
    const styles = useStyles();

    //render() {
        return (
            <nav className="navbar">
                {/* <div className="navbar-options">
                    <ul className="options">
                        <li className="item">
                            <Link href="/">
                                <a>Exercises</a>
                            </Link>
                        </li>
                        <li className="item">
                            <Link href="/create">
                                <a>Create Exercise Log</a>
                            </Link>
                        </li>
                        <li className="item">
                            <Link href="/user">
                                <a>Create User</a>
                            </Link>
                        </li>
                    </ul>
                </div> */}
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" className={styles.title}>
                            Exercise Tracker
                        </Typography>
                        <Link href="/" passHref>
                            <Button color="inherit">Exercises</Button>
                        </Link>
                        <Link href="/create-exercise" passHref>
                            <Button color="inherit">Create Exercise Log</Button>
                        </Link>
                        <Button color="inherit">Create User</Button>
                    </Toolbar>
                </AppBar>
            </nav>
        )
    //}
}