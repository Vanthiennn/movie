import React from 'react'
import { Row, Col, Button } from 'antd'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase/index";
import BackgroundFooter from '../main/static/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b-removebg-preview.png'
import './index.scss'
import { useNavigate } from 'react-router-dom';
export default function FooterMovie({name}) {
 
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  const info = user && user.reloadUserInfo ? user.reloadUserInfo : {}
  
  return (
    <div className='footer' >
      <div className='content' >
        <div className='logo'>
          <img src={BackgroundFooter} alt='logo'  style={{width:130,height:94}}/>
          {info && info.email ?
            <Button onClick={() => navigate(`/profile/${info.localId}`, { state: { id: info.localId, email:info.email, createdAt:info.createdAt, name:  info.displayName ? info.displayName : name ? name : '' } })}>
              <span>Hi {info.email}</span>
            </Button> : null}
        </div>
        <div className='basics'>
          <h3>THE BASICS</h3>
          <ul>
            <li>About TMDB</li>
            <li>Contact Us</li>
            <li>Support Forums</li>
            <li>System Status</li>
          </ul>
        </div>
        <div className='involved'>
          <h3>GET INVOLVED</h3>
          <ul>
            <li>Contribution Bible</li>
            <li>Add New Movie</li>
            <li>Add New TV Show</li>
          </ul>
        </div>
        <div className='community'>
          <h3>COMMUNITY</h3>
          <ul>
            <li>Guidelines</li>
            <li>Discussions</li>
            <li>Leaderboard</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className='legal'>
          <h3>LEGAL</h3>
          <ul>
            <li>Terms of Use</li>
            <li>API Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
