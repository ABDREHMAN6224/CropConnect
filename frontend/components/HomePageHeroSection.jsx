
const HomePageHeroSection = ({isAdmin}) => {
  return (
    <section className={`relative min-h-[93vh] ${isAdmin ? "md:pt-80 pt-72  xl:pt-96":"py-44"} flex items-center justify-center   text-white overflow-hidden section-bg lg:px-44 md:px-32  pb-16 px-8 sm:px-24 sm:pb-32`}>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
       Crop Connect: Navigating the Modern World of Farming
        </h1>
        <p className="text-lg text-gray-100 mb-8 mt-4">
         Welcome to 'Crop Connect,' your digital hub for all things farming! Dive into the fascinating realm of modern agriculture as we explore innovative techniques, sustainable practices, market trends, and expert insights. Whether you're a seasoned farmer, an aspiring agronomist, or simply curious about the food on your plate, join us on a journey of discovery and empowerment in the ever-evolving landscape of farming.
          </p>
        <a href="#resources-section" className="bg-primary-400 text-gray-900 hover:bg-primary-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</a>
      </div>
    </section>
    
    )
}

export default HomePageHeroSection;