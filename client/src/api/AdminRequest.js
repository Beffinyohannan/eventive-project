import adminInstance from "../axios/adminAuth";
import axios from "./axios";

export const graphPost =()=>adminInstance.get('/admin/postGraphInfo')

export const viewPostAdmin =()=>adminInstance.get('/admin/posts')

export const userView =()=>adminInstance.get('/admin/users')

export const companyView =()=>adminInstance.get('/admin/companies')