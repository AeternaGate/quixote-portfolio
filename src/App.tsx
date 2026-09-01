import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollRose from './components/ScrollRose';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothCursor from './components/SmoothCursor';
import ScrollBlock from './components/ScrollBlock';
import Projects from './pages/Projects';

function MainPage() {
  return (
    <>
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

export default function App() {
  return (
    <BrowserRouter>
      <SmoothCursor />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
