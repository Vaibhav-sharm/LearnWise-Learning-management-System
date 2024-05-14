import { Lock, Play } from 'lucide-react'
import React, { useState } from 'react'

function CourseContentSection({courseInfo,isUserAlreadyEnrolled,watchMode=false,setActiveChapterIndex,completeChapter}) {
    const [activeIndex, setActiveIndex] = useState(0);

    //Use to Check the Chapter is Completed or not
    const checkIsChapterCompleted = (chapterId) => {
      return completeChapter.find(item => item.chapterId === chapterId);
  }

  return (
    <div className='p-3 bg-white rounded-sm mt-3'>
      <h2>Context</h2>
      {courseInfo.chapter.map((item,index) => (
        <duv>
            <h2 className={`p-2 text-[14px] flex justify-between items-center m-2 hover:bg-gray-200 hover:text-gray-500 border rounded-sm px-4 cursor-pointer
            ${activeIndex==index&& 'bg-primary text-white'}
            ${isUserAlreadyEnrolled && 'hover:bg-primary hover:text-white'}
            ${watchMode && checkIsChapterCompleted(item.id)&&
              'border-green-800 bg-green-400'
            }
            `}
            onClick={()=>{watchMode && setActiveChapterIndex(index);
             watchMode && setActiveIndex(index)}}>
                {index+1}. {item.name}
                {activeIndex ==index || isUserAlreadyEnrolled ? 
                <Play className='h-4 w-4'/>:
                <Lock className='h-4 w-4'/>}
            </h2>
        </duv>
      ))}
    </div>
  )
}

export default CourseContentSection
