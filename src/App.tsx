import { useRoutes } from "react-router-dom"
import Navbar from "./assets/components/navbar/Navbar"
import { routes } from "./assets/routes/Routes"
import { ToastContainer } from "react-toastify"

function App() {

  const element = useRoutes(routes)

  return (
    <div className="bg-slate-900 relative w-full min-h-screen h-auto text-white font-mono mx-auto " >
      <div className="container px-20 py-10 border mx-auto " >
        <Navbar />
        {element}
      </div>
      <ToastContainer limit={2} theme="colored" autoClose={3000} pauseOnHover={false} />
    </div>
  )
}

export default App