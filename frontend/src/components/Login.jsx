import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../utils/constants';
import toast from 'react-hot-toast';

// const Login = () => {
//   const [emailId, setEmailId] = useState("Duggu@gmail.ac.in");
//   const [seePassword,setSeePassword] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("Duggu@123");
//   const [error, setError] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${Base_Url}/login`, {
//         emailId,
//         password,
//       }, { withCredentials: true });

//       dispatch(addUser(res.data));
//       toast.success("Login Successful")
//       navigate('/');
//     } catch (error) {
//       setError(error?.response?.data || "Something went wrong");
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const res = await axios.post(`${Base_Url}/signup`, {
//         firstName,
//         lastName,
//         emailId,
//         password,
//       }, { withCredentials: true });

//       dispatch(addUser(res.data.data));
//       navigate('/profile');
//     } catch (error) {
//       setError(error?.response?.data || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br">
//       <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-sm border border-gray-300">
//         <h2 className="text-3xl font-bold text-center  mb-6">
//           {isLoggedIn ? "Welcome Back" : "Create Account"}
//         </h2>

//         <form className="space-y-4">
//           {!isLoggedIn && (
//             <>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">First Name</label>
//                 <input
//                   placeholder='Durgesh'
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//                 <input
//                   placeholder='Agrahari'
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email ID</label>
//             <input
//               placeholder='Duggu@gmail.ac.in'
//               type="email"
//               value={emailId}
//               onChange={(e) => setEmailId(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               placeholder='Duggu@123'
//               type={seePassword?"text":"password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
//           )}

//           <button
//             type="button"
//             onClick={isLoggedIn ? handleLogin : handleSignup}
//             className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
//           >
//             {isLoggedIn ? "Login" : "Sign Up"}
//           </button>

//           <p
//             onClick={() => setIsLoggedIn((prev) => !prev)}
//             className="text-center text-indigo-600 hover:underline mt-4 cursor-pointer text-sm"
//           >
//             {isLoggedIn
//               ? "Don't have an account? Sign up here"
//               : "Already have an account? Login here"}
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




const Login = () => {
  const [state, setState] = React.useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = React.useState("Duggu@gmail.ac.in");
  const [password, setPassword] = React.useState("Duggu@123");
  const [error, setError] = useState('');
  const [seePassword,setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(state==='login'){
      try {
        const res = await axios.post(`${Base_Url}/login`, {
          emailId,
          password,
        }, { withCredentials: true });
        console.log(res.data)
        dispatch(addUser(res.data));
        toast.success("Login Successful")
        navigate('/');
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    }else{
      try {
        const res = await axios.post(`${Base_Url}/signup`, {
          firstName,
          lastName,
          emailId,
          password,
        }, { withCredentials: true });
        toast.success("Register Successful")
        dispatch(addUser(res.data.data));
        navigate('/profile');
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    }
  };

  return (
      <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()}  className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white mt-16">
          <p className="text-2xl font-medium m-auto">
              <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
          </p>
          {state === "register" && (
            <>

              <div className="w-full">
                  <p>FirstName</p>
                  <input onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="type here firstName" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
              </div>
              <div className="w-full">
                  <p>LastName</p>
                  <input onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="type here lastName" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
              </div>
            </>
          )}
          <div className="w-full ">
              <p>Email</p>
              <input onChange={(e) => setEmailId(e.target.value)} value={emailId} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
          </div>
          <div className="relative w-full">
            <input
              placeholder="Duggu@123"
              type={seePassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              <img
                src={seePassword ? "/view.png" : "/hide.png"}
                alt="toggle"
                className="w-6 h-6"
              />
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
           )}
          {state === "register" ? (
              <p>
                  Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
              </p>
          ) : (
              <p>
                  Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
              </p>
          )}
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
              {state === "register" ? "Create Account" : "Login"}
          </button>
      </form>
  );
};

export default Login