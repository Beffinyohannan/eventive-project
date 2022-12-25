import companyInstance from "../axios/companyAuth";
import userInstance from "../axios/userAuth";
import axios from "./axios";


export const getUser = (userId)=> companyInstance.get(`/company/${userId}`)

export const approveEnq = (id)=> companyInstance.put(`/company/accept-form/${id}`)

export const rejectEnq = (id)=> companyInstance.put(`/company/reject-form/${id}`)

export const postViewCompany =()=>companyInstance.get('/company/postView')

// export const postEvent =(data)=>axios.post('/company/addEvent')

export const viewEvents =()=>companyInstance.get('/company/view/event')

export const userViewEvents =()=>userInstance.get('/company/view/event')

export const singleEventPost =(eventId)=>companyInstance.get(`/company/event/singlePost/${eventId}`)

export const userSingleEventPost =(eventId)=>userInstance.get(`/company/event/singlePost/${eventId}`)

export const eventDetail =(eventId)=>companyInstance.get(`/company/event/details/${eventId}`)

export const userEventDetail =(eventId)=>userInstance.get(`/company/event/details/${eventId}`)

export const findSearchCompany = (data)=> companyInstance.get(`/user/search/${data}`)

// export const eventShow =()=>axios.get('/company/event-show')