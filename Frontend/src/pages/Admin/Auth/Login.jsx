import { ButtonComp, InputComp } from "../../../components";
import Logo from "../../../assets/bella/1.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const log = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginUser(phone, password);
    setLoading(false);
  };

  return (
    <>
      <div className="w-full h-full m-0 p-0 absolute overflow-hidden flex flex-wrap gap-12 bg-sandyBeige text-black dark:bg-gray-900 dark:text-white">
        <div className="absolute hidden xl:block bg-clayBrown w-[600px] h-[600px] rounded-[100%] left-[-10%] top-[-20%] dark:bg-purple-700"></div>
        <div className="absolute bg-clayBrown w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-[100%] right-[-20%] top-[-10%] md:right-[-10%] md:top-[50%] dark:bg-purple-700"></div>
        <div className="absolute bg-clayBrown w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-[100%] left-[-20%] bottom-[-30%] md:left-[-80%] md:bottom-[-60%] dark:bg-purple-700"></div>
        <div className="w-full items-center flex flex-wrap justify-center md:top-[15%] z-10">
          <div className="mt-20 md:py-10 px-10 md:mt-0 w-[80%] md:w-[500px] md:h-[650px] bg-gray-100/30 dark:bg-gray-800/50 rounded-md backdrop-blur-md border border-white/20 shadow-xl">
            <header className="text-[30px] flex flex-col justify-center items-center font-bold font-serif text-center p-4 dark:text-white">
              <img
                src={Logo}
                className="w-[200px] h-[200px] rounded-full"
                alt="Logo"
              />
              Admin Login
            </header>
            <form onSubmit={(e) => log(e)}>
              <div className="m-8 flex flex-wrap gap-8 items-center justify-center ">
                <InputComp
                  label="Phone-Number"
                  type="tel"
                  onchange={setPhone}
                />
                <InputComp
                  label="Password"
                  onchange={setPassword}
                  type="password"
                />
              </div>
              <span className="w-full flex flex-wrap justify-center">
                <ButtonComp text={"Login"} load={loading} />
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
