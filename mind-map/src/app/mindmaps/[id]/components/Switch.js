"use client"

function Switch({ setAutoSave }) {
    const handleChange = e => {
        setAutoSave(e.target.checked)
    }

    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handleChange}/>
                <div
                    className="group peer ring-0 bg-gray-400  rounded-full outline-none duration-200 after:duration-200 w-8 h-4 shadow-md 
                        peer-checked:bg-green-500  peer-focus:outline-none after:rounded-full after:absolute after:bg-gray-50 
                        after:outline-none after:h-4 after:w-4 after:top-0 after:left-0 after:-rotate-180 after:flex after:justify-center after:items-center 
                        peer-checked:after:translate-x-5 peer-hover:after:scale-55 peer-checked:after:rotate-0 after:shadow after:shadow-gray-500"
                ></div>
            </label>
        </>
    )
}

export default Switch
