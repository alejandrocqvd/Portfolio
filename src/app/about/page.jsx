import React from 'react';
import Contact from '../../components/Footer';
import Timeline from '@/app/about/Timeline';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Timeline />
      <Contact />
    </div>
  )
}

export default page;
