import { useEffect, useState, type SubmitEvent } from "react";
import CategoryMaps from "../../components/categoryMaps/CategoryMaps";
import CategoryModal from "../../components/categoryModal/CategoryModal";

export interface ICategory {
    id: string;
    nomi: string;
}

function Products() {
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);

    const [modalCardId, setModalCardId] = useState<string>("");

    const [categoryPage, setCategoryPage] = useState<ICategory[]>([]);


    const handlerCategorySubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = Object.fromEntries(formData.entries()) as unknown as ICategory;
        setCategoryPage([...categoryPage, category]);
        localStorage.setItem("categories", JSON.stringify([...categoryPage, category]));
        console.log(category)

    }


    const hendlerCategoryDelete = (id: string) => {

        // const updatedCategories = JSON.parse(localStorage.getItem("categories"))).filter((item: ICategory) => item.id !== id);
        const updatedCategories = JSON.parse(localStorage.getItem("categories") || "[]").filter((item: ICategory) => item.id !== id);
        setCategoryPage(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(categoryPage));
    }


    useEffect(() => {
        const categoryData = localStorage.getItem("categories");
        if (categoryData) {
            const parsedData = JSON.parse(categoryData);
            setCategoryPage(Array.isArray(parsedData) ? parsedData : []);
        }
    }, []);

    return (
        <div className="border  w-full mx-auto min-h-screen p-10 h-auto">

            {showCategoryModal && <CategoryModal setCategoryPage={setCategoryPage} modalCardId={modalCardId} setShowCategoryModal={setShowCategoryModal} />}

            <form onSubmit={handlerCategorySubmit} className="border w-[35%] mx-auto flex flex-col gap-4 p-5 rounded-md mb-10">
                <label>
                    Nomi:
                    <input
                        className="border w-full p-1"
                        type="text"
                        required
                        name="nomi"
                    />
                </label>
                <label>
                    Kategoriya unikal raqami:
                    <input
                        className="border w-full p-1"
                        type="text"
                        required
                        name="id"
                    />
                </label>

                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Kiritish
                </button>
            </form>



            <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                {categoryPage.map((item: ICategory, index: number) => (
                    <CategoryMaps setModalCardId={setModalCardId} setShowCategoryModal={setShowCategoryModal} hendlerCategoryDelete={hendlerCategoryDelete} key={index} item={item} />
                ))}

            </div>

        </div >
    );
}

export default Products;