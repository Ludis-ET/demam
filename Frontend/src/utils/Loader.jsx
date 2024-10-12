import g from "../assets/loader.gif";

export const Loader = () => {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <img src={g} className="w-[70vh]" alt="" />
    </div>
  );
};
