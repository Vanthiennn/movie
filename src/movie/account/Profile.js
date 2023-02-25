import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { isEqual } from 'lodash'
import { Pagination, Progress, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as AccountActionType from './controllers/actionsType'
import moment from 'moment'
import Background from '../main/static/profile.jpg'
import DefaultImage from '../main/static/default-thumbnail.jpg'
import './index.scss'
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose'
import { Helmet } from 'react-helmet'

const URL_POSTER = 'https://image.tmdb.org/t/p/w150_and_h225_multi_faces'

// For My Watchlist
const Movies = ({ watchlist, id, favorite }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({})
    const [idMovieRemove, setIdMovieRemove] = useState({})

    const handleRemove = (item) => {
        if (id) {

            setIdMovieRemove({ [item.id]: false })
            dispatch({
                type: AccountActionType.UNMARK_MOVIES_WATCHLIST,
                data: {
                    id,
                    movie_type: 'movie',
                    movies: item,
                    moview_id: item.id
                },

            })
        }

    }
    const handleAddToFavorite = (e) => {
        if (id) {
            const findItemFavorite = favorite.movies.filter(t => t.id === e.id)
            if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                setIdMovieAddFavorite({ [e.id]: true })
                dispatch({
                    type: AccountActionType.MARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,

                    }
                })

            } else {
                setIdMovieAddFavorite({ [e.id]: false })
                dispatch({
                    type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,
                        moview_id: e.id
                    }
                })
            }

        }
    }

    return (
        <React.Fragment>
            {
                watchlist && Array.isArray(watchlist.movies) && watchlist.movies.length > 0
                    ? watchlist.movies.map(item => {
                        const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                            item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                        const findItemFavorite = favorite.movies.filter(e => e.id === item.id)
                        const findItem = watchlist.movies.filter(e => e.id === item.id)
                        return (
                            <div className='item' key={item.id}>
                                <div className='wrapper' >
                                    <div className='image' >
                                        <img src={`${item.poster_path ? URL_POSTER + item.poster_path : DefaultImage}`} alt='poster' style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: 'movie' } })} />
                                    </div>
                                    <div className='detail'>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percents'
                                                />
                                            </div>
                                            <div>
                                                <Link className='title-overview' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: 'movie' }} >
                                                    {item.title ? item.title : item.name ? item.name : ''}
                                                </Link>
                                                <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                            </div>
                                        </div>
                                        <p style={{ margin: '10px 0' }}>{item.overview ? item.overview : ''}</p>
                                        <div className='action'>
                                            <div className='icon'>
                                                <div className='favorite' onClick={() => handleAddToFavorite(item)}>
                                                    <span className={`${idMovieAddFavorite[item.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add `} >
                                                        <AiFillHeart />
                                                    </span>
                                                    <p>Favorite</p>
                                                </div>
                                                <div className='remove'>
                                                    <span className={`${idMovieRemove[item.id] || (findItem && findItem.length > 0 && findItem[0].flag) ? 'checked' : ''} add `} onClick={() => handleRemove(item)}>
                                                        <AiOutlineClose />
                                                    </span>
                                                    <p>Remove</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : 'There are no upcoming movies on your watchlist.'
            }
        </React.Fragment>
    )
}

