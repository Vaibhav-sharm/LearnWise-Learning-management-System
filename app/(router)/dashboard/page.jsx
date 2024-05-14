"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import SideBanners from '../courses/_components/SideBanners';
import WelcomeBannerDashboard from './_components/WelcomeBannerDashboard';
import InProgressCourseList from './_components/InProgressCourseList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Dashboard() {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourse]=useState([]);

  useEffect(()=>{
    user && getAllUserEnrolledCourses();
  },[user])

  // get all user Enrolled Course List

  const getAllUserEnrolledCourses=()=>{
    GlobalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      setUserEnrolledCourse(resp.userEnrollCourses);
    })
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5 gap-5'>
      {/* Left Container */}
      <div className='col-span-3'>
        <WelcomeBannerDashboard user={user} />

        {/* In progress coures list */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses}/>
      </div>
      {/* Right Container */}
      <div className='p-5 bg-white rounded-xl'>
        <SideBanners />
      </div>
    </div>
  )
}

export default Dashboard