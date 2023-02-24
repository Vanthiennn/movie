import { all } from 'redux-saga/effects'
import { watcherBase } from '../movie/base/controllers/watchersBase'
import { watcherMain } from '../movie/main/controllers/watcherMain'
import { watcherAccount } from '../movie/account/controllers/watcherAccount'
export default function* rootSaga() {
    yield all([
        watcherMain(),
        watcherBase(),
        watcherAccount(),
    ])
}