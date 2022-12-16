import {createContext,useState} from 'react'

export const  CompanyContext = createContext('')

function Company({children})
{

    const defaultCompany = JSON.parse(localStorage.getItem('company'))

const [companyDetails,setCompanyDetails] = useState(defaultCompany)

return(
    <CompanyContext.Provider value={{companyDetails,setCompanyDetails}}>
        {children}
    </CompanyContext.Provider>
)
} 

export default Company;