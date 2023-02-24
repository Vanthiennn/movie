import { Button, Dropdown, Menu, Tooltip,  } from 'antd';
import { SearchOutlined, CloseOutlined,  } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase/index";
import { query, collection, getDocs, where } from "firebase/firestore";
import NavImage from '../main/static/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
import Search from '../base/components/search/Search';
import { useDispatch } from 'react-redux';
import * as AccountActionType from '../account/controllers/actionsType'
import Loading from '../base/components/loading/Loading';
export default function Navbar({handleGetNameFromNav}) {
  const [isSearch, setIsSearch] = useState(false)
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
     
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    // if (loading) return;
    if (user) {
      fetchName();
      if(name){
        handleGetNameFromNav(name)
      }
    }
  }, [user]);



  const onChangeMenuItem = (e) => {
    if (e) {
      if (e.key === 'logout') {
        logout()
        navigate('/')
      } else if (e.key === 'profile') {
        const reloadUserInfo = user && user.reloadUserInfo ? user.reloadUserInfo : ''
        if (reloadUserInfo) {
          let { localId, email, createdAt } = reloadUserInfo
          navigate(`/profile/${localId}`, { state: { id: localId, email, createdAt, name: name ? name : '' } })

        }
      }
    }
  }
  useEffect(() => {
    const reloadUserInfo = user && user.reloadUserInfo ? user.reloadUserInfo : ''
    if (reloadUserInfo) {
      let { localId, email, createdAt } = reloadUserInfo
      dispatch({
        type: AccountActionType.GET_DETAIL_ACCOUNT,
        data: { id: localId, email, createdAt }
      })
    }
  }, [user, loading])
  
  return (
    <React.Fragment>
      <div className='menu' style={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#032541' }}>
        <div className='content' style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', padding: '20px 10px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className='left-menu' style={{ display: 'flex', alignItems: 'center' }}>
            <a href='/'>
              <img src={NavImage} alt='The Movie Database' style={{ width: 154, height: 20 }} />
            </a>
          </div>
          <div className='right-menu' style={{ display: 'flex', width: '10%', alignItems: 'center', justifyContent: 'flex-end' }} >
            {
              loading ? <Loading/>
                :
                user && typeof user === 'object' && !Array.isArray(user) ?
                  <div className='siber-one-container-three-container' >
                    <Dropdown
                      overlay={() => (
                        <Menu onClick={onChangeMenuItem}>
                          <Menu.ItemGroup key={'g1'} >
                            <Menu.Item key="profile"  >
                              <p>
                                {user && user.email ? user.email : ''}
                                <p style={{ color: '#ccc', marginBottom: 0 }}>View profile</p>
                              </p>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="logout" style={{ color: 'red' }}>
                              Đăng xuất
                            </Menu.Item>
                          </Menu.ItemGroup>
                        </Menu>
                      )}
                      trigger={['click']}

                      overlayClassName='dropdown-thietlap'

                    >
                      <div className={`siber-one-container-three-container-content `}>

                        <a onClick={e => e.preventDefault()}>
                          {
                            name ?
                              <Tooltip title={name ? name : ''} placement='bottom'>
                                <div style={{ backgroundColor: 'pink', width: 40, height: 40, borderRadius: '50%', marginRight: 20 }}>
                                  <p style={{ textAlign: 'center', lineHeight: '40px', color: '#fff', fontWeight: 'bold', fontSize: 25, }}>{name ? name.charAt(0).toUpperCase() : ''}</p>
                                </div>
                              </Tooltip>
                              : null
                          }
                        </a>
                      </div>
                    </Dropdown>
                  </div>
                  : <Button type='primary' onClick={() => navigate('/sign-in')} style={{ marginRight: 20 }}>Sign in</Button>
            }
            {
              !isSearch ?
                <span style={{ backgroundColor: 'transparent', color: '#01b4e4', fontSize: 30, cursor: 'pointer' }} onClick={() => setIsSearch(true)}>
                  <SearchOutlined />
                </span>
                : <span style={{ backgroundColor: 'transparent', color: '#fff', fontSize: 30, cursor: 'pointer' }} onClick={() => setIsSearch(false)}>
                  <CloseOutlined />
                </span>
            }
          </div>
        </div>
        <Search isSearch={isSearch} setIsSearch={setIsSearch} />
      </div>
    </React.Fragment>
  )
}
