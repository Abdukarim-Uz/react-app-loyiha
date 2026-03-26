import { useEffect, useState, type Dispatch, type SetStateAction, type SubmitEvent } from "react"
import { MdArrowBack } from "react-icons/md"
import type { ICategory } from "../../pages/category/Category";
import { toast } from "react-toastify";

interface ICategoryModal {
    setShowCategoryModal: Dispatch<SetStateAction<boolean>>,
    modalCardId: string,
    setCategoryPage: Dispatch<SetStateAction<ICategory[]>>
}

function Modal({ setShowCategoryModal, modalCardId, setCategoryPage }: ICategoryModal) {

    const [editItem, setEditItem] = useState<ICategory | null>(null)



    const handlerSubmitCategory = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const updatedItem = Object.fromEntries(formData.entries());

        const localData: ICategory[] = JSON.parse(localStorage.getItem("categories") || "[]");

        const newFullList = localData.map((item) =>
            item.id === modalCardId ? updatedItem : item
        );

        localStorage.setItem("categories", JSON.stringify(newFullList));

        setCategoryPage(newFullList as ICategory[]);

        setShowCategoryModal(false);
        toast.info("Kategoriya muvaffaqiyatli yangilandi!")
    }


    useEffect(() => {
        const categoryitem = JSON.parse(localStorage.getItem("categories") || "[]");
        setEditItem(categoryitem.find((item: ICategory) => item.id === modalCardId) || null);
        console.log(categoryitem)
    }, [modalCardId]);

    console.log(editItem)

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/90 flex items-center justify-center  " >
            <div className="w-auto h-auto p-10 flex gap-10 items-center justify-center flex-col " >

                <button onClick={() => setShowCategoryModal(false)} className="w-29 gap-2 rounded-sm p-2 self-end bg-red-500 hover:bg-red-400 cursor-pointer flex items-center justify-center " ><MdArrowBack /> chiqish </button>

                <form onSubmit={handlerSubmitCategory} className=" bg-white/10 *:hover:bg-white/20 *:p-2 *:rounded-sm *:cursor-pointer cursor-pointer  w-[90%]  mx-auto flex flex-col gap-4 p-5 rounded-md mb-10">
                    <label>
                        Nomini o'zgartirish:
                        <input
                            defaultValue={editItem?.nomi}
                            className=" w-full p-1"
                            type="text"
                            required
                            name="nomi"
                        />
                    </label>
                    <label>
                        Kategoriya unikal raqamini o'zgartirish:
                        <input
                            defaultValue={editItem?.id}
                            className=" w-full p-1"
                            type="text"
                            required
                            name="id"
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