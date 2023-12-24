import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/client";
import { toast } from "react-toastify";

export const getData = createAsyncThunk('data/getData', async () => {
    client.setApiKey(JSON.parse(localStorage.getItem('apiKey')))
    const { data } = await client.get('/tasks')
    
    return data
})

export const asyncData = async data => {

    const { cols, tasks } = data
    const newData = []
    let postTask = {}

    for(const col of cols) {
        let hasTask = false
        for(const task of tasks) {
            if(col.column == task.column) {
                postTask = {
                    column: task.column,
                    content: task.content,
                    columnName: col.columnName
                }
                newData.push(postTask)
                hasTask = true
            }
        }
        if(!hasTask) {
            const emptyTask = {
                column: col.column,
                content: '',
                columnName: col.columnName
            }
            newData.push(emptyTask)
        }
    }

    client.setApiKey(JSON.parse(localStorage.getItem('apiKey')))
    const response = await toast.promise(
        client.post('/tasks', newData),
        {
          pending: 'Đang đồng bộ dữ liệu...',
          success: 'Dữ liệu đã được đồng bộ 👌',
          error: 'Dữ liệu chưa được đồng bộ 🤯'
        }
    )

    console.log({response})

}
