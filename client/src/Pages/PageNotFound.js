import React from 'react'
import { Link } from 'react-router-dom'
import PageNot from '../assets/404-Page-Featured-Image.webp'

function PageNotFound() {
    return (
        <div>
            {/* <h1>404</h1>
           <h2>Page Not Found</h2> */}
            <div class="bg-gray-100 h-screen justify-center">
                <center class=" m-auto">
                    <img src={PageNot}></img>
                    <div class=" tracking-widest mt-4">
                        {/* <span class="text-gray-500 text-6xl block"><span>4  0  4</span></span> */}
                        <span class="text-gray-500 text-xl">Sorry, We couldn't find what you are looking for!</span>
                    </div>
                </center>
                <center class="mt-6">
                    <Link to={"/"} class="text-white font-mono text-xl bg-black p-3 rounded-md hover:shadow-md">Go back </Link>
                </center>
            </div>      
        </div>
    )
}

export default PageNotFound