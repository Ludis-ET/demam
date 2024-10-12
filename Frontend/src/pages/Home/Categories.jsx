import { CategoryCard } from "../Product/CategoryCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import cleanser from "../../assets/bella/cleanser.png";
import face from "../../assets/bella/face.png";

export const Categories = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const products = [
    {
      name: "QASIL FACEMASK AND CLEANSER",
      body: "Qasil, made from crushed Gob tree leaves is a natural cleanser with lathering effect which is also utilized as a face mask and exfoliant. Qasil has antioxidant, antibacterial as well as oil balancing properties. It gently removes impurities, unclogs pores, and leaves the skin feeling refreshed and rejuvenated. Additionally, it's known to help soothe inflammation and promote a radiant complexion.",
      image: cleanser,
    },
    {
      name: "TURMERIC FACE MASK",
      body: "Turmeric powder, derived from the Curcuma longa plant, is a vibrant yellow spice known for its medicinal properties. When used in face masks, it's cherished for its anti-inflammatory, antibacterial, and antioxidant qualities. Its active compound, curcumin, helps combat acne, reduce redness, and brighten the complexion.",
      image: face,
    },
  ];

  const imageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8, rotate: 0 },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: custom.rotate,
      transition: {
        delay: custom.delay,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="py-8 w-full flex flex-col justify-center items-center">
      <header className="w-full md:mt-32 gap-4 font-playfair flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold">Our Store</h1>
        <p>Explore our range of products. </p>
      </header>

      <div
        className="pl-12 py-8 flex flex-col md:flex-row gap-12 w-full justify-between items-center"
        ref={ref}
      >
        <div className="relative w-full  h-[800px]">
          <motion.img
            src="https://i.pinimg.com/564x/98/d3/51/98d3513ffd2ef661090226965ec59929.jpg"
            alt=""
            className="absolute md:w-[500px] w-56 md:top-[-100px] transform rotate-6"
            custom={{ rotate: 6, delay: 0.2 }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={imageVariants}
          />
          <motion.img
            src="https://i.pinimg.com/564x/14/91/8c/14918c17bb3cc6596c072cc64d7b06a6.jpg"
            alt=""
            className="absolute md:w-[500px] w-56 md:top-[-100px] right-0 transform rotate-[-10deg]"
            custom={{ rotate: -10, delay: 0.6 }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={imageVariants}
          />
          <motion.img
            src="https://i.pinimg.com/564x/e0/ab/22/e0ab229d9a80a28d6e01a800406f885f.jpg"
            alt=""
            className="absolute md:w-[300px] w-40 bottom-48 md:bottom-[-100px] right-0 transform rotate-[10deg]"
            custom={{ rotate: 10, delay: 1.8 }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={imageVariants}
          />
          <motion.img
            src="https://i.pinimg.com/564x/0e/40/e7/0e40e755c308e227045f9cfef3a241fa.jpg"
            alt=""
            className="absolute md:w-[300px] w-40 bottom-48 md:bottom-[-100px] left-0 transform rotate-[-10deg]"
            custom={{ rotate: -10, delay: 1.4 }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={imageVariants}
          />
          <motion.img
            src="https://i.pinimg.com/564x/c6/f0/95/c6f0953371da594d35c2d9a99f3c673f.jpg"
            alt=""
            className="absolute md:w-[300px] w-40 bottom-48 md:bottom-0 left-[30%]"
            custom={{ rotate: 0, delay: 1.0 }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={imageVariants}
          />
        </div>

        <div className="flex w-full justify-center flex-col gap-2 items-center">
          {products.map((product, index) => (
            <CategoryCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
