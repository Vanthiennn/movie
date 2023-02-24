import * as ActionType from './actionTypes'
import { all, call, put, select, take, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { API_KEY, fetchAPI } from './generator';

const URL_IMAGE = 'https://image.tmdb.org/t/p/w1920_and_h427_multi_faces'

export function* watcherMain() {
    yield takeEvery(ActionType.API_GET_POPULAR_MOVIE, workerAPIGetMovie)

    yield takeEvery(ActionType.API_GET_TRENDING_MOVIE, workerAPIGetTrendingMovie)

    yield takeLeading(ActionType.API_GET_DETAIL_MOVIE, workerAPIGetDetailMovie)

    yield takeLeading(ActionType.API_GET_MOVIE_OF_GENRES, workerAPIGetMovieOfGenres)

    yield takeLeading(ActionType.API_GET_MOVIE_OF_PERSON, workerAPIGetMovieOfPeople)

    yield takeLeading(ActionType.API_GET_DATA_OF_EPISODES, workerAPIGetDataOfEpisodes)
}

function* workerAPIGetMovie(action) {
    try {
        let { type, isOnTV } = action.data
        if (type && isOnTV) {

            const API_TYPE_MOVIE = `https://api.themoviedb.org/3/${isOnTV}/${type}?${API_KEY}`
            const dataAPI = yield call(fetchAPI, 'get', API_TYPE_MOVIE)
            if (dataAPI.status === 200) {
                let { data } = dataAPI
                const movie = data.results

                if (type === 'popular') {
                    yield all([
                        put({
                            type: ActionType.API_GET_POPULAR_MOVIE_SUCCESS,
                            data: movie
                        }),
                    ])
                }
                if (type === 'top_rated') {

                    yield all([
                        put({
                            type: ActionType.API_GET_LATEST_MOVIE_SUCCESS,
                            data: movie
                        }),

                    ])

                }
                if (action.setBackgroundImage) {
                    if (Array.isArray(movie) && movie.length > 0) {
                        if (movie[0].backdrop_path) {
                            action.setBackgroundImage(URL_IMAGE + movie[0].backdrop_path)
                        } else {
                            action.setBackgroundImage(URL_IMAGE + movie[0].poster_path)
                        }
                    }
                }
                if (action.setLoading) {
                    action.setLoading(false)
                }

            }
        }

    } catch (error) {  }
}

function* workerAPIGetTrendingMovie(action) {
    try {
        let { time } = action.data
        if (time) {
            const API_TRENDING = `https://api.themoviedb.org/3/trending/all/${time}?${API_KEY}`
            const dataAPI = yield call(fetchAPI, 'get', API_TRENDING)
            if (dataAPI.status === 200) {
                let { data } = dataAPI
                const movie = data.results
                yield all([
                    put({
                        type: ActionType.API_GET_TRENDING_MOVIE_SUCCESS,
                        data: movie
                    }),
                ])
                if (action.setLoading) {
                    action.setLoading(false)
                }
                if (action.setIsTrending) {
                    action.setIsTrending(true)
                }
            }
        }

    } catch (error) {  }
}

function* workerAPIGetDetailMovie(action) {
    try {
        let { type, id } = action.data

        if (type, id) {
            const API_DETAIL = `https://api.themoviedb.org/3/${type}/${id}?${API_KEY}&append_to_response=release_dates,credits,content_ratings,reviews,images,videos,lists,recommendations,external_ids,keywords`
            const dataAPI = yield call(fetchAPI, 'get', API_DETAIL)
            if (dataAPI.status === 200) {
                let { data } = dataAPI
                if (data) {
                    let { release_dates, credits, content_ratings, belongs_to_collection } = data
                 
                    yield put({
                        type: ActionType.API_GET_DETAIL_MOVIE_SUCCESS,
                        data: data
                    })
                    if ((release_dates && release_dates.results && Array.isArray(release_dates.results)) || (content_ratings && content_ratings.results && Array.isArray(content_ratings.results))) {
                        const data = content_ratings ? content_ratings.results : release_dates.results
                        yield put({
                            type: ActionType.API_GET_RELEASE_SUCCESS,
                            data: data
                        })
                    }
                    if (credits) {
                        yield put({
                            type: ActionType.API_GET_CREDIT_SUCCESS,
                            data: credits
                        })
                    }
                   
                }
                if (action.setLoading) {
                    action.setLoading(false)
                }

            }
        }

    } catch (error) { }
}

function* workerAPIGetMovieOfGenres(action) {
    try {
        let { type, ids, page, sortMovie } = action.data
        if (type && ids && page) {
            const API_MOVIE_GENRES = `https://api.themoviedb.org/3/discover/${type}?${API_KEY}&with_genres=${ids}&page=${page}&sort_by=${sortMovie}`
            const dataAPI = yield call(fetchAPI, 'get', API_MOVIE_GENRES)
            if (dataAPI.status === 200) {
                let { data } = dataAPI

                let { results, total_pages, total_results } = data

                if (results) {
                    yield all([
                        put({
                            type: ActionType.API_GET_MOVIE_OF_GENRES_SUCCESS,
                            data: { results, total_pages, total_results }
                        }),
                    ])
                    if (action.setLoading) {
                        action.setLoading(false)
                    }
                }



            }
        }

    } catch (error) {}
}

function* workerAPIGetMovieOfPeople(action) {
    try {
        let { type, ids } = action.data
        let typeOfMovie = 'combined_credits'
        if (type && ids) {
            if (type === 'tv') {
                typeOfMovie = 'tv_credits'
            } else if (type === 'movie') {
                typeOfMovie = 'movie_credits'
            } else {
                typeOfMovie = 'combined_credits'
            }

            const API_DETAIL_PERSON = `https://api.themoviedb.org/3/person/${ids}?${API_KEY}&&append_to_response=${typeOfMovie}`
            const fetchData = yield call(fetchAPI, 'get', API_DETAIL_PERSON)
            if (fetchData.status === 200) {
                let { data } = fetchData
                yield put({
                    type: ActionType.API_GET_DETAIL_OF_PERSON_SUCCESS,
                    data: data
                })
                if (action.setLoading) {
                    action.setLoading(false)
                }

            }
        }

    } catch (error) { }
}

function* workerAPIGetDataOfEpisodes(action) {
    try {
        let { season_number, tv_id } = action.data
        if (season_number && tv_id) {
            const API_DATA_EPISODES = `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?${API_KEY}&language=en-US`

            const dataAPI = yield call(fetchAPI, 'get', API_DATA_EPISODES)
            if (dataAPI.status === 200) {
                let { data } = dataAPI
                if (data) {
                    yield all([
                        put({
                            type: ActionType.API_GET_DATA_OF_EPISODES_SUCCESS,
                            data: data
                        }),
                    ])
                    if (action.setLoading) {
                        action.setLoading(false)
                    }
                }


            }
        }


    } catch (error) { }
}