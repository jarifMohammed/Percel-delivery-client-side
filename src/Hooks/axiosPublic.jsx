import axios from 'axios';



const publicAxios = axios.create({
    baseURL:'https://quick-drop-server-opal.vercel.app'
})

const axiosPublic = () => {
    return publicAxios
};

export default axiosPublic;