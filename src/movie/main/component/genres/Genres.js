import { Button, Dropdown, Menu, Pagination, Space } from 'antd'
import { concat, isEqual } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import * as ActionType from '../../controllers/actionTypes'
import moment from 'moment'
import './index.scss'
import { CaretDownOutlined } from '@ant-design/icons'
import Loading from '../../../base/components/loading/Loading'
import { Helmet } from 'react-helmet'
const { SubMenu } = Menu
export default function Genres({ handleLoading, ...props }) {

    const URL_POSTER = 'https://image.tmdb.org/t/p/w94_and_h141_multi_faces'
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [sortMovie, setSort] = useState('popularity.desc')

    let { state } = location

    const [type, setType] = useState(state && state.type ? state.type : '')
    const ids = state && state.id ? state.id : ''
    const name = state && state.name ? state.name : ''
    const genres = useSelector(state => {
        const data = state.mainReducer.genres
        return data && !Array.isArray(data) && typeof data === 'object' ? data : {}
    }, (prev, next) => isEqual(prev, next))

    useEffect(() => {
        if (type && ids) {
            setLoading(true)
            dispatch({
                type: ActionType.API_GET_MOVIE_OF_GENRES,
                data: {
                    type, ids, name, page, sortMovie: sortMovie
                },
                setLoading
            })

        }
    }, [page, sortMovie, type])

    const onChangePagination = (e) => {
        if (e) {
            setPage(Number(e))
        }
    }
    const formartNumber = new Intl.NumberFormat();

    const onChangeContent = (e) => {

        if (e && e.key) {
            if (e.key === 'movies') {
                setType('movie')
                setPage(1)
            } else if (e.key === 'tvshow') {
                setType('tv')
                setPage(1)
            } else if (e.key === 'popularity.asc') {
                setSort('popularity.asc')
                setPage(1)
            } else if (e.key === 'popularity.desc') {
                setSort('popularity.desc')
                setPage(1)
            } else if (e.key === 'vote_average.asc') {
                setSort('vote_average.asc')
                setPage(1)
            } else if (e.key === 'vote_average.desc') {
                setSort('vote_average.desc')
                setPage(1)
            }
        }
    }



    return (
        <React.Fragment>
            {
                loading ? <Loading />
                    :
                    <React.Fragment>
                        <Helmet>
                            <title>Genres</title>
                            <meta
                                name="description"
                                content="Genres"
                            />

                        </Helmet>
                        <div className='genres'>
                            <div className='title' >
                                <div className='w-90' >
                                    <div className='content' >
                                        <h2 >{name ? name : ''}</h2>
                                        <h2 >{genres && Number(genres.total_results) ? formartNumber.format(Number(genres.total_results)) : 0} {type === 'tv' ? 'shows' : 'movies'}  </h2>
                                    </div>
                                </div>
                            </div>

                            <div className='sort'>
                                <div className='w-90'>
                                    <div className='center' >
                                        <div className='wrapper'>
                                            <Dropdown
                                                overlay={() => (
                                                    <Menu onClick={onChangeContent}>
                                                        <Menu.ItemGroup key={'genres'} >
                                                            <Menu.Item key="movies"  >
                                                                Movies
                                                            </Menu.Item>

                                                            <Menu.Item key="tvshow" >
                                                                TV Shows
                                                            </Menu.Item>
                                                        </Menu.ItemGroup>
                                                    </Menu>
                                                )}
                                                trigger={['click']}

                                                overlayClassName='dropdown-thietlap'
                                            >
                                                <div className={`siber-one-container-three-container-content `} style={{ fontSize: 20, padding: '0 20px' }}>
                                                    <a onClick={e => e.preventDefault()} style={{ color: '#000' }}>
                                                        <Space>
                                                            Movies
                                                            <CaretDownOutlined />
                                                        </Space>
                                                    </a>
                                                </div>
                                            </Dropdown>
                                        </div>

                                        <div className='wrapper'>
                                            <Dropdown
                                                overlay={() => (
                                                    <Menu onClick={onChangeContent} mode='inline' triggerSubMenuAction='click' >
                                                        <SubMenu title='Popular' key={'Popular'}>
                                                            <Menu.Item key="popularity.asc"  >
                                                                <a> Ascending</a>
                                                            </Menu.Item>
                                                            <Menu.Item key="popularity.desc" >
                                                                <a> Descending</a>
                                                            </Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu title='Ratings' key={'Ratings'}>
                                                            <Menu.Item key="vote_average.asc"  >
                                                                <a> Ascending</a>
                                                            </Menu.Item>
                                                            <Menu.Item key="vote_average.desc" >
                                                                <a> Descending</a>
                                                            </Menu.Item>

                                                        </SubMenu>
                                                    </Menu>
                                                )}
                                                trigger={['click']}
                                                overlayClassName='dropdown-thietlap'
                                            >
                                                <div className={`siber-one-container-three-container-content `} style={{ fontSize: 20, padding: '0 20px' }}>
                                                    <a onClick={e => e.preventDefault()} style={{ color: '#000' }}>
                                                        <Space>
                                                            Sort
                                                            <CaretDownOutlined />
                                                        </Space>
                                                    </a>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='content-genres'>
                                <div className='w-90' >
                                    {type ?
                                        type === 'tv' ?
                                            <h1>TV Series</h1> : type === 'movie'
                                                ? <h1>Movies</h1> : ''
                                        : ''
                                    }
                                    {
                                        genres && Array.isArray(genres.results) && genres.results.length > 0
                                            ? genres.results.map(item => {
                                                const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                                    item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''
                                                return (
                                                    <div className='item' key={item.id}>
                                                        <div className='wrapper' >
                                                            <div className='image' >
                                                                <img src={`${URL_POSTER + item.poster_path}`} alt='poster' style={{ width: '100%' }} onClick={() => navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: type } })} />
                                                            </div>
                                                            <div className='detail'>
                                                                <Link className='title-genres' to={`/detail/${item.id}-${dashTitle}`} state={{ id: item.id, type: type }} >
                                                                    {item.title ? item.title : item.name ? item.name : ''}
                                                                </Link>
                                                                {/* <h3>{item.title ? item.title : item.name ? item.name : ''}</h3> */}
                                                                <p style={{ color: "#abaaaa" }}>{item.release_date ? moment(item.release_date).format('MMMM D, YYYY') : ''}</p>
                                                                <p>{item.overview ? item.overview : ''}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : type === 'tv' ? 'No TV shows found.' : 'No movies found.'
                                    }
                                    <div className='pagination'>
                                        <Pagination defaultCurrent={page} onChange={onChangePagination} pageSize={20} showSizeChanger={false} total={genres && genres.total_pages ? genres.total_pages : 1} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}
