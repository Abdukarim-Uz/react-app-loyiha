import { useEffect, useState } from "react"
import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import type { ICategory } from "../category/Category"

function categoryDetail() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [categoryItem, setCategoryItem] = useState<ICategory>()


    useEffect(() => {
        const categoryData = localStorage.getItem("categories");
        setCategoryItem(categoryData ? JSON.parse(categoryData).find((el: ICategory) => el.id === id) : undefined)
    }, [id])

    console.log(categoryItem)
    return (
        <div>
            <h1>{categoryItem?.nomi}</h1>

            <button onClick={() => navigate("/category")} className="w-33 fixed bottom-20 p-3 rounded-sm  flex items-center justify-center gap-3 cursor-pointer left-20 bg-green-500 hover:bg-green-400 " ><MdArrowBack size={20} /> ortga </button>
        </div>
    )
}

export default categoryDetail