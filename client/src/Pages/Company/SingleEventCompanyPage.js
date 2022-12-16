import React from 'react'
import CompanyBottomNavbar from '../../Components/Company/Sidebar/CompanyBottomNavbar'
import CompanySidebar from '../../Components/Company/Sidebar/CompanySidebar'
import SingleView from '../../Components/User/Event/SingleView'


function SingleEventCompanyPage() {

    return (
        <div>
            <CompanySidebar />
            <div className='w-full flex justify-center h-full  md:justify-end lg:justify-center  pt-3 bg-slate-50 '>
                <div className='w-full sm:w-4/5  md:pl-5 md:pr-3  flex justify-center lg:justify-end'>
                    <SingleView company={true} />
                </div>
            </div>

            <CompanyBottomNavbar />
        </div>
    )
}

export default SingleEventCompanyPage