"use client";
import NavBar from "../components/NavBar";
import { useAppSelector } from "./store/hooks";
import {
  HomePageHeroSection,
  ResourcesSection,
  CustomerFeedbacksSection,
  OurTeamSection,
  FooterSection,
  ContactUsSection,
  OurBlogsSection,
  OurEventsSection,
  OurCommunitySection,
  OurMarketplaceSection,
} from "../components";
import AuthWrapper from "./AuthWrapper";
import { useEffect } from "react";
export default function Home() {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role?.toLowerCase() === "admin";
  

  useEffect(() => {
    const scrollToSection = (section) => {
      let tid=setTimeout(() => {
        const sectionElement = document.getElementById(section);
        sectionElement.scrollIntoView({ behavior: "smooth" });
      },100)
    };
    const searchParams = new URLSearchParams(window.location.search);
    const ourTeam = searchParams.get("our-team");
    const contactUs = searchParams.get("contact-us");
    const feedback = searchParams.get("feedback-section");
    if (ourTeam) {
      scrollToSection("our-team");
    }
    else if (contactUs) {
      scrollToSection("contact-us");
    }
    else if (feedback) {
      scrollToSection("feedback-section");
    }
  }, []);

  return (
    <AuthWrapper>
      <NavBar />
      <main className="dark:bg-gray-900 w-full relative">
        <HomePageHeroSection isAdmin={isAdmin} />
        <div className="max-w-screen-2xl mx-auto">
          <ResourcesSection />
          <OurCommunitySection />
          <OurBlogsSection />
          <OurEventsSection />
          <OurMarketplaceSection />
          <CustomerFeedbacksSection />
          <ContactUsSection />
          <OurTeamSection />
          <FooterSection />
        </div>
      </main>
    </AuthWrapper>
  );
}
