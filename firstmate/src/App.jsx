import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatDemo from './components/ChatDemo';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import './App.css'
function App() {


  return (
    <>
    <Navbar/>
    <Hero/>
    <ChatDemo/>
    <About/>
    <Services/>
    <Footer/>
    </>
  )
}

export default App
