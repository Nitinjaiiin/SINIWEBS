import { Providers } from "@/components/Providers";
import SceneCanvas from "@/components/3d/SceneCanvas";
import { BackgroundVideo } from "@/components/3d/BackgroundVideo";
import { BackgroundOverlay } from "@/components/3d/BackgroundOverlay";
import { PageEntrance } from "@/components/PageEntrance";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Packages } from "@/components/sections/Packages";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Snapshot } from "@/components/sections/Snapshot";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Providers>
      <BackgroundVideo />
      <SceneCanvas />
      <BackgroundOverlay />
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <PageEntrance />
        <Work />
        <Packages />
        <Services />
        <About />
        <Snapshot />
        <Process />
        <Contact />
      </main>
    </Providers>
  );
}
