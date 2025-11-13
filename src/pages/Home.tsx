import React from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import WhatWeDo from '../components/WhatWeDo'
import GetStarted from '../components/GetStarted'

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <WhatWeDo />
      <GetStarted />
    </main>
  )
}

export default Home
