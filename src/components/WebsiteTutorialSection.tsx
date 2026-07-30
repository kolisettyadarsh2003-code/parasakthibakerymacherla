import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, HelpCircle, Film, Sparkles, MessageCircle, Phone, Search, Eye, CheckCircle2, Crown, Volume1, MousePointer, Navigation } from 'lucide-react';

interface WebsiteTutorialSectionProps {
  onNavigateToSection: (sectionId: string) => void;
  contactNumber: string;
  whatsappNumber: string;
}

const tutorialSlides = [
  {
    timeSec: 0,
    timestamp: "0:00",
    title: "1. వెబ్‌సైట్ పరిచయం (Introduction)",
    teluguText: "నమస్కారం! పరాశక్తి బేకరీ మాచర్ల అధికారిక వెబ్‌సైట్‌కి స్వాగతం. ఇక్కడ మీరు మా వద్ద లభించే అన్ని రకాల కేకులు మరియు బేకరీ ఐటెమ్స్ ఉచితంగా చూడవచ్చు.",
    englishText: "Welcome to Parasakthi Bakery Macherla's official website guide.",
    slideType: "WELCOME",
    sampleImage: "",
    cakeLabel: "మాచర్ల విశ్వసనీయ బేకరీ",
  },
  {
    timeSec: 8,
    timestamp: "0:08",
    title: "2. కేటగిరీలు & ఐటెమ్స్ వెతకడం (Categories & Search)",
    teluguText: "హోమ్‌పేజీలో Product Categories లేదా In-Store Catalogue దగ్గరికి వెళ్లి మీకు కావాల్సిన కేకులు, పఫ్‌లు, స్వీట్లు, డ్రై ఫ్రూట్స్ సులభంగా వెతకవచ్చు.",
    englishText: "Browse categories or use search to quickly find cakes, puffs, dry fruits, and sweets.",
    slideType: "CATEGORIES",
    sampleImage: "",
    cakeLabel: "వివిధ రకాల బేకరీ కేటగిరీలు",
  },
  {
    timeSec: 18,
    timestamp: "0:18",
    title: "3. కేక్ మోడల్స్ చూడటం & జూమ్ చేయడం (Cake Models Gallery)",
    teluguText: "Cake Gallery విభాగానికి వెళ్లి పుట్టినరోజు, పెళ్లి మరియు పార్టీల కేక్ మోడల్స్ చూడవచ్చు. ఫోటోపై క్లిక్ చేస్తే జూమ్ కూడా అవుతుంది.",
    englishText: "Click on any cake image to zoom in and inspect fine design details.",
    slideType: "GALLERY_ZOOM",
    sampleImage: "",
    cakeLabel: "కస్టమ్ డిజైనర్ కేక్ మోడల్స్",
  },
  {
    timeSec: 28,
    timestamp: "0:28",
    title: "4. వాట్సాప్‌లో డైరెక్ట్ ఆర్డర్ చేయడం (WhatsApp Inquiry)",
    teluguText: "మీకు ఏదైనా కేక్ నచ్చితే, దాని కింద ఉన్న పచ్చటి WhatsApp బటన్‌పై క్లిక్ చేయండి. ఆ కేక్ వివరాలు నేరుగా మా వాట్సాప్‌కి వస్తాయి. మీరు సులభంగా ఆర్డర్ చేయవచ్చు.",
    englishText: "Click the green WhatsApp button to inquire or send your own photo reference directly.",
    slideType: "WHATSAPP_ORDER",
    sampleImage: "",
    cakeLabel: "వాట్సాప్ ద్వారా సులభమైన ఆర్డర్",
  },
  {
    timeSec: 38,
    timestamp: "0:38",
    title: "5. బేకరీ అడ్రస్ & ఫోన్ నంబర్ (Store Location & Call)",
    teluguText: "మాచర్లలోని బేకరీ చిరునామా, మ్యాప్ మరియు ఫోన్ నంబర్ కోసం Location Contact విభాగాన్ని చూడవచ్చు. నేరుగా కాల్ చేయడానికి Call Store నొక్కండి.",
    englishText: "Find exact store location, Google Maps directions, and phone numbers in the contact section.",
    slideType: "CONTACT_INFO",
    sampleImage: "",
    cakeLabel: "నేరుగా బేకరీ షాప్‌ను సందర్శించండి",
  },
];

