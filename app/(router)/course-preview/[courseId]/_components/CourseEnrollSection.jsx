import { UserMemberContext } from '@/app/_context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { toast } from "sonner"


function CourseEnrollSection({courseInfo,isUserAlreadyEnrolled}) {
    // const membership=false;
    const {user} = useUser();
    const {isMember,setIsMember} = useContext(UserMemberContext)
    const router= useRouter();

    useEffect(()=>{
        console.log("isAlreadyEnrolled",isUserAlreadyEnrolled)
    },[isUserAlreadyEnrolled])
    // Enroll to the course
    const onEnrollCourse=() =>{
        GlobalApi.enrollToCourse(courseInfo?.slug,user.primaryEmailAddress?.emailAddress).then(resp=>{
            console.log(resp);
            if(resp){
            //Show Toast on Successfull Enroll
            toast("User Enrolled Successful", {
                description: "User Enrolled this to this Course",
              })

             //Redirect to watch course   
            router.push('/watch-course/'+resp.createUserEnrollCourse.id)
            }
        })
    }
    return (
        <div className='p-3 text-center rounded-sm bg-primary '>
            <h2 className='text-[22px] font-bold text-white'>Enroll to the Course</h2>
            {/* User has membership and already login */}
            {user && (isMember || courseInfo.free) && !isUserAlreadyEnrolled?<div className='flex flex-col gap-3 mt-3'>            
                <h2 className='text-white font-light'>Enroll Now to Start Learning</h2>
                <Button className="bg-white text-primary hover:bg-white hover:text-primary"
                onClick={onEnrollCourse}    
                >Enroll Now</Button>
            </div>
            :!user?
            <div className='flex flex-col gap-3 mt-3'>            
                <h2 className='text-white font-light'>Enroll Now to Start Learning</h2>
                <Link href={'/sign-in'}><Button className="bg-white text-primary hover:bg-white hover:text-primary">Enroll Now</Button></Link>
            </div>
           : !isUserAlreadyEnrolled && <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>Buy Monthly Membership of all Courses</h2>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">Buy Membership Just $10</Button>
            </div> }
            {/*This is for Above Section Div, User Dont have Memebership and Not Signup/Login */}
        
        { isUserAlreadyEnrolled && <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>Continue to Learn Your Project</h2>
            <Link href={'/watch-course/'+isUserAlreadyEnrolled}><Button className="bg-white text-primary hover:bg-white hover:text-primary">Continue</Button></Link>
            </div> }
        </div>

    )
}

export default CourseEnrollSection
