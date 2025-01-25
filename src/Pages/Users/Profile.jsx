import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/Providers/AuthProvider";
import axiosPublic from "@/Hooks/axiosPublic";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axios = axiosPublic();
  const imageHostingKey = import.meta.env.VITE_IMAGE;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const [previewImage, setPreviewImage] = useState("");

  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Set initial values
  useEffect(() => {
    if (userData) {
      setValue("firstName", userData?.name?.split(" ")[0] || "");
      setValue("lastName", userData?.name?.split(" ").slice(1).join(" ") || "");
      setValue("email", userData.email || "");
      setValue("phone", userData.phone || "");
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    let imageUrl = userData.photo; // Fallback to existing photo URL

    // Handle image upload
    if (data.image?.[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      try {
        const res = await fetch(imageHostingApi, {
          method: "POST",
          body: formData,
        });
        const imgData = await res.json();
        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        }
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Failed to upload the image.");
        return;
      }
    }

    const fullName = `${data.firstName} ${data.lastName}`;

    // Update user profile
    try {
        const updatedUserData = {
          name: fullName.trim(),
          phone: data.phone,
          photo: imageUrl || "",
        };
        await axios.patch(`/users/${user?.email}`, updatedUserData);
        alert('profile updated succesfully')
      } catch (error) {
        console.error("Error updating profile", error);
        alert("Failed to update the profile.");
      }
      
    }

  if (isLoading || !userData)
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-200">
            Profile Photo
          </label>
          <div className="flex items-center space-x-6">
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={previewImage || userData.photo || "#"}
              alt="Profile preview"
            />
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-lg text-gray-700 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-4 bg-gray-50 dark:bg-gray-800"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
            <label className="absolute text-lg text-gray-500 transform -translate-y-6 scale-75 top-3">
              First Name
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
            <label className="absolute text-lg text-gray-500 transform -translate-y-6 scale-75 top-3">
              Last Name
            </label>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative z-0 w-full group">
            <input
              readOnly
              type="email"
              {...register("email", { required: "Email is required" })}
              className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
            <label className="absolute text-lg text-gray-500 transform -translate-y-6 scale-75 top-3">
              Email Address
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone.message}</span>
            )}
            <label className="absolute text-lg text-gray-500 transform -translate-y-6 scale-75 top-3">
              Phone Number
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 px-8 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;