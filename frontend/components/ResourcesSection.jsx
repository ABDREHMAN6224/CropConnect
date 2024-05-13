import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer';
const ResourcesSection = () => {
  const router = useRouter();
  const {ref:headingRef, inView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const {ref:subHeadingRef, inView:subHeadingInView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const {ref:galleryRef, inView:galleryInView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const {ref:buttonRef, inView:buttonInView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center" id="resources-section">
          <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center flex-wrap">
            <div className="flex w-full mb-20 flex-wrap">
           <h1 className={`sm:text-3xl text-2xl font-medium title-font text-primary-900 lg:w-1/3 lg:mb-0 mb-4 dark:text-primary-500
            ${inView ? "animate-fromBottom" : "opacity-0"}
           `
           }
            ref={headingRef}
           >Resources</h1>
           <p className={`lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base dark:text-gray-400
            ${subHeadingInView ? "animate-fromBottom" : "opacity-0"}`}
            ref={subHeadingRef}
           >
           Explore our Resources Section to access a treasure trove of farming insights and tools. From expert guides to handy resources, stay updated and empowered in your agricultural journey. Dive in now!           </p>
         </div>
         <div className={`flex flex-wrap md:-m-2 -m-1
          ${galleryInView ? "animate-fromBottom" : "opacity-0"}`}
          ref={galleryRef}
         >
           <div className="flex flex-wrap w-1/2">
             <div className="md:p-2 p-1 w-1/2">
               <img alt="gallery" className="w-full object-cover h-full object-center block" src="/crop_8.jpeg"/>
             </div>
             <div className="md:p-2 p-1 w-1/2">
               <img alt="gallery" className="w-full object-cover h-full object-center block" src="/crop_7.jpeg"/>
             </div>
             <div className="md:p-2 p-1 w-full">
               <img alt="gallery" className="w-full h-full object-cover object-center block" src="/crop_6.jpeg"/>
             </div>
           </div>
           <div className="flex flex-wrap w-1/2">
             <div className="md:p-2 p-1 w-full">
               <img alt="gallery" className="w-full h-full object-cover object-center block" src="/crop_5.jpeg"/>
             </div>
             <div className="md:p-2 p-1 w-1/2">
               <img alt="gallery" className="w-full object-cover h-full object-center block" src="/crop_4.jpeg"/>
             </div>
             <div className="md:p-2 p-1 w-1/2">
               <img alt="gallery" className="w-full object-cover h-full object-center block" src="/crop_2.jpeg"/>
             </div>
           </div>
         </div>
         <button className={`inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg mx-auto mt-8 dark:bg-primary-700
           ${buttonInView ? "animate-fromBottom" : "opacity-0"}`}
              onClick={() => router.push('/resources')}
              ref={buttonRef}
            >See Resources</button>
          </div>

    </section>
  )
}

export default ResourcesSection

