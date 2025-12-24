import React from 'react'
import ServicesHero from '@/components/Services/ServicesHero'
import ServicesCards from '@/components/Services/ServicesCards'
import OurApproach from '../../components/Services/OurApproach'
import ReadyToGetStarted from '@/components/ReadyToGetStarted'
import ExpertiseList from '@/components/Services/ExpertiseList'
import PartnersMarquee from '@/components/Services/PartnersMarquee'
import Footer from '@/components/Footer'

function page() {
  return (
    <div>
      <ServicesHero />
      <ServicesCards/>
      <OurApproach />
      <ExpertiseList />
            {/* <hr className=" border-slate-300" /> */}
            <PartnersMarquee/>

      <ReadyToGetStarted />
      <Footer />


    </div>
  )
}

export default page
