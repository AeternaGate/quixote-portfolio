import ScrollRose from './components/ScrollRose';
import SilkBackground from './components/SilkBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothCursor from './components/SmoothCursor';
import ScrollBlock from './components/ScrollBlock';

export default function App() {
  return (
    <>
      <SmoothCursor />
      <SilkBackground />
      <ScrollRose />
      <div className="veil" />
      <div className="grain" />

      <div className="shell">
        <Nav />
        <Hero />
        <ScrollBlock direction="left">
          <Work />
        </ScrollBlock>
        <ScrollBlock direction="right">
          <About />
        </ScrollBlock>
        <ScrollBlock direction="left" isLast>
          <Contact />
        </ScrollBlock>
        <Footer />
      </div>
    </>
  );
}
