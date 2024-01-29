import clsx from "clsx"

function MenuContext({ top, left, isOpen }) {
    return <>
        <div 
            className={clsx(isOpen ? "visible opacity-100" : "invisible opacity-0", "w-60 h-96 border fixed bg-green-100 transition-opacity")} 
            style={{top: top + 'px', left: left + 'px'}}
        >

        </div>
    </>
}

export default MenuContext;