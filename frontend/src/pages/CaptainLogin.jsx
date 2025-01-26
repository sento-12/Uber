import { useState } from "react"
import { Link } from "react-router-dom"

const CaptainLogin = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [captainData, setcaptainData] = useState({})
  const submitHandler = (e)=>{
    e.preventDefault();
    setcaptainData({
      email,
      password
    })
    console.log(captainData)
    setemail('')
    setpassword('')
  }
  return (
    <div className="p-7 h-screen pb-[8vh] flex flex-col justify-between ">
    <div className="">
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <img
          className="w-16 mb-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpD6gUpYBIavRCETH3HRYZzz45EbyBxJHkkQ&s"
        />

        <div className="">
          <h3 className="text-lg font-medium mb-2">What`s your email</h3>
          <input
            className="bg-[#eeeeee] rounded text-lg placeholder:text-sm py-2 px-4 w-full"
            type="email"
            value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
            placeholder="Enter your Email"
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] rounded text-lg placeholder:text-sm py-2 px-4 w-full"
            type="password"
            value={password}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
            placeholder="Enter youe password"
          />
        </div>
        <button className="bg-black flex  justify-center items-center w-full tracking-wide mt-6 text-lg font-medium text-white py-3 px-5 rounded-lg shadow-md hover:shadow-xl transform duration-300 hover:scale-105">
          Login
        </button>
      </form>
      <p className="text-center font-medium mt-4 ">
        Join a feet ?{" "}
        <Link to={"/captain-signup"} className="text-blue-500 ">
          register as a captain
        </Link>
      </p>
    </div>
    <div className="">
      <Link to={"/login"} className="bg-[#d5622d] flex  justify-center items-center w-full tracking-wide text-lg font-medium mt-6 text-white py-3 px-5 rounded-lg shadow-md hover:shadow-xl transform duration-300 hover:scale-105">
        Sing as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin