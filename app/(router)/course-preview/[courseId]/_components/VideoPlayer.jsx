import React from 'react'

function VideoPlayer({videoUrl,poster}) {
    const preventContextMenu = (e) => {
      e.preventDefault(); // Prevent default context menu
    };
  return (
    <video
    width={1000}
    height={250}
    key={videoUrl}
    controls
    controlsList="nodownload"
    className='rounded-sm'
    poster={poster}
    onContextMenu={preventContextMenu} // Prevent right-click context menu
    >
        <source src={videoUrl} type='video/mp4'/>
    </video>
  )
}

export default VideoPlayer