const TVShows = ({ watchlist, id, favorite }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({})
    const [idMovieRemove, setIdMovieRemove] = useState({})

    const handleRemove = (item) => {
        if (id) {

            setIdMovieRemove({ [item.id]: false })
            dispatch({
                type: AccountActionType.UNMARK_MOVIES_WATCHLIST,
                data: {
                    id,
                    movie_type: 'tv',
                    movies: item,
                    moview_id: item.id
                },

            })
        }

    }
    const handleAddToFavorite = (e) => {
        if (id) {
            const findItemFavorite = favorite.tvshow.filter(t => t.id === e.id)
            if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                setIdMovieAddFavorite({ [e.id]: true })
                dispatch({
                    type: AccountActionType.MARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'tv',
                        movies: e,

                    }
                })

            } else {
                setIdMovieAddFavorite({ [e.id]: false })
                dispatch({
                    type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'tv',
                        movies: e,
                        moview_id: e.id
                    }
                })
            }

        }
    }

    return (
        <React.Fragment>
            {
                watchlist && Array.isArray(watchlist.movies) && watchlist.tvshow.length > 0
                    ? watchlist.tvshow.map(item => {
                        const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                            item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                        const findItemFavorite = favorite.tvshow.filter(e => e.id === item.id)
                        const findItem = watchlist.tvshow.filter(e => e.id === item.id)
                        return (
                            <div className='item' key={item.id}>
                                <div className='wrapper' >
                                    <div className='image' >
                                        <img src={`${item.poster_path ? URL_POSTER + item.poster_path : DefaultImage}`} alt='poster' style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: 'tv' } })} />
                                    </div>
                                    <div className='detail'>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percents'
                                                />
                                            </div>
                                            <div>
                                                <Link className='title-overview' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: 'tv' }} >
                                                    {item.title ? item.title : item.name ? item.name : ''}
                                                </Link>
                                                <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                            </div>
                                        </div>
                                        <p style={{ margin: '10px 0' }}>{item.overview ? item.overview : ''}</p>
                                        <div className='action'>
                                            <div className='icon'>
                                                <div className='favorite' onClick={() => handleAddToFavorite(item)}>
                                                    <span className={`${idMovieAddFavorite[item.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add `} >
                                                        <AiFillHeart />
                                                    </span>
                                                    <p>Favorite</p>
                                                </div>
                                                <div className='remove'>
                                                    <span className={`${idMovieRemove[item.id] || (findItem && findItem.length > 0 && findItem[0].flag) ? 'checked' : ''} add `} onClick={() => handleRemove(item)}>
                                                        <AiOutlineClose />
                                                    </span>
                                                    <p>Remove</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : 'There are no upcoming Tvshows on your watchlist.'
            }
        </React.Fragment>
    )
}

// For My Favorites
const MovieFavorites = ({ id, favorite }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({})

    const handleAddToFavorite = (e) => {
        if (id) {
            const findItemFavorite = favorite.movies.filter(t => t.id === e.id)
            if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                setIdMovieAddFavorite({ [e.id]: true })
                dispatch({
                    type: AccountActionType.MARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,

                    }
                })

            } else {
                setIdMovieAddFavorite({ [e.id]: false })
                dispatch({
                    type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,
                        moview_id: e.id
                    }
                })
            }

        }
    }

    return (
        <React.Fragment>
            {
                favorite && Array.isArray(favorite.movies) && favorite.movies.length > 0
                    ? favorite.movies.map(item => {
                        const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                            item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                        const findItemFavorite = favorite.movies.filter(e => e.id === item.id)

                        return (
                            <div className='item' key={item.id}>
                                <div className='wrapper' >
                                    <div className='image' >
                                        <img src={`${item.poster_path ? URL_POSTER + item.poster_path : DefaultImage}`} alt='poster' style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: 'movie' } })} />
                                    </div>
                                    <div className='detail'>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percents'
                                                />
                                            </div>
                                            <div>
                                                <Link className='title-overview' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: 'movie' }} >
                                                    {item.title ? item.title : item.name ? item.name : ''}
                                                </Link>
                                                <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                            </div>
                                        </div>
                                        <p style={{ margin: '10px 0' }}>{item.overview ? item.overview : ''}</p>
                                        <div className='action'>
                                            <div className='icon'>
                                                <div className='favorite' onClick={() => handleAddToFavorite(item)}>
                                                    <span className={`${idMovieAddFavorite[item.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add `} >
                                                        <AiFillHeart />
                                                    </span>
                                                    <p>Favorite</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : 'There are no upcoming movies on your favorites.'
            }
        </React.Fragment>
    )
}

