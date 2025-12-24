
import Products_Hero from '@/components/Products/Products_Hero'
import FintechIntro from '@/components/Products/FintechIntro.jsx'
import FinverusFeatures from '@/components/Products/FinverusFeatures.jsx'
import DividerIcon from '@/components/DividerIcon.jsx'
import LatestFromFinverus from '@/components/LatestFromFinverus.jsx'
import StatementBar from '@/components/Products/StatementBar.jsx'
import SuccessShowcase from '../../components/Products/SuccessShowcase'
import GetStartedBanner from '@/components/GetStartedBanner.jsx'
import ProductModules from '@/components/Products/ProductModules.jsx'
import AiEnabledBanner from '@/components/Products/AiEnabledBanner.jsx'
import PartnersMarquee from '@/components/Services/PartnersMarquee.jsx'
import ReadyToGetStarted from '@/components/ReadyToGetStarted'
import Footer from '@/components/Footer'

function page() {
  return (
    <div>
      <Products_Hero />
      <FintechIntro />
      <FinverusFeatures />
      <>
      <div className="my-2 md:my-1 lg:my-15" />
      </>
      <DividerIcon />
      <LatestFromFinverus />
      <StatementBar />
      <SuccessShowcase />
      <GetStartedBanner />
      <ProductModules />  
      <AiEnabledBanner />
      <PartnersMarquee />
      <ReadyToGetStarted />
      <Footer />

    </div>
  )
}

export default page