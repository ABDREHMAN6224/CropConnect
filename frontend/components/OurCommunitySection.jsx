"use client";
import { useRouter } from "next/navigation";
import GenralHero from "./GenralHero";
const OurCommunitySection = () => {
  const router = useRouter()
  return (
  <GenralHero 
    title={"Stay Connected with Our Community"}
    description={"Join our community of farmers, agronomists, and industry experts to share knowledge, ask questions, and stay updated on the latest trends in agriculture. Whether you're a novice or a seasoned professional, our community is a welcoming space for all who are passionate about farming and food production."}
    image={"/success.jpeg"}
    btnText={"Visit Community"}
    link={"/community"}
  />
  )
}

export default OurCommunitySection
