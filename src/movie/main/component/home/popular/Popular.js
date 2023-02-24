import { SearchOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Input, Spin, Button, Progress } from 'antd';
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as ActionType from '../../../controllers/actionTypes'
import isEqual from 'lodash/isEqual'
import './index.scss'
import SwitchMode from '../../../../base/components/switchMode/SwitchMode';
import Loading from '../../../../base/components/loading/Loading';

export default function Popular({ ...props }) {
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w220_and_h330_face'
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const popularMovie = useSelector(state => {
        let data = state.mainReducer.movie
        return data && Array.isArray(data) ? data : []
    }, (prev, next) => isEqual(prev, next))


    const [isOnTV, setIsOnTV] = useState('tv')
    const [leftSide, setLeftSide] = useState('')
    const [cssDefault, setCssDefault] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleSwitchMode = (e) => {
        setCssDefault(false)
        if (e) {
            if (e === 'onTV') {
                setLeftSide(true)
                setIsOnTV('tv')

            } else if (e === 'inThreaters') {
                setLeftSide(false)
                setIsOnTV('movie')
            }
        }
    }

    useEffect(() => {
        if (isOnTV) {
            setLoading(true)
            dispatch({
                type: ActionType.API_GET_POPULAR_MOVIE,
                data: { type: 'popular', isOnTV },
                setLoading
            })
        }
    }, [isOnTV])



    return (
        <React.Fragment>
            <div style={{ padding: '50px 0'}}>
                <SwitchMode
                    title={`What's Popular`}
                    cssDefault={cssDefault}
                    handleSwitchMode={handleSwitchMode}
                    type_1='onTV'
                    type_2='inThreaters'
                    leftSide={leftSide}
                    category_1='On TV'
                    category_2='In Threaters'
                />
                {loading ? <Loading />
                    : <div className={` scroller`} style={{ display: 'flex', overflowX: 'scroll', overflowY: 'hidden', maxHeight: 380, height: 380 }}>
                        {
                            popularMovie.length > 0 ?
                                popularMovie.map((item, index) => {
                                    const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                        item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''

                                    return <React.Fragment key={index}>
                                        <div style={{ marginLeft: 30, width: 150, minWidth: 150 }}>
                                            <img style={{ width: '100%', borderRadius: 8, cursor: 'pointer' }} src={`${URL_IMAGE}${item.backdrop_path ? item.backdrop_path : item.poster_path}`} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: isOnTV } })} />
                                            <div className='content' style={{ position: 'relative', padding: '26px 10px 12px 10px' }}>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percent' />
                                                <h4 style={{ cursor: 'pointer' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: isOnTV } })} >{
                                                    item.title ? item.title :
                                                        item.name ? item.name : ''
                                                }</h4>
                                                <p>{
                                                    item.release_date ? item.release_date :
                                                        item.first_air_date ? item.first_air_date : ''
                                                }</p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                })
                                : null
                        }

                    </div>
                }
            </div>
        </React.Fragment >
    )
}
