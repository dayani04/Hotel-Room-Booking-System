import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Carousel from './Carousel';
import About from './About';
import Rooms from './Rooms';
import Services from './Services';
import Teams from './Team';
export default function Home() {
  return (
    <>
    <Navbar/>
      <Carousel />
    <About/>
    <Rooms/>
    <Services/>
    <Teams/>
    </>
  );
}
