import { SearchOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Input, Spin, Button, Progress } from 'antd';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import * as ActionType from '../../../controllers/actionTypes'
import isEqual from 'lodash/isEqual'
import './index.scss'
import SwitchMode from '../../../../base/components/switchMode/SwitchMode';
import TrendingBackground from '../../../static/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.jpg'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../base/components/loading/Loading';
export default function Trending({ ...props }) {
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w220_and_h330_face'
    const dispatch = useDispatch()

    const trendingMovies = useSelector(state => {
        let data = state.mainReducer.trendingMovies
        return data && Array.isArray(data) ? data : []
    }, (prev, next) => isEqual(prev, next))

    const navigate = useNavigate()

    const [type, setType] = useState('day')
    const [leftSide, setLeftSide] = useState('')
    const [cssDefault, setCssDefault] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleSwitchMode = (e) => {
        setCssDefault(false)
        if (e) {
            if (e === 'day') {
                setType('day')
                setLeftSide(true)

            } else {
                setType('week')
                setLeftSide(false)
            }
        }
    }
    useEffect(() => {
        if (type) {
            setLoading(true)
            dispatch({
                type: ActionType.API_GET_TRENDING_MOVIE,
                data: { time: type },
                setLoading
            })
        }
    }, [type])

    return (
        <React.Fragment>
            {loading ? <Loading />
                : <div style={{ padding: '50px 0', backgroundImage: `url( ${TrendingBackground})`, backgroundPosition: '50% 250px', backgroundRepeat: 'no-repeat', backgroundSize: '1300px' }}>
                    <SwitchMode
                        title={`Trending`}
                        cssDefault={cssDefault}
                        handleSwitchMode={handleSwitchMode}
                        type_1='day'
                        type_2='week'
                        leftSide={leftSide}
                        category_1='Today'
                        category_2='Weekend'
                    />

                    <div className={` scroller`} style={{ display: 'flex', overflowX: 'scroll', overflowY: 'hidden', }}>
                        {
                            trendingMovies.length > 0 ?
                                trendingMovies.map((item, index) => {
                                    const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                        item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                    return <React.Fragment key={index}>
                                        <div style={{ marginLeft: 30, width: 150, minWidth: 150 }}>
                                            <img src={`${URL_IMAGE}${item.backdrop_path}`} style={{ width: '100%', borderRadius: 8 ,cursor:'pointer' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: item.media_type } })} />
                                            <div className='content' style={{ position: 'relative', padding: '26px 10px 12px 10px' }}>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'} type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percent' />
                                                <h4 style={{ cursor: 'pointer' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: item.media_type } })} >{
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
                </div>}
        </React.Fragment >
    )
}
