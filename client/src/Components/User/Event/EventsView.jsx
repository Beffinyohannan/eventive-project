import React from 'react'
import { Link } from 'react-router-dom'

function EventsView({obj,company}) {
    return (
        
        <div class="max-w-sm rounded h-[500px] overflow-hidden shadow-lg bg-white  ">
            <img class="w-full h-52" src={'http://localhost:5000/images/' + obj.image} alt="Sunset in the mountains" />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                    {company?
                    <Link to={`/company/SingleEvents/${obj._id}`}>{obj.event}</Link> :
                    <Link to={`/SingleEvents/${obj._id}`}>{obj.event}</Link> 
                    
                    }
                     </div>
                <p class="text-gray-700 text-base">
                    {obj.description}
                </p>
            </div>
            {/* <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div> */}
        </div>
       
    )
}

export default EventsView