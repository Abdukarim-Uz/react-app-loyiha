import { useState, type SubmitEvent } from "react"
import { toast } from "react-toastify"
import CardMaps from "../../components/maps/CardMaps"
import { nanoid } from "nanoid"


export interface IProducts {
    id: string,
    productsName: string,
    category: string,
    price: number,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

function Products() {


    const [products, setProducts] = useState<IProducts[]>([])

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const dataObj = Object.fromEntries(form.entries())

        const newProduct: IProducts = {
            id: String(nanoid()),
            productsName: String(dataObj.productsName),
            category: String(dataObj.category),
            price: Number(dataObj.price),
            description: String(dataObj.description),
            createdAt: new Date(String(dataObj.createdAt)),
            updatedAt: new Date(String(dataObj.updatedAt))

        }
        setProducts([...products, newProduct])
        localStorage.setItem("products", JSON.stringify(products))
        toast.success("mahsulot muvaffaqiyatli qo'shildi!")


    }



    return (
        <div className="border w-full mx-auto min-h-100 p-10 h-auto " >

            <form onSubmit={handleSubmit} className="border w-[35%] mx-auto  flex items-start cursor-pointer  *:p-2 justify-center flex-col gap-7 p-5 rounded-sm min-h-150 h-auto mb-40  " >
                <label htmlFor="name">
                    nomi:
                    <input type="text" className="outline-0 px-1 cursor-pointer  " id="name" name="productsName" placeholder="mahsulot nomini kiriting.." required />
                </label>

                <label htmlFor="categoryId">
                    mahsulot unikal raqami:
                    <input type="text" className="outline-0 px-1 cursor-pointer    " id="categoryId" name="category" placeholder="mahsulot unikal raqamini kiriting.." required />
                </label>



                <label htmlFor="price">
                    mahsulot narxi:
                    <input type="text" className="outline-0 px-1 cursor-pointer " id="price" name="price" placeholder="mahsulot narxini kiriting.." required />
                </label>


                <textarea id="description" className="min-w-100 border max-w-100 rounded-sm outline-0 px-1 cursor-pointer min-h-30 max-h-30 " name="description" placeholder="mahsulot haqida qisqacha tavsif..." >

                </textarea>

                <label htmlFor="createdAt">
                    mahsulot yaratilgan vaqti:
                    <input type="date" className="outline-0 px-1 cursor-pointer " id="createdAt" name="createdAt" placeholder="mahsulot yaratilgan vaqti..." />
                </label>



                <label htmlFor="updatedAt">
                    mahsulot yangilangan vaqti:
                    <input type="date" className="outline-0 px-1 cursor-pointer " id="updatedAt" name="updatedAt" placeholder="mahsulot yangilanган vaqti..." />
                </label>




                <button className=" cursor-pointer self-center w-30 rounded-sm hover:bg-green-400 bg-green-500   " >
                    kiritish
                </button>

            </form>


            <div className="w-full min-h-300 h-auto p-20 border rounded-sm grid grid-cols-3 gap-4" >

                {
                    products.length === 0 ? <h1 className="text-center text-[20px] text-white/50 " >mahsulotlar mavjud emas...</h1> :products.map((item) => (
                        <CardMaps key={item.id} item={item} />

                    ))

                }





            </div>


        </div>
    )
}

export default Products