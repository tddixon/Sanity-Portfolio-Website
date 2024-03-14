'use client'

import {
  motion,
  MotionValue,
  stagger,
  useAnimate,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [isMobile ? "start start" : 'start -40%', "end start"],
  });



  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };


  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? 1000 : 700]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -1000 : -700]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isMobile ? [-700, 500] : [-800, 500]),
    springConfig
  );
  const zIndex = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 10]),
    springConfig
  );



  return (
    <div
      ref={ref}
      className="h-[300lvh] md:h-[420dvh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header text={"Next Level Development"} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          zIndex
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};


const Header = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement | any>(null);
  const [scope, animate] = useAnimate()
  const inView = useInView(textRef)



  useEffect(() => {

    const chars = document.querySelectorAll('.char')
    const line = document.querySelector('.headingline') as HTMLHRElement



    if (typeof window !== 'undefined') {
      import('splitting').then((Splitting) => {

        Splitting.default({ target: textRef.current, by: 'chars' })
      });
    }



    if (inView) {
      animate('.word', {
        display: "inline-block",
        overflow: "hidden",
      })
      animate(chars, {
        display: "inline-block",
        opacity: [0, 0.5, 1],
        y: ["100%", "0%"],
      }, {
        duration: .8,
        delay: stagger(.025),
        ease: 'easeInOut'

      })
      animate(line, {
        scaleX: [0, 1],
      }, {
        duration: 1.2
      })
    }



  }, [animate, inView, textRef])


  return (
    <div ref={scope} className="max-w-6xl z-10 relative mx-auto py-20 md:py-40 px-4  w-full ">
      <div className=" relative flex">
        <motion.span
          ref={textRef}
          className="text relative leading-1 mx-auto text-5xl inline-block overflow-hidden xl:text-9xl leading-1 ">
          {text}
        </motion.span>
        <hr className='headingline origin-right  absolute border w-[50px] xl:w-[150px] border-primary right-5 bottom-[25%] mx-auto' />
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isMobile,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  isMobile: boolean;
}) => {
  if (!product) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: isMobile ? -10 : -20, // Adjust hover effect based on device type
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

