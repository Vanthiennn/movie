import { Button, Tooltip } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as ActionType from '../../controllers/actionTypes'
import { isEqual } from 'lodash'
import moment from 'moment'
import './index.scss'
import '../home/popular/index.scss'
import DefaultImage from '../../static/default-thumbnail.jpg'

const URL_IMAGE = 'https://image.tmdb.org/t/p/w66_and_h66_multi_faces'
const URL_POSTER = 'https://image.tmdb.org/t/p/w58_and_h87_multi_faces'
export default function FullCastAndCrew() {
    const location = useLocation()
    const navigate = useNavigate()
    let { cast, job, arr, type, crew, yearOfMovies, title, detail } = location.state
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    return (
        <React.Fragment>
            <div className='fullCast'>
                <div className='breadcrumb'>
                    <div className='wrapper'>
                        <div className='image-poster'>
                            <img src={detail.poster_path ? `${URL_POSTER + detail.poster_path}` : DefaultImage} alt='poster' />
                        </div>
                        <div className='title-movie'>
                            <h3>
                                {title ? title : ''}
                                {yearOfMovies ? <span> ({yearOfMovies})</span> : ''}
                            </h3>
                            <a onClick={() => navigate(-1)}> <ArrowLeftOutlined style={{ fontSize: 14 }} /> Back To Main</a>
                        </div>
                    </div>
                </div>
                <div className='w-90'>
                    <div className='content' style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div className='cast'>
                            <h3 className='series-cast'>Series Cast <span>{cast && cast.length > 0 ? cast.length : null}</span></h3>
                            {
                                cast && cast.length > 0 ?
                                    cast.map(item => {
                                        const dashTitle = item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                        return (
                                            <div className='item' key={item.id}>
                                                <div className='wrapper' >
                                                    <div className='image' >
                                                        <img src={item.profile_path ? `${URL_IMAGE + item.profile_path}` : DefaultImage} alt='poster'  onClick={() => navigate(`/person/${item.id}-${dashTitle}`, { state: { id: item.id, type: type,name: item.name } })} />
                                                    </div>
                                                    <div className='detail'>
                                                        <Link className='name-cast' to={`/person/${item.id}-${dashTitle}`} state={{ id: item.id, type, name: item.name }} >
                                                            {item.name ? item.name : ''}
                                                        </Link>
                                                        <p style={{ color: "#abaaaa" }}>{item.character ? item.character : ''}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : `There's no actor in this movie. Contact me if you know the cast of this movie. Tks`
                            }
                        </div>
                        <div className='crew'>
                            <h3 className='series-crew'>Series Crew <span>{crew && crew.length > 0 ? crew.length : null}</span></h3>
                            {
                                arr && arr.length > 0 ?
                                    arr.map((item, index) => {
                                        return (
                                            <div className='job' key={index}>
                                                <h3>{item ? item : ''}</h3>
                                                {
                                                    job && job.length > 0 ? job.map((i => {
                                                        if (i[item]) {
                                                            return i[item].map((e, index) => {
                                                                const dashTitle = e.name ? e.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                                                return (
                                                                    <div className='item' key={index}>
                                                                        <div className='wrapper' >
                                                                            <div className='image' style={{ width: 66, minWidth: 66 }} >
                                                                                <img src={e.profile_path ? `${URL_IMAGE + e.profile_path}` : DefaultImage} alt='poster' style={{ width: '100%', height: 66, objectFit: 'cover', borderRadius: '8px' }} onClick={() => navigate(`/person/${e.id}-${dashTitle}`, { state: { id: e.id, type: type,name:e.name } })} />
                                                                            </div>
                                                                            <div className='detail'>
                                                                                <Link className='name-cast' to={`/person/${e.id}-${dashTitle}`} state={{ id: e.id, type, name: e.name }} >
                                                                                    {e.name ? e.name : ''}
                                                                                </Link>
                                                                                {/* <h3>{e.title ? e.title : e.name ? e.name : ''}</h3> */}
                                                                                <p style={{ color: "#abaaaa" }}>{e.job ? e.job : ''}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    })) : null
                                                }
                                            </div>
                                        )
                                    })
                                    : null
                                //     const dashTitle = item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                //     return (
                                //         <div className='item' key={item.id}>
                                //             <div className='wrapper' >
                                //                 <div className='image' style={{width:66,minWidth:66}} >
                                //                     <img src={item.profile_path ? `${URL_IMAGE + item.profile_path}` : DefaultImage} alt='poster' style={{ width: '100%',height:66,objectFit:'cover',borderRadius:'8px' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: type } })} />
                                //                 </div>
                                //                 <div className='detail'>
                                //                     <Link className='name-cast' to={`/person/${item.id}-${dashTitle}`} state={{ id: item.id, type ,name: item.name }} >
                                //                         {item.name ? item.name : ''}
                                //                     </Link>
                                //                     {/* <h3>{item.title ? item.title : item.name ? item.name : ''}</h3> */}
                                //                     <p style={{ color: "#abaaaa" }}>{item.character ? item.character : ''}</p>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     )
                                // })
                                // : `There's no actor in this movie. Contact me if you know the cast of this movie. Tks`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
