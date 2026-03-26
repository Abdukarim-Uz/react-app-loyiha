import { useEffect, useState, type Dispatch, type SetStateAction, type SubmitEvent } from "react"
import { MdArrowBack } from "react-icons/md"
import type { IProducts } from "../../pages/products/Products"
import { toast } from "react-toastify"

interface IModal {
    setSHowmodal: Dispatch<SetStateAction<boolean>>,
    modalCardId: string,
    setProducts: Dispatch<SetStateAction<IProducts[]>>
}


function Modal({ setSHowmodal, modalCardId, setProducts }: IModal) {

    const [modalItem, setModalItem] = useState<IProducts | null>(null)

    const handlerEdit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!modalItem) return;
        const formData = new FormData(event.currentTarget);
        const updetData = Object.fromEntries(formData.entries())

        const updetDatatwo = {
            ...modalItem,
            ...updetData,
        } as IProducts;



        const products: IProducts[] = JSON.parse(localStorage.getItem("storagerProducts") || "[]");
        const updatedProducts = products.map(el => el.id === updetDatatwo.id ? updetDatatwo : el)
        localStorage.setItem("storagerProducts", JSON.stringify(updatedProducts));
        setProducts(updatedProducts)
        setSHowmodal(false);
        event.currentTarget.reset();
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!")
    }




    useEffect(() => {
        setModalItem(JSON.parse(localStorage.getItem("storagerProducts") || "[]").find((item: IProducts) => item.id === modalCardId))
    }, [])


    if (!modalItem) {
        return <div className="fixed  text-white">Yuklanmoqda...</div>
    }

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/90 flex items-center justify-center  " >
            <div className="w-auto h-auto p-10 flex gap-10 items-center justify-center flex-col " >

                <button onClick={() => setSHowmodal(false)} className="w-29 gap-2 rounded-sm p-2 self-end bg-red-500 hover:bg-red-400 cursor-pointer flex items-center justify-center " ><MdArrowBack /> chiqish </button>

                <form onSubmit={handlerEdit} className="bg-white/10 *:hover:bg-white/20 *:p-2 *:rounded-sm *:cursor-pointer cursor-pointer w-[90%]  mx-auto flex flex-col gap-4 p-5 rounded-md mb-10">
                    <label>
                        Nomini o'zgartirish:
                        <input
                            defaultValue={modalItem.productsName}
                            className=" w-full p-1"
                            type="text"
                            required
                            name="productsName"
                        />
                    </label>
                    <label>
                        Kategoriya unikal raqamini o'zgartirish:
                        <input
                            defaultValue={modalItem.categoryId}
                            className=" w-full p-1"
                            type="text"
                            required
                            name="categoryId"
                        />
                    </label>
                    <label>
                        Narxini o'zgartirish:
                        <input
                            defaultValue={modalItem.price}
                            className=" w-full p-1"
                            type="number"
                            required
                            min={1}
                            name="price"
                        />
                    </label>
                    <label>
                        Tavsifini o'zgartirish:
                        <textarea
                            defaultValue={modalItem.description}
                            className=" min-w-full max-w-full min-h-20 max-h-20 w-full p-1"
                            required
                            name="description"
                        ></textarea>
                    </label>
                    <label>
                        Yaratilgan vaqtini o'zgartirish:
                        <input
                            defaultValue={modalItem?.createdAt ? String(modalItem?.createdAt) : ""}
                            className=" w-full p-1"
                            type="date"
                            required
                            name="createdAt"
                        />
                    </label>
                    <label>
                        Yangilangan vaqti o'zgartirish:
                        <input
                            defaultValue={modalItem?.updatedAt ? String(modalItem?.updatedAt) : ""}
                            className=" w-full p-1"
                            type="date"
                            required
                            name="updatedAt"
                        />
                    </label>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                        Kiritish
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Modal