import { useRouter } from 'next/navigation'
import GenralHero from './GenralHero'

const OurEventsSections = () => {
  const router = useRouter()
  return (
    <GenralHero
            title={"Our Events"}
            description={"Discover the latest events and workshops hosted by Crop Connect, where you can learn from industry experts, network with fellow farmers, and stay updated on the latest trends in agriculture. Join us for an enriching experience that will help you grow your knowledge and expand your horizons in the world of farming."}
            image={"/events_1.jpeg"}
            btnText={"View All Events"}
            link={"/events"}
    />
  )
}

export default OurEventsSections


