import axios from "./axios";

export const userChats = (id)=>axios.get(`/chat/${id}`)

export const getMessages =(id)=>axios.get(`/message/${id}`)

export const addMessage =(data)=>axios.post('/message/',data)

