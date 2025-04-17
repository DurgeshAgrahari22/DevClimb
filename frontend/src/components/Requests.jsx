import axios from 'axios';
import React, { useEffect } from 'react'
import { Base_Url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import RequestBox from './RequestBox';
import { addRequests } from '../utils/requestsSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=>store.requests)
    const requestReceived = async()=>{
        try {
            const fetchRequest = await axios.get(Base_Url+"/user/requests/received",{withCredentials:true});
            dispatch(addRequests(fetchRequest.data.data));
            console.log(requests)
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(()=>{
        requestReceived();
    },[])

    if(!requests)return ;
    if(requests.length===0) {
        return (
        <div>
            <h1 className="flex justify-center font-bold text-3xl my-7">No Requests Found</h1>
        </div>
        )
    }

  return (
        requests.map((request)=>{
            return (
                <div key={request._id}>
                <RequestBox data={request}/>
                </div>
            )
        })
    );
}

export default Requests