export const WebsiteTutorialSection: React.FC<WebsiteTutorialSectionProps> = ({
  onNavigateToSection,
  contactNumber,
  whatsappNumber,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const totalDuration = 48; // seconds

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to speak Telugu text via Web Speech API
  const speakNarration = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Find Telugu voice if available
      const voices = window.speechSynthesis.getVoices();
      const teluguVoice = voices.find(v => v.lang.startsWith('te') || v.lang.includes('te'));
      if (teluguVoice) {
        utterance.voice = teluguVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  };

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [isPlaying]);

  // Update active slide based on current time & trigger voice narration
  useEffect(() => {
    let newSlideIdx = 0;
    for (let i = tutorialSlides.length - 1; i >= 0; i--) {
      if (currentTime >= tutorialSlides[i].timeSec) {
        newSlideIdx = i;
        break;
      }
    }

    if (newSlideIdx !== activeSlideIndex) {
      setActiveSlideIndex(newSlideIdx);
      if (isPlaying && !isMuted) {
        speakNarration(tutorialSlides[newSlideIdx].teluguText);
      }
    }
  }, [currentTime, isPlaying, isMuted]);

  const togglePlay = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);

    if (nextPlayState) {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      speakNarration(tutorialSlides[activeSlideIndex].teluguText);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const restartVideo = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    speakNarration(tutorialSlides[0].teluguText);
  };

  const jumpToSlide = (index: number) => {
    setCurrentTime(tutorialSlides[index].timeSec);
    setActiveSlideIndex(index);
    setIsPlaying(true);
    speakNarration(tutorialSlides[index].teluguText);
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (newMuteState) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else if (isPlaying) {
      speakNarration(tutorialSlides[activeSlideIndex].teluguText);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentSlide = tutorialSlides[activeSlideIndex];

  return (
    <section id="tutorial" className="py-16 md:py-20 bg-[#FCF9F2] border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#001030] text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#D4AF37]/30 shadow-xs">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>తెలుగు వీడియో గైడ్ • Telugu Video Tutorial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#001030] mb-3">
            వెబ్‌సైట్ ఎలా ఉపయోగించాలి?
          </h2>
          <div className="h-1 w-20 gold-gradient mx-auto mb-3"></div>
          <p className="text-gray-600 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            ఈ చిన్న వీడియో ద్వారా పరాశక్తి బేకరీ వెబ్‌సైట్‌లో కేకులు చూడటం, జూమ్ చేయడం మరియు వాట్సాప్‌లో ఆర్డర్ చేయడం సులభంగా తెలుసుకోండి.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto bg-[#001030] rounded-xl border border-[#D4AF37]/40 card-shadow overflow-hidden">
          
          {/* Main Simulated Video Screen Canvas */}
          <div className="relative aspect-[16/9] bg-[#000d28] overflow-hidden flex flex-col justify-between p-4 sm:p-6">
            
            {/* Top Video Overlay Bar */}
            <div className="relative z-10 flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2 bg-[#001030]/90 px-3 py-1 rounded border border-[#D4AF37]/30 backdrop-blur-md">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold font-serif text-[#F3E5AB]">
                  పరాశక్తి బేకరీ - వెబ్‌సైట్ నేవిగేషన్ ట్యుటోరియల్
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isPlaying && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#25D366] bg-[#25D366]/20 px-2 py-0.5 rounded border border-[#25D366]/40 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                    PLAYING AUDIO
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#001030] border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                  TELUGU VOICE & SUBTITLES
                </span>
              </div>
            </div>

            {/* Video Content Canvas Display */}
            <div className="my-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Dynamic Website Layout Simulation Canvas Frame */}
              <div className="md:col-span-6 relative rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#001030] flex flex-col aspect-[16/10] group">
                
                {/* Simulated Browser Address Bar */}
                <div className="bg-[#000d28] px-3 py-1.5 border-b border-[#D4AF37]/20 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <div className="bg-[#001030] px-3 py-0.5 rounded-full border border-slate-700 text-[#F3E5AB] font-mono text-[9px] truncate max-w-[200px]">
                    https://parasakthi-bakery-macherla.com
                  </div>
                  <span className="text-[9px] text-[#D4AF37] font-bold">LIVE PREVIEW</span>
                </div>

                {/* Layout View Based on Slide Type */}
                <div className="flex-1 p-3 flex flex-col justify-between bg-[#FAF8F5] text-[#0F2C59] overflow-hidden relative">
                  
                  {/* 1. WELCOME HERO LAYOUT */}
                  {currentSlide.slideType === "WELCOME" && (
                    <div className="space-y-2 animate-fade-in my-auto text-center relative">
                      <div className="inline-block bg-[#001030] text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/40">
                        ✨ Macherla's Most Trusted Bakery Since 2007
                      </div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#001030] leading-tight">
                        Freshness, Quality & Unmatched Craftsmanship
                      </h3>
                      <p className="text-[10px] text-slate-600 line-clamp-2">
                        Handcrafted cakes, fresh pastries, dry fruits, dairy & seasonal treats.
                      </p>

                      {/* Rectangular Highlight Block Around Primary Action */}
                      <div className="relative p-2 rounded-xl border-2 border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40 shadow-lg animate-pulse inline-block max-w-full">
                        <div className="flex justify-center gap-2">
                          <span className="px-2.5 py-1 gold-gradient text-[#001030] font-bold text-[9px] rounded shadow-xs">
                            Explore In-Store Catalogue
                          </span>
                          <span className="px-2.5 py-1 bg-[#001030] text-[#F3E5AB] font-bold text-[9px] rounded border border-[#D4AF37]">
                            Store Directions
                          </span>
                        </div>

                        {/* Navigation Pointer Arrow */}
                        <div className="absolute -bottom-6 right-2 flex items-center gap-1 bg-[#001030] text-[#F3E5AB] text-[8px] font-bold px-2 py-0.5 rounded border border-[#D4AF37] shadow-lg animate-bounce">
                          <MousePointer className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          <span>👈 TUTORIAL FOCUS: Hero Buttons</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. CATEGORIES & SEARCH LAYOUT */}
                  {currentSlide.slideType === "CATEGORIES" && (
                    <div className="space-y-2 animate-fade-in my-auto relative">
                      {/* Rectangular Highlight Block Around Search Bar */}
                      <div className="relative p-1.5 rounded-xl border-2 border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40 shadow-lg animate-pulse space-y-1.5">
                        <div className="bg-white p-1.5 rounded-lg border border-[#D4AF37] shadow-xs flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span className="text-[10px] text-slate-700 font-mono flex-1">
                            Search: "Black Forest, Puffs, Dry Fruits..."
                          </span>
                          <span className="bg-[#001030] text-[#F3E5AB] text-[8px] px-1.5 py-0.5 rounded font-bold">
                            SEARCH
                          </span>
                        </div>

                        {/* Category Pills Simulation */}
                        <div className="flex gap-1 overflow-x-auto pb-0.5 text-[9px] font-bold">
                          <span className="px-2 py-0.5 bg-[#001030] text-[#D4AF37] rounded border border-[#D4AF37]">
                            🎂 Cakes
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                            🥐 Puffs
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                            🍫 Brownies
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                            🥜 Dry Fruits
                          </span>
                        </div>

                        {/* Navigation Pointer Arrow */}
                        <div className="absolute -top-3 right-3 flex items-center gap-1 bg-[#001030] text-[#F3E5AB] text-[8px] font-bold px-2 py-0.5 rounded border border-[#D4AF37] shadow-lg animate-bounce z-20">
                          <MousePointer className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          <span>👈 TUTORIAL FOCUS: Search & Filters</span>
                        </div>
                      </div>

                      {/* Mini Product Cards Grid with Royal Blue Cards */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <div className="bg-[#001030] text-white p-1.5 rounded border border-[#D4AF37]/40 flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                            <Crown className="w-3.5 h-3.5 text-[#F3E5AB]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] font-bold text-[#F3E5AB] truncate">Black Forest</p>
                            <p className="text-[7px] text-[#D4AF37]">In-Store Fresh</p>
                          </div>
                        </div>
                        <div className="bg-[#001030] text-white p-1.5 rounded border border-[#D4AF37]/40 flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                            <Crown className="w-3.5 h-3.5 text-[#F3E5AB]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] font-bold text-[#F3E5AB] truncate">Special Veg Puff</p>
                            <p className="text-[7px] text-[#D4AF37]">Oven Hot</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. GALLERY ZOOM LIGHTBOX LAYOUT */}
                  {currentSlide.slideType === "GALLERY_ZOOM" && (
                    <div className="relative h-full flex flex-col justify-center animate-fade-in">
                      {/* Background gallery grid */}
                      <div className="grid grid-cols-2 gap-1 opacity-20">
                        <div className="bg-[#001030] h-14 rounded border border-[#D4AF37]/30"></div>
                        <div className="bg-[#001030] h-14 rounded border border-[#D4AF37]/30"></div>
                      </div>

                      {/* Lightbox Modal Pop-up Overlay with Rectangular Highlight */}
                      <div className="absolute inset-0 bg-[#001030] p-2 rounded-lg border-2 border-[#D4AF37] ring-2 ring-[#D4AF37]/50 flex flex-col justify-between text-white shadow-2xl">
                        <div className="flex justify-between items-center text-[9px] border-b border-[#D4AF37]/30 pb-1">
                          <span className="font-bold text-[#F3E5AB] flex items-center gap-1">
                            <Eye className="w-3 h-3 text-[#D4AF37]" /> Interactive Lightbox Zoom View
                          </span>
                          <span className="text-rose-400 font-bold">✕ Close</span>
                        </div>

                        <div className="flex gap-2 items-center my-1 relative">
                          <div className="w-14 h-14 rounded bg-[#000d28] border border-[#D4AF37] flex flex-col items-center justify-center text-center p-1 shrink-0">
                            <Crown className="w-4 h-4 text-[#F3E5AB] mb-0.5" />
                            <span className="text-[7px] text-[#D4AF37] font-bold leading-none">PARASAKTHI</span>
                          </div>

                          <div className="text-left space-y-0.5 flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#F3E5AB]">3D Royal Fondant Cake</p>
                            <p className="text-[8px] text-slate-300">Custom wedding & birthday designs.</p>
                            
                            {/* Highlighted Button with Navigation Pointer */}
                            <div className="relative inline-block mt-1">
                              <span className="inline-block gold-gradient text-[#001030] text-[8px] font-bold px-2 py-0.5 rounded border border-[#D4AF37] shadow">
                                Click Photo to Zoom High-Res
                              </span>

                              {/* Navigation Pointer Arrow */}
                              <div className="absolute -bottom-5 right-0 flex items-center gap-1 bg-[#001030] text-[#F3E5AB] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#D4AF37] shadow-lg animate-bounce z-30">
                                <MousePointer className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                                <span>👈 TUTORIAL FOCUS: Lightbox Zoom</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. WHATSAPP ORDER LAYOUT */}
                  {currentSlide.slideType === "WHATSAPP_ORDER" && (
                    <div className="space-y-2 animate-fade-in my-auto relative">
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex gap-2 items-center shadow-xs">
                        <div className="w-10 h-10 rounded bg-[#001030] border border-[#D4AF37] flex items-center justify-center shrink-0">
                          <Crown className="w-4 h-4 text-[#F3E5AB]" />
                        </div>

                        <div className="flex-1 text-left min-w-0">
                          <p className="text-[10px] font-bold text-[#001030]">Royal Black Forest Cake</p>
                          <p className="text-[8px] text-slate-500 truncate">Fresh whipped cream & chocolate cherries</p>
                          
                          {/* Rectangular Highlight Box around WhatsApp Button */}
                          <div className="relative inline-block mt-1 p-0.5 rounded-lg border-2 border-[#25D366] bg-[#25D366]/10 ring-2 ring-[#25D366]/40 shadow-lg animate-pulse">
                            <div className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2 py-0.5 rounded text-[9px] font-bold shadow">
                              <MessageCircle className="w-3 h-3" /> Order via WhatsApp
                            </div>

                            {/* Navigation Pointer Arrow */}
                            <div className="absolute -bottom-6 left-0 flex items-center gap-1 bg-[#001030] text-[#25D366] text-[8px] font-bold px-2 py-0.5 rounded border border-[#25D366] shadow-lg animate-bounce z-20">
                              <MousePointer className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
                              <span>👈 TUTORIAL FOCUS: Order via WhatsApp</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#DCF8C6] text-slate-800 p-1.5 rounded-lg border border-emerald-300 text-[9px] font-sans flex items-start gap-1">
                        <span className="text-[#25D366] font-bold">💬 Auto-Message:</span>
                        <span>"Hello Parasakthi Bakery, I would like to order Royal Black Forest Cake!"</span>
                      </div>
                    </div>
                  )}

                  {/* 5. STORE LOCATION & MAP LAYOUT */}
                  {currentSlide.slideType === "CONTACT_INFO" && (
                    <div className="space-y-1.5 animate-fade-in my-auto relative">
                      {/* Rectangular Highlight Box around Store Address & Call buttons */}
                      <div className="relative p-2 rounded-lg border-2 border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/50 shadow-lg animate-pulse bg-[#001030] text-white space-y-1">
                        <p className="text-[10px] font-bold text-[#F3E5AB] flex items-center gap-1">
                          📍 Under HDFC Bank, Main Road, Macherla
                        </p>
                        <p className="text-[8px] text-slate-300">
                          Palnadu District, Andhra Pradesh, India
                        </p>
                        <div className="flex gap-2 pt-1 text-[8px]">
                          <span className="bg-[#25D366] text-white font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" /> Call: +91 9440740619
                          </span>
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                            Open 7 AM - 10 PM
                          </span>
                        </div>

                        {/* Navigation Pointer Arrow */}
                        <div className="absolute -bottom-6 right-2 flex items-center gap-1 bg-[#001030] text-[#F3E5AB] text-[8px] font-bold px-2 py-0.5 rounded border border-[#D4AF37] shadow-lg animate-bounce z-20">
                          <MousePointer className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          <span>👈 TUTORIAL FOCUS: Direct Call & Location</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Simulated Footer Badge */}
                <div className="bg-[#001030] px-3 py-1 text-center text-[9px] text-[#D4AF37] font-semibold border-t border-[#D4AF37]/30">
                  {currentSlide.cakeLabel}
                </div>

              </div>

              {/* Telugu Voiceover Script & Visual Guidance */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="inline-block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                    {currentSlide.title}
                  </div>

                  {/* Audio Equalizer Animated Indicator */}
                  {isPlaying && !isMuted && (
                    <div className="flex items-end gap-1 h-4">
                      <div className="w-1 bg-[#D4AF37] animate-[bounce_0.6s_infinite_100ms] h-3 rounded-full" />
                      <div className="w-1 bg-[#D4AF37] animate-[bounce_0.6s_infinite_300ms] h-4 rounded-full" />
                      <div className="w-1 bg-[#D4AF37] animate-[bounce_0.6s_infinite_200ms] h-2 rounded-full" />
                      <div className="w-1 bg-[#D4AF37] animate-[bounce_0.6s_infinite_400ms] h-3.5 rounded-full" />
                    </div>
                  )}
                </div>

                <div className="bg-[#001030]/90 p-4 rounded-lg border border-[#D4AF37]/30 backdrop-blur-md shadow-lg relative overflow-hidden">
                  <p className="text-white text-sm sm:text-base leading-relaxed font-sans font-medium text-amber-50">
                    "{currentSlide.teluguText}"
                  </p>
                  <p className="text-white/50 text-[11px] font-sans italic mt-2 border-t border-white/10 pt-1.5">
                    Subtitles: {currentSlide.englishText}
                  </p>
                </div>

                {/* Quick Action visual cues depending on slide */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {activeSlideIndex === 1 && (
                    <button
                      onClick={() => onNavigateToSection('catalogue')}
                      className="px-3 py-1.5 gold-gradient text-[#001030] rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Search className="w-3.5 h-3.5" /> కటలాగ్ చూడండి
                    </button>
                  )}
                  {activeSlideIndex === 2 && (
                    <button
                      onClick={() => onNavigateToSection('cakes')}
                      className="px-3 py-1.5 bg-[#001030] text-[#F3E5AB] border border-[#D4AF37]/50 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> కేక్ గ్యాలరీ
                    </button>
                  )}
                  {activeSlideIndex === 3 && (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('హలో పరాశక్తి బేకరీ, వెబ్‌సైట్ ద్వారా సంప్రదిస్తున్నాను.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> వాట్సాప్ ఆర్డర్
                    </a>
                  )}
                  {activeSlideIndex === 4 && (
                    <button
                      onClick={() => onNavigateToSection('contact')}
                      className="px-3 py-1.5 bg-[#000d28] text-white border border-white/30 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> షాప్ లోకేషన్ & కాల్
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Centered Play Button Overlay when Paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer z-20 group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 gold-gradient rounded-full flex items-center justify-center text-[#001030] shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-[#001030]" />
                </div>
                <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest mt-3 bg-[#001030] px-4 py-1.5 rounded border border-[#D4AF37]/40 shadow-lg">
                  ప్లే చేయండి • Click to Play Telugu Tutorial
                </span>
              </div>
            )}

            {/* Bottom Video Controls Bar */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col gap-2">
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer relative"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const clickX = e.clientX - rect.left;
                     const pct = clickX / rect.width;
                     const newTime = Math.floor(pct * totalDuration);
                     setCurrentTime(newTime);
                   }}>
                <div 
                  className="h-full gold-gradient transition-all duration-300"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer bg-white/10 rounded"
                    title={isPlaying ? "పాజ్ చేయండి (Pause)" : "ప్లే చేయండి (Play)"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-[#D4AF37]" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button 
                    onClick={restartVideo}
                    className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer bg-white/10 rounded"
                    title="మళ్ళీ చూడండి (Restart)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer bg-white/10 rounded"
                    title={isMuted ? "వాయిస్ ఆన్ చేయండి" : "మ్యూట్ చేయండి"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#25D366]" />}
                  </button>

                  <span className="text-[11px] font-mono text-white/80 font-bold">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className="text-[11px] text-[#F3E5AB] font-sans hidden sm:block">
                  స్టెప్ {activeSlideIndex + 1} / {tutorialSlides.length}: {currentSlide.title}
                </div>
              </div>

            </div>

          </div>

          {/* Chapter Step Buttons below Video */}
          <div className="p-4 bg-[#000d28] border-t border-[#D4AF37]/20">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> వీడియో చాప్టర్స్ (Quick Timestamps):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {tutorialSlides.map((slide, idx) => {
                const isActive = activeSlideIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => jumpToSlide(idx)}
                    className={`p-2 rounded text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#001030] border border-[#D4AF37] text-[#F3E5AB] shadow-xs'
                        : 'bg-[#001030]/50 border border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#D4AF37]">
                      {slide.timestamp}
                    </div>
                    <div className="text-[11px] font-medium line-clamp-1">
                      {slide.title.split(' ')[1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

