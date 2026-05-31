import {useState} from "react";
import axios from "axios";


function App() {

  const [email , setEmail] = useState ("");
  const [password , setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password
      }
    );

    console.log(response.data);

  } catch (err) {
    console.log(err.response.data);
  }
};

  return (
    <div className=" flex items-center justify-center  mx-44 my-66   bg-blue-100 px-6 py-10 rounded-4xl border-amber-400">

      <div className="">
        <h1 className="text-3xl font-bold text-center text-blue-600">.....LIBRARY MANAGEMENT.....</h1> 
        <h3 className="text-center mt-4 text-xl text-gray-600"> Welcome </h3>
        <h1 className="text-sm font-semibold text-gray-500">Email Address</h1>
        <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white rounded-xl px-4 py-3 w-full"/>
        <h1 className="text-sm font-semibold text-gray-500 mt-4">Password</h1>
        <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded-xl px-4 py-3 w-full"/>

        <button
            onClick={handleLogin}
            className="bg-blue-600 rounded-xl text-center mt-4 py-3 px-4 w-full">Sign In
        </button>
        <h1 className="text-center mt-4 ">Dont have Account ? Do Register</h1>
      </div>
    </div>
  )
}
export default App