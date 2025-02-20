import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

const StickyScroll = ({
  content,
  contentClassName = "",
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "bg-slate-900",
    "bg-black",
    "bg-neutral-900"
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
      ref={ref}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
      css={`
        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="w-full h-48 rounded-lg overflow-hidden"
              >
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg text-3xl text-slate-600 max-w-sm mt-6"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={`hidden lg:block h-60 w-80 rounded-md sticky top-10 overflow-hidden ${contentClassName}`}
      >
        <img 
          src={content[activeCard].contentImage}
          alt={content[activeCard].title}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

// Example usage component
const Demo = () => {
  const content = [
    {
      title: "Register as Delivery Man or User",
      description:
        "Begin Your Journey: Sign up as a customer to send parcels or join our delivery team to be part of our network.",
      contentImage: "https://i.ibb.co.com/ZTPQgVn/6368592.jpg"
    },
    {
      title: "Access Your Profile",
      description:
        "Your Delivery Hub: Click your profile image to access a world of delivery possibilities.",
      contentImage: "https://i.ibb.co.com/zRXJ813/4991615.jpg"
    },
    {
      title: "Explore Dashboard",
      description:
        "Command Center: Navigate to your dashboard to unlock powerful delivery management tools.",
      contentImage: "https://i.ibb.co.com/0QBTkqR/3528492.jpg"
    },
    {
      title: "Send Parcels",
      description:
        "Ready to Ship: Experience seamless parcel booking with just a few clicks.",
      contentImage: "https://i.ibb.co.com/Qn9X8y9/3672341.jpg"
    },
  ];

  return (
    <div className="p-10">
        <div className="flex justify-center">
           <h3 className="text-4xl text-orange-500"> How to Book A Parcel</h3>
        </div>
      <StickyScroll content={content} />
    </div>
  );
};

export default Demo;