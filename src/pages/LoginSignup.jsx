import * as React from "react";
import { connect } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { login, signup } from '../store/user.action.js';

const theme = createTheme();
// console.log('theme', theme);

class _LoginSignup extends React.Component {
    state = {
        isSignup: false
    };

    // clearState = () => {
    //     const clearTemplate = {
    //         credentials: userService.getEmptyUser(),
    //         isSignup: false
    //     }
    //     this.setState(clearTemplate)
    // }


    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            fullname: data.get("fullname"),
            username: data.get("username"),
            password: data.get("password"),
            isAdmin: false
        };
        if (!user.fullname) {
            const username = {
                username: data.get("username"),
                password: data.get("password"),
            };
            if (!username.username || !username.password) return;
            const user = await this.props.login(username)
            { user && this.props.history.push('/myday/board'); }

        } else {
            if (!user.username || !user.password || !user.fullname) return;
            this.props.signup(user)
            this.props.history.push('/myday/board');
        }
    }



render() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    style={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar style={{ margin: 1, backgroundColor: "#9c27b0" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {this.state.isSignin ? "Sign in" : " Log in"}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={this.handleSubmit}
                        noValidate
                        style={{ marginTop: 1 }}
                    >
                        {!this.state.isSignup && (
                            <React.Fragment>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User name"
                                    name="username"
                                    // autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </React.Fragment>
                        )}
                        {this.state.isSignup &&
                            <React.Fragment>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full name"
                                    name="fullname"
                                    // autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User name"
                                    name="username"
                                // autoComplete="email"

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </React.Fragment>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ marginTop: 3, marginBottom: 2 }}

                        >
                            {this.state.isSignup ? "Sign up" : " Log In"}
                        </Button>
                        <Grid item xs>
                            <Link variant="body2" onClick={this.toggleSignup}>
                                {this.state.isSignup ? "Already have an account? Log in" : "Dont have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
}

const mapDispatchToProps = {
    login,
    signup
}

export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup)
