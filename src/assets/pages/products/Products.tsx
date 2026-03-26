import { useState, useEffect, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import CardMaps from "../../components/maps/CardMaps";
import { nanoid } from "nanoid";
import Modal from "../../components/modal/Modal";

export interface IProducts {
    id: string;
    productsName: string;
    categoryId: string;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

function Products() {
    const [nomi, setNomi] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [updatedAt, setUpdatedAt] = useState<string>("");
    const [showModal, setSHowmodal] = useState<boolean>(false)
    const [products, setProducts] = useState<IProducts[]>([]);

    const [modalCardId, setCardModalId] = useState<string>("")

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataObj: IProducts = {
            id: nanoid(),
            productsName: nomi,
            categoryId: categoryId,
            price: Number(price),
            description: description,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
        };

        const updatedProducts = [...products, dataObj];

        setProducts(updatedProducts);
        localStorage.setItem("storagerProducts", JSON.stringify(updatedProducts));

        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");

        setNomi("");
        setCategoryId("");
        setPrice(0);
        setDescription("");
        event.currentTarget.reset();
    };

    const handlerDelete = (id: string) => {


        const updated = products.filter((item: IProducts) => item.id !== id);
        setProducts(updated);
        localStorage.setItem("storagerProducts", JSON.stringify(updated));
        toast.info("Mahsulot o'chirildi");

    }

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("storagerProducts") || "[]");
        setProducts(saved);
    }, []);

    return (
        <div className="  w-full mx-auto min-h-screen p-10 h-auto">

            {
                showModal && <Modal setProducts={setProducts} modalCardId={modalCardId} setSHowmodal={setSHowmodal} />
            }
            <form onSubmit={handleSubmit} className="*:hover:bg-white/20 bg-white/10 *:duration-120 *:rounded-sm *:p-1 w-[35%] mx-auto flex flex-col gap-4 p-5 rounded-md mb-10">
                <label>
                    Nomi:
                    <input
                        value={nomi}
                        onChange={(e) => setNomi(e.target.value)}
                        className=" w-full p-1"
                        type="text"
                        required
                        name="nomi"
                    />
                </label>
                <label>
                    Kategoriya unikal raqami:
                    <input
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className=" w-full p-1"
                        type="text"
                        required
                        name="categoryId"
                    />
                </label>
                <label>
                    Narx:
                    <input
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className=" w-full p-1"
                        type="number"
                        required
                        min={1}
                        name="price"
                    />
                </label>
                <label>
                    Tavsif:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=" min-w-full max-w-full min-h-20 max-h-20 w-full p-1"
                        required
                        name="description"
                    ></textarea>
                </label>
                <label>
                    Yaratilgan vaqti:
                    <input
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        className=" w-full p-1"
                        type="date"
                        required
                        name="createdAt"
                    />
                </label>
                <label>
                    Yangilangan vaqti:
                    <input
                        value={updatedAt}
                        onChange={(e) => setUpdatedAt(e.target.value)}
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



            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 ? (
                    <h1 className="text-center col-span-full">Mahsulotlar mavjud emas...</h1>
                ) : (
                    products.map((item) => <CardMaps setCardModalId={setCardModalId} setSHowmodal={setSHowmodal} handlerDelete={handlerDelete} key={item.id} item={item} />)
                )}
            </div>

        </div>
    );
}

export default Products;