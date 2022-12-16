import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { eventDetail, singleEventPost } from '../../../api/CompanyRequest'

import Post from '../Post/Post'
import EventsView from './EventsView'

function SingleView({ company }) {

  const eventId = useParams().id
  const [singlePost, setSinglePost] = useState([])
  const [details, setDetails] = useState('')
  


  console.log(company, 'llll');

  useEffect(() => {
    const singleEvent = async () => {
      try {
        const { data } = await singleEventPost(eventId)
        // console.log(data, '666666666');
        setSinglePost(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    singleEvent()
  }, [])

  useEffect(() => {
    const details = async () => {
      try {
        const { data } = await eventDetail(eventId)
        console.log(data, 'qwerty');
        setDetails(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    details()
  }, [])


  


  return (

    <div className='w-full mt-24 lg:w-4/5 mb-4'>
      <div className='w-full bg-white shadow-md '>
        <div className='w-full h-96 sm:p-2 '
        //  style={{ backgroundImage: `URL('https://imgs.search.brave.com/xDC2eSrEPNnxYNxdVbV6P_QQHY4D8TcRne76bTbmufk/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5P/UEl6VjZSY054a0ZJ/aTM1Q3ZGRnpRSGFF/OCZwaWQ9QXBp')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionY: 'center' }}
        >
          <img className='w-full h-96' src={'http://localhost:5000/images/' + details.image} />
        </div>
        <div className='flex'>
          <div className="w-full px-4 py-3 flex  justify-start">

            <div className='ml-5 pt-2 '>
              <h3 className="text-3xl font-bold leading-normal  text-blueGray-700 mb-2">{details.event}</h3>
              <p className='text-lg'>{details.description}</p>
              
            </div>

          </div>

        </div>

        <div className="w-full px-4 text-center mt-1">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 gap-3 flex text-center">
              <span className="text-md font-semibold text-blueGray-400 underline">{details.event} Posts</span>
              {/* <span className="text-sm font-semibold text-blueGray-400 underline">Companies</span> */}
            </div>
          </div>
        </div>
        <div className=' pb-12  '>
          {singlePost.map((obj) => (
            <div className='flex   justify-center'>
              {company ?
              <Post obj={obj} company={company} /> :
              <Post obj={obj} />  
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleView