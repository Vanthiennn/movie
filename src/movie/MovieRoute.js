import { Modal, Row, Col, Form, Input, Select, Button, Tag, Radio, Menu, Layout, Alert, notification } from 'antd';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './account/Login';
import Profile from './account/Profile';
import Register from './account/Register';
import Detail from './main/component/detail/Detail';
import HomePage from './main/component/home/HomePage';

import FooterMovie from './menu/FooterMovie';
import Navbar from './menu/Navbar';
import YouTube from 'react-youtube';
import Genres from './main/component/genres/Genres';
import Person from './main/component/person/Person';
import FullCastAndCrew from './main/component/detail/FullCastAndCrew';
import ListSeasons from './main/component/seasons/ListSeasons';
import Episodes from './main/component/seasons/Episodes';
import Reviews from './main/component/reviews/Reviews';
import PageNotFound from './base/components/pageNotFound/PageNotFound';

const { Content, Footer } = Layout

export default function MovieRoute() {

  const [isPlay, setIsPlay] = useState(false)
  const [videoId, setVideoId] = useState('')
  const [name,setName] = useState('')
  const [getDataFromDetail, setGetDataFromDetail] = useState('')



  const handleIsPlay = (e, key, data = {}) => {
    if (key) {
      setVideoId(key)
      setIsPlay(e)
      setGetDataFromDetail(data)
    }
  }

  const handleGetNameFromNav = (e) => {
    if(e){
      setName(e)
    }
  }

  return (
    <React.Fragment>
      <Router>
        <div className='route'>
          <Layout style={{ minHeight: '100vh', position: 'relative' }}>
            {
              isPlay ?
                <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 999, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed'

                  }}>
                    <div style={{
                      backgroundColor: '#000',
                      paddingTop: 20,

                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 20px 20px' }}>
                        <h3 style={{ color: '#fff', marginBottom: 0, fontSize: 20 }}>{getDataFromDetail && getDataFromDetail.name ? getDataFromDetail.name : ''}</h3>
                        <Button style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          border: 'none',
                          fontSize: 17
                        }} onClick={() => setIsPlay(false)}>X</Button>
                      </div>
                      <YouTube
                        videoId={videoId}
                        style={{

                        }}
                        title='Trailers'

                      >

                      </YouTube>
                    </div>

                  </div>


                </div>
                : null
            }
            <Navbar handleGetNameFromNav={handleGetNameFromNav} />
            <Layout style={{ backgroundColor: '#fff' }}>
              <Content style={{ position: 'relative' }}>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<HomePage handleIsPlay={handleIsPlay} />}
                  />
                  <Route
                    exact
                    path="/sign-in"
                    element={<Login />}
                  />
                  <Route
                    exact
                    path="/sign-up"
                    element={<Register />}
                  />
                  <Route
                    exact
                    path="/profile/:id"
                    element={<Profile />}
                  />
                  <Route
                    exact
                    path="/detail/:id-:title"
                    element={<Detail handleIsPlay={handleIsPlay} />}
                  />
                  <Route
                    exact
                    path="/genres/:id-:name/"
                    element={<Genres />}
                  />
                  <Route
                    exact
                    path="/person/:id-:name"
                    element={<Person />}
                  />
                  <Route
                    exact
                    path="/fullcast/:id-:name"
                    element={<FullCastAndCrew />}
                  />
                  <Route
                    exact
                    path="/seasons/:id-:name"
                    element={<ListSeasons />}
                  />
                  <Route
                    exact
                    path="/episodes/:id-:name"
                    element={<Episodes />}
                  />
                  <Route
                    exact
                    path="/reviews/:id-:name"
                    element={<Reviews />}
                  />
                  <Route
                    exact
                    path="*"
                    element={<PageNotFound />}
                  />
                </Routes>

              </Content>
            </Layout>
            <Footer style={{ backgroundColor: 'rgb(3, 37, 65)',overflow:'hidden' }} >
              <FooterMovie name={name} />
            </Footer>
          </Layout>
        </div>
      </Router>
    </React.Fragment>
  )
}
