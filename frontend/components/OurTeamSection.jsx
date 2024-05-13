import { useInView } from "react-intersection-observer"


const OurTeamSection = () => {
  const { ref:heading, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref:team1, inView:inView1 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref:team2, inView:inView2 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const {ref:subHeading, inView:inView3} = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });


  return (
    <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center" id="our-team">
    <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center flex-wrap">
    <div className="flex flex-col text-center w-full mb-20">
          <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-4 text-primary-900
          dark:text-primary-500
          ${inView ? "animate-fromBottom" : "opacity-0"}
          `}
          ref={heading}
          >Our Team</h1>
          <p className={`lg:w-2/3 mx-auto leading-relaxed text-base
          dark:text-gray-400
          ${inView3 ? "animate-fromBottom" : "opacity-0"}
          `}
          ref={subHeading}
          >
            Meet the talented individuals behind Crop Connect, who are passionate about agriculture and technology. Our diverse team of developers, designers, and content creators is dedicated to providing you with the latest insights and innovations in the world of farming.
            </p>
        </div>
        <div className="flex w-full items-center justify-center gap-12 flex-wrap -m-2">
          <div className={`p-2 lg:w-1/3 md:w-1/2 w-full
          ${inView1 ? "animate-fromLeft" : "opacity-0"}
            `}
          ref={team1}
          >
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/arehman.jpeg"/>
              <div className="flex-grow">
                <h2 className="text-gray-900 dark:text-green-500 title-font font-medium">Abdul Rehman Memon</h2>
                <p className="text-gray-400">Full Stack Developer</p>
              </div>
            </div>
          </div>
          <div className={`p-2 lg:w-1/3 md:w-1/2 w-full
          ${inView2 ? "animate-fromRight" : "opacity-0"}
          `}
          ref={team2}
          >
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/arehman.jpeg"/>
              <div className="flex-grow">
                <h2 className="text-gray-900 dark:text-green-500 title-font font-medium">Faakhir Ul hasan Zahid</h2>
                <p className="text-gray-400">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
  )
}

export default OurTeamSection
