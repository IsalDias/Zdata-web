import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import ParallaxProviders from "../components/ParallaxProviders";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZDataI",
  description:
    "Your trusted partner in AI FinTech innovation, delivering intelligent IT solutions for the banking and finance industry. Explore our services and products built for growth and success.",

  // ✅ Open Graph (Facebook/LinkedIn/WhatsApp)
  openGraph: {
    title: "ZDataI",
    description:
      "Your trusted partner in AI FinTech innovation, delivering intelligent IT solutions for the banking and finance industry. Explore our services and products built for growth and success.",
    url: "https://www.zdatai.com/",
    siteName: "ZDataI",
    type: "website",
    images: [
      {
        url: "https://www.zdatai.com/og/og-image.png", // ✅ replace with your real OG image path
        width: 1200,
        height: 630,
        alt: "ZDataI - AI FinTech Innovation",
      },
    ],
  },

  // ✅ Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "ZDataI",
    description:
      "Your trusted partner in AI FinTech innovation, delivering intelligent IT solutions for the banking and finance industry. Explore our services and products built for growth and success.",
    images: ["https://www.zdatai.com/og/og-image.png"], // ✅ same image
  },

  // ✅ Optional: helps with canonical + SEO
  metadataBase: new URL("https://www.zdatai.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#4D82C3"
          height={3}
          showSpinner={false}
          speed={200}
          easing="ease"
        />

        <ParallaxProviders>
          <NavBar />
          {children}
        </ParallaxProviders>
      </body>
    </html>
  );
}
