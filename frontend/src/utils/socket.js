import io from 'socket.io-client'
import { Base_Url } from './constants'

export const createSocketConnection = ()=>{
    return io(Base_Url)
}