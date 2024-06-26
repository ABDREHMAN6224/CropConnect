import { useInView } from "react-intersection-observer";
const HomePageHeroSection = ({isAdmin}) => {

  const { ref:HeadingRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref:SubHeadingRef, inView:subHeadingInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  

  return (
    <section className={`relative min-h-svh  flex items-center justify-center   text-white overflow-hidden section-bg lg:px-44 md:px-32  py-16 px-8 sm:px-24`}>
      <div className={`relative z-10 flex flex-col justify-center items-center h-full text-center ${inView ? "animate-fromBottom" : "opacity-0"}
      `} data-test="main-header"
      ref={HeadingRef}
      >
        <h1 className="text-5xl font-bold leading-tight mb-4">
       Crop Connect: Navigating the Modern World of Farming
        </h1>
        <p className={`text-lg text-gray-100 mb-8 mt-4
        ${subHeadingInView ? "animate-fromBottom" : "opacity-0"}
        `}
        ref={SubHeadingRef}
        >
         Welcome to 'Crop Connect,' your digital hub for all things farming! Dive into the fascinating realm of modern agriculture as we explore innovative techniques, sustainable practices, market trends, and expert insights. Whether you're a seasoned farmer, an aspiring agronomist, or simply curious about the food on your plate, join us on a journey of discovery and empowerment in the ever-evolving landscape of farming.
          </p>
        <a href="#resources-section" className="bg-primary-400 text-gray-900 hover:bg-primary-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        data-test="get-started-button"
        >Get Started</a>
      </div>
    </section>
    
    )
}

export default HomePageHeroSection;