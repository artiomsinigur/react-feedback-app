import axios from 'axios'
import { FETCH_USER } from './types'

export function fetchUser() {
    // return (dispatch) => {
    //     axios.get('/api/profile')
    //     .then(res => dispatch({ type: FETCH_USER, payload: res }))
    // }

    // return async (dispatch) => {
    //     const res = await fetch('/api/profile')
    //     const data = await res.json()
    //     dispatch({ type: FETCH_USER, payload: data })
    // }

    return async (dispatch) => {
        const res = await axios.get('/api/profile')
        dispatch({ type: FETCH_USER, payload: res.data })
    }
}