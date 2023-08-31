"use client"

import axios from "axios"

const BASE_URL = "http://localhost:4000"

const AXIOSAPI = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        Authorization: typeof localStorage !== undefined ? `Bearer ${localStorage.getItem('token')}` : ''
    }
    // withCredentials: true,
})

export default AXIOSAPI;