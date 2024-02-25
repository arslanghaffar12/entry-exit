
import axios from 'axios'
import { setLogin } from '../redux/actions/auth';
import { enums, storage } from './common';

const baseUrl = "http://localhost:4200/";

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

        // Dispatch successful login action
        requestData.dispatch(setLogin(response.data)); // Replace with your actual dispatch function

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