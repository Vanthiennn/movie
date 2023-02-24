import { Button, Tooltip } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as ActionType from '../../controllers/actionTypes'
import { isEqual } from 'lodash'
import moment from 'moment'
import './index.scss'
import '../home/popular/index.scss'
import DefaultImage from '../../static/default-thumbnail.jpg'
import Loading from '../../../base/components/loading/Loading'
export default function Person({handleLoading}) {
    const URL_AVATAR = 'https://image.tmdb.org/t/p/w300_and_h450_multi_faces'
    const URL_POSTER = 'https://image.tmdb.org/t/p/w150_and_h225_multi_faces'
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    let { state } = location
    const type = state && state.type ? state.type : ''
    const ids = state && state.id ? state.id : ''
    const name = state && state.name ? state.name : ''


    const detailPerson = useSelector(state => {
        let data = state.mainReducer.person
        return data && Object.keys(data).length > 0 && typeof data === 'object' ? data : {}
    })
    
    const movieOfCast = useSelector(state => {
        let data = ''
        if (type === 'tv') {
            data = state.mainReducer.person.tv_credits
        } else if (type === 'movie') {
            data = state.mainReducer.person.movie_credits
        } else {
            data = state.mainReducer.person.combined_credits
        }

        return data && Array.isArray(data.cast) && data.cast.length > 0 ? data.cast : []
    })

    useEffect(() => {
        if (type && ids) {
            setLoading(true)
            dispatch({
                type: ActionType.API_GET_MOVIE_OF_PERSON,
                data: {
                    type, ids, name
                },
                setLoading
            })
        }
        window.scrollTo(0, 0)
    }, [ids])

    return (
        <React.Fragment>
            {
                loading ? <Loading/>
                : 
                <div className='person'>
                <div className='w-90'>
                    <div className='content'>
                        <div className='left'>
                            <div className='image-person'>
                                <img src={detailPerson.profile_path ? URL_AVATAR + detailPerson.profile_path : DefaultImage} alt='Image Profile' />
                            </div>
                            <div className='info'>
                                <div className='social_links'>
                                    {
                                        detailPerson && detailPerson.homepage ?
                                            <Tooltip title='Visit HomePage'>
                                                <a href={detailPerson.homepage}>
                                                    <LinkOutlined />
                                                </a>
                                            </Tooltip>
                                            : null
                                    }
                                </div>
                                <h3>Personal Info</h3>
                                <div >
                                    <p >
                                        <strong>Known For</strong>
                                        {detailPerson && detailPerson.known_for_department ? detailPerson.known_for_department : '-'}
                                    </p>
                                    <p >
                                        <strong>Gender</strong>
                                        {detailPerson && detailPerson.gender === 2 ? 'Male' : 'Female'}
                                    </p>
                                    <p >
                                        <strong>Birthday</strong>
                                        {detailPerson && detailPerson.birthday ? detailPerson.birthday : '-'}
                                    </p>
                                    <p >
                                        <strong>Place of Birth</strong>
                                        {detailPerson && detailPerson.place_of_birth ? detailPerson.place_of_birth : '-'}
                                    </p>
                                    <p>
                                        <strong>Also Known As</strong>
                                        {
                                            detailPerson.also_known_as && detailPerson.also_known_as.length > 0 && Array.isArray(detailPerson.also_known_as)
                                                ?
                                                <React.Fragment>
                                                    {
                                                        detailPerson.also_known_as.map((i, index) => {

                                                            return <p key={index}>
                                                                {i}
                                                            </p>
                                                        })
                                                    }
                                                </React.Fragment>
                                                : '-'
                                        }
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className='right' style={{ overflow: 'hidden' }}>
                            <div className='title'>
                                <h2>
                                    {detailPerson && detailPerson.name ? detailPerson.name : ''}
                                </h2>
                            </div>
                            <div className='biography'>
                                <h3>Biography</h3>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{detailPerson && detailPerson.biography ? detailPerson.biography : `We don't have a biography for ${detailPerson && detailPerson.name ? detailPerson.name : ''}.`}</p>
                            </div>
                            <div className='known_for'>
                                <h3>Known for</h3>
                                <div className={` scroller`} style={{ display: 'flex', overflowX: 'scroll', overflowY: 'hidden' }}>
                                    {
                                        movieOfCast.length > 0 ?
                                            movieOfCast.map((item, index) => {
                                                const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                                    item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''

                                                return <React.Fragment key={index}>
                                                    <div style={{ marginLeft: 15, width: 130, minWidth: 130 }}>
                                                        <img style={{ width: '100%', borderRadius: 8, cursor: 'pointer', height: 195, objectFit: 'cover' }} src={(item.backdrop_path || item.poster_path) ? `${URL_POSTER}${item.backdrop_path ? item.backdrop_path : item.poster_path}` : DefaultImage} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: type } })} />
                                                        <div className='content' style={{ position: 'relative', padding: '10px 10px 12px 10px' }}>

                                                            <Link style={{ color: '#000', fontWeight: 'bold' }} to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: type }} >
                                                                {item.title ? item.title : item.name ? item.name : ''}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            })
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
       
        </React.Fragment>
    )
}
