import { CaretRightOutlined } from '@ant-design/icons'
// import { Input, Spin, Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
import * as ActionType from '../../../controllers/actionTypes'
import isEqual from 'lodash/isEqual'
import './index.scss'
import SwitchMode from '../../../../base/components/switchMode/SwitchMode';
import DefaultImage from '../../../static/default-thumbnail.jpg'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../../base/components/loading/Loading'
export default function LatestTrailers({ handleIsPlay, }) {
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w1920_and_h427_multi_faces'
    const dispatch = useDispatch()
    const latestMovie = useSelector(state => {
        let data = state.mainReducer.latestMovies
        return data ? data : []
    }, (prev, next) => isEqual(prev, next))
    const navigate = useNavigate()
    const [leftSide, setLeftSide] = useState('')
    const [isOnTV, setIsOnTV] = useState('tv')
    const [cssDefault, setCssDefault] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleSwitchMode = (e) => {
        setCssDefault(false)
        if (e) {
            if (e === 'onTV') {
                setLeftSide(true)
                setIsOnTV('tv')
            } else {

                setLeftSide(false)
                setIsOnTV('movie')
            }
        }
    }
    const detail = useSelector(state => {
        let data = state.mainReducer.detail
        return data && !Array.isArray(data) && typeof data === 'object' ? data : {}
    }, (prev, next) => isEqual(prev, next))
    const videos = detail && detail.videos && detail.videos.results.length > 0 && Array.isArray(detail.videos.results) ? detail.videos.results : []
    const trailer = videos && videos.length > 0 ? (videos.find(i => i.name == "Official Trailer" || i.name == "Trailer" || i.name == "Official Trailer [Subtitled]" || i.name === 'Series Trailer') || videos[0]) : {}
    const [backgroundImage, setBackgroundImage] = useState('')
    useEffect(() => {
        if (isOnTV) {
            setLoading((true))
            dispatch({
                type: ActionType.API_GET_POPULAR_MOVIE,
                data: { type: 'top_rated', isOnTV },
                setLoading,
                setBackgroundImage
            })
        }

    }, [isOnTV])



    return (
        <React.Fragment>
            {loading ? <Loading />
                : <div style={{ backgroundImage: `url( ${backgroundImage})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: 330, maxHeight: 330, overflow: 'hidden', transition: 'all .3s ease' }}>
                    <div className='wrapper' style={{ width: '100%', background: 'linear-gradient(to right, rgba(3,37,65, 0.75) 0%, rgba(3,37,65, 0.75) 100%)' }}>
                        <SwitchMode
                            title={`Latest Trailers`}
                            cssDefault={cssDefault}
                            handleSwitchMode={handleSwitchMode}
                            type='trailers'
                            type_1='onTV'
                            type_2='inThreaters'
                            leftSide={leftSide}
                            category_1='On TV'
                            category_2='In Threaters'
                        />
                        <div className={` scroller`} style={{ display: 'flex', overflowX: 'scroll', overflowY: 'hidden', maxHeight: 330, height: 330 }}>
                            {
                                latestMovie && latestMovie.length > 0 ?
                                    latestMovie.map((item, index) => {
                                        const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                            item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                        return <React.Fragment key={index}>
                                            <div
                                                className='item-trailers'
                                                style={{ height: 'calc(300px / 1.78)' }}>
                                                <img style={{ width: '100%', height: '100%', borderRadius: 10 }} src={`${URL_IMAGE}${item.backdrop_path}`} />
                                                <a className='play_trailer' onClick={() => handleIsPlay(true, trailer.key, trailer)} onMouseOver={() => {
                                                    setBackgroundImage(`${URL_IMAGE}${item.backdrop_path}`)
                                                    if (item.id && isOnTV) {
                                                        dispatch({
                                                            type: ActionType.API_GET_DETAIL_MOVIE,
                                                            data: { id: item.id, type: isOnTV },
                                                            setLoading
                                                        })
                                                    }
                                                }}>
                                                    <div className='play_background'>
                                                        <span><CaretRightOutlined style={{ fontSize: 60, color: '#fff' }} /></span>
                                                    </div>
                                                </a>
                                                <h4  >
                                                    <a onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: isOnTV } })}>{
                                                        item.title ? item.title :
                                                            item.name ? item.name : ''
                                                    }</a>
                                                </h4>
                                            </div>
                                        </React.Fragment>
                                    })
                                    : null
                            }

                        </div>
                    </div>

                </div>
            }

        </React.Fragment >
    )
}
