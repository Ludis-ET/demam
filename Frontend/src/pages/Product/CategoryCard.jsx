export const CategoryCard = ({ product }) => {
  return (
    <div className="w-full font-playfair items-center flex md:flex-row flex-col-reverse justify-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-clayBrown">{product.name}</h1>
        <p>{product.body}</p>
      </div>
      <img src={product.image} className="" />
    </div>
  );
};
