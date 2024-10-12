import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { About } from "./About";
import { Categories } from "./Categories";
import { Hero } from "./Hero";
import { useContext, useEffect } from "react";
import { UtilContext } from "../../context";
import Store from "../store/Store";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Kenzie Edgar",
      img: "https://i.pravatar.cc/100?img=1",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor exercitationem minima quas itaque saepe quasi architecto vel! Accusantium, vero sint recusandae cum tempora nemo commodi soluta deleniti.",
    },
    {
      name: "Stevie Tifft",
      img: "https://i.pravatar.cc/100?img=2",
      quote:
        "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente, est, dignissimos ullam error ipsam sint quam tempora vel.",
    },
    {
      name: "Tommie Ewart",
      img: "https://i.pravatar.cc/100?img=3",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, obcaecati ullam excepturi dicta error deleniti sequi.",
    },
    {
      name: "Charlie Howse",
      img: "https://i.pravatar.cc/100?img=4",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore voluptatum nostrum atque, corrupti, vitae esse id accusamus dignissimos neque reprehenderit natus, hic sequi itaque dicta nisi voluptatem! Culpa, iusto.",
    },
    {
      name: "Nevada Herbertson",
      img: "https://i.pravatar.cc/100?img=5",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, voluptatem porro obcaecati dicta, quibusdam sunt ipsum, laboriosam nostrum facere exercitationem pariatur deserunt tempora molestiae assumenda nesciunt alias eius? Illo, autem!",
    },
    {
      name: "Kris Stanton",
      img: "https://i.pravatar.cc/100?img=6",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iusto, explicabo, cupiditate quas totam!",
    },
  ];

  const fadeInVariant = (direction = "up") => ({
    hidden: {
      opacity: 0,
      y: direction === "down" ? -50 : 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  });

  const [testRef, testInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="min-w-screen min-h-screen bg-transparent flex items-center justify-center py-5">
      <div className="w-full bg-transparent border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
              What people <br /> are saying.
            </h1>
            <h3 className="text-xl mb-5 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-clayBrown ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-clayBrown ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-clayBrown"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-clayBrown ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-clayBrown ml-1"></span>
            </div>
          </div>
          <motion.div
            ref={testRef}
            initial="hidden"
            animate={testInView ? "visible" : "hidden"}
            className="-mx-3 md:flex flex-wrap items-start"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                className="px-3 md:w-1/3"
                key={index}
                variants={fadeInVariant("up")}
              >
                <div className="w-full mx-auto rounded-lg bg-sandyBeige border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={testimonial.img} alt={testimonial.name} />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        {testimonial.name}
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      {testimonial.quote}
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const fadeInVariant = (direction) => ({
  hidden: { opacity: 0, y: direction === "down" ? -50 : 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
});

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [storeRef, storeInView] = useInView({ triggerOnce: true });
  const [testRef, testInView] = useInView({ triggerOnce: true });

  const { set } = useContext(UtilContext);

  useEffect(() => {
    set([
      { label: "Home", id: "hero", type: "scroll" },
      { label: "Our Products", id: "categories", type: "scroll" },
      { label: "Store", id: "store", type: "scroll" },
      { label: "About Us", id: "about", type: "scroll" },
      { label: "Testimonials", id: "test", type: "scroll" },
      { label: "Contact Us", id: "footer", type: "scroll" },
    ]);
  }, [set]);

  return (
    <div className="min-h-screen">
      <motion.div
        id="hero"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInVariant("up")}
      >
        <Hero heroInView={heroInView} />
      </motion.div>

      <motion.div
        id="about"
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={fadeInVariant("up")}
      >
        <About />
      </motion.div>

      <motion.div
        id="categories"
        ref={categoriesRef}
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
        variants={fadeInVariant("down")}
      >
        <Categories />
      </motion.div>

      <motion.div
        id="store"
        ref={storeRef}
        initial="hidden"
        animate={storeInView ? "visible" : "hidden"}
        variants={fadeInVariant("up")}
      >
        <Store />
      </motion.div>

      <motion.div
        id="test"
        ref={testRef}
        initial="hidden"
        animate={testInView ? "visible" : "hidden"}
        variants={fadeInVariant("up")}
      >
        <Testimonials />
      </motion.div>
    </div>
  );
};

export default Home;
