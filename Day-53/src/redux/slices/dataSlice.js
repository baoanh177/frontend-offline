import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk('data/getData', async () => {
    client.setApiKey(JSON.parse(localStorage.getItem('apiKey')))
    const { data } = await client.get('/tasks')
    return data
})

const initialState = {
    cols: [],
    tasks: [],
    isLoading: false
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addColumn: (state, action) => {
            state.cols = [...state.cols, action.payload]
        },
        addTask: (state, action) => {
            client.setApiKey(JSON.parse(localStorage.getItem('apiKey')))
            client.post("/tasks", action.payload)
            state.tasks = [...state.tasks, ...action.payload]
        },
        deleteTask: (state, action) => {
            client.setApiKey(JSON.parse(localStorage.getItem('apiKey')))
            client.delete()
            state.tasks = state.tasks.filter(task => task._id != action.payload)
        }
    },
    extraReducers: async builder => {
        builder.addCase(getData.pending, state => {
            state.isLoading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false
            state.cols = action.payload.data.columns
            state.tasks = action.payload.data.tasks
        })
    }
})