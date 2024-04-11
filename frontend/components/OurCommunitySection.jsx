"use client";
import { useRouter } from "next/navigation";

const OurCommunitySection = () => {
  const router = useRouter()
  return (

    <section className="text-gray-600 body-font px-8 lg:px-16 w-full  flex justify-center">
    <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900"
            style={{
                lineHeight: "1.3"
            }}
        >
            Stay Connected with Our Community
          <br className="hidden lg:inline-block"/>
        </h1>
        <p className="mb-8 leading-relaxed text-md">
          Join our community of farmers, agronomists, and industry experts to share knowledge, ask questions, and stay updated on the latest trends in agriculture. Whether you're a novice or a seasoned professional, our community is a welcoming space for all who are passionate about farming and food production.
        </p>
        <div className="flex justify-center">
          <button className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
            onClick={() => router.push('/community')}
          >Visit Community</button>
          </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={"/success.jpeg"}/>
      </div>
    </div>
  </section>
  )
}

export default OurCommunitySection
