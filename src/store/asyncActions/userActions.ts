import { auth } from '../reducers/userReduser';
import axios, { AxiosError } from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { Dispatch } from '@reduxjs/toolkit';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`;

export const fetchSignUp = (data: object) => {
  return (dispatch: Dispatch): void => {
    const url: string = `${GENERAL_URL}/signup`;
    axios.post(url, data, { 
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": url,
      },
    }).then(response => {
        dispatch(auth(response.data));
    }).catch((e: AxiosError )=> {
      alert(e.response?.data);
    });
  }
};

export const fetchSignIn = (data: object) => {
  return (dispatch: Dispatch): void => {
    const url: string = `${GENERAL_URL}/signin`;
    axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": url,
      },
    }).then(response => {
      dispatch(auth(response.data));
    }).catch((e: AxiosError )=> {
      alert(e.response?.data);
    });
  }
};
