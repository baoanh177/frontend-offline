import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { asyncData } from "../middlewares/dataMiddleware";
import { getData } from "../middlewares/dataMiddleware";
import { toast } from "react-toastify";

const initialState = {
    cols: [
        // column
        // columnName
        // content
    ],
    tasks: [
        // column
        // content
    ],
    isLoading: false
}


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addColumn: (state, action) => {
            state.cols.push(...action.payload)
            console.log('add')
            asyncData(state)
        },
        deleteColumn: (state, action) => {
            state.cols = state.cols.filter(col => col.column != action.payload)
            state.tasks = state.tasks.filter(task => task.column != action.payload)
            asyncData(state)
        },
        editColumn: (state, action) => {
            for(const col of state.cols) {
                if(col.column == action.payload.column) {
                    if(col.columnName != action.payload.columnName) {
                        col.columnName = action.payload.columnName
                        asyncData(state)
                    }
                }
            }
        },
        orderColumn: (state, action) => {
            state.cols = action.payload
            asyncData(state)
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload)
            asyncData(current(state))
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id != action.payload)
            asyncData(state)
        },
        editTask: (state, action) => {
            for(const task of state.tasks) {
                if(task._id == action.payload.id) {
                    if(task.content != action.payload.content) {
                        task.content = action.payload.content
                        asyncData(state)
                    }
                }
            }
        }
    },
    extraReducers: async builder => {
        builder // Get data
            .addCase(getData.pending, state => {
                state.isLoading = true
            })
            .addCase(getData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false
                state.cols = action.payload.data.columns
                state.tasks = action.payload.data.tasks
            })
            .addCase(getData.rejected, () => {
                state.isLoading = false
                toast.error("Something went wrong!")
            })
        // builder // Add column
        //     .addCase(addColumn.pending, (state, action) => {
        //         state.isLoading = true
        //         console.log(action)
        //     })
        //     .addCase(addColumn.fulfilled, (state, action) => {
        //         state.isLoading = false
        //         console.log(action)
        //         state.cols = [...state.cols, ...action.payload.data.columns]
        //     })
    }
})