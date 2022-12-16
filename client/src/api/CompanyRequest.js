import axios from "./axios";


export const getUser = (userId)=> axios.get(`/company/${userId}`)

export const approveEnq = (id)=> axios.put(`/company/accept-form/${id}`)

export const rejectEnq = (id)=> axios.put(`/company/reject-form/${id}`)

export const postViewCompany =()=>axios.get('/company/postView')

// export const postEvent =(data)=>axios.post('/company/addEvent')

export const viewEvents =()=>axios.get('/company/view/event')

export const singleEventPost =(eventId)=>axios.get(`/company/event/singlePost/${eventId}`)

export const eventDetail =(eventId)=>axios.get(`/company/event/details/${eventId}`)

// export const eventShow =()=>axios.get('/company/event-show')