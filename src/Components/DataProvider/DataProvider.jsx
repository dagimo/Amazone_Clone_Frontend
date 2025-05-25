import React,{createContext} from 'react'
import { useReducer } from 'react'
// import { Children } from 'react'
import { initialState , reducer} from '../../Utility/reducer'



export const DataContext = createContext()

export const DataProvider = ({children})=>{
    return (
        <DataContext.Provider value = {useReducer(reducer,initialState)}>
            {children}
        </DataContext.Provider>
    )
}