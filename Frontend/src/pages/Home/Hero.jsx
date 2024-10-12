import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import one from "../../assets/bella/1.jpg";

export const Hero = ({ heroInView }) => {
  return (
    <>
      {/* Decorative Circle 1 */}
      <motion.div
        className="w-[30vh] h-[30vh] sm:w-[40vh] sm:h-[40vh] bg-clayBrown rounded-full absolute left-[-15vh] sm:left-[-20vh] top-[45vh] sm:top-[50vh]"
        initial={{ scale: 0 }}
        animate={heroInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      />

      {/* Decorative Circle 2 */}
      <motion.div
        className="w-48 h-48 sm:w-72 sm:h-72 bg-sandyBeige rounded-full absolute top-[10vh] right-[-15px] sm:right-10"
        initial={{ scale: 0 }}
        animate={heroInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.2 }}
      />

      {/* Main Hero Section */}
      <motion.div
        className="relative lg:px-20 bg-white bg-opacity-20 h-[70vh] md:h-[80vh] max-w-[95vw] lg:max-w-[95vw] backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-10 mx-2 md:mx-10 mt-16 md:mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col justify-center items-center text-center z-10">
          {/* Hero Heading */}
          <motion.h1
            className="text-[#4a4a4a] mt-[15vh] text-3xl sm:text-4xl lg:text-6xl xl:text-8xl font-playfair font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Experience the Power of Nature with Our Pure, Skin-Loving Cosmetics.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-2 sm:mt-4 font-extralight text-base sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Simple, natural, and effective.
          </motion.p>

          {/* CTA Button */}
          <a href="#store">
            <motion.button
              className="border-2 border-clayBrown px-6 py-2 mt-4 sm:mt-6 w-40 sm:w-48 text-base sm:text-lg md:text-xl text-black hover:bg-clayBrown hover:text-white transition-colors duration-200 ease-in-out"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Explore
            </motion.button>
          </a>
        </div>

        {/* Decorative Image */}
        <motion.div
          className="w-60 h-60 sm:w-80 sm:h-80 rounded-full overflow-hidden p-4 bg-clayBrown absolute bottom-[-5vh] right-[-5vh]"
          initial={{ scale: 0 }}
          animate={heroInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
        >
          <img
            src={one}
            className="rounded-full object-cover"
            alt="Natural Product"
          />
        </motion.div>
      </motion.div>
    </>
  );
};
