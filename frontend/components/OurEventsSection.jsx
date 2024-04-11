import { useRouter } from 'next/navigation'

const OurEventsSections = () => {
  const router = useRouter()
  return (

    <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
    <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900">
          Our Events
        </h1>  
        <p className="mb-8 leading-relaxed text-md">
          Discover the latest events and workshops hosted by Crop Connect, where you can learn from industry experts, network with fellow farmers, and stay updated on the latest trends in agriculture. Join us for an enriching experience that will help you grow your knowledge and expand your horizons in the world of farming.
        </p>

        <div className="flex justify-center">
          <button className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
            onClick={() => router.push('/events')}
          >
            View All Events
          </button>
        </div>



      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        
        <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={"/events_1.jpeg"}/>
      </div>


      </div>
    </section>
  )
}

export default OurEventsSections


