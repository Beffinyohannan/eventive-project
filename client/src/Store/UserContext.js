import {createContext,useState} from 'react'

export const  UserContext = createContext('')

function User({children})
{

    const defaultUser = JSON.parse(localStorage.getItem('user'))

const [userDetails,setUserDetails] = useState(defaultUser)
// useEffect(()=>{
//     setUserDetails(defaultUser)
// },[])
// console.log(userDetails,'+++++++++++++++++++++++++++++++++++');

return(
    <UserContext.Provider value={{userDetails,setUserDetails}}>
        {children}
    </UserContext.Provider>
)
} 

export default User;