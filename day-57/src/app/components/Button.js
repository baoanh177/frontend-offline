"use client"

function Button({children, click}) {
    console.log(click)
    return <button
        className="flex items-center justify-center w-40 h-9 dark:hover:bg-white hover:cursor-pointer
        dark:hover:text-black hover:text-white hover:bg-black transition mt-5 border-2"
        onClick={click}
    >
        {children}
    </button>
}

export default Button;