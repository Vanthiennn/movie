import { SearchOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Input, Spin, Button, List, Empty } from 'antd';
import { MdShowChart } from '@react-icons/all-files/md/MdShowChart'
import { BiSearchAlt2 } from '@react-icons/all-files/bi/BiSearchAlt2'
import { BiFilm } from '@react-icons/all-files/bi/BiFilm'
import { CgScreen } from '@react-icons/all-files/cg/CgScreen'
import {BsFillPersonFill} from  '@react-icons/all-files/bs/BsFillPersonFill'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { debounce, isEqual } from 'lodash';
import * as BaseActionType from '../../controllers/BaseActionTypes'
import * as ActionType from '../../../main/controllers/actionTypes'
import './index.scss'
import { useNavigate } from 'react-router-dom';
export default function Search({ ...props }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isTrending, setIsTrending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const searchMovie = useSelector(state => {
        let data = state.BaseReducer.searchMovie
        return data && Array.isArray(data) ? data : []
    }, (prev, next) => isEqual(prev, next))

    const trendingMovies = useSelector(state => {
        let data = state.mainReducer.trendingMovies
        return data && Array.isArray(data) ? data : []
    }, (prev, next) => isEqual(prev, next))

    const showOnly10Movie = searchMovie && searchMovie.length < 10 ? searchMovie : searchMovie.slice(0, 10)
    const showOnly10MovieTrending = trendingMovies && trendingMovies.length < 10 ? trendingMovies : trendingMovies.slice(0, 10)

    const handleOnChange = debounce((e) => {
        setLoading(true)
        if (e.target.value && e.target.value.trim() !== '') {
            dispatch({
                type: BaseActionType.API_SEARCH_MOVIE,
                data: { keyword: e.target.value },
                setIsTrending: setIsTrending,
                setLoading: setLoading,
                setShow
            })
        } else {

            dispatch({
                type: ActionType.API_GET_TRENDING_MOVIE,
                data: { time: 'day' },
                setIsTrending: setIsTrending,
                setLoading: setLoading,
                setShow
            })
        }
    }, 500)

    const onPressEnter = (e) => {
        if (e.target.value && e.target.value.trim() !== '') {
            dispatch({
                type: BaseActionType.API_SEARCH_MOVIE,
                data: { keyword: e.target.value }
            })
        } else {
          
        }
    }

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', controlNavbar);
                // cleanup function
                return () => {
                    window.removeEventListener('scroll', controlNavbar);
                };
            }
        } catch (err) {
          
        }
    }, [lastScrollY]);


    return (
        <React.Fragment>
            {
                props.isSearch ?
                    <React.Fragment>
                        <div className='search-bar' style={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', width: '100%', zIndex: 1, bottom: '-50px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '80%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, padding: '10px 0', }}>
                                <SearchOutlined />
                                <Input
                                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                    placeholder='Search for a moive or tv show '
                                    onChange={handleOnChange}
                                    onPressEnter={onPressEnter}
                                    allowClear={{ clearIcon: !loading ? '' : <Spin type='small' /> }}
                                />
                            </div>
                        </div>
                        {
                            <div className='keyword'>
                                <div className={`content  ${show ? '' : 'hidden'}`}>
                                    {isTrending ? <h1><MdShowChart /> Trending</h1> : ''}
                                    {((showOnly10Movie && showOnly10Movie.length > 0) || (showOnly10MovieTrending && showOnly10MovieTrending.length > 0)) ?
                                        <List
                                            dataSource={(showOnly10MovieTrending || showOnly10Movie) && isTrending ? showOnly10MovieTrending : showOnly10Movie}
                                            renderItem={(item) => {
                                                const dashTitle = item.title ? item.title.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') :
                                                    item.name ? item.name.replaceAll(' ', '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : ''

                                                return <List.Item key={item.id} onClick={() => {
                                                    if (item.media_type !== 'person') {
                                                        navigate(`/detail/${item.id}-${dashTitle}`, { state: { id: item.id, type: item.media_type } },
                                                            props.setIsSearch(false))

                                                    } else if (item.media_type === 'person') {
                                                       
                                                        navigate(`/person/${item.id}-${dashTitle}`, { state: { id: item.id, type: item.media_type } },
                                                            props.setIsSearch(false))

                                                    }
                                                }
                                                }
                                                    className='item-search'
                                                >
                                                    {isTrending ? <BiSearchAlt2 style={{ fontSize: 16 }} /> : item.media_type === 'tv' ? <CgScreen style={{ fontSize: 16 }} /> : item.media_type === 'movie' ? <BiFilm style={{ fontSize: 16 }} /> : <BsFillPersonFill style={{ fontSize: 16 }} />}
                                                    <p style={{ marginBottom: 0, marginLeft: 10, width: '100%' }}>{item && item.name ? (item.name[0].toUpperCase() + item.name.slice(1)) : item.title ? (item.title[0].toUpperCase() + item.title.slice(1)) : ''}</p>

                                                </List.Item>
                                            }}
                                        />
                                        : <Empty />
                                    }
                                </div>
                            </div>

                        }
                    </React.Fragment>
                    : null
            }

        </React.Fragment>
    )
}

