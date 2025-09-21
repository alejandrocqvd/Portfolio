import React from 'react';
import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import Timeline from '@/components/ui/Timeline';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <Timeline />
      <Contact />
    </div>
  )
}

export default page;
