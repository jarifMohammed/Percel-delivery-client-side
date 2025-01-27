
import {
  IconTruckDelivery,
  IconBox,
  IconMap2,
  IconClock,
  IconHelp,
  IconShieldCheck,
  IconCurrencyDollar,
  IconHeart,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Fast and Reliable Delivery",
      description: "We ensure your parcels are delivered quickly and securely, every time.",
      icon: <IconTruckDelivery />,
    },
    {
      title: "Safe Parcel Handling",
      description: "Your items are handled with utmost care from pickup to delivery.",
      icon: <IconBox />,
    },
    {
      title: "Real-Time Tracking",
      description: "Track your deliveries in real time with accurate location updates.",
      icon: <IconMap2 />,
    },
    {
      title: "24/7 Delivery Service",
      description: "We operate round the clock to ensure your logistics needs are met.",
      icon: <IconClock />,
    },
    {
      title: "Dedicated Customer Support",
      description: "Our support team is always ready to assist you with any queries.",
      icon: <IconHelp />,
    },
    {
      title: "Secure Transactions",
      description: "We prioritize the security of your payments and deliveries.",
      icon: <IconShieldCheck />,
    },
    {
      title: "Affordable Pricing",
      description: "Get the best delivery services at competitive rates.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Customer Satisfaction",
      description: "Your satisfaction is our top priority. We go the extra mile for you.",
      icon: <IconHeart />,
    },
  ];

  return (
  
  <div>
    <div className="flex mt-10 mb-5 p-5 justify-center">
    <h5 className="  text-sky-400 text-5xl font-bold">Our Features</h5>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
     
     {features.map((feature, index) => (

       <Feature key={feature.title} {...feature} index={index} />
     ))}
   </div>
  </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={`flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 ${
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800"
      } ${index < 4 && "lg:border-b dark:border-neutral-800"}`}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
