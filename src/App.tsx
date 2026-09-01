import ScrollRose from './components/ScrollRose';
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
      <ScrollRose />
      <div className="veil" />
      <div className="grain" />

      <div className="shell">
        <Nav />
        <Hero />
        <ScrollBlock direction="right">
          <Work />
        </ScrollBlock>
        <ScrollBlock direction="left">
          <About />
        </ScrollBlock>
        <Contact />
        <Footer />
      </div>
    </>
  );
}
