import { Link } from "react-router-dom"

const home = () => {
  return (
    <div>
        <div className=" bg-cover bg-center bg-[url(https://i.pinimg.com/736x/fb/37/e0/fb37e0a5b420a119ecaa7a2eb33cb326.jpg)] h-screen pt-4 flex w-full bg-red-400 justify-between  flex-col ">
            <img className="w-16 ml-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
            <div className="bg-white mb-7 py-4 px-4">
                <h2 className="text-2xl font-bold">Get Started With Uber</h2>
                <Link to={"/login"} className="bg-black flex justify-center items-center w-full tracking-wide mt-3 text-white py-3 px-5 rounded-lg shadow-md hover:shadow-xl transform duration-300 hover:scale-105">Countious</Link>
            </div>
        </div>
    </div>
  )
}

export default home