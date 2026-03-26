import { FaTrashAlt } from "react-icons/fa"
import { IoEye } from "react-icons/io5"
import { RiEdit2Fill } from "react-icons/ri"
import { Link } from "react-router-dom"
import type { ICategory } from "../../pages/category/Category"
import type { Dispatch, SetStateAction } from "react"

interface ICategoryMaps {
    item: ICategory,
    hendlerCategoryDelete: (id: string) => void,
    setShowCategoryModal: Dispatch<SetStateAction<boolean>>
    setModalCardId: Dispatch<SetStateAction<string>>
}


function CategoryMaps({ item, hendlerCategoryDelete, setShowCategoryModal, setModalCardId }: ICategoryMaps) {
    return (
        <div className=" w-100 h-60 flex items-start justify-between flex-col hover:bg-white/20 duration-120 cursor-pointer hover:-translate-y-1 p-5 rounded-md">
            <h1 className="text-[40px]" >{item.nomi}</h1>
            <div className=" cursor-pointer *:cursor-pointer w-full flex items-center  gap-2" >

                <Link to={`/category-detail/${item.id}`} className="w-[50%]  rounded-sm p-3 hove:bg-green-400 bg-green-500 flex items-center justify-center"  >
                    <button className="w-[50%] rounded-sm  hove:bg-green-400 bg-green-500 flex items-center justify-center " ><IoEye /></button>
                </Link>
                <button onClick={() => { setShowCategoryModal(true); setModalCardId(item.id); }} className="w-[25%] rounded-sm p-3 hover:bg-blue-500 bg-blue-600 flex items-center justify-center " ><RiEdit2Fill /></button>
                <button onClick={() => hendlerCategoryDelete(item.id)} className="w-[25%] rounded-sm p-3 hover:bg-red-500 bg-red-600 flex items-center justify-center " ><FaTrashAlt /></button>
            </div>
        </div>

    )
}

export default CategoryMaps