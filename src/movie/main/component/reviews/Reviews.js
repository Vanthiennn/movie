import { Button, Tooltip, } from 'antd'
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as ActionType from '../../controllers/actionTypes'
import { isEqual } from 'lodash'
import moment from 'moment'
import '../seasons/index.scss'
import '../home/popular/index.scss'
import './index.scss'
import DefaultImage from '../../static/default-thumbnail.jpg'
const URL_POSTER = 'https://image.tmdb.org/t/p/w58_and_h87_multi_faces'
const URL_AVATAR = 'https://image.tmdb.org/t/p/w64_and_h64_multi_faces'
export default function Reviews() {
    const location = useLocation()
    const navigate = useNavigate()

    let { detail, reviews, id } = location.state
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const yearOfMovies = detail && detail.release_date ? moment(detail.release_date).format('YYYY') : detail.first_air_date ? moment(detail.first_air_date).format('YYYY') : ''
    return (
        <React.Fragment>
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
                <div className='content-reviews'>
                    <div className='w-90' >
                        {
                            reviews && Array.isArray(reviews) && reviews.length > 0
                                ? reviews.map(item => {
                                    return (
                                        <div className='content' key={item.id}>
                                            <div className='wrapper' >
                                                <div className='d-flex' >
                                                    <div className='avatar'  >
                                                        {
                                                            item.author_details && item.author_details.avatar_path ?
                                                                <img className='reviewer-avatar' alt='Reviewer' src={item.author_details && item.author_details.avatar_path ? `${URL_AVATAR}${item.author_details.avatar_path}` : DefaultImage} />
                                                                : <span className='default-avatar' >
                                                                    {item.author ? item.author.charAt(0).toUpperCase() : ''}
                                                                </span>
                                                        }
                                                    </div>
                                                    <div className='comment'>
                                                        <div className='info'>
                                                            <div className='d-flex'>
                                                                <a href={`${item.url ? item.url : ''}`}>A review by {item.author ? item.author : ''}</a>
                                                                <div className='rating'>
                                                                    <span><StarFilled style={{ marginRight: 5 }} /></span>
                                                                    {item.author_details && item.author_details.rating ? item.author_details.rating : 0}.0
                                                                </div>
                                                            </div>
                                                            <h5 className='author'>Written by <a href={item.author ? `https://www.themoviedb.org/u/${item.author}` : ''} style={{ color: '#000', fontWeight: 'bold' }}>{item.author ? item.author : ''}</a> on {item.created_at ? moment(item.created_at).format('MMMM D, YYYY') : ''}</h5>
                                                        </div>
                                                        <div className='content'>
                                                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                {item.content && item.content ? item.content : ''}
                                                            </p>
                                                        </div>
                                                    </div>
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
