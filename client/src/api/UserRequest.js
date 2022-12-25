import userInstance from "../axios/userAuth";
import axios from "./axios";


export const userSignup = (signupData)=> axios.post('/signup',signupData )

export const userLogin = (signupData)=> axios.post('/login',signupData )

export const sendOtp = (data) =>axios.post(`/signup/sendOtp`,data)

export const validateOtp = (otp) => axios.post(`/singnUp/otp/verify`,otp)

export const resendOtpCall = (data)=>axios.post(`/signup/otp/resend`,{email:data})

export const getUserDetail = (userId)=> userInstance.get(`/userDetail/${userId}`)

export const approveQuotation = (id)=> userInstance.put(`/accept-quotation/${id}`)

export const rejectQuotation = (id)=> userInstance.put(`/reject-quotation/${id}`)

export const reportUserPost =(reason,postId,userId)=>axios.post(`/report-post/${postId}`,{reason,userId})

export const findSearch = (data)=> userInstance.get(`/user/search/${data}`)
