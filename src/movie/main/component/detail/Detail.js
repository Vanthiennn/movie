import '../../../main/component/home/latest_trailers/index.scss'
import './index.scss'
import { ArrowRightOutlined, StarFilled, CaretRightOutlined, FacebookFilled, TwitterOutlined, InstagramOutlined, LinkOutlined } from '@ant-design/icons'
import { Row, Col, Tabs, Tooltip, Progress } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as ActionType from '../../controllers/actionTypes'
import { isEqual } from 'lodash'
import moment from 'moment'
import { useNavigate, Link } from 'react-router-dom'
import DefaultImage from '../../static/default-thumbnail.jpg'
import Loading from '../../../base/components/loading/Loading'
import { BsFillBookmarkFill } from '@react-icons/all-files/bs/BsFillBookmarkFill'
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'

import { useAuthState } from "react-firebase-hooks/auth";

import { auth, warnNotification, } from "../../../../firebase/index";

import * as AccountActionType from '../../../account/controllers/actionsType'

const URL_CAST = 'https://image.tmdb.org/t/p/w138_and_h175_multi_faces'
const URL_SEASON = 'https://image.tmdb.org/t/p/w130_and_h195_multi_faces'
const URL_POSTER = 'https://image.tmdb.org/t/p/w300_and_h450_multi_faces'
const URL_AVATAR = 'https://image.tmdb.org/t/p/w64_and_h64_multi_faces'
const URL_IMAGE = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'


const Cast = ({ type, cast, detail, ...props }) => {
    const data = cast && Array.isArray(cast) && cast.length > 10 ? cast.slice(0, 10) : cast
    const navigate = useNavigate()
    const crew = useSelector(state => {
        let data = state.mainReducer.credits
        return data && data.crew && data.crew.length > 0 ? data.crew : []
    }, (prev, next) => isEqual(prev, next))

    let arr = []
    crew?.forEach((item, index) => {
        let i = index + 1
        if (i < crew.length) {
            i = index + 1
        } else {
            i = crew.length
        }


        if (!arr.includes(item.known_for_department)) {
            arr.push(item.known_for_department)
        }

    })

    let job = []
    arr.forEach(item => {
        let b = crew.filter(i => i.known_for_department === item)
        job.push({ [item]: b })
    })

    const dashTitleCast = detail.title ? detail.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
        detail.name ? detail.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''

    const yearOfMovies = detail && detail.release_date ? moment(detail.release_date).format('YYYY') : detail.first_air_date ? moment(detail.first_air_date).format('YYYY') : ''
    const title = detail && detail.title ? detail.title : detail.name ? detail.name : ""
    return (
        <div className='cast'>
            <h3 className='title'>{type && type === 'movie' ? 'Top Billed' : 'Series'} Cast</h3>
            <div className='animated scroller '>
                {
                    data && data.length > 0 ?
                        data.map((item, index) => {
                            const dashTitle = item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                            return <React.Fragment key={item.id}>
                                <div className='list-cast'>
                                    <div
                                        className='card'
                                    >
                                        <div className='item' >
                                            <img style={{ width: '100%', borderRadius: 8, cursor: 'pointer', height: 175, objectFit: 'cover' }}
                                                onClick={() => navigate(`/person/${item.id}-${dashTitle}`, { state: { id: item.id, type, name: item.name } })}
                                                src={item.profile_path ? `${URL_CAST}${item.profile_path}` : DefaultImage} alt='Image Cast' />
                                            <div style={{ padding: 15 }}>

                                                <Link className='name-cast' to={`/person/${item.id}-${dashTitle}`} state={{ id: item.id, type, name: item.name }}>
                                                    {item.title ? item.title :
                                                        item.name ? item.name : ''}
                                                </Link>
                                                <p>{
                                                    item.character ? item.character :
                                                        item.first_air_date ? item.first_air_date : ''
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        })
                        : `There's no cast for this movie or maybe this list cast had something wrong. We trying to fix them as soon as. Thank you !!!`
                }
                <div className='view-more'>
                    <div
                        className='wrapper'
                    >   {
                            data && data.length > 9
                                ? <div className='d-flex' >
                                    <a href='#' style={{ color: '#000', fontWeight: 700 }} >View More <ArrowRightOutlined /></a>
                                </div>
                                : null
                        }
                    </div>

                </div>
            </div>
            <div className='full-info'>
                {(cast && cast.length > 0) || (crew && crew.length > 0) ?
                    <Link className='' to={`/fullCast/${detail.id}-${dashTitleCast}`} state={{ id: detail.id, cast, job, arr, type, crew, yearOfMovies, title, detail }}>
                        Full Cast and Crew
                    </Link>
                    : null}
            </div>
        </div>
    )
}

const CurrentSeason = ({ detail, type }) => {
    const navigate = useNavigate()
    const seasons = detail && detail.seasons && Array.isArray(detail.seasons) ? detail.seasons : []
    const dashTitle = detail.title ? detail.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
        detail.name ? detail.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
    return (
        seasons && seasons.length > 0
            ? <div className='season'>
                <h3 className='title'>Current Season</h3>
                <div className='content'>
                    <div className='wrapper' >
                        <div className='d-flex' >
                            {
                                seasons && seasons.length > 0 && seasons[seasons.length - 1].poster_path ?
                                    <img alt='Seasons' src={URL_SEASON + seasons[seasons.length - 1].poster_path} style={{ width: 130, minWidth: 130, cursor: 'pointer', borderRadius: '8px', objectFit: 'cover' }} onClick={() => navigate(`/episodes/${seasons[seasons.length - 1].id}-${dashTitle}`, { state: { id: seasons[seasons.length - 1].id, type: type, tv_id: detail.id, season_number: seasons[seasons.length - 1].season_number } })} />
                                    : <img alt='Seasons' src={DefaultImage} style={{ width: 130, minWidth: 130, cursor: 'pointer', borderRadius: '8px', objectFit: 'cover' }} onClick={() => navigate(`/episodes/${seasons[seasons.length - 1].id}-${dashTitle}`, { state: { id: seasons[seasons.length - 1].id, type: type, tv_id: detail.id, season_number: seasons[seasons.length - 1].season_number } })} />
                            }
                            <div className='content2'>
                                <div className='info'>
                                    <Link className='title-season' style={{ color: '#000', fontSize: 20, fontWeight: 600 }} to={`/episodes/${seasons[seasons.length - 1].id}-${dashTitle}`} state={{ id: seasons[seasons.length - 1].id, type, tv_id: detail.id, season_number: seasons[seasons.length - 1].season_number }} >
                                        {seasons[seasons.length - 1].title ? seasons[seasons.length - 1].title : seasons[seasons.length - 1].name ? seasons[seasons.length - 1].name : ''}
                                    </Link>
                                    <h4>{seasons && seasons.length > 0 && seasons[seasons.length - 1].air_date ? moment(seasons[seasons.length - 1].air_date).format('YYYY') : ''} | {seasons && seasons.length > 0 && seasons[seasons.length - 1].episode_count ? seasons.episode_count : 1} Episodes</h4>
                                    <div className='overview'>
                                        <p >
                                            {detail && detail.name && seasons && seasons.length > 0 && seasons[seasons.length - 1].name && seasons[seasons.length - 1].air_date
                                                ? `${seasons[seasons.length - 1].name} of ${detail.name} premiered on ${moment(seasons[seasons.length - 1].air_date).format('MMMM D, YYYY')}`
                                                : ''}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Link to={`/seasons/${detail.id}-${dashTitle}`} state={{ id: detail.id, type, seasons, detail }} style={{ color: '#000', fontWeight: 600, fontSize: 17, transition: 'all 0.3s ease' }}>View All Seasons</Link>
                    {/* <Link href='#' style={{ color: '#000', fontWeight: 600, fontSize: 17, transition: 'all 0.3s ease' }}>View All Seasons</Link> */}
                </div>
            </div>
            : null

    )
}

const Social = ({ detail }) => {
    const reviews = detail && detail.reviews && Array.isArray(detail.reviews.results) ? detail.reviews.results : []
    const dashTitle = detail.title ? detail.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
        detail.name ? detail.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
    return (
        <div className='social'>
            <div className='review'>
                <h3 className='title'>Reviews <span> ({reviews && reviews.length > 0 ? reviews.length : 0}) </span></h3>
                {
                    reviews && reviews.length > 0 ?
                        <React.Fragment>
                            <div className='content'>
                                <div className='wrapper' >
                                    <div className='d-flex' >
                                        <div className='avatar'  >
                                            {
                                                reviews && reviews.length > 0 && reviews[0].author_details && reviews[0].author_details.avatar_path ?
                                                    <img className='reviewer-avatar' alt='Reviewer' src={reviews && reviews.length > 0 && reviews[0].author_details && reviews[0].author_details.avatar_path ? `${URL_AVATAR}${reviews[0].author_details.avatar_path}` : ''} />
                                                    : <span className='default-avatar' >
                                                        {reviews && reviews.length > 0 && reviews[0].author ? reviews[0].author.charAt(0).toUpperCase() : ''}
                                                    </span>
                                            }
                                        </div>
                                        <div className='comment'>
                                            <div className='info'>
                                                <div className='d-flex'>
                                                    <a href={`${reviews && reviews.length > 0 ? reviews[0].url : '#'}`}>A review by {reviews && reviews.length > 0 ? reviews[0].author : ''}</a>
                                                    <div className='rating'>
                                                        <span><StarFilled style={{ marginRight: 5 }} /></span>
                                                        {reviews && reviews.length > 0 && reviews[0].author_details && reviews[0].author_details.rating ? reviews[0].author_details.rating : 0}.0
                                                    </div>
                                                </div>
                                                <h5 className='author'>Written by <a href={reviews && reviews.length > 0 ? `https://www.themoviedb.org/u/${reviews[0].author}` : '#'} style={{ color: '#000', fontWeight: 'bold' }}>{reviews && reviews.length > 0 ? reviews[0].author : ''}</a> on {reviews && reviews.length > 0 ? moment(reviews[0].created_at).format('MMMM D, YYYY') : ''}</h5>
                                            </div>
                                            <div className='content'>
                                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                                    {reviews && reviews.length > 0 && reviews[0].content && reviews[0].content ? reviews[0].content : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                {reviews && reviews.length > 1 ? <Link to={`/reviews/${detail.id}-${dashTitle}`} state={{ id: detail.id, reviews, detail }} style={{ color: '#000', fontSize: 17, fontWeight: 600 }} >
                                    Read All Reviews
                                </Link> : ''}
                            </div>
                        </React.Fragment>
                        : `We don't have any reviews for ${detail && detail.title ? detail.title : detail.name ? detail.name : ""}.`
                }

            </div>
        </div>

    )
}

// ------ Media --------

const Popular = ({ videos, images, handleIsPlay }) => {
    const trailer = videos && videos.length > 0 ? videos.find(i => i.name == "Official Trailer" || i.name == "Trailer" || i.name == "Official Trailer [Subtitled]"
    ) : {}
    return (
        <div className='popular scroller'>
            <div className='video'>
                {
                    trailer && trailer.key ?
                        <div className='wrapper' style={{ backgroundImage: `url(https://i.ytimg.com/vi/${trailer.key}/hqdefault.jpg)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
                            <a className='play_trailer' onClick={() => handleIsPlay(true, trailer.key, trailer)}>
                                <div className='play_background'>
                                    <span><CaretRightOutlined style={{ fontSize: 40 }} /></span>
                                </div>
                            </a>
                        </div>
                        : null
                }

            </div>
            <div className='backdrops'>
                {
                    images && images.backdrops && images.backdrops.length > 0 ?
                        <img src={`https://image.tmdb.org/t/p/w533_and_h300_multi_faces${images && images.backdrops && images.backdrops.length > 0 ? images.backdrops[0].file_path : ''}`} alt='Backdrops' />
                        : null
                }
            </div>
            <div className='posters'>
                {
                    images && images.posters && images.posters.length > 0 ?
                        <img src={`https://image.tmdb.org/t/p/w220_and_h330_multi_faces${images && images.posters && images.posters.length > 0 ? images.posters[0].file_path : ''}`} alt='Posters' />
                        : null
                }

            </div>

        </div>
    )
}

const VideoMedia = ({ videos, handleIsPlay }) => {

    let slice = []
    if (videos && videos.length > 6) {
        slice = videos.slice(0, 6)
    } else {
        slice = videos
    }
    return (
        <div className='popular scroller'>
            <div className='video' style={{ display: 'flex' }}>
                {
                    slice && Array.isArray(slice) && slice.length > 0 ?
                        slice.map((item, index) => {
                            return (
                                <div key={item.id} className='wrapper' style={{ backgroundImage: `url(https://i.ytimg.com/vi/${item.key}/hqdefault.jpg)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
                                    <a className='play_trailer' onClick={() => handleIsPlay(true, item.key, item)}>
                                        <div className='play_background'>
                                            <span><CaretRightOutlined style={{ fontSize: 40 }} /></span>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                        : null
                }
                <div className='view-more'>
                    <div
                        className='wrapper'
                        style={{ width: 140, minWidth: 140 }}
                    >   {
                            videos && videos.length > 6
                                ? <div className='d-flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
                                    <a href='#' style={{ color: '#000', fontWeight: 700 }} >View More <ArrowRightOutlined /></a>
                                </div>
                                : null
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

const Backdrops = ({ backdrops }) => {
    let slice = []
    if (backdrops && backdrops.length > 6) {
        slice = backdrops.slice(0, 6)
    } else {
        slice = backdrops
    }
    return (
        <div className='popular scroller'>
            <div className='video' style={{ display: 'flex' }}>
                {
                    slice && Array.isArray(slice) && slice.length > 0 ?
                        slice.map((item, index) => {
                            return (
                                <div className='backdrops' key={index}>
                                    <img src={`https://image.tmdb.org/t/p/w533_and_h300_multi_faces${item.file_path}`} alt='Backdrops' />
                                </div>
                            )
                        })
                        : null
                }
                <div className='view-more'>
                    <div
                        className='wrapper'
                        style={{ width: 140, minWidth: 140 }}
                    >   {
                            backdrops && backdrops.length > 6
                                ? <div className='d-flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
                                    <a href='#' style={{ color: '#000', fontWeight: 700 }} >View More <ArrowRightOutlined /></a>
                                </div>
                                : null
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

const Posters = ({ posters }) => {
    let slice = []
    if (posters && posters.length > 6) {
        slice = posters.slice(0, 6)
    } else {
        slice = posters
    }
    return (
        <div className='popular scroller'>
            <div className='video' style={{ display: 'flex' }}>
                {
                    slice && Array.isArray(slice) && slice.length > 0 ?
                        slice.map((item, index) => {
                            return (
                                <div className='posters' key={index}>
                                    <img src={`https://image.tmdb.org/t/p/w220_and_h330_multi_faces${item.file_path}`} alt='Posters' />
                                </div>
                            )
                        })
                        : null
                }
                <div className='view-more'>
                    <div
                        className='wrapper'
                        style={{ width: 140, minWidth: 140 }}
                    >   {
                            posters && posters.length > 6
                                ? <div className='d-flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
                                    <a href='#' style={{ color: '#000', fontWeight: 700 }} >View More <ArrowRightOutlined /></a>
                                </div>
                                : null
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

const Media = ({ detail, handleIsPlay }) => {
    const images = detail && detail.images && !Array.isArray(detail.images) && typeof detail.images === 'object' ? detail.images : {}
    const videos = detail && detail.videos && detail.videos.results.length > 0 && Array.isArray(detail.videos.results) ? detail.videos.results : []


    return (
        <div className='media'>
            <h3>Media</h3>
            {
                Object.keys(images).length > 0 && videos.length > 0
                    ? <div className='tab'>
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    label: `Most Popular`,
                                    key: '1',
                                    children: <Popular videos={videos} images={images} handleIsPlay={handleIsPlay} />,
                                },
                                {
                                    label: `Videos (${videos && videos.length > 0 ? videos.length : 0})`,
                                    key: '2',
                                    children: <VideoMedia videos={videos} handleIsPlay={handleIsPlay} />,
                                },
                                {
                                    label: `Backdrops  (${images && images.backdrops && images.backdrops.length > 0 ? images.backdrops.length : 0})`,
                                    key: '3',
                                    children: <Backdrops backdrops={images.backdrops} />,
                                },
                                {
                                    label: `Posters (${images && images.posters && images.posters.length > 0 ? images.posters.length : 0})`,
                                    key: '4',
                                    children: <Posters posters={images.posters} />
                                },
                            ]}
                        />
                    </div>
                    : `No videos, backdrops or posters have been added to ${detail && detail.title ? detail.title : detail.name ? detail.name : ""}.`
            }

        </div>
    )
}

// ------ End Media ------


// Recommendations

const Recommendations = ({ detail, type }) => {
    const navigate = useNavigate()
    let { recommendations } = detail
    const result = recommendations && Array.isArray(recommendations.results) && recommendations.results.length > 0 ? recommendations.results : []
    return (
        result && result.length > 0 ? <div className='recommendations' style={{ padding: '30px 0' }}>
            <h3 style={{ fontSize: 25 }}>Recommendations</h3>
            <div className={` scroller`} style={{ display: 'flex', overflowX: 'scroll', overflowY: 'hidden' }}>

                {
                    result.length > 0 ?
                        result.map((item, index) => {
                            const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''

                            return <React.Fragment key={index}>
                                <div style={{ marginLeft: 30, width: 250 }}>
                                    <img style={{ borderRadius: 8, width: 250, height: 141, cursor: 'pointer' }} src={`https://image.tmdb.org/t/p/w250_and_h141_multi_faces${item.backdrop_path ? item.backdrop_path : item.poster_path}`} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type } })} />
                                    <div className='content' style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                                        <h4>{
                                            item.title ? item.title :
                                                item.name ? item.name : ''
                                        }</h4>
                                        <p>{item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}%</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        })
                        : null
                }

            </div>
        </div>
            : null
    )
}

export default function Detail({ handleIsPlay }) {

    const location = useLocation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    let { state } = location
    const [user, loadingg, error] = useAuthState(auth);
    const type = state && state.type ? state.type : ''

    const ids = state && state.id ? state.id : ''
    const detail = useSelector(state => {
        let data = state.mainReducer.detail
        return data && !Array.isArray(data) && typeof data === 'object' ? data : {}
    }, (prev, next) => isEqual(prev, next))
    const release = useSelector(state => {
        let data = state.mainReducer.release
        if (data && Array.isArray(data) && data.length > 1) {
            const result = data.filter(item => {
                if (item.iso_3166_1 === (detail && Array.isArray(detail.production_countries) && detail.production_countries.length > 0 ? detail.production_countries[0].iso_3166_1 : detail && Array.isArray(detail.origin_country) && detail.origin_country.length > 0 ? detail.origin_country[0] : [])) {
                    return item.iso_3166_1 === (detail && Array.isArray(detail.production_countries) && detail.production_countries.length > 0 ? detail.production_countries[0].iso_3166_1 : detail && Array.isArray(detail.origin_country) && detail.origin_country.length > 0 ? detail.origin_country[0] : [])
                } else {
                    return item.iso_3166_1 === 'US'
                }
            })

            let newResult = []
            if (result[0] && result[0].release_dates) {
                newResult = result[0].release_dates
                return newResult.filter(item => item.certification !== '')
            } else {
                newResult = result[0]
            }
            return newResult ? newResult : []
        } else if (data && Array.isArray(data) && data.length <= 1) {
            return data && Array.isArray(data) ? data[0] : []
        }
    }, (prev, next) => isEqual(prev, next))

    const { cast, crew } = useSelector(state => {
        let data = state.mainReducer.credits
        let cast, crew

        if (data) {
            crew = data && data.crew ? data.crew.filter(item => item.known_for_department === "Directing" || item.known_for_department === "Writing") : []
            cast = data.cast
            return { cast, crew }

        }
    }, (prev, next) => isEqual(prev, next))


    const account = useSelector(state => {
        const id = user && user.reloadUserInfo && user.reloadUserInfo.localId ? user.reloadUserInfo.localId : ''
        let data = state.AccountReducer.detail
        return data[id] ? data[id] : {}
    }, (prev, next) => isEqual(prev, next))

    // lặp biến crew để tạo mảng ko trùng object có chung name 
    let arrName = []

    crew.forEach((item, index) => {
        let i = index + 1
        if (i < crew.length) {
            i = index + 1
        } else {
            i = crew.length
        }
        if (crew.length > 0 && crew.length < 2) {
            arrName.push(crew[index])
        }
        if (typeof crew[index] === 'object' && typeof crew[i] === 'object') {
            if (crew[index].name !== crew[i].name) {

                arrName.push(crew[index])
            }
        }
    });

    let job = []
    arrName.forEach(item => {
        let b = crew.filter(i => i.name === item.name)
        job.push({ [item.name]: b })
    })

    const newArr = arrName && Array.isArray(arrName) && arrName.length > 0 && arrName.length <= 6 ? arrName : arrName.slice(0, 6)
    // Get value of origin language
    const origin = detail && detail.spoken_languages && detail.original_language ? detail.spoken_languages.find(e => e.iso_639_1 === detail.original_language) : {}
    const findItem = type && type === 'movie' ? account.watchlist?.movies.filter(e => e.id === detail.id) : type === 'tv' ? account.watchlist?.tvshow.filter(e => e.id === detail.id) : ''
    const findItemFavorite = type && type === 'movie' ? account.favorite?.movies.filter(e => e.id === detail.id) : type === 'tv' ? account.favorite?.tvshow.filter(e => e.id === detail.id) : ''
    useEffect(() => {
        try {
            if (ids && type) {
                setLoading(true)
                dispatch({
                    type: ActionType.API_GET_DETAIL_MOVIE,
                    data: { id: ids, type },
                    setLoading
                })
            }
            window.scrollTo(0, 0)
        } catch (err) {
           
        }
    }, [type, ids])

    // format number để làm đẹp con số
    const formartNumber = new Intl.NumberFormat();
    const keywords = detail && detail.keywords && Array.isArray(detail.keywords.keywords) && detail.keywords.keywords.length > 0 ? detail.keywords.keywords : (detail && detail.keywords && Array.isArray(detail.keywords.results) && detail.keywords.results.length > 0) ? detail.keywords.results : []


    const [idMovieAdd, setIdMovieAdd] = useState({
        [detail.id]: false
    })

    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({
        [detail.id]: false
    })
    const handleAddToWatch = () => {
        if (user) {
            const id = user && user.reloadUserInfo && user.reloadUserInfo.localId ? user.reloadUserInfo.localId : ''
            if (id) {
                if (Array.isArray(findItem) && findItem.length === 0) {
                    setIdMovieAdd({ [detail.id]: true })
                    dispatch({
                        type: AccountActionType.MARK_MOVIES_WATCHLIST,
                        data: {
                            id,
                            movie_type: type,
                            movies: detail,

                        }
                    })

                } else {
                    setIdMovieAdd({ [detail.id]: false })
                    dispatch({
                        type: AccountActionType.UNMARK_MOVIES_WATCHLIST,
                        data: {
                            id,
                            movie_type: type,
                            movies: detail,
                            movies_id: detail.id
                        }
                    })
                }
            }


        } else {
            warnNotification('top', 'Login to add this movie to your watchlist')
        }
    }

    const handleAddToFavorite = () => {
        if (user) {
            const id = user && user.reloadUserInfo && user.reloadUserInfo.localId ? user.reloadUserInfo.localId : ''
            if (id) {
                if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                    setIdMovieAddFavorite({ [detail.id]: true })
                    dispatch({
                        type: AccountActionType.MARK_MOVIES_FAVORITE,
                        data: {
                            id,
                            movie_type: type,
                            movies: detail,

                        }
                    })

                } else {
                    setIdMovieAddFavorite({ [detail.id]: false })
                    dispatch({
                        type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                        data: {
                            id,
                            movie_type: type,
                            movies: detail,
                            movies_id: detail.id
                        }
                    })
                }
            }


        } else {
            warnNotification('top', 'Login to add this movie to your favorite')
        }
    }

  
    return (
        <React.Fragment>
            {loading ? <Loading /> :
                <div className='main'>
                    <div className='background' style={{ backgroundImage: `url( ${URL_IMAGE + detail.backdrop_path})`, backgroundPosition: 'left calc((50vw - 170px) - 340px) top', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className='wrapper' style={{ background: 'linear-gradient(to right, rgba(3, 37, 65, 1) calc((50vw - 170px) - 340px), rgba(3, 37, 65, 0.75) 30%, rgba(3, 37, 65, 0.75) 100%)' }}>
                            <div className='width-80' >
                                <div className='image' >
                                    <img src={detail.poster_path ? `${URL_POSTER + detail.poster_path}` : DefaultImage} alt='poster' style={{ width: '100%', height: 450, objectFit: 'cover' }} />
                                </div>
                                <div className='content' >
                                    <div className='title'>
                                        <h2 >
                                            {detail && detail.title ? detail.title : detail.name ? detail.name : ""}
                                            {detail && detail.release_date ? <span style={{ marginLeft: 10 }}>({moment(detail.release_date).format('YYYY')})</span> : detail.first_air_date ? <span style={{ marginLeft: 10 }}>({moment(detail.first_air_date).format('YYYY')})</span> : ''}
                                        </h2>
                                        <div className='tags' style={{ color: '#fff' }}>
                                            {
                                                <React.Fragment>
                                                    {(release && release.length > 0 && release[0].certification) || (release && release.rating) ? <span className='certification' >{release && release.length > 0 && release[0].certification ? release[0].certification : release && release.rating ? release.rating : ''}</span> : null}
                                                    <span className='release'>{detail && detail.release_date ? moment(detail.release_date).format('DD-MM-YYYY') : ''}({detail && Array.isArray(detail.production_countries) && detail.production_countries.length > 0 ? detail.production_countries[0].iso_3166_1 : detail && Array.isArray(detail.origin_country) && detail.origin_country.length > 0 ? detail.origin_country[0] : ''})</span>
                                                </React.Fragment>

                                            }


                                            {detail && detail.genres && detail.genres.length > 0 ?
                                                <React.Fragment>
                                                    <span className='genres'>
                                                        <span ></span>
                                                        {
                                                            detail.genres.map((item, index) => {
                                                                const dashTitle = item.name ? item.name.toLowerCase().replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                                                return <Link to={`/genres/${item.id}-${dashTitle}`} state={{ id: item.id, type: type, name: item.name }} key={item.id}>
                                                                    {item.name}{index === detail.genres.length - 1 ? '' : ','}&nbsp;
                                                                </Link>
                                                            })
                                                        }
                                                    </span>
                                                </React.Fragment>
                                                : null
                                            }

                                            {
                                                detail && (detail.runtime || (detail.episode_run_time && detail.episode_run_time.length > 0))
                                                    ? <React.Fragment>
                                                        <span className='dot'></span>
                                                        <span className='runtime'>{(detail.runtime && Math.floor(Number(detail.runtime / 60)) > 0 ? Math.floor(Number(detail.runtime / 60)) + 'h' : '') + " " + (detail && detail.runtime ? detail.runtime % 60 + "m" : detail && Array.isArray(detail.episode_run_time) && detail.episode_run_time.length > 0 ? detail.episode_run_time[0] + "m" : '')}</span>
                                                    </React.Fragment>
                                                    : null

                                            }

                                        </div>
                                    </div>
                                    <div className='action'>
                                        <ul>
                                            <li className='score'>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(detail.vote_average * 10) > 70 ? '#21cf79' : Number(detail.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={detail.vote_average ? Number((detail.vote_average * 10).toFixed(0)) : 0}
                                                    className='percents'
                                                />
                                            </li>
                                            <li className={`${idMovieAddFavorite[detail.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add favorite`} onClick={handleAddToFavorite}>
                                                <AiFillHeart />
                                            </li>
                                            <li className={`${idMovieAdd[detail.id] || (findItem && findItem.length > 0 && findItem[0].flag) ? 'checked' : ''} add watch-list`} onClick={handleAddToWatch}>
                                                <BsFillBookmarkFill />
                                            </li>

                                        </ul>

                                    </div>
                                    <div className='info'>
                                        <h3 className='tagline' >{detail.tagline ? detail.tagline : ''}</h3>
                                        <h3 style={{ color: '#fff', fontSize: 20 }}>Overview</h3>
                                        <div className='overview'>
                                            <p style={{ fontWeight: 500 }}>{detail.overview ? detail.overview : `We don't have an overview translated in English.`}</p>
                                        </div>
                                        <Row gutter={24} className='crew'>
                                            {
                                                newArr && Array.isArray(newArr) && newArr.length > 0
                                                    ? newArr.map((item, index) => {
                                                        const dashTitle = item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Col className="gutter-row" span={arrName && arrName.length === 1 ? 24 : arrName.length === 2 ? 12 : 8} >
                                                                    <Link className='name-cast' to={`/person/${item.id}-${dashTitle}`} state={{ id: item.id, type, name: item.name }}>
                                                                        {item.name ? item.name : ''}
                                                                    </Link>

                                                                    <div>
                                                                        {
                                                                            job && job.length && Array.isArray(job) > 0 ? job.map((i) => {

                                                                                if (i[item.name]) {

                                                                                    const slice = i[item.name].slice(0, 4)
                                                                                    return slice.map((e, index) => {
                                                                                        return <span key={index} style={{ opacity: 0.6 }}>{e.job}{index === slice.length - 1 ? '' : ','}&nbsp;</span>
                                                                                    })

                                                                                }

                                                                            }) : null
                                                                        }
                                                                    </div>

                                                                </Col>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='width-80' >
                            <div className='left_content' style={{ width: '80%' }}>
                                <Cast type={type} cast={cast} detail={detail} />
                                <CurrentSeason detail={detail} type />
                                <Social detail={detail} />
                                <Media detail={detail} handleIsPlay={handleIsPlay} />
                                <Recommendations detail={detail} type={type} />
                            </div>
                            <div className='right_content' >
                                <div className='social'>
                                    {
                                        detail && detail.external_ids && detail.external_ids.facebook_id ?
                                            <Tooltip title='Visit Facebook'>
                                                <a href={`https://facebook.com/${detail.external_ids.facebook_id}`}>
                                                    <FacebookFilled />
                                                </a>
                                            </Tooltip>
                                            : null
                                    }

                                    {
                                        detail && detail.external_ids && detail.external_ids.twitter_id ?
                                            <Tooltip title='Visit Twitter'>
                                                <a href={`https://twitter.com/${detail.external_ids.twitter_id}`}>
                                                    <TwitterOutlined />
                                                </a>
                                            </Tooltip>
                                            : null
                                    }
                                    {
                                        detail && detail.external_ids && detail.external_ids.instagram_id ?
                                            <Tooltip title='Visit Instagram'>
                                                <a href={`https://instagram.com/${detail.external_ids.instagram_id}`}>
                                                    <InstagramOutlined />
                                                </a>
                                            </Tooltip>
                                            : null
                                    }
                                    {
                                        detail && detail.homepage ?
                                            <Tooltip title='Visit HomePage'>
                                                <a href={detail.homepage}>
                                                    <LinkOutlined />
                                                </a>
                                            </Tooltip>
                                            : null
                                    }

                                </div>
                                <div className='info'>
                                    <p >
                                        <strong>Status</strong>
                                        {detail && detail.status ? detail.status : ''}
                                    </p>
                                    <p >
                                        <strong>Original Language</strong>
                                        {origin && origin.name ? origin.name : '-'}
                                    </p>
                                    {type && type === 'movie' ?
                                        <React.Fragment>
                                            <p >
                                                <strong>Budget</strong>
                                                {detail && Number(detail.budget) ? `$${formartNumber.format(Number(detail.budget))}` : '-'}
                                            </p>
                                            <p >
                                                <strong>Revenue</strong>
                                                {detail && Number(detail.revenue) ? `$${formartNumber.format(Number(detail.revenue))}` : '-'}
                                            </p>
                                        </React.Fragment>
                                        : null
                                    }
                                    {
                                        type && type === 'tv' ?
                                            <React.Fragment>
                                                <p >
                                                    <strong>Network</strong>
                                                    {detail && Array.isArray(detail.networks) && detail.networks.length > 0 ? detail.networks[0].name : ''}

                                                </p>
                                                <p >
                                                    <strong>Type</strong>
                                                    {detail && detail.type ? detail.type : ''}
                                                </p>
                                            </React.Fragment>
                                            : null
                                    }
                                </div>

                                {

                                    <React.Fragment>
                                        <Row className='key-words-detail' gutter={24} wrap>
                                            <h4>Keywords</h4>
                                            {
                                                keywords && keywords.length > 0 && Array.isArray(keywords)
                                                    ? <div className='list-keywords'>
                                                        {
                                                            keywords.map((i, index) => {
                                                                const dashTitle = i.name ? i.name.toLowerCase().replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                                                return <Col key={i.id} span={12}>
                                                                    <div className='item-keywords'>
                                                                        <a>{i.name}</a>
                                                                    </div>
                                                                </Col>
                                                            })
                                                        }
                                                    </div>
                                                    : 'No keywords have been added.'
                                            }

                                        </Row>
                                    </React.Fragment>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            }


        </React.Fragment >
    )
}
