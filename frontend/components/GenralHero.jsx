"use client";
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer';
const GenralHero = (
    {title, description, image,direction,btnText,link}
) => {
    const router = useRouter()

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

    <section className="text-gray-600 body-font px-8 lg:px-16 w-full  flex justify-center">
    <div className={`w-full mx-auto flex  py-24 ${direction=="reverse"?"md:flex-row-reverse":"md:flex-row"} flex-col items-center`}>
      <div className={`lg:flex-grow md:w-1/2 ${direction=="reverse"?"lg:pl-24 md:pl-16":"lg:pr-24 md:pr-16"} flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center`}>
        <h1 className={`title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900 dark:text-primary-500
        ${inView ? "animate-fromBottom" : "opacity-0"}`}
            style={{
                lineHeight: "1.3"
            }}
            ref={headingRef}
        >
            {title}
          <br className="hidden lg:inline-block"/>
        </h1>
        <p className={`mb-8 leading-relaxed text-md dark:text-gray-400
        ${subHeadingInView ? "animate-fromBottom" : "opacity-0"}`}
        ref={subHeadingRef}>
            {description}
        </p>
        <div className="flex justify-center">
          <button className={`inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg dark:bg-primary-700
          ${buttonInView ? "animate-fromBottom" : "opacity-0"}`}
          ref={buttonRef}
            onClick={() => router.push(link)}
          >
                {btnText}
          </button>
          </div>
      </div>
      <div className={`lg:max-w-lg lg:w-full md:w-1/2 w-5/6
      ${galleryInView ? "animate-fromBottom" : "opacity-0"}`}
      ref={galleryRef}
      >
        <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={image}/>
      </div>
    </div>
  </section>
  )
}

export default GenralHero
