import axios from "axios";
import {
  regStart,
  regSuccess,
  regFailure,
  profUpdateStart,
  profUpdateSuccess,
  profUpdateFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  postUpdateStart,
  postUpdateSuccess,
  postUpdateFailure
} from "./userSlice";


export const regAction = async (dispatch, user) => {
  dispatch(regStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/register",
      user
    );
    console.log(res.data);
    dispatch(regSuccess(res.data));
  } catch (err) {
    dispatch(regFailure());
  }
};

export const logAction = async (dispatch, user) => {
  dispatch(regStart());
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", user);
    console.log(res.data);
    dispatch(regSuccess(res.data));
  } catch (err) {
    dispatch(regFailure());
  }
};

export const profUpdateAction = async (dispatch, user, userID) => {
  dispatch(profUpdateStart());
  try {
    const res = await axios.put(`http://localhost:8800/api/users/${userID}`, user);
    console.log(res)
    dispatch(profUpdateSuccess(res.data));
  } catch (err) {
    dispatch(profUpdateFailure());
  }
};

export const getUserAction = async (dispatch, userID) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`http://localhost:8800/api/users/get/userDetails/${userID}`);
    console.log(res)
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const postUpdateAction = async (dispatch, user) =>{
  dispatch(postUpdateStart());
  try{
    const res = await axios.post("http://localhost:8800/api/posts", user);
    console.log(res.data)
    dispatch(postUpdateSuccess(res.data));
  }catch(err){
    dispatch(postUpdateFailure());
  }
}
