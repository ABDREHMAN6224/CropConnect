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
    const searchParams = new URLSearchParams(window.location.search);
    const ourTeam = searchParams.get("our-team");
    const contactUs = searchParams.get("contact-us");
    const feedback = searchParams.get("feedback-section");
    if (ourTeam) {
      const teamSection = document.getElementById("our-team");
      console.log(teamSection)
      teamSection.scrollIntoView({ behavior: "smooth" });
    }
    else if (contactUs) {
      const contactUsSection = document.getElementById("contact-us");
      contactUsSection.scrollIntoView({ behavior: "smooth" });
    }
    else if (feedback) {
      const feedbackSection = document.getElementById("feedback-section");
      feedbackSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [window.location.search]);

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
