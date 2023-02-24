import * as BaseActionType from './BaseActionTypes'
import { all, call, put, select, take, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { API_KEY, fetchAPI } from '../../main/controllers/generator';

const URL_IMAGE = 'https://image.tmdb.org/t/p/w1920_and_h427_multi_faces'

export function* watcherBase() {
    yield takeLatest(BaseActionType.API_SEARCH_MOVIE, workerAPISearchMovie)
}

function* workerAPISearchMovie(action) {
    try {
        let { keyword } = action.data
        if (keyword) {
            const API_TYPE_MOVIE = `https://api.themoviedb.org/3/search/multi?${API_KEY}&page=1&query=${keyword}`
            const dataAPI = yield call(fetchAPI, 'get', API_TYPE_MOVIE)
           
            if (dataAPI.status === 200) {
                let { results } = dataAPI.data
                yield put({
                    type: BaseActionType.API_SEARCH_MOVIE_SUCCESS,
                    data: results
                })
                if(action.setIsTrending){
                    action.setIsTrending(false)
                }
                if(action.setLoading){
                    action.setLoading(false)
                }
                if(action.setShow){
                    action.setShow(true)
                }
            } else {
                
            }
        }
    } catch (error) {
      
    }
}

