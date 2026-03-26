import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import CategoryMaps from "../../components/categoryMaps/CategoryMaps";
import CategoryModal from "../../components/categoryModal/CategoryModal";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";

export interface ICategory {
    id: string;
    nomi: string;
}

function Category() {
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);

    const [modalCardId, setModalCardId] = useState<string>("");

    const [categoryPage, setCategoryPage] = useState<ICategory[]>([]);



    const [searchCategoryTerm, setSearchCategoryTerm] = useState<string>("")


    const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchCategoryTerm(event.target.value);

    }

    const filteredCategories = categoryPage.filter((item) =>
        item.nomi.toLowerCase().includes(searchCategoryTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchCategoryTerm.toLowerCase())
    );





    const handlerCategorySubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = Object.fromEntries(formData.entries()) as unknown as ICategory;
        setCategoryPage([...categoryPage, category]);
        localStorage.setItem("categories", JSON.stringify([...categoryPage, category]));
        toast.success("Kategoriya muvaffaqiyatli qo'shildi!")
    }


    const hendlerCategoryDelete = (id: string) => {

        const filteredCategories = categoryPage.filter((item: ICategory) => item.id !== id);
        setCategoryPage(filteredCategories);
        localStorage.setItem("categories", JSON.stringify(categoryPage));
        toast.info("Kategoriya muvaffaqiyatli o'chirildi!")

    }


    useEffect(() => {
        const categoryData = localStorage.getItem("categories");
        if (categoryData) {
            const parsedData = JSON.parse(categoryData);
            setCategoryPage(Array.isArray(parsedData) ? parsedData : []);
        }
    }, []);

    return (
        <div className="   w-full mx-auto min-h-screen p-10 h-auto">

            {showCategoryModal && <CategoryModal setCategoryPage={setCategoryPage} modalCardId={modalCardId} setShowCategoryModal={setShowCategoryModal} />}

            <form onSubmit={handlerCategorySubmit} className="bg-white/10 *:hover:bg-white/20 *:p-2 *:rounded-sm *:cursor-pointer cursor-pointer w-[35%] mx-auto flex flex-col gap-4 p-5 rounded-md mb-10">
                <label>
                    Nomi:
                    <input
                        className=" w-full p-1"
                        type="text"
                        required
                        name="nomi"
                    />
                </label>
                <label>
                    Kategoriya unikal raqami:
                    <input
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



            <div className="w-full flex items-center mx-auto rounded-sm duration-120    hover:bg-white/20 cursor-pointer *:cursor-pointer   h-14 px-10  justify-end gap-2 mb-5">
                <input onChange={searchItem} type="text" placeholder="search..." className=" w-full  px-2 py-2 outline-0 " />
                <button className=" p-1" ><CiSearch size={25} /></button>
            </div>




            <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    (filteredCategories.length === 0) ? (<h1 className="text-center col-span-full">Kategoriyalar mavjud emas...</h1>) : (


                        filteredCategories.map((item: ICategory, index: number) => (
                            <CategoryMaps setModalCardId={setModalCardId} setShowCategoryModal={setShowCategoryModal} hendlerCategoryDelete={hendlerCategoryDelete} key={index} item={item} />
                        ))
                    )

                }

            </div>

        </div >
    );
}

export default Category;