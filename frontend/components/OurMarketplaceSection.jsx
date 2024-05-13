import GenralHero from "./GenralHero"

const OurMarketplaceSection = () => {
  return (
  <GenralHero
            title={"Visit Our Marketplace"}
            description={"Visit our marketplace to buy and sell agricultural products, equipment, and services."}
            image={"/market.jpeg"}
            direction={"reverse"}
            btnText={"Maketplace"}
            link={"/marketplace"}
  />
  )
}

export default OurMarketplaceSection
