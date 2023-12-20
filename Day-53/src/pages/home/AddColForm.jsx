import { useState } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../redux/slices/dataSlice.js"
import { getRandomId } from "../../helpers/getRandomId.js"

const { addColumn } = dataSlice.actions

function AddColForm() {
    const [adding, setAdding] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        const data = Object.fromEntries([...new FormData(e.target)])

        if(data.name.trim() == '') {
            setAdding(false)
        }else {
            dispatch(addColumn({
                colId: getRandomId(),
                name: data.name
            }))
            setAdding(false)
        }
    }

    return <>
        {adding ? 
            <form className="add-form" action="" onSubmit={handleSubmit}>
                <input type="text" name="name" autoFocus placeholder="Nhập tiêu đề..."/>
                <div className="row">
                    <button>Add</button>
                    <i className="fa-solid fa-xmark" style={{color: '#fff'}} onClick={() => setAdding(false)}></i>
                </div>
            </form>
            :
            <div className="add-new-box" onClick={() => setAdding(true)}>
                <i className="fa-solid fa-plus"></i>
                <span>Add New Box</span>
            </div>
        }
    </>
}

export default AddColForm
