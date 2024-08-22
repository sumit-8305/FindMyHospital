import React from 'react'
import Tiles from '../components/Tiles';

const Homepage = () => {
  return (
    <>
      {/* category */}
      <div className='m-8 mt-48 flex justify-center gap-52 text-white'>
        <button className='bg-gray-800 w-auto h-auto px-8 py-4 rounded-full text-xl transform hover:scale-110 duration-200  ease-in-out'>General</button>
        <button className='bg-gray-800 w-auto h-auto px-8 py-4 rounded-full text-xl transform hover:scale-110 duration-200  ease-in-out'>OPD</button>
        <button className='bg-gray-800 w-auto h-auto px-8 py-4 rounded-full text-xl transform hover:scale-110 duration-200  ease-in-out'>Emergency</button>
      </div>

      {/**About */}
      <div className=' bg-gray-900 text-white mt-24 mb-25 p-5'>
          <h1 className='text-4xl font-bold m-5'>About</h1>
          <hr className='m-6'></hr>
          <p className='m-5 text-xl'>Welcome to Find Your Hospital, your go-to platform for reliable and up-to-date healthcare information. We are committed to bridging the gap between patients and essential healthcare services, ensuring that you have access to critical resources when you need them the most.At Find Your Hospital, our mission is to empower individuals with the information they need to make informed healthcare decisions. Whether you're searching for available hospital beds, nearby medicine dispensaries, or the closest medical facilities, our platform is designed to provide you with accurate and timely data.
            Our platform was created by a passionate tech enthusiast currently pursuing a B.Tech in Computer Science at NSUT Delhi. With a strong background in web development and a deep commitment to leveraging technology for social good, has developed this platform to address some of the most pressing challenges in healthcare access today.
          </p>
      </div>
      <Tiles/>
    </>
  )
}

export default Homepage;
