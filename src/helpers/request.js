
import axios from 'axios'
import { setLogin } from '../redux/actions/auth';
import { enums, storage } from './common';
import { jwtDecode } from 'jwt-decode'

const baseUrl = "http://13.39.60.248:8000/"

// http://localhost:4200/login

const defaultUser = { login: false, token: "" };
export var user = storage.getParsed(enums.USER, defaultUser);


export const loginRequest = async (requestData) => {
    try {
        const headers = {
            // Add your required headers here, e.g.,
            'Content-Type': 'application/json', // Assuming JSON data
            'Authorization': `Bearer ${user?.token}`, // Example using access token from localStorage
        };
        const response = await axios.post(baseUrl + "user/authenticate", requestData.data, {
            // Optional configuration options like headers, timeout, etc.
        });

        let userData = {}

        if (response && response.data.status) {
            userData = jwtDecode(response.data.data);

        }





        user = { ...response.data, token: response.data.data, userData }
        // Dispatch successful login action
        requestData.dispatch(setLogin({ ...response.data, token: response.data.data, userData })); // Replace with your actual dispatch function

        return response.data; // Return the response data for potential further use
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; // Extract error message

        console.log('errorMessage ===', errorMessage);
        // Dispatch login error action
        //   dispatchLoginError(errorMessage); // Replace with your actual dispatch function

        throw error; // Re-throw the error for further handling
    }
};


export const heatmapRequest = async (requestData) => {
    try {
        const headers = {

            // Add your required headers here, e.g.,
            'Content-Type': 'application/json', // Assuming JSON data
            'Authorization': `Bearer ${user?.token}`, // Example using access token from localStorage
        };
        const response = await axios.post(baseUrl + "heatmap/getHeatmap", requestData.data, {
            // Optional configuration options like headers, timeout, etc.
        });

        // Dispatch successful login action
        // requestData.dispatch(setHeatmap(response.data)); // Replace with your actual dispatch function

        return response.data; // Return the response data for potential further use
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; // Extract error message

        console.log('errorMessage ===', errorMessage);
        // Dispatch login error action
        //   dispatchLoginError(errorMessage); // Replace with your actual dispatch function

        throw error; // Re-throw the error for further handling
    }
};


export const footfallRequest = async (requestData) => {
    try {
        const headers = {
            // Add your required headers here, e.g.,
            'Content-Type': 'application/json', // Assuming JSON data
            'Authorization': `Bearer ${user?.token}`, // Example using access token from localStorage
        };

        const response = await axios.post(baseUrl + "fcache/getSummary", requestData.data, {
            // Optional configuration options like headers, timeout, etc.
        });

        // Dispatch successful login action
        // requestData.dispatch(setHeatmap(response.data)); // Replace with your actual dispatch function

        return response.data; // Return the response data for potential further use
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; // Extract error message

        console.log('errorMessage ===', errorMessage);
        // Dispatch login error action
        //   dispatchLoginError(errorMessage); // Replace with your actual dispatch function

        throw error; // Re-throw the error for further handling
    }
};