import { useState, useEffect, useRef } from "react";
import { Calendar, Users, MapPin, Mail, Phone, Trophy, Github, Instagram, MessageSquare, Sparkles, Clock, CheckCircle2, XCircle, HelpCircle, Rocket, Book, Code, Target, Computer, Laptop2, GraduationCap, Facebook, Twitter, Linkedin, Menu, X, Award, Medal, Puzzle, Shield, Terminal, GitBranch, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logos from "./Logos";
import { useNavigate } from 'react-router-dom';

const EncryptedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [iteration, setIteration] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const intersectionRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&*<>[]{}!?/\\|+=";


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIteration(0);
          setShouldAnimate(true);
        }
      });
    });

    observer.observe(intersectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      setIteration(0);
      setShouldAnimate(true);
    };

    if (isVisible && shouldAnimate) {
      interval = setInterval(() => {
        setIteration((prev) => {
          if (prev >= text.length) {
            setShouldAnimate(false);
            setTimeout(startAnimation, 10000);
            return prev;
          }
          return prev + 1;
        });
      }, 30);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, shouldAnimate, text.length]);

  


  const encrypt = (iteration: number) => {
    return text
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        if (letter === " ") return " ";
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");
  };

  return (
    <span ref={intersectionRef} className={className}>
      {isVisible ? encrypt(iteration) : text}
    </span>
  );
};

const EventRegistration = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [registrationType, setRegistrationType] = useState<'opens' | 'closes'>('opens');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const openingDate = new Date('2025-02-23T00:00:00');
    const closingDate = new Date('2025-03-04T23:59:59');

    const calculateTimeLeft = () => {
      const now = new Date();
      let targetDate = registrationType === 'opens' ? openingDate : closingDate;
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else if (registrationType === 'opens') {
        setRegistrationType('closes');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [registrationType]);

  const socialLinks = [
    {
      name: "Discord",
      icon: MessageSquare,
      url: "https://discord.com/invite/BCBvtyPsEt",
      color: "hover:bg-[#5865F2] hover:text-purple-100"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/cbitosc",
      color: "hover:bg-[#333333] hover:text-pink-100"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/cbitosc/",
      color: "hover:bg-[#E4405F] hover:text-purple-50"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/cbitosc",
      color: "hover:bg-[#0A66C2] hover:text-purple-100"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animate sections individually
    document.querySelectorAll("section").forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
      // Animate elements inside each section
      const elements = section.querySelectorAll(".animate-fade-up");
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });
    // Hero section animation
    gsap.from(".hero-content", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power4.out",
    });
    // Social links stagger animation
    gsap.from(".social-link", {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".social-links",
        start: "top 80%",
      },
    });
    // Event card hover animations
    document.querySelectorAll('[id^="event-card-"]').forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.02, y: -5, duration: 0.3, ease: "power2.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    // FAQ animations
    document.querySelectorAll("details").forEach(item => {
      item.addEventListener("toggle", () => {
        const content = item.querySelector("div");
        if (item.open) {
          gsap.from(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
        }
      });
    });

    // Floating logo effect
    gsap.to(".logo", {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const handleRegistration = (eventPath) => {
    navigate(`/register${eventPath}`);
  };

  return (
    <div className="min-h-screen font-sora">
      <div className="absolute inset-0 fixed bg-gradient-to-br from-[#4B0082] to-black" />
      
      <div className="relative z-10">
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
          <div className="px-2 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between gap-2 md:gap-8 px-[4px] mx-[8px] my-[5px]">

              <Logos />

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1">
                {["Home", "About", "Events", "FAQ", "Contact"].map(item => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-purple-100 hover:text-white px-3 py-1"
                  >
                    <EncryptedText text={item} className="text-sm" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white bg-[rgb(255,0,150)] rounded-full 
                transition-colors duration-300 hover:text-white hover:scale-110 transform-gpu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 py-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10">
                {["Home", "About", "Events", "FAQ", "Contact"].map(item => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-purple-100 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <EncryptedText text={item} className="text-sm text-current" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Keep the scroll-mt-20 class but it will now use the updated 60px value */}
        <section id="home" className="min-h-screen flex items-center justify-center scroll-mt-20 relative">
            <div className="grid grid-cols-1 gap-8 items-center relative z-10">
              {/* Content */}
              <div className="text-center">
                {/* Add top margin for mobile view */}
                <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white font-medium text-sm mb-8 animate-fade-up md:mt-0 mt-10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E5DEFF]" />
                    <span className="text-sm font-semibold">
                      Registration {registrationType === 'opens' ? 'opens' : 'closes'} in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </span>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="inline-block mb-4">
                    <Sparkles className="w-8 h-8 text-[#E5DEFF] animate-pulse" />
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-[#E5DEFF] bg-clip-text text-transparent animate-fade-up">
                    OpenSys
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 mx-auto mb-8" />
                  <p className="text-3xl md:text-4xl font-bold mb-8 animate-fade-up text-[rgb(255,0,150)]" style={{ animationDelay: "0.2s" }}>
                    <EncryptedText 
                      text="The Open-Source Symposium" 
                      className="text-3xl md:text-4xl font-bold"
                    />
                  </p>
                  <p className="text-lg mb-12 text-white/80 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: "0.3s" }}>
                    A grand symphony of expansive technical spectacles!
                  </p>
                </div>
              </div>
            </div>
        </section>

        {/* Update all other sections to use scroll-mt-20 */}
        <section id="about" className="py-16 px-4 scroll-mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0096]">
                About the Event
              </h2>
            </div>
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <p className="text-white/90 mb-8 text-center">
                OpenSys is an amalgamation of multiple events that are designed to give you the best competitive experience all while being fun and enjoyable. Since we are the open source community of CBIT, all the events will be completely free for everyone to participate and you also stand a chance to win exciting cash prizes. See you there!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white">Free for everyone to participate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-white">Win exciting prizes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <span className="text-white">4th and 5th March 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-white">CBIT, Hyderabad</span>
                </div>
              </div>
            </div>
        </section>

        <section id="events" className="py-16 px-4 scroll-mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0096]">
                Our Events
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
    {
      title: "Mazerift",
      icon: GitBranch,
      date: "4th March 2025",
      team: "Solo or Team of 2",
      description: "A unique challenge that blends problem-solving with navigation. Participants must make their way through a virtual 3D maze, encountering checkpoints where puzzles await. Only those who solve all challenges and successfully submit their final solution will emerge victorious!",
      status: 'open',
      prize: "Exciting cash prizes!",
      path: "/mazerift"
    },
    {
      title: "Decipher",
      icon: Search,
      date: "5th March 2025",
      team: "Team of 2",
      description: "A dynamic decryption challenge that tests participants' problem-solving skills. In Round 1, individuals tackle encryption-based questions, while Round 2 presents interconnected puzzles hidden within QR-coded images. The quickest to decode all challenges emerges as the winner!",
      status: 'open',
      prize: "Exciting cash prizes!",
      path: "/decipher"
    },
    {
      title: "Odyssey",
      icon: Code,
      date: "4th-5th March 2025",
      team: "Individual Participation",
      description: "A thrilling two-day online challenge where participants race against time to solve a series of mind-bending puzzles. With each level increasing in difficulty, only the fastest and sharpest minds will conquer all levels and claim victory!",
      status: 'open',
      prize: "Exciting cash prizes!",
      path: "/odyssey"
    }
  ].map((event, index) => (
    <div
      key={event.title}
      id={`event-card-${index}`}
      className="group relative overflow-hidden rounded-2xl animate-fade-up opacity-0 bg-gradient-to-b from-[#8471C9]/20 to-[#8471C9]/10 backdrop-blur-md border border-white/10"
      style={{ animationDelay: `${0.2 * index}s` }}
    >
      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <event.icon className="w-8 h-8 text-[#E5DEFF]" />
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
            Registration Open
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-[#E5DEFF]">{event.level}</span>
          <span className="text-white/50">•</span>
          <span className="text-sm text-white/70">{event.duration}</span>
        </div>

        <p className="text-white/80 mb-4 flex-grow">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>{event.team}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Award className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-[#E5DEFF]">{event.prize}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => handleRegistration(event.path)}
            className="w-full py-2.5 rounded-full bg-[rgb(255,0,150)] text-white hover:bg-[rgb(255,0,150)]/90 
            hover:scale-[1.02] transform-gpu active:scale-95 transition-all duration-300 font-medium
            shadow-[0_0_15px_rgba(255,0,150,0.5)] hover:shadow-[0_0_20px_rgba(255,0,150,0.7)]
            animate-pulse-subtle backdrop-blur-sm"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
              ))}
            </div>
        </section>

        <section id="faq" className="py-16 px-4 scroll-mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0096]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
  {
    "q": "Who can participate?",
    "a": "The events are open to anyone with a zeal to learn, collaborate, and compete over open-source technologies."
  },
  {
    "q": "Is this event open to beginners?",
    "a": "Whether you're a beginner, professional, or simply someone who is passionate about open-source software, there's something for everyone at OpenSys."
  },
  {
    "q": "Is there any registration fee?",
    "a": "No, the events are absolutely free and open to everyone."
  },
  {
    "q": "When do the events begin?",
    "a": "The events take place over two days, on March 4th and March 5th."
  }
]
.map((faq, index) => (
                <details
                  key={index}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <summary className="relative bg-[#8471C9]/20 backdrop-blur-md border border-white/10 p-6 cursor-pointer list-none">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-purple-100 pr-6">{faq.q}</h3>
                      <span className="absolute right-6 transition-transform duration-300 group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </summary>
                  <div className="bg-[#8471C9]/10 backdrop-blur-md border-t-0 border border-white/10 p-6 text-purple-100/90">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
        </section>

        <section id="contact" className="py-16 px-4 scroll-mt-20 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-4 py-1.5 rounded-full bg-[#FF0096]/20 text-[#FF0096] font-medium text-sm mb-6 inline-block backdrop-blur-md">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0096]">
                Contact Us
              </h2>
              <p className="text-white/80">
                Have questions? We're here to help you with any queries about OpenSys 2025.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-[#8471C9]/20 backdrop-blur-md border border-white/10 transition-all duration-300" />
                    <div className="relative p-8 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <Mail className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">Email</h3>

                          <a
                            href="mailto:cosc@cbit.ac.in"

                            className="text-purple-100/90 hover:text-pink-200 transition-colors"
                          >
                            cosc@cbit.ac.in
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <Phone className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">Contact</h3>
                          <div className="space-y-1">
                            <a href="tel:+919542590164" className="block text-white/80 hover:text-[#E5DEFF] transition-colors">
                              Muzaffar: +91 95425 90164
                            </a>
                            <a href="tel:+919052812005" className="block text-white/80 hover:text-[#E5DEFF] transition-colors">
                              Imaduddin: +91 90528 12005
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <MapPin className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">Location</h3>
                          <a
                            href="https://maps.google.com/?q=CBIT+Hyderabad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                          >
                            Chaitanya Bharathi Institute of Technology<br />
                            Gandipet, Hyderabad - 500075
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-[#8471C9]/20 backdrop-blur-md border border-white/10 transition-all duration-300" />
                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>

                    <div className="social-links grid grid-cols-2 gap-3 mb-6">

                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 
                    bg-white/10 hover:bg-white/20 text-white transition-all duration-300
                    ${social.color}`}
                        >
                          <social.icon className="w-4 h-4" />
                          <span className="text-sm">{social.name}</span>
                        </a>
                      ))}
                    </div>

                    <p className="text-white/80">
                      Follow us for the latest updates and announcements about OpenSys 2025!
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <footer className="py-12 px-4 border-t border-white/10 relative">
          <div className="max-w-4xl mx-auto">
            {/* Related Links */}
            <div className="text-center mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">Related Links</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://cbit.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-100/80 hover:text-pink-200 transition-colors"
                >
                  CBIT
                </a>
                <a
                  href="https://cbitosc.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                >
                  COSC Official Website
                </a>
                <a
                  href="https://cbit-hacktoberfest24.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                >
                  HacktoberFest'24
                </a>
                <a
                  href="https://cbitosc.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                >
                  COSC Newsletter
                </a>
              </div>
            </div>

            {/* Logo and Copyright */}
            <div className="flex flex-col items-center justify-center">
              <Logos />
              <div className="mt-6 text-center w-full">
                <EncryptedText 
                  text="COPYRIGHT © 2025 COSC. ALL RIGHTS RESERVED." 
                  className="text-sm text-purple-100/60"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EventRegistration;
