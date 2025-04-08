import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_Url } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const EditUser = async () => {
    setError("");
    try {
      if(!user)return ;
      // console.log(about)
      const response = await axios.patch(
        `${Base_Url}/profile/edit`,
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data));
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data || "An error occurred. Try again.");
    }
  };
  
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);    // name to be same as in backend multer
    setUploading(true);

    try {
      const res = await axios.post(`${Base_Url}/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setPhotoUrl(res.data?.imageUrl);
    } catch (err) {
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-center text-3xl font-bold mb-6">Edit Profile</h2>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-xl shadow-lg border-4 border-blue-500"
          />
        </div>
         <label className="block text-center mb-4">
          <input
            type="file"
            className="block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
            onChange={handlePhotoUpload}
          />
          {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
        </label>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <select
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>

          <input
            type="number"
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
          />

          <textarea
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="About You"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Profile Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Save Button */}
        <div className="text-center mt-6">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
            onClick={EditUser}
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Updated Profile Preview */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-6 w-full max-w-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-pink-500"
          />
          <h3 className="text-2xl font-semibold mt-4">{firstName} {lastName}</h3>
          <p className="text-lg text-gray-600">{gender}, {age}</p>
          <p className="text-lg text-center mt-2 px-4">{about}</p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md text-lg">
          Profile Updated Successfully! ✅
        </div>
      )}
    </div>
  );
};

export default EditProfile;
