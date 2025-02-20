
import { FeaturesSection } from "@/Components/Shared/FeaturesSection";
import Demo from "@/Components/Shared/Scroll";
import Stats from "@/Components/Shared/Stats";



import Hero from "@/ui/Hero";





const Home = () => {
  return (
    <div className="p-4">
     
    <Hero></Hero>
   <div className=" mb-10 lg:ml-[400px] mx-auto  text-center">
   <Stats></Stats>
   </div>
  <div  className="p-5 " >
  <Demo></Demo>
  </div>
  <FeaturesSection></FeaturesSection>
  
    </div>
  );
};

export default Home;
