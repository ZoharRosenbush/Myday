// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { userService } from "../services/userService";

// const theme = createTheme();
// // console.log('theme', theme);

// export class Login extends React.Component {
//   state = {
//     isSignin: false,
//   };

//   toggleSignin = () => {
//     this.setState({ isSignin: !this.state.isSignin });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const user = {
//       fullname: data.get("fullname"),
//       username: data.get("username"),
//       password: data.get("password"),
//       isAdmin : false
//     };
//     if (!user.fullname) {
//         const username = {
//             username: data.get("username"),
//             password: data.get("password"),
//           };
//     //   userService.login(username);
//       this.props.onLogin(username)
//     } else {
//     //   userService.signup(user);
//       this.props.onSignup(user)

//     }
//   };
//   render() {
      
//     // <h3 onClick={this.props.logout}>{this.props.user? "Logout" : ""}</h3> 
// console.log('this.props.user', this.props.user);
// const {user} = this.props
//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             style={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar style={{ margin: 1, backgroundColor: "#9c27b0" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//             {!user ? !this.state.isSignin ? "Sign in" : " Log in" : "Log out"}
//             </Typography>
//             {!user && 
//             <Box
//               component="form"
//               onSubmit={this.handleSubmit}
//               noValidate
//               style={{ marginTop: 1 }}
//             >
//               {this.state.isSignin && (
//                 <React.Fragment>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="User name"
//                     name="username"
//                     // autoComplete="email"
//                     autoFocus
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                   />
//                 </React.Fragment>
//               )}
//               {!this.state.isSignin && (
//                 <React.Fragment>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="fullname"
//                     label="Full name"
//                     name="fullname"
//                     // autoComplete="email"
//                     autoFocus
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="User name"
//                     name="username"
//                     // autoComplete="email"
                   
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                   />
//                 </React.Fragment>
//               )}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 style={{ marginTop: 3, marginBottom: 2 }}
//               >
//                 {!this.state.isSignin ? "Sign In" : " Log In"}
//               </Button>
//               <Grid item xs>
//                 <Link href="#" variant="body2" onClick={this.toggleSignin}>
//                 {!this.state.isSignin ?  "Already have an account?": "Dont have an account?"} 
//                 </Link>
//               </Grid>
//             </Box>}
//             {user && <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 style={{ marginTop: 3, marginBottom: 2 }}
//                 onClick={()=>this.props.onLogout()}
//               >
//                Log out
//               </Button>}
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }
// }
