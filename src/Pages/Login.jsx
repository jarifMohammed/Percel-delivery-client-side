import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/Providers/AuthProvider";
import axiosPublic from "@/Hooks/axiosPublic";

const Login = () => {
  const {googleSignIn} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const {signIn} =useContext(AuthContext) 
    const axios = axiosPublic()

    const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data; // Extract email and password from form data
    signIn(email, password)
      .then((response) => {
        console.log(response);
        navigate(from, { replace: true }); // Redirect after successful login
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/user-not-found") {
          // If email is not found in Firebase, show an alert and redirect to the signup page
          alert("This email is not registered. Please sign up.");
          navigate("/signup"); // Redirect to signup page
        } else {
          // Handle other errors (wrong password, etc.)
          alert("Login failed. Please check your credentials.");
        }
      });
  };
  const handlegoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      // console.log(result.user);
      const userInfo ={
        email:result.user?.email,
        name:result.user?.displayName,
        role:"user",
        photo:result.user?.photoURL

      }
      axios.post('/users',userInfo)
      navigate('/')
    })

  }


  return (
    <div className="flex min-h-screen items-center  justify-center bg-slate-50 px-4">
      <div className="bg-white  shadow-lg rounded-3xl p-6 sm:p-8 flex flex-col-reverse lg:flex-row w-full max-w-4xl">
        {/* Left Section: Form */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">
            Start your website in seconds. Don’t have an account?{" "}
            <a  className="text-green-700">
              <Link to='/signup'>Sign Up</Link>
            </a>
            .
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
            >
              Sign in to your account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <button onClick={handlegoogleSignIn} className="w-full mb-2 flex items-center justify-center space-x-2 bg-gray-100 py-2 px-4 rounded-md shadow hover:bg-gray-200">
          <GoogleIcon className="text-blue-600" />
            <span>Sign in with Google</span>
          </button>
          
        </div>

        {/* Right Section: Animation */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mb-6 lg:mb-0">
          <iframe
            className="h-64 w-full max-w-sm lg:h-80 lg:max-w-md"
            src="https://lottie.host/embed/fc93badf-e578-4d21-b538-1844d9ec2bd8/EIHr0Lxmfu.lottie"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Login;
