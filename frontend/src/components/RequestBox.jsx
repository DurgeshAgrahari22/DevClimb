import axios from 'axios';
import React from 'react'
import { Base_Url } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestsSlice';

const RequestBox = ({ data }) => {
    const dispatch = useDispatch();
    const handleRequest = async(status,_id)=>{
        try {
            await axios.post(Base_Url+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const request = data.fromUserId;
    return (
        <div className="flex items-center bg-white shadow-md rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto my-4">
            {/* Profile Image */}
            <img src={request.photoUrl} 
                alt="User Profile" 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />

            {/* User Info */}
            <div className="flex flex-col flex-grow ml-4">
                <h2 className="font-semibold text-lg">{request.firstName+" "+request.lastName}</h2>
                <p className="text-gray-600 text-sm">Age: {request.age} | Gender: {request.gender}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button 
                className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={()=>handleRequest("accepted",data._id)}
                >
                    Accept
                </button>
                <button 
                className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={()=>handleRequest("rejected",data._id)}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default RequestBox