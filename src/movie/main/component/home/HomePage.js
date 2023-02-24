import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import '../../static/main.scss'

import Carousel from './carousel/Carousel'
import Popular from './popular/Popular'
import LatestTrailers from './latest_trailers/LatestTrailers'
import Trending from './trending/Trending'
const API_IMG = "https://image.tmdb.org/t/p/w500/"
export default function HomePage({ ...props }) {


  return (
    <React.Fragment>
      <div style={{ width: '80%', marginRight: 'auto', marginLeft: 'auto' }}>
        <Carousel />
        <Popular />
        <LatestTrailers handleIsPlay={props.handleIsPlay} />
        <Trending />
      </div>
    </React.Fragment>
  )

}
