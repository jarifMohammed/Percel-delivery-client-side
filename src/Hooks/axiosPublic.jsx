import axios from 'axios';



const publicAxios = axios.create({
    baseURL:'http://localhost:3000'
})

const axiosPublic = () => {
    return publicAxios
};

export default axiosPublic;