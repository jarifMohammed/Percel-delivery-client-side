import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/Providers/AuthProvider";
import axiosPublic from "@/Hooks/axiosPublic";

export default function SignUp() {
    const axios = axiosPublic()
    const navigate =useNavigate()
    const {createuser, updateUserProfile} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fullName = `${data.firstName} ${data.lastName}`
    createuser(data.email,data.password)
    .then(res => {
        const loggeduser = res.user
        // console.log(loggeduser);
        updateUserProfile(fullName , data.photoURL)
        .then(() => {
            // create user info
            const userInfo = {
                name: fullName,
                email:data.email,
                photo:data.photoURL,
                role:data.role,
                phone:data.phone
              }
              axios.post('/users',userInfo)

        })
        navigate('/')
    })

    // console.log(data);
    // Handle form submission here
  };

  const password = watch("password");

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4 bg-gray-50 h-full">
          
            
            <iframe className="max-w-[80%] w-full h-full aspect-square object-contain block mx-auto" src="https://lottie.host/embed/8a5a3db2-cb33-4ae3-bda2-38dab0de2380/i7B7yHrj12.lottie"></iframe>
         
        </div>

        <div className="flex items-center p-6 h-full w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg w-full mx-auto"
          >
            <div className="mb-8">
              <h3 className="text-blue-500 text-2xl font-bold max-md:text-center">
                Create an account
              </h3>
            </div>

            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mt-6">
              <label className="text-gray-800 text-xs block mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role Select */}
            <div className="mt-6">
              <label className="text-gray-800 text-xs block mb-2">
                Select Role
              </label>
              <Select
                onValueChange={(value) => setValue("role", value)}
                required
              >
                <SelectTrigger className="w-full border-b border-gray-300 rounded-none px-2 py-3 focus:border-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="deliveryman">Delivery Man</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="mt-6">
              <label className="text-gray-800 text-xs block mb-2">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    
                    
                  })}
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="mt-6">
  <label className="text-gray-800 text-xs block mb-2">
    Profile Photo URL
  </label>
  <input
    type="text"
    {...register("photoURL", {
      required: "Profile photo URL is required",
      
    })}
    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
    placeholder="Enter image URL (e.g., https://example.com/photo.jpg)"
  />
  {errors.photoURL && (
    <p className="text-red-500 text-xs mt-1">
      {errors.photoURL.message}
    </p>
  )}
  <div className="mt-1 text-sm text-gray-500">
    Enter the URL of your profile picture (supports JPG, PNG, GIF, SVG, WEBP)
  </div>
</div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-6">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="h-4 w-4 shrink-0 rounded"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-800">
                I accept the{" "}
                <a href="#" className="text-blue-500 font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm tracking-wider rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
              >
                Create an account
              </button>
              <p className="text-sm mt-6 text-gray-800">
                Already have an account?{" "}
                <a  className="text-blue-500 font-semibold hover:underline">
                 <Link to='/login'> Login here</Link>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}