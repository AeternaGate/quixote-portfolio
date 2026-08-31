import ScrollRose from './components/ScrollRose';
import SilkBackground from './components/SilkBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
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
