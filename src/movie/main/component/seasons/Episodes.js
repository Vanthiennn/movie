import { Button, Tooltip, Collapse } from 'antd'
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons'
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
import { Helmet } from 'react-helmet'

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function Episodes({ handleLoading }) {

    const URL_POSTER = 'https://image.tmdb.org/t/p/w58_and_h87_multi_faces'
    const URL_IMAGE_EPISODES = 'https://image.tmdb.org/t/p/w227_and_h127_multi_faces'
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    let { type, id, tv_id, season_number } = location.state
    const episodes = useSelector(state => {
        const data = state.mainReducer.episode
        return data && !Array.isArray(data) && typeof data === 'object' ? data : {}
    }, (prev, next) => isEqual(prev, next))

    const yearOfMovies = episodes && episodes.air_date ? moment(episodes.air_date).format('YYYY') : ''


    useEffect(() => {
        window.scrollTo(0, 0)
        try {
            if (tv_id && season_number) {
                setLoading(true)
                dispatch({
                    type: ActionType.API_GET_DATA_OF_EPISODES,
                    data: {
                        tv_id, season_number
                    },
                    setLoading
                })
            }
        } catch (error) {

        }
    }, [])
    return (
        <React.Fragment>
            {loading ? <Loading />
                :
                <React.Fragment>
                    <Helmet>
                        <title>Episodes</title>
                        <meta
                            name="description"
                            content="Episodes"
                        />
                    </Helmet>
                    <div className='episodes'>
                        <div className='breadcrumb'>
                            <div className='wrapper'>
                                <div className='image-poster'>
                                    <img src={episodes.poster_path ? `${URL_POSTER + episodes.poster_path}` : DefaultImage} alt='poster' />
                                </div>
                                <div className='title-movie'>
                                    <h3>
                                        {episodes.name ? episodes.name : ''}
                                        {yearOfMovies ? <span> ({yearOfMovies})</span> : ''}
                                    </h3>
                                    <a onClick={() => navigate(-1)}> <ArrowLeftOutlined style={{ fontSize: 14 }} /> Back to season list</a>
                                </div>
                            </div>
                        </div>
                        <div className='content'>
                            <div className='w-90' >
                                {
                                    episodes && Array.isArray(episodes.episodes) && episodes.episodes.length > 0
                                        ? episodes.episodes.map(item => {

                                            return (
                                                <div className='item' key={item.id}>
                                                    <div className='wrapper' >
                                                        <div className='image' >
                                                            <img src={item.still_path ? `${URL_IMAGE_EPISODES + item.still_path}` : DefaultImage} alt='poster' />
                                                        </div>
                                                        <div className='detail'>
                                                            <div className='title-episode'>
                                                                <div className='left'>
                                                                    <h4>{item.episode_number ? item.episode_number : ''}</h4>
                                                                    <div className='rating'>
                                                                        <span><StarFilled style={{ marginRight: 5 }} /></span>
                                                                        {item.vote_average ? Number((item.vote_average).toFixed(1)) : "0.0"}
                                                                    </div>
                                                                    <h3>{item.name ? item.name : ''}</h3>
                                                                </div>
                                                                <div className='right'>
                                                                    <p> {item.air_date ? moment(item.air_date).format('MMMM D, YYYY') : ''}</p>
                                                                    <p className='runtime'>{(item.runtime && Math.floor(Number(item.runtime / 60)) > 0 ? Math.floor(Number(item.runtime / 60)) + 'h' : '') + " " + (item.runtime ? item.runtime % 60 + "m" : '')}</p>
                                                                </div>
                                                            </div>
                                                            <p className='overview'>{item.overview ? item.overview : `We don't have an overview translated in English. Help us expand our database by adding one.`}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                        : <h1>There are no episodes added to this season. Please try again later !!! </h1>
                                }
                            </div>
                        </div>
                    </div>
                </React.Fragment>

            }

        </React.Fragment>
    )
}
