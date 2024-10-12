export const Card = ({text, className, name}) => {
  return (
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div className="flex flex-col px-6 py-10 overflow-hidden hover:bg-gradient-to-br hover:from-clayBrown hover:to-sandyBeige text-gray-600 bg-gradient-to-br from-sandyBeige to-clayBrown rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
            <div className="h-6 w-6 flex items-center justify-center">
              <i className={className}></i>
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl  xl:text-5xl font-bold mt-12">
          {text}
        </h1>
        <div className="flex flex-row justify-between font-bold text-black">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
