import { div } from "framer-motion/client";
import Girl from "../../assets/bella/girls.png";
import { motion } from "framer-motion";

const values = [
  {
    title: "Values",
    description:
      "We believe in the beauty of nature and the power of connection. Our values are rooted in sustainability, community support, and integrity. We aim to uplift the lives of women and contribute positively to our environment.",
  },
  {
    title: "Quality",
    description:
      "At Demam, quality is paramount. Our products are meticulously crafted from the finest natural ingredients to ensure effectiveness and safety. We adhere to strict quality control measures to guarantee that each product meets our high standards.",
  },
  {
    title: "Mission",
    description:
      "Our mission is to empower individuals to embrace their natural beauty while promoting sustainable practices. We are dedicated to creating products that are good for both the skin and the planet, fostering a community that values wellness and connection.",
  },
];

export const About = () => {
  return (
    <div>
      <div className="bg-[#59403b] md:mb-20 relative mt-20 h-[600px] text-[#b1a9a8] flex flex-col-reverse md:flex-row justify-between font-playfair items-center">
        <div className="p-4 md:p-32 w-auto md:w-[900px] flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl font-bold">
            Demam is a small, female owned business focusing on natural beauty
            products like qasil and turmeric face cleansers and masks.
          </h1>
          <p>
            The word Demam translates to a beautiful person in and out, who
            radiates beautiful energy. Our products are more than just skincare;
            it’s the power of togetherness. The power of beautiful connections
            between people. With each application, you’re not just pampering
            yourself, but nourishing the bonds that make life beautiful.
          </p>
        </div>
        <img
          src={Girl}
          alt=""
          className="h-auto right-0 top-[-20%] md:top-[-9%] absolute self-end w-auto"
        />
      </div>
      <div className="absolute hidden md:flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-between w-full max-w-[900px]">
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="bg-sandyBeige shadow-lg rounded-lg p-6 mx-4 text-center"
            animate={{ x: [0, 10, 0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.9,
            }}
          >
            <h3 className="text-lg font-bold">{value.title}</h3>
            <p className="text-sm mt-2">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
