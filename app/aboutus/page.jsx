
import TeamBanner from '@/components/AboutUs/TeamBanner'
import RootsProwessSection from '@/components/AboutUs/RootsProwessSection'
import PartnersMarquee from '@/components/Services/PartnersMarquee'
import AboutZData from '@/components/AboutUs/AboutZData'
import PeopleBehindBuild from '@/components/PeopleBehindBuild'
import FutureTogetherStrip from '@/components/AboutUs/FutureTogetherStrip'
import AgileHoverColumns from '@/components/AboutUs/AgileHoverColumns'
import DigitalInnovationCTA from '@/components/DigitalInnovationCTA'
import ReadyToGetStarted from '@/components/ReadyToGetStarted'



function page() {
  return (
    <div>
      <TeamBanner />
      <RootsProwessSection />
      <PartnersMarquee />
      <AboutZData />
      <FutureTogetherStrip />
      <PeopleBehindBuild />
      {/* <DigitalInnovationCTA /> */}
      {/* <AgileHoverColumns /> */}
      <ReadyToGetStarted />


    </div>
  )
}

export default page