<motion.div
  ref={featuredRef}
  initial="hidden"
  animate={featuredInView ? "visible" : "hidden"}
  variants={fadeInVariant("down")}
>
  <Featured />
</motion.div>;
