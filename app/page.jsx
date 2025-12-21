import HeroBanner from "../components/HeroBanner";
import Grid1 from "../components/Grid1";
import Figures from "../components/Figures";
import WhoWeAre from "../components/WhoWeAre";
import Truster from "../components/Truster";
import DigitalInnovationCTA from "../components/DigitalInnovationCTA";
import WhatWeDo from "../components/WhatWeDo";
import FinverusIntro from "../components/FinverusIntro";
import DividerIcon from "../components/DividerIcon";
import LatestFromFinverus from "../components/LatestFromFinverus";
import GetStartedBanner from "../components/GetStartedBanner";
import ReadyToGetStarted from "../components/ReadyToGetStarted";
import PeopleBehindBuild from "../components/PeopleBehindBuild";
import Testimonials from "../components/Testimonials";
import SuccessShowcase from "../components/Products/SuccessShowcase";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Grid1 />
      <Figures />
      <WhoWeAre />
      <Truster />
      <DigitalInnovationCTA />
      <WhatWeDo />
      <FinverusIntro />
      <DividerIcon />
      <LatestFromFinverus />
      <SuccessShowcase />
      <GetStartedBanner />
      <PeopleBehindBuild />
      <Testimonials />
      <ReadyToGetStarted />

    </>
  );
}
