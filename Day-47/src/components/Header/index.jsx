import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTodo, getTodos, searchTodo } from "../../helper/handleTodo";
import cl from "./header.module.scss"

function Header({setTodos, setLoading}) {
    const [searchMode, setSearchMode] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleChange = e => {
        setInputValue(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(searchMode) {
            toast.warn("Tắt chế độ tìm kiếm để thêm công việc!")
        }else {
            if(inputValue.trim() == '') {
                toast.error("Không được để trống")
            }else if(inputValue.trim().length < 2) {
                toast.error("Tối thiểu 2 kí tự")
            }else {
                setLoading(true)
                addTodo({todo: inputValue.trim()}).then(() => {
                    getTodos().then(res => {
                        setTodos(res.data.data.listTodo)
                        setInputValue('')
                        setLoading(false)
                        toast.success("Thêm todo thành công!")
                    })
                })
            }
        }
    }

    useEffect(() => {
        if(searchMode) {
            const delayInputTimeoutId = setTimeout(() => {
                setLoading(true)
                searchTodo(inputValue.trim().replaceAll(" ", '+')).then(res => {
                    setTodos(res.data.data.listTodo)
                    setLoading(false)
                })
            }, 500)
            return () => clearTimeout(delayInputTimeoutId)
        }
    }, [inputValue, 500])

    return <header className={cl.header}>
        <h3 className={cl.title}>Todo App</h3>
        <form className={cl.addForm}>
            <input
                value={inputValue}
                type="text" 
                placeholder={searchMode ? "Tìm kiếm công việc" : "Thêm một việc làm mới"} 
                className={cl.addInput}
                onChange={handleChange}
            />
            <button
                className={cl.addBtn}
                onClick={handleClick}                
            >Add</button>
            <div
                className={cl.searchBtn}
                onClick={() => {
                    setInputValue('')
                    setSearchMode(!searchMode)
                    toast.info(searchMode ? "Đã tắt chế độ tìm kiếm" : "Đã bật chế độ tìm kiếm")
                }}
            >Search</div>
        </form>
    </header>;
}

export default Header;