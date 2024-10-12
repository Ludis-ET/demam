import img from "../../assets/store.png";

export const Header = () => {
  return (
    <div
      className="w-full h-[30vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};
