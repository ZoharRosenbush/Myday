// import { storageService } from "./async-storage.service.js";
// const STORAGE_KEY = "user";
import Axios from "axios";
import { httpService } from "./http.service";

var axios = Axios.create({
  withCredentials: true,
});
const STORAGE_KEY_LOGGEDIN = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getEmptyUser
};


async function login(credentials) {
  try {
    const user = await httpService.post("auth/login", credentials);
    if (user) _setLoggedinUser(user);
    return user;
  } catch (err) {
    console.log("err login", err);
  }
}
async function signup(user) {
  try {
    const signedupUser = await httpService.post("auth/signup", user);
    _setLoggedinUser(signedupUser);
    return signedupUser
  } catch (err) {
    console.log("err signup", err);
  }
}
async function logout() {
  try {
    await httpService.post("auth/logout");
  } catch (err) {
    console.log(err, "err");
    throw new Error(err);
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null);
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function _setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
}

function getEmptyUser() {
  return {
      username: '',
      password: '',
      fullname: '',
  }
}
// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22})
// userService.login({ username: 'muki', password: 'muki1' })
