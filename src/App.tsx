import ScrollRose from './components/ScrollRose';
import SilkBackground from './components/SilkBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothCursor from './components/SmoothCursor';

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
        <Work />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
