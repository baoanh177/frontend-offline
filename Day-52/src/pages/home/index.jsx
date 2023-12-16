import { useState, useEffect, memo } from "react"

import Pagination from "./Pagination";
import Products from "./Products";
import Loader from "../../components/Loader"

import { client } from "../../config/client"

function Home() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        client.get("/products?limit=12&page=" + currentPage).then((res) => {
            if (res.response.ok) {
                setProducts(res.data.data.listProduct)
                if(res.data.data.totalPage != totalPage) {
                    setTotalPage(res.data.data.totalPage)
                }
            }
            window.scroll({top: 0, behavior: 'smooth'})
            setLoading(false)
        })
    }, [currentPage])

    return <>
        {loading && <Loader />}
        <Products products={products} />
        <Pagination props={{currentPage, totalPage, setCurrentPage}}
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
        />
    </>
}

export default memo(Home);