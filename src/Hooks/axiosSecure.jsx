import { AuthContext } from '@/Providers/AuthProvider'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


// Create basic axios instance without interceptors
const axiosUrl = axios.create({
    baseURL: 'https://quick-drop-server-opal.vercel.app'
})



const axiosSecure = () => {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    axiosUrl.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        //console.log('request stoppend by interceptor', token);
        config.headers.authorization = `Bearer ${token}`
        return config
    },function(error){
        return Promise.reject(error)
    })
    axiosUrl.interceptors.response.use(function(response){
        return response
    }, async (error)=>{
        const status = error.response.status 
        if(status === 401 || status === 403){
            await logout()
            navigate('/login')
        }
        return Promise.reject(error)

    })
    return axiosUrl
}

export default axiosSecure