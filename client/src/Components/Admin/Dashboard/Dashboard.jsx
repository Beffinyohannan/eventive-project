import React, { useState } from 'react'
import { useEffect } from 'react'
import { companyView, graphPost, userView, viewPostAdmin } from '../../../api/AdminRequest'
import BarChart from './BarChart'

function Dashboard() {

  const [datas, setDatas] = useState({})
  const [post,setPost]= useState([])
  const [Users,setUsers] = useState([])
  const [company,setCompany] = useState([])

  useEffect(() => {
    const graph = async () => {
      try {
        const { data } = await graphPost()
        console.log(data);
        setDatas({
          labels: data.map((obj) => obj._id),
          datasets: [{
            label: "counts",
            data: data.map((obj) => obj.count),
            backgroundColor: ["rgba(75,196,1116,2)"],
            borderColor:"black",
            borderWidth:2,
          }]
        })
        // console.log(datas, '*********');
        // console.log(Object.keys(datas).length,'+++++++++++');


        
      } catch (error) {
        console.log(error.message);
      }
    }

    const posts = async()=>{
      try {
        const{data} =await viewPostAdmin()
        setPost(data)
        // console.log(post,'??????');
      } catch (error) {
        console.log(error.message);
      }
    }

    const user = async()=>{
      try {
        const {data}=await userView()
        setUsers(data)
      } catch (error) {
        console.log(error.message);
      }
    }

    const company = async()=>{
      try {
        const {data} = await companyView()
        setCompany(data)
      } catch (error) {
        console.log(error.message);
      }
    }

    graph()
    posts()
    user()
    company()

  }, [])


  return (
    <div className='w-full mt-8'>
      <div className='pt-5 '>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-10">
          <div class="overflow-hidden group relative rounded-lg p-[1px] flex justify-center items-center">
            <div class="rounded-lg hidden group-hover:block animate-gradient w-[250%] h-[500%] absolute -top-[60%] -left-[50%] bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 shadow-xl"></div>
            {/* <a class="block w-full relative z-10 rounded-lg bg-white p-6 sm:p-8" href=""> */}
              <div class=" sm:pr-8 flex flex-col items-center">
                <h3 class="text-xl font-bold text-gray-900">
                  Total posts
                </h3>
                <p class="mt-2 text-lg font-medium text-gray-500">
                  {post.length}
                </p>
              </div>
            {/* </a> */}
          </div>
          <div class="overflow-hidden group relative rounded-lg p-[1px] flex justify-center items-center">
            <div class="rounded-lg hidden group-hover:block animate-gradient w-[250%] h-[500%] absolute -top-[60%] -left-[50%] bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 shadow-xl"></div>
            {/* <a class="block w-full relative z-10 rounded-lg bg-white p-6 sm:p-8" href=""> */}
              <div class=" sm:pr-8 flex flex-col items-center">
                <h3 class="text-xl font-bold text-gray-900">
                  Total Users
                </h3>
                <p class="mt-2 text-lg font-medium text-gray-500">
                  {Users.length}
                </p>
              </div>
            {/* </a> */}
          </div>
          <div class="overflow-hidden group relative rounded-lg p-[1px] flex justify-center items-center">
            <div class="rounded-lg hidden group-hover:block animate-gradient w-[250%] h-[500%] absolute -top-[60%] -left-[50%] bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 shadow-xl"></div>
            {/* <a class="block w-full relative z-10 rounded-lg bg-white p-6 sm:p-8" href=""> */}
              <div class=" sm:pr-8 flex flex-col items-center">
                <h3 class="text-xl font-bold text-gray-900">
                  Total Companies
                </h3>
                <p class="mt-2 text-lg font-medium text-gray-500">
                 {company.length}
                </p>
              </div>
            {/* </a> */}
          </div>
        </div>


      </div>
      <div className='w-4/5 pl-10 pt-16'>
        <h1 className='font-semibold'>Daily Post Count</h1>
        {Object.keys(datas).length !==0 ?
        <BarChart chartData={datas} />
        :''}
        {/* <BarChart chartData={datas} /> */}
      </div>
    </div>
  )
}

export default Dashboard