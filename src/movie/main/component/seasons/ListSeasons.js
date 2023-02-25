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
import { Helmet } from 'react-helmet'

const URL_IMAGE_SEASONS = 'https://image.tmdb.org/t/p/w130_and_h195_multi_faces'
const URL_POSTER = 'https://image.tmdb.org/t/p/w58_and_h87_multi_faces'
export default function ListSeasons() {
    const location = useLocation()
    const navigate = useNavigate()
    let { type, detail, seasons, id } = location.state

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const yearOfMovies = detail && detail.release_date ? moment(detail.release_date).format('YYYY') : detail.first_air_date ? moment(detail.first_air_date).format('YYYY') : ''
    return (
        <React.Fragment>
            <Helmet>
                <title>List Seasons</title>
                <meta
                    name="description"
                    content="List Seasons"
                />
            </Helmet>
            <div className='seasons'>
                <div className='breadcrumb'>
                    <div className='wrapper'>
                        <div className='image-poster'>
                            <img src={detail.poster_path ? `${URL_POSTER + detail.poster_path}` : DefaultImage} alt='poster' />
                        </div>
                        <div className='title-movie'>
                            <h3>
                                {detail.title ? detail.title : detail.name ? detail.name : ''}
                                {yearOfMovies ? <span> ({yearOfMovies})</span> : ''}
                            </h3>
                            <a onClick={() => navigate(-1)}> <ArrowLeftOutlined style={{ fontSize: 14 }} /> Back To Main</a>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='w-90' >
                        {
                            seasons && Array.isArray(seasons) && seasons.length > 0
                                ? seasons.map(item => {
                                    const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                        item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                    return (
                                        <div className='item' key={item.id}>
                                            <div className='wrapper' >
                                                <div className='image'  >
                                                    <img src={item.poster_path ? `${URL_IMAGE_SEASONS + item.poster_path}` : DefaultImage} alt='poster' onClick={() => navigate(`/episodes/${item.id}-${dashTitle}`, { state: { id: item.id, type: type, tv_id: detail.id, season_number: item.season_number } })} />
                                                </div>
                                                <div className='detail'>
                                                    <div className='info-season'>
                                                        <Link className='title-season' to={`/episodes/${item.id}-${dashTitle}`} state={{ id: item.id, type, tv_id: detail.id, season_number: item.season_number }} >
                                                            {item.title ? item.title : item.name ? item.name : ''}
                                                        </Link>

                                                        <h4>{item.air_date ? moment(item.air_date).format('YYYY') : '-'} | {item.episode_count ? item.episode_count : '0'} Espisode</h4>
                                                    </div>
                                                    {item.air_date ? <p>Season {item.season_number} of {detail.title ? detail.title : detail.name ? detail.name : ''} premiered on {item.air_date ? moment(item.air_date).format('MMMM D, YYYY') : ''} </p> : `We don't have an overview translated in English. Help us expand our database by adding one.`}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : 'Something went wrong. Please try again later !!! '
                        }

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
