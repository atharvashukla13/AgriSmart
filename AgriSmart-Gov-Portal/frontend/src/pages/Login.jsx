import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(email === "sagar@gmail.com" && password === "admin123"){
      navigate("/dashboard");
    }
    else{
      setError("Invalid credentials, Please try again!");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#31d731_0%,_#85e3a3_100%)]">
      <div className="w-96 max-w-md rounded-xl border bg-white p-6 shadow">
        <div className="flex items-center justify-center">
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/67b146fe-910a-4cd3-bb82-922d718b6fb8.png" alt="Government Agriculture Department logo featuring a stylized potato plant with green leaves and brown soil background, circular emblem with national emblem elements" className="mx-auto mb-4 rounded-full" style={{width: "120px", height: "120px"}}/>
        </div>
        <h1 className="mb-1 text-center text-3xl font-semibold text-black-900">
          Agri Smart
        </h1>
        <h1 className="mb-4 text-center text-3xl font-semibold text-black-900">
          Government Portal
        </h1>
        <p className="mb-4 text-gray-600 text-center">Smart Agriculture for Better Yield</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              className="w-full rounded border px-3 py-2 outline-none focus:border-primary"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              className="w-full rounded border px-3 py-2 outline-none focus:border-primary"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="w-full rounded bg-[#41d947] text-white hover:scale-105 transition-all duration-300 px-4 py-2 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

