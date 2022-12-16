import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import Posts from '../../Components/Admin/Posts/Posts'

function PostsPage() {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <Posts/>
    </div>
  )
}

export default PostsPage