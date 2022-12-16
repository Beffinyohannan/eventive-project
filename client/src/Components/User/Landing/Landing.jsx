import React from 'react'
import bg from '../../../assets/business.webp'
import bg1 from '../../../assets/landing.webp'
import { Link } from 'react-router-dom'

function Landing() {
    return (

        <div>
            <div className="flex justify-between  border">
                <h2 className="m-3 font-bold text-2xl md:text-4xl text-black-400">Eventive</h2>
                <Link to={'/login'}>
                    <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium m-3
                          rounded-full text-sm px-5 md:text-xl py-1 text-center   dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-600 ">
                        Login  </button></Link>
            </div>
            <div className="items-center max-w-md sm:max-w-2xl sm:mt-6 px-6 py-6 mx-auto grid md:grid-cols-2 md:max-w-3xl md:mt-8 lg:max-w-6xl ">
                <div>
                    <h2 className="font-bold text-black-500 text-4xl sm:text-5xl lg:text-6xl">
                        FIND YOUR <br /> PREFECT EVENT
                    </h2>
                    <p className="mt-5 sm:mt-7 text-lg sm:text-2xl lg:text-3xl font-medium text-gray-600">
                        You can have best Companies for your work Right now, Right here
                    </p>

                    <Link to={'/signup'}>
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium
                              sm:text-2xl sm:mt-8 rounded-full text-sm px-5 py-2.5 text-center mt-4 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-600 lg:mt-10"
                        >
                            Get Started
                        </button> </Link>
                </div>
                <div>
                    <img className="md:max-w-full" src={bg1} alt="background" />
                </div>
            </div>

            <div className="items-center max-w-md sm:max-w-2xl sm:mt-6 px-6 py-6 mx-auto grid md:grid-cols-2 md:max-w-3xl md:mt-8 lg:max-w-6xl">
                <div>
                    <img hidden className="sm:mt-4 md:block" src={bg} alt="background" />
                </div>
                <div className="lg:text-right">
                    <h2 className="font-bold text-black-400 text-3xl sm:text-5xl">
                        Your are good at managing Event ?
                    </h2>
                    <p className="mt-5 text-lg sm:text-2xl font-medium  text-gray-600">
                        Register as Company, Get Engaged
                    </p>
                    <Link to={'/company/signup'}>
                        <button

                            type="button"
                            class="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium
                              rounded-full float-right text-2xl px-5 py-2.5 text-center mt-10 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-600  md:block"
                        >
                            Register Now
                        </button></Link>
                </div>
                <div>
                    <img className="sm:mt-4 md:hidden" src={bg} alt="background" />
                </div>

            </div>
        </div>
    )
}

export default Landing