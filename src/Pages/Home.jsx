
import { FeaturesSection } from "@/Components/Shared/FeaturesSection";
import Stats from "@/Components/Shared/Stats";



import Hero from "@/ui/Hero";





const Home = () => {
  return (
    <div className="p-4">
     
    <Hero></Hero>
   <div className="  mx-auto  text-center">
   <Stats></Stats>
   </div>
  <FeaturesSection></FeaturesSection>
  
    </div>
  );
};

export default Home;
