import { FaTrashAlt } from "react-icons/fa"
import { IoEye } from "react-icons/io5"
import { RiEdit2Fill } from "react-icons/ri"
import type { IProducts } from "../../pages/products/Products"
import { Link } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"


interface IcardMaps {
    item: IProducts,
    handlerDelete: (id: string) => void,
    setSHowmodal: Dispatch<SetStateAction<boolean>>
    setCardModalId: Dispatch<SetStateAction<string>>
}

function CardMaps({ item, handlerDelete, setCardModalId, setSHowmodal }: IcardMaps) {




    return (

        <div className="w-90  h-100 flex gap-6 justify-between hover:bg-white/5 rounded-2xl  duration-150 flex-col cursor-pointer py-4 px-6 *:cursor-pointer" >

            <h1 className=" text-[30px] " >{item?.productsName}</h1>
            <p className=" text-[13px] h-40 " >{item?.description}</p>
            <h4 className=" text-[14px] text-white/50 " >{item?.price} $ </h4>
            <div className=" flex items-center justify-end gap-4 text-[12px] text-white/50 " >
                <h2>{new Date(item?.createdAt).toLocaleDateString()}</h2>
                <h2>{new Date(item?.updatedAt).toLocaleDateString()}   </h2>
            </div >
            <div className=" flex items-center *:cursor-pointer   gap-3 justify-center ">
                <Link className="w-[50%] rounded-sm p-3 hove:bg-green-400 bg-green-500 flex items-center justify-center" to={`/detail/${item.id}`} >
                    <button className="w-[50%] rounded-sm  hove:bg-green-400 bg-green-500 flex items-center justify-center " ><IoEye /></button>
                </Link>
                <button onClick={() => { setSHowmodal(true); setCardModalId(item.id) }} className="w-[25%] rounded-sm p-3 hover:bg-blue-500 bg-blue-600 flex items-center justify-center " ><RiEdit2Fill /></button>
                <button onClick={() => handlerDelete(item.id)} className="w-[25%] rounded-sm p-3 hover:bg-red-500 bg-red-600 flex items-center justify-center " ><FaTrashAlt /></button>
            </div>
        </div>
    )
}

export default CardMaps