// Stay Informed and Inspired with Our Latest Blogs
// images = crop_6.jpeg

import GenralHero from "./GenralHero"

// Stay informed and inspired with our latest blogs, where users share industry insights, farming tips, and stories from the field to help you grow and succeed in agriculture.   
const OurBlogsSection = () => {
    // page is overview of blogs and helps user to navigate to  "/blogs"
  return (
  <GenralHero
            title={"Stay Informed and Inspired with Our Latest Blogs"}
            description={"Stay informed and inspired with our latest blogs, where users share industry insights, farming tips, and stories from the field to help you grow and succeed in agriculture."}
            image={"/blogs.jpeg"}
            direction={"reverse"}
            btnText={"Read More"}
            link={"/blogs"}
  />
  )
}

export default OurBlogsSection
