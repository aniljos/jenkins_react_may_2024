import axios from "axios";
import {store} from '../redux/store'

axios.interceptors.request.use((config) => {

    const state = store.getState();
    const accessToken = state.auth.accessToken;
    const baseUrl = "http://localhost:9000";
    const loginUrl = `${baseUrl}/login`;
    if(config.url !== loginUrl 
                && config.url?.startsWith(baseUrl) 
                && accessToken){

        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})