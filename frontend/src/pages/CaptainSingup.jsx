import { useState } from "react"
import { Link } from "react-router-dom"

const CaptainSingup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setuserData] = useState({})
  const submitHandler = (e)=>{
    e.preventDefault();
    setuserData({
      fullName : {
        firstName,
        lastName
      },
      email,
      password
    })
    console.log(userData)
    setfirstName('')
    setlastName('')
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
            <h3 className="text-base font-medium mb-2">What`s our Captain`s name</h3>
            <div className="flex gap-2 mb-2">
            <input
              className="bg-[#eeeeee] rounded text-base placeholder:text-sm py-2 px-4 w-1/2"
              type="text"
              value={firstName}
              onChange={(e)=>{
                setfirstName(e.target.value)
              }}
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] rounded text-base placeholder:text-sm py-2 px-4 w-1/2"
              type="text"
              value={lastName}
              onChange={(e)=>{
                setlastName(e.target.value)
              }}
              placeholder="Second name"
            />
            </div>
            <h3 className="text-base font-medium mb-2">What`s our Captain`s email</h3>
            <input
              className="bg-[#eeeeee] rounded text-base placeholder:text-sm py-2 px-4 w-full"
              type="email"
              value={email}
              onChange={(e)=>{
                setemail(e.target.value)
              }}
              placeholder="Enter your Email"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-base font-medium mb-2">Enter password</h3>
            <input
              className="bg-[#eeeeee] rounded text-base placeholder:text-sm py-2 px-4 w-full"
              type="password"
              value={password}
              onChange={(e)=>{
                setpassword(e.target.value)
              }}
              placeholder="Enter youe password"
            />
          </div>
          <button className="bg-black flex  justify-center items-center w-full tracking-wide mt-6 text-base font-medium text-white py-3 px-5 rounded-lg shadow-md hover:shadow-xl transform duration-300 hover:scale-105">
            Sing-Up
          </button>
        </form>
        <p className="text-center font-medium mt-4 ">
          Already have a account?{" "}
          <Link to={"/captain-login"} className="text-blue-500 ">
            login as captain
          </Link>
        </p>
      </div>
      <div className="">
        <p className="text-[10px] text-grey-500 leading-tight ">
          By processding , you consent to get calls ,
          whatsApp or SMS message, including by automate means,
          from  Uber an its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainSingup