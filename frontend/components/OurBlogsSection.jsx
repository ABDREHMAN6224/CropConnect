import { useRouter } from 'next/navigation';
// Stay Informed and Inspired with Our Latest Blogs
// images = crop_6.jpeg

// Stay informed and inspired with our latest blogs, where users share industry insights, farming tips, and stories from the field to help you grow and succeed in agriculture.   
const OurBlogsSection = () => {
    const router = useRouter();
    // page is overview of blogs and helps user to navigate to  "/blogs"
  return (
    <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
    <div className="w-full mx-auto flex  py-24  md:flex-row-reverse flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900"
            style={{
                lineHeight: "1.3"
            }}
        >
        Stay Informed and Inspired with Our Latest Blogs
          <br className="hidden lg:inline-block"/>
        </h1>
        <p className="mb-8 leading-relaxed text-md">
        Stay informed and inspired with our latest blogs, where users share industry insights, farming tips, and stories from the field to help you grow and succeed in agriculture.
        </p>
        <div className="flex justify-center">
          <button className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
            onClick={() => router.push('/blogs')}
          >Read More</button>
          </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={"/blogs.jpeg"}/>
      </div>
    </div>
  </section>
  )
}

export default OurBlogsSection