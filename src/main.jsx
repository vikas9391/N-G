import React, { useEffect, useRef, useState, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, Stars } from "@react-three/drei";
import gsap from "gsap";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Music2, VolumeX, Heart, Menu, X, Flower2, Sparkles as SparkleIcon } from "lucide-react";
import * as THREE from "three";
import "./styles.css";

const DETAILS = {
  engagement: {
    date: "[ADD ENGAGEMENT DATE]",
    time: "[ADD ENGAGEMENT TIME]",
    venue: "[ADD ENGAGEMENT VENUE]",
    address: "[ADD ENGAGEMENT ADDRESS]"
  },
  wedding: {
    date: "[ADD WEDDING DATE]",
    time: "[ADD WEDDING TIME / MUHURTHAM]",
    venue: "[ADD WEDDING VENUE]",
    address: "[ADD WEDDING ADDRESS]"
  }
};

function PalaceArch() {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(state.clock.elapsedTime * .18) * .045, 2, delta);
      group.current.position.y = Math.sin(state.clock.elapsedTime * .4) * .06;
    }
  });
  return <group ref={group} position={[0, -.25, 0]}>
    <mesh position={[0, 0, -1.4]}>
      <boxGeometry args={[5.7, 7.5, .2]} />
      <meshStandardMaterial color="#391b1a" metalness={.25} roughness={.72} />
    </mesh>
    {[ -2.55, 2.55 ].map((x) => <group key={x} position={[x, 0, -.45]}>
      <mesh position={[0, 0, 0]}><boxGeometry args={[.38, 6.4, .42]} /><meshStandardMaterial color="#c59a50" metalness={.72} roughness={.3} /></mesh>
      {[ -2.8, -2.35, -1.9, 1.9, 2.35, 2.8 ].map((y, i) => <mesh key={i} position={[0, y, .02]}><boxGeometry args={[.58, .09, .52]} /><meshStandardMaterial color={i % 2 ? "#e7c879" : "#8c5928"} metalness={.6} roughness={.35} /></mesh>)}
      <mesh position={[0, 3.2, 0]}><boxGeometry args={[.7, .18, .62]} /><meshStandardMaterial color="#e4c174" metalness={.65} /></mesh>
      <mesh position={[0, -3.2, 0]}><boxGeometry args={[.7, .18, .62]} /><meshStandardMaterial color="#e4c174" metalness={.65} /></mesh>
    </group>)}
    <mesh position={[0, 3.05, -.3]}><torusGeometry args={[2.48, .14, 16, 100, Math.PI]} /><meshStandardMaterial color="#e2bd6e" metalness={.75} roughness={.27} /></mesh>
    <mesh position={[0, 2.85, -.31]}><torusGeometry args={[2.24, .055, 12, 100, Math.PI]} /><meshStandardMaterial color="#f3d9a0" metalness={.7} roughness={.3} /></mesh>
    <mesh position={[0, -3.15, -.2]}><boxGeometry args={[5.5, .18, .4]} /><meshStandardMaterial color="#d3a85e" metalness={.65} /></mesh>
    <mesh position={[0, 0, -.35]}><planeGeometry args={[4.6, 5.8]} /><meshStandardMaterial color="#24100f" roughness={.9} /></mesh>
  </group>;
}
function Scene() {
  return <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 1.5]}>
    <color attach="background" args={["#170b0b"]} />
    <fog attach="fog" args={["#170b0b", 8, 20]} />
    <ambientLight intensity={1.2} />
    <pointLight position={[0, 3, 5]} intensity={35} color="#ffdfa0" />
    <pointLight position={[-4, 0, 2]} intensity={14} color="#b44b37" />
    <pointLight position={[4, -1, 2]} intensity={12} color="#e9bc66" />
    <Suspense fallback={null}>
      <Float speed={1.1} rotationIntensity={.025} floatIntensity={.15}>
        <PalaceArch />
      </Float>
      <Sparkles count={115} scale={[10, 8, 4]} size={2.2} speed={.24} color="#f3d28d" />
      <Stars radius={35} depth={12} count={400} factor={2} saturation={.2} fade speed={.25} />
      <Environment preset="night" />
    </Suspense>
  </Canvas>;
}
function Header({ page, setPage, telugu, setTelugu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <header className="topbar">
    <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>
      <span className="brand-mark">N<span>&</span>G</span><span className="brand-copy">A ROYAL CELEBRATION<small>శుభమస్తు</small></span>
    </a>
    <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    <nav className={menuOpen ? "nav open" : "nav"}>
      <button className={page === "home" ? "nav-link active" : "nav-link"} onClick={() => go("home")}>Welcome</button>
      <button className={page === "engagement" ? "nav-link active" : "nav-link"} onClick={() => go("engagement")}>Engagement</button>
      <button className={page === "wedding" ? "nav-link active" : "nav-link"} onClick={() => go("wedding")}>Wedding</button>
      <button className="language-btn" onClick={() => setTelugu(!telugu)}>{telugu ? "తెలుగు" : "EN / తెలుగు"}</button>
    </nav>
  </header>;
}
function EventPage({ type, telugu, onBack, onNext }) {
  const data = DETAILS[type];
  const isWedding = type === "wedding";
  return <main className="event-page page-enter">
    <div className="event-ornament top-ornament">✦　❦　✦</div>
    <div className="eyebrow">{telugu ? (isWedding ? "మంగళ వివాహ ఆహ్వానం" : "నిశ్చితార్థ ఆహ్వానం") : (isWedding ? "THE WEDDING INVITATION" : "THE ENGAGEMENT INVITATION")}</div>
    <h1 className="event-title">{isWedding ? "The Wedding" : "The Engagement"}</h1>
    <p className="telugu-line">{telugu ? "శ్రీ గణేశాయ నమః" : "|| Shree Ganeshaya Namah ||"}</p>
    <div className="names names-event"><span>Goutham</span><i>&</i><span>Nikitha</span></div>
    <p className="invite-copy">{telugu
      ? "మా జీవితంలోని ఈ శుభ సందర్భంలో మీ ఆశీస్సులు, సాన్నిధ్యం కోరుకుంటున్నాము."
      : "With the blessings of our families, we request the pleasure of your gracious presence as we celebrate a beautiful new beginning."}</p>
    <div className="event-details">
      <div className="detail"><CalendarDays /><div><small>{telugu ? "తేదీ" : "DATE"}</small><strong>{data.date}</strong></div></div>
      <div className="detail"><Clock3 /><div><small>{isWedding ? "TIME / MUHURTHAM" : "TIME"}</small><strong>{data.time}</strong></div></div>
      <div className="detail"><MapPin /><div><small>{telugu ? "వేదిక" : "VENUE"}</small><strong>{data.venue}</strong><span>{data.address}</span></div></div>
    </div>
    <p className="placeholder-note">Replace the bracketed fields with your confirmed event details.</p>
    <div className="event-actions">
      <button className="outline-btn" onClick={onBack}><ArrowLeft size={16}/> Welcome</button>
      <button className="gold-btn" onClick={onNext}>{isWedding ? "Back to Engagement" : "View Wedding"} <ArrowRight size={16}/></button>
    </div>
    <div className="event-ornament">❦ ✦ ❦</div>
  </main>;
}
function App() {
  const [page, setPage] = useState("home");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [telugu, setTelugu] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const heroRef = useRef(null);
  useEffect(() => {
    if (page === "home" && heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll(".hero-reveal"), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .12, ease: "power3.out", delay: .15 });
    }
    if (page !== "home") gsap.fromTo(".page-enter", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: "power2.out" });
  }, [page]);
  const toggleMusic = () => {
    // Browser autoplay policies require a user gesture; the button is an opt-in music placeholder.
    setMusicOn(!musicOn);
  };
  const trackPointer = (event) => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setPointer({
        x: (event.clientX / window.innerWidth - .5) * 2,
        y: (event.clientY / window.innerHeight - .5) * 2
      });
    }
  };
  return <div className="site-shell" id="home" onPointerMove={trackPointer}
    style={{ "--pointer-x": `${pointer.x * 9}px`, "--pointer-y": `${pointer.y * 7}px` }}>
    <div className="scene-wrap" aria-hidden="true"><Scene /></div>
    <div className="ambient-glow glow-one" aria-hidden="true" />
    <div className="ambient-glow glow-two" aria-hidden="true" />
    <div className="grain" aria-hidden="true" />
    <div className="floating-petals" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => <span key={i} style={{ "--i": i, "--delay": `${i * -1.7}s`, "--left": `${(i * 29 + 7) % 100}%` }}>✦</span>)}
    </div>
    <Header page={page} setPage={setPage} telugu={telugu} setTelugu={setTelugu} />
    {page === "home" ? <main className="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-reveal top-blessing">{telugu ? "శ్రీ గణేశాయ నమః" : "|| SHREE GANESHAYA NAMAH ||"}</div>
        <div className="hero-reveal crest"><span>✦</span><Flower2 size={19}/><span>✦</span></div>
        <div className="hero-reveal halo-ornament" aria-hidden="true"><span /><span /><span /></div>
        <p className="hero-reveal eyebrow">{telugu ? "ఒక అందమైన ఆరంభానికి ఆహ్వానం" : "A ROYAL INVITATION TO CELEBRATE"}</p>
        <h1 className="hero-reveal names"><span className="name-top">Goutham</span><i className="name-amp">&</i><span className="name-bottom">Nikitha</span></h1>
        <p className="hero-reveal Telugu-title">{telugu ? "నిఖిత & గౌతమ్" : "నిఖిత  &  గౌతమ్"}</p>
        <p className="hero-reveal hero-description">{telugu
          ? "ప్రేమ, సంప్రదాయం, కుటుంబ ఆశీస్సులతో మా జీవితాల్లోని ప్రత్యేక క్షణాలను మీతో పంచుకోవాలని ఆహ్వానిస్తున్నాము."
          : "Two hearts, two families, one beautiful beginning. Join us as we celebrate the promise of forever."}</p>
        <div className="hero-reveal hero-buttons">
          <button className="gold-btn" onClick={() => setPage("engagement")}>Explore the Invitation <ArrowRight size={17}/></button>
          <button className="text-btn" onClick={() => setShowStory(!showStory)}>{showStory ? "Close our story" : "A note from our families"} <ArrowDown size={15}/></button>
        </div>
        {showStory && <div className="family-note page-enter">
          <Heart size={17}/><p>{telugu ? "కుటుంబ సభ్యుల ఆశీస్సులతో, మీ సాన్నిధ్యం మా ఆనందాన్ని మరింత ప్రత్యేకం చేస్తుంది." : "With the love and blessings of our families, your presence will make these cherished moments even more special."}</p>
        </div>}
        <div className="hero-reveal scroll-cue"><span className="scroll-cue-line" /><span>SCROLL TO DISCOVER</span><span className="scroll-cue-line" /></div>
        <div className="hero-reveal event-shortcuts">
          <button onClick={() => setPage("engagement")}><span className="shortcut-icon">01</span><span><small>CELEBRATION ONE</small><strong>Engagement</strong></span><ArrowRight size={17}/></button>
          <span className="shortcut-divider"/>
          <button onClick={() => setPage("wedding")}><span className="shortcut-icon">02</span><span><small>CELEBRATION TWO</small><strong>Wedding</strong></span><ArrowRight size={17}/></button>
        </div>
      </div>
      <div className="hero-caption"><span>EST. WITH LOVE</span><span className="caption-line"/><span>FOREVER BEGINS HERE</span></div>
    </main> : <EventPage type={page} telugu={telugu} onBack={() => setPage("home")} onNext={() => setPage(page === "engagement" ? "wedding" : "engagement")} />}
    <footer className="footer">
      <span>MADE WITH <Heart size={11} fill="currentColor"/> FOR GOUTHAM & NIKITHA</span>
      <button className="music-btn" onClick={toggleMusic}>{musicOn ? <VolumeX size={14}/> : <Music2 size={14}/>} {musicOn ? "Music off" : "Music (optional)"}</button>
    </footer>
  </div>;
}
createRoot(document.getElementById("root")).render(<App />);
