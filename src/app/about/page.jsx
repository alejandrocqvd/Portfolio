import React from 'react';
import Contact from '../../components/Contact';
import Timeline from '@/components/Timeline';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Timeline />
      <Contact />
    </div>
  )
}

export default page;
