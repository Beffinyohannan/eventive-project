import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios'
import companyInstance from '../../../axios/companyAuth'
import { CompanyContext } from '../../../Store/CompanyContext'
import InboxDetails from './InboxDetails'

function InboxCompany() {
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const companyId = companyDetails._id
    const [state, setState] = useState([])
    const [enquire, setEnquire] = useState(true)
    const [rej, setRej] = useState(false)
    const [approve, setApprove] = useState(false)
  
    const handleEnquire = (e) => {
        e.preventDefault()
        setEnquire(true)
    }
    const handleApprove = (e) => {
        e.preventDefault()
        setEnquire(false)
        setRej(true)
    }
    const handleReject = (e) => {
        e.preventDefault()
        setEnquire(false)
        setRej(false)
    }

    useEffect(() => {
        companyInstance.get(`/company/inbox/${companyId}`).then((res) => {
            console.log(res.data);
            setState(res.data)
        })
    }, [approve])


    return (
        <div className=' flex md:justify-end bg-slate-50'>
            <section className=" w-full md:w-10/12 lg:w-10/12 antialiased  text-gray-600 h-screen pl-8">
                <div className="flex flex-col  justify-center pt-20  px-5  ">
                    <div className="w-full mb-5   lg:w-4/5 mx-auto px-5 py-2 bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className=" flex gap-4 px-5 py-4 border-b border-gray-100 mb-5">
                            <h2 className={`font-semibold rounded-2xl px-2 py-1 cursor-pointer ${enquire ? ' bg-slate-500 text-white' : 'text-gray-800'}`} onClick={handleEnquire}>Enquires</h2>
                            <h2 className={`font-semibold rounded-2xl px-2 py-1 cursor-pointer ${!enquire && rej ? ' bg-slate-500 text-white' : 'text-gray-800'}`} onClick={handleApprove}>Accepted</h2>
                            <h2 className={`font-semibold rounded-2xl px-2 py-1 cursor-pointer ${!enquire && !rej ? ' bg-slate-500 text-white' : 'text-gray-800'} `} onClick={handleReject}>Rejected</h2>
                        </header>
                        {enquire ?
                            <div>
                                {
                                    state.filter(obj => obj.status == 'pending').map((obj, index) => (
                                        <InboxDetails pending={true} approve={approve} setApprove={setApprove} data={obj}  />
                                    ))}
                            </div>
                            :
                            (rej ?
                                <div>
                                    {
                                        state.filter(obj => obj.status == 'accepted' || obj.status == 'replayed' ).map((obj, index) => {
                                            return (
                                                    <InboxDetails approved={true} approve={approve} setApprove={setApprove} data={obj} />
                                            )
                                        })}
                                </div> :
                                <div>
                                    {
                                        state.filter(obj => obj.status == 'rejected').map((obj, index) => {
                                            return (
                                                <InboxDetails data={obj}  />
                                            )
                                        })}
                                </div>
                            )
                        }

                    </div>
                </div>
            </section>
        </div>
    )
}

export default InboxCompany