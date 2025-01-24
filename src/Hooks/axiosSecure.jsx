import axios from 'axios'

// Create basic axios instance without interceptors
const axiosUrl = axios.create({
    baseURL: 'http://localhost:3000'
})

const axiosSecure = () => {
    return axiosUrl
}

export default axiosSecure