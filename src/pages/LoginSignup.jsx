import * as React from "react";
import { connect } from "react-redux";

// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { login, signup } from '../store/user.action.js';
import { utilService } from '../services/utils.service.js'

const theme = createTheme();

class _LoginSignup extends React.Component {
    state = {
        isSignup: false,
        isSigninInProgress: ""
    };

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
            { user && this.props.history.push('/2day/board') }

        } else {
            if (!user.username || !user.password || !user.fullname) return;
            if (!user.fullname.includes(' ')) return
            user.acronyms = utilService.getUserAcronyms(user)
            user.userColor = utilService.getNiceRandomColor()
            this.props.signup(user)
            this.props.history.push('/2day/board');
        }
    }

    goToHomepage = () => {
        this.props.history.push('/')
    }


    // signIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       this.setState({ userInfo });
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (f.e. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    //   };


    render() {
        return (
            <section className="login-signup">
                {/* 
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} /> */}
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
                            <Avatar style={{ margin: 1, backgroundColor: "#dd5240" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {this.state.isSignup ? "Sign up" : " Log in"}
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
                                <div className="links-container flex">
                                    <Grid item xs>
                                        <Link variant="body2" onClick={this.toggleSignup}>
                                            {this.state.isSignup ? "Already have an account? Log in" : "Dont have an account? Sign up"}
                                        </Link>
                                    </Grid>
                                </div>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </section>
        )
    }
}

const mapDispatchToProps = {
    login,
    signup
}

export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup)
