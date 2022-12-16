import axios from "./axios";

export const graphPost =()=>axios.get('/admin/postGraphInfo')

export const viewPostAdmin =()=>axios.get('/admin/posts')

export const userView =()=>axios.get('/admin/users')

export const companyView =()=>axios.get('/admin/companies')