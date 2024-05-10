import React from 'react'
import { useLocation } from 'react-router-dom'
import SalleSearch from '../common/SalleSearch'
import SalleCarousel from '../common/SalleCarousel'
import Parallax from '../common/Parallax'
import SiteServices from '../common/SiteServices'

const Home = () => {
  const location=useLocation()
  const message = location.state && location.state.message
  return (
    <section >
      {message&& <p className="text-warning px-5">{message} </p>}
      <div className='container'>
        <SalleSearch/>
        <SalleCarousel/>
        <Parallax/>
        <SalleCarousel/>
        <SiteServices/>
        <Parallax/>
        <SalleCarousel/>
      </div>




    </section>
  )
}

export default Home