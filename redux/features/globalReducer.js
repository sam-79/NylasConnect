import { createAction, createReducer } from '@reduxjs/toolkit'
import { ALL_ACCOUNTS } from '../../src/constants'

const initialState = {
    selectedAccount: ALL_ACCOUNTS,
    accountData: null


}

export const changeSelectedAccount = createAction('global/changeSelectedAccount', function prepare(data) {
    return {
        payload: data
    }
})

export const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeSelectedAccount, (state, action) => {
            if (Array.isArray(action.payload)) {
                // console.log("@@-",action.payload)
                state.selectedAccount = ALL_ACCOUNTS
                state.accountData = action.payload
            }else {
                // console.log("--",action.payload)
                state.selectedAccount = action.payload.email
                state.accountData = action.payload
            }

        })

})