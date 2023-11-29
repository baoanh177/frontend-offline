import { useRef } from "react";
import { addTodo, getTodos } from "../../helper/handleTodo";
import cl from "./header.module.scss"

function Header({setTodos, setLoading}) {
    const inputRef = useRef()

    const handleClick = () => {
        if(inputRef.current.value.trim() == '') {
            console.warn("Không được để trống")
        }else if(inputRef.current.value.trim().length < 2) {
            console.warn("Tối thiểu 2 kí tự")
        }else {
            setLoading(true)
            addTodo({todo: inputRef.current.value.trim()}).then((res) => {
                getTodos().then(res => {
                    setTodos(res.data.data.listTodo)
                    setLoading(false)
                })
            })
        }
    }

    return <header className={cl.header}>
        <h3 className={cl.title}>Todo App</h3>
        <form className={cl.addForm}>
            <input ref={inputRef} type="text" placeholder="Thêm một việc làm mới" className={cl.addInput}/>
            <button
                className={cl.addBtn}
                onClick={handleClick}                
            >Add</button>
        </form>
    </header>;
}

export default Header;