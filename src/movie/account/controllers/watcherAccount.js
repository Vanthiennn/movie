import * as AccountActionType from './actionsType'
import { all, call, put, select, take, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { API_KEY, fetchAPI } from '../../main/controllers/generator';

const URL_IMAGE = 'https://image.tmdb.org/t/p/w1920_and_h427_multi_faces'

export function* watcherAccount() {
    yield takeLeading(AccountActionType.GET_DETAIL_ACCOUNT, workerGetDetailAccount)
    yield takeLeading(AccountActionType.UPDATE_DETAIL_ACCOUNT, workerUpdateDetailAccount)
    yield takeEvery(AccountActionType.MARK_MOVIES_WATCHLIST, workerMarkMoviesWatchlist)
    yield takeEvery(AccountActionType.UNMARK_MOVIES_WATCHLIST, workerUnMarkMoviesWatchlist)

    yield takeEvery(AccountActionType.MARK_MOVIES_FAVORITE, workerMarkMoviesFavorite)
    yield takeEvery(AccountActionType.UNMARK_MOVIES_FAVORITE, workerUnMarkMoviesFavorite)
}

function* workerGetDetailAccount(action) {
    try {

        let { id, email, createdAt } = action.data

        if (id && email && createdAt) {
            const detail = {
                [id]: {
                    info: {
                        email,
                        createdAt,
                    },
                    watchlist: {
                        movies: [],
                        tvshow: [],
                    },
                    favorite: {
                        movies: [],
                        tvshow: [],
                    },
                }
            }

            yield put({
                type: AccountActionType.UPDATE_DETAIL_ACCOUNT,
                ttype: 'fetch_list',
                data: detail
            })
        }
    } catch (error) {
       
    }
}

function* workerMarkMoviesWatchlist(action) {
    try {

        let { id, movies, movie_type } = action.data
        if (id) {
            yield put({
                type: AccountActionType.UPDATE_DETAIL_ACCOUNT,
                ttype: 'mark_movie_watchlist',
                data: { movies, id, movie_type }
            })
        }

    } catch (error) {
       
    }
}

function* workerUnMarkMoviesWatchlist(action) {
    try {

        let { id, movies, movie_type, moview_id } = action.data
        if (id) {
            yield put({
                type: AccountActionType.UPDATE_DETAIL_ACCOUNT,
                ttype: 'un_mark_movie_watchlist',
                data: { movies, id, movie_type, moview_id }
            })
            if(action.setLoading){
                action.setLoading(false)
            }
        }

    } catch (error) {
       
    }
}

function* workerMarkMoviesFavorite(action) {
    try {

        let { id, movies, movie_type } = action.data
        if (id) {
            yield put({
                type: AccountActionType.UPDATE_DETAIL_ACCOUNT,
                ttype: 'mark_movie_favorite',
                data: { movies, id, movie_type }
            })
        }

    } catch (error) {
       
    }
}

function* workerUnMarkMoviesFavorite(action) {
    try {

        let { id, movies, movie_type, moview_id } = action.data
        if (id) {
            yield put({
                type: AccountActionType.UPDATE_DETAIL_ACCOUNT,
                ttype: 'un_mark_movie_favorite',
                data: { movies, id, movie_type, moview_id }
            })
           
        }

    } catch (error) {
       
    }
}

function* workerUpdateDetailAccount(action) {
    try {
        const detail = yield select(state => state.AccountReducer.detail)

        switch (action.ttype) {
            case 'fetch_list': {
                const data = action.data
                if (detail) {
                    const updateData = JSON.parse(localStorage.getItem('profile'))
                    const newData = { ...data, ...updateData }
                    if (updateData && !Array.isArray(updateData) && typeof updateData === 'object' && Object.keys(updateData).length > 0) {
                        yield put({
                            type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                            ttype: 'fetch_list',
                            data: newData
                        })
                    } else {
                        const newData = { ...data, ...updateData }
                        yield put({
                            type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                            ttype: 'fetch_list',
                            data: newData
                        })
                    }
                }

            }
                break;
            case 'mark_movie_watchlist': {
                let { id, movies, movie_type } = action.data

                let newArr = []
                let newDetail = { ...movies, flag: true }

                if (movie_type === 'movie') {
                    newArr = detail[id].watchlist.movies.push(newDetail)
                } else if (movie_type === 'tv') {
                    newArr = detail[id].watchlist.tvshow.push(newDetail)
                }
                const data = { ...detail, ...newArr }

                localStorage.setItem('profile', JSON.stringify(data))
                yield put({
                    type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                    ttype: 'add_movie',
                    data: data
                })

            }
                break;
            case 'un_mark_movie_watchlist': {

                let { id, movies, movie_type, movies_id } = action.data
                if (movie_type === 'movie') {
                    let index = detail[id].watchlist.movies.findIndex(e => e.id === movies_id)
                    detail[id].watchlist.movies.splice(index, 1)
                } else if (movie_type === 'tv') {
                    let index = detail[id].watchlist.tvshow.findIndex(e => e.id === movies_id)
                    detail[id].watchlist.tvshow.splice(index, 1)
                }
                const data = { ...detail }

                localStorage.setItem('profile', JSON.stringify(data))
                yield put({
                    type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                    ttype: 'remove_movie',
                    data: data
                })

            }
                break;
            case 'mark_movie_favorite': {
                let { id, movies, movie_type } = action.data

                let newArr = []
                let newDetail = { ...movies, favorite: true }

                if (movie_type === 'movie') {
                    newArr = detail[id].favorite.movies.push(newDetail)
                } else if (movie_type === 'tv') {
                    newArr = detail[id].favorite.tvshow.push(newDetail)
                }
                const data = { ...detail, ...newArr }

                localStorage.setItem('profile', JSON.stringify(data))
                yield put({
                    type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                    ttype: 'add_movie',
                    data: data
                })

            }
                break;
            case 'un_mark_movie_favorite': {
                let { id, movies, movie_type, movies_id } = action.data
                if (movie_type === 'movie') {
                    let index = detail[id].favorite.movies.findIndex(e => e.id === movies_id)
                    detail[id].favorite.movies.splice(index, 1)
                } else if (movie_type === 'tv') {
                    let index = detail[id].favorite.tvshow.findIndex(e => e.id === movies_id)
                    detail[id].favorite.tvshow.splice(index, 1)
                }
                const data = { ...detail }
               
                localStorage.setItem('profile', JSON.stringify(data))
                yield put({
                    type: AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS,
                    ttype: 'remove_movie',
                    data: data
                })

            }
                break;
            default:
                break;
        }
    } catch (error) {
        
    }
}