const TVShowFavorites = ({ id, favorite }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({})


    const handleAddToFavorite = (e) => {
        if (id) {
            const findItemFavorite = favorite.tvshow.filter(t => t.id === e.id)
            if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                setIdMovieAddFavorite({ [e.id]: true })
                dispatch({
                    type: AccountActionType.MARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'tv',
                        movies: e,

                    }
                })

            } else {
                setIdMovieAddFavorite({ [e.id]: false })
                dispatch({
                    type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'tv',
                        movies: e,
                        moview_id: e.id
                    }
                })
            }

        }
    }

    return (
        <React.Fragment>
            {
                favorite && Array.isArray(favorite.movies) && favorite.tvshow.length > 0
                    ? favorite.tvshow.map(item => {
                        const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                            item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                        const findItemFavorite = favorite.tvshow.filter(e => e.id === item.id)
                        return (
                            <div className='item' key={item.id}>
                                <div className='wrapper' >
                                    <div className='image' >
                                        <img src={`${item.poster_path ? URL_POSTER + item.poster_path : DefaultImage}`} alt='poster' style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: 'tv' } })} />
                                    </div>
                                    <div className='detail'>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <Progress
                                                    width={34}
                                                    strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                    type='circle'
                                                    percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                    className='percents'
                                                />
                                            </div>
                                            <div>
                                                <Link className='title-overview' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: 'tv' }} >
                                                    {item.title ? item.title : item.name ? item.name : ''}
                                                </Link>
                                                <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                            </div>
                                        </div>
                                        <p style={{ margin: '10px 0' }}>{item.overview ? item.overview : ''}</p>
                                        <div className='action'>
                                            <div className='icon'>
                                                <div className='favorite' onClick={() => handleAddToFavorite(item)}>
                                                    <span className={`${idMovieAddFavorite[item.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add `} >
                                                        <AiFillHeart />
                                                    </span>
                                                    <p>Favorite</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : 'There are no upcoming Tvshows on your favorites.'
            }
        </React.Fragment>
    )
}

const OverView = ({ watchlist, id, favorite }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [idMovieAddFavorite, setIdMovieAddFavorite] = useState({})
    const [idMovieRemove, setIdMovieRemove] = useState({})

    const handleRemove = (item) => {
        if (id) {

            setIdMovieRemove({ [item.id]: false })
            dispatch({
                type: AccountActionType.UNMARK_MOVIES_WATCHLIST,
                data: {
                    id,
                    movie_type: 'movie',
                    movies: item,
                    moview_id: item.id
                },

            })
        }

    }
    const handleAddToFavorite = (e) => {
        if (id) {
            const findItemFavorite = favorite.movies.filter(t => t.id === e.id)
            if (Array.isArray(findItemFavorite) && findItemFavorite.length === 0) {
                setIdMovieAddFavorite({ [e.id]: true })
                dispatch({
                    type: AccountActionType.MARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,

                    }
                })

            } else {
                setIdMovieAddFavorite({ [e.id]: false })
                dispatch({
                    type: AccountActionType.UNMARK_MOVIES_FAVORITE,
                    data: {
                        id,
                        movie_type: 'movie',
                        movies: e,
                        moview_id: e.id
                    }
                })
            }

        }
    }


    return (
        <React.Fragment>
            <div className='overview'>
                <div className='w-90' >
                    <h1>Upcoming From Watchlist</h1>
                    {
                        watchlist && Array.isArray(watchlist.movies) && watchlist.movies.length > 0
                            ? watchlist.movies.map(item => {
                                const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                    item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                const findItemFavorite = favorite.movies.filter(e => e.id === item.id)
                                const findItem = watchlist.movies.filter(e => e.id === item.id)
                                return (
                                    <div className='item' key={item.id}>
                                        <div className='wrapper' >
                                            <div className='image' >
                                                <img src={`${item.poster_path ? URL_POSTER + item.poster_path : DefaultImage}`} alt='poster' style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: 'movie' } })} />
                                            </div>
                                            <div className='detail'>
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                        <Progress
                                                            width={34}
                                                            strokeColor={Number(item.vote_average * 10) > 70 ? '#21cf79' : Number(item.vote_average * 10) > 40 ? '#c6c92f' : '#da2360'}
                                                            type='circle'
                                                            percent={item.vote_average ? Number((item.vote_average * 10).toFixed(0)) : 0}
                                                            className='percents'
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link className='title-overview' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: 'movie' }} >
                                                            {item.title ? item.title : item.name ? item.name : ''}
                                                        </Link>
                                                        <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                                    </div>
                                                </div>
                                                <p style={{ margin: '10px 0' }}>{item.overview ? item.overview : ''}</p>
                                                <div className='action'>
                                                    <div className='icon'>
                                                        <div className='favorite' onClick={() => handleAddToFavorite(item)}>
                                                            <span className={`${idMovieAddFavorite[item.id] || (findItemFavorite && findItemFavorite.length > 0 && findItemFavorite[0].favorite) ? 'heart ' : ''} add `} >
                                                                <AiFillHeart />
                                                            </span>
                                                            <p>Favorite</p>
                                                        </div>
                                                        <div className='remove'>
                                                            <span className={`${idMovieRemove[item.id] || (findItem && findItem.length > 0 && findItem[0].flag) ? 'checked' : ''} add `} onClick={() => handleRemove(item)}>
                                                                <AiOutlineClose />
                                                            </span>
                                                            <p>Remove</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : 'There are no upcoming movies on your watchlist.'
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

const Watchlist = ({ watchlist, id, favorite }) => {
    return (
        <React.Fragment>
            <div className='overview'>
                <div className='w-90' >
                    <div className='tab'>
                        <h1>My Watchlist</h1>
                        <Tabs
                            defaultActiveKey="movie"
                            centered
                            items={[
                                {
                                    label: `Movies`,
                                    key: 'movie',
                                    children: <Movies watchlist={watchlist} id={id} favorite={favorite} />,
                                },
                                {
                                    label: `TV Shows`,
                                    key: 'tv',
                                    children: <TVShows watchlist={watchlist} id={id} favorite={favorite} />,
                                },

                            ]}
                        />
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

const Favorite = ({ favorite, id, watchlist }) => {
    return (
        <React.Fragment>
            <div className='overview'>
                <div className='w-90' >
                    <div className='tab'>
                        <h1>My Favorites</h1>
                        <Tabs
                            defaultActiveKey="movie"
                            centered
                            items={[
                                {
                                    label: `Movies`,
                                    key: 'movie',
                                    children: <MovieFavorites watchlist={watchlist} id={id} favorite={favorite} />,
                                },
                                {
                                    label: `TV Shows`,
                                    key: 'tv',
                                    children: <TVShowFavorites watchlist={watchlist} id={id} favorite={favorite} />,
                                },

                            ]}
                        />
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

export default function Profile() {
    const location = useLocation()
    let { state } = location
    const id = state.id ? state.id : ''
    const account = useSelector(state => {
        let data = state.AccountReducer.detail
        return data && !Array.isArray(data) && typeof data === 'object' ? data : {}
    }, (prev, next) => isEqual(prev, next))

    let info = ''
    let favorite = ''
    let watchlist = ''
    if (account[state.id]) {
        info = account[state.id].info
        favorite = account[state.id].favorite
        watchlist = account[state.id].watchlist
    }
    const [key, setKey] = useState('overview')
    // const data = JSON.parse(localStorage.getItem('profile'))[state.id]
    useEffect(() => {
        try {
            if (info && favorite && watchlist) {
                window.scrollTo(0, 0)
            }
        } catch (err) {

        }
    }, [account[state.id]])
    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
                <meta
                    name="description"
                    content="Profile"
                />
            </Helmet>
            <div className='profile'>
                <div className='background_info' style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                    <div className='wrapper'>
                        <div className='w-90'>
                            <div className='info'>
                                <div className='avatar' >
                                    <p >{state.email ? state.name.charAt(0).toUpperCase() : ''}</p>
                                </div>
                                <div className='info-email'>
                                    <p className='email' >{info.email}</p>
                                    <p className='time' >Member since {info.createdAt ? moment(Number(info.createdAt)).format('MMMM YYYY') : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='title'>
                    <div className='content' style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ccc', padding: '15px 0' }} >
                        <div className={`item ${key === 'overview' ? 'active' : ''} `} >
                            <a onClick={e => (e.preventDefault(), setKey('overview'))} >
                                Overview
                            </a>
                        </div>
                        <div className={`item  ${key === 'watchlist' ? 'active' : ''} `} >
                            <a onClick={e => (e.preventDefault(), setKey('watchlist'))} >
                                Watchlist
                            </a>
                        </div>
                        <div className={`item  ${key === 'favorite' ? 'active' : ''}`} >
                            <a onClick={e => (e.preventDefault(), setKey('favorite'))} >
                                Favorite
                            </a>
                        </div>
                    </div>
                </div>
                <div className='content' style={{ padding: '60px 0 ' }}>
                    {key === 'overview' ? <OverView watchlist={watchlist} id={id} favorite={favorite} /> :
                        key === 'watchlist' ? <Watchlist watchlist={watchlist} id={id} favorite={favorite} /> :
                            key === 'favorite' ? <Favorite favorite={favorite} id={id} watchlist={watchlist} /> :
                                `Something went wrong please try again`}
                </div>
            </div>
        </React.Fragment>
    )
}
