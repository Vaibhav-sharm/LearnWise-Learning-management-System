"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription'
import GlobalApi from '@/app/_utils/GlobalApi'
import CourseEnrollSection from './_components/CourseEnrollSection'
import CourseContentSection from './_components/CourseContentSection'
import { useUser } from '@clerk/nextjs'

function CoursePreview({params}) {
    const {user}= useUser();
    const [courseInfo, setCoureInfo] = useState();
    const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled]=useState();
    useEffect(() => {
        params && getCourseInfoById();
    }, [params])

    useEffect(()=>{
       courseInfo && user && checkUserEnrolledToCourse();
    },[courseInfo,user])

    // Used to get Course Info by Slug Name
    const getCourseInfoById = () => {
        GlobalApi.getCourseById(params?.courseId).then(resp => {
            setCoureInfo(resp?.courseList);
        })
    }
    // To check whether user is enrolled or not
    const checkUserEnrolledToCourse=()=>{
        GlobalApi.checkUserEnrolledToCourse(courseInfo.slug, user.primaryEmailAddress.emailAddress)
        .then(resp=>{
            if(resp?.userEnrollCourses[0]?.id){
                setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
            }
        })
    }
    return courseInfo&& (
        <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
            {/* Title, Video, Decription */}
            <div className='col-span-2 bg-white p-3'>
                <CourseVideoDescription courseInfo={courseInfo}/>
            </div>
            {/* Course Content */}
            <div>
                <CourseEnrollSection courseInfo={courseInfo} isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
                <CourseContentSection courseInfo={courseInfo} isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
            </div>
        </div>
    )
}

export default CoursePreview