import { type PointerEvent, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleUserRound,
  Compass,
  Heart,
  Home as HomeIcon,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import laColinaImage from '@/assets/la-colina-east.jpg';
import parkYardImage from '@/assets/park-yard-1.jpg';
import pointNineImage from '@/assets/point-9-mall.jpg';
import capitalHillsMark from '@/assets/capital-hills-mark.png';

const queryClient = new QueryClient();

type View = 'home' | 'projects' | 'saved' | 'messages' | 'profile';
type Category = 'All' | 'Apartments' | 'Villas' | 'Townhouses' | 'Commercial';

type Project = {
  id: string;
  name: string;
  location: string;
  type: Exclude<Category, 'All'>;
  beds: string;
  area: string;
  price: string;
  status: string;
  image: string;
  featured?: boolean;
  gallery?: string[];
};

const projects: Project[] = [
  {
    id: 'la-colina-east',
    name: 'La Colina East',
    location: 'New Cairo',
    type: 'Apartments',
    beds: '3 Beds',
    area: '160 m²',
    price: 'EGP 3,500,000',
    status: 'New launch',
    image: laColinaImage,
    featured: true,
    gallery: [laColinaImage, parkYardImage, pointNineImage],
  },
  {
    id: 'park-yard-1',
    name: 'Park Yard 1',
    location: 'New Cairo',
    type: 'Villas',
    beds: '4 Beds',
    area: '250 m²',
    price: 'EGP 2,800,000',
    status: 'Limited collection',
    image: parkYardImage,
    gallery: [parkYardImage, pointNineImage, laColinaImage],
  },
  {
    id: 'point-9-mall',
    name: 'Point 9 Mall',
    location: 'New Cairo',
    type: 'Commercial',
    beds: 'Retail',
    area: '120 m²',
    price: 'EGP 1,850,000',
    status: 'Now leasing',
    image: pointNineImage,
    gallery: [pointNineImage, laColinaImage, parkYardImage],
  },
  {
    id: 'win-plaza',
    name: 'Win Plaza',
    location: 'Sheikh Zayed',
    type: 'Commercial',
    beds: 'Office',
    area: '86 m²',
    price: 'EGP 3,600,000',
    status: 'Final finishing phase',
    image: laColinaImage,
    gallery: [laColinaImage, pointNineImage, parkYardImage],
  },
  {
    id: 'october-gardens',
    name: 'October Gardens',
    location: '6th of October',
    type: 'Townhouses',
    beds: '3 Beds',
    area: '185 m²',
    price: 'EGP 2,150,000',
    status: 'Coming soon',
    image: parkYardImage,
    gallery: [parkYardImage, laColinaImage, pointNineImage],
  },
];

const testimonials = [
  { id: 1, name: 'Ahmed M.', role: 'Homeowner', quote: 'The attention to detail in the finishing is unmatched. Highly recommended.' },
  { id: 2, name: 'Sarah K.', role: 'Investor', quote: 'Capital Hills offers the best ROI I have seen in the area. Great location.' }
];

const articles = [
  { id: 1, title: 'The Future of Real Estate in New Cairo', date: 'Aug 20, 2026', readTime: '5 min' },
  { id: 2, title: 'Why Invest in Commercial Properties Now', date: 'Aug 18, 2026', readTime: '8 min' }
];

const navItems: { id: View; label: string; icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`brand-logo ${inverse ? 'brand-logo-inverse' : ''}`}>
      <img src={capitalHillsMark} alt="Capital Hills" />
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  const swipeStartY = useRef<number | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const enterApp = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(onStart, 480);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    swipeStartY.current = event.clientY;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (swipeStartY.current !== null && swipeStartY.current - event.clientY > 55) {
      enterApp();
    }
    swipeStartY.current = null;
  };

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (event.deltaY > 0) {
      enterApp();
    }
  };

  return (
    <main
      className={`grain lock-screen min-h-[100dvh] bg-[#4b1e2d] text-[#f6f0e4] ${isLeaving ? 'lock-screen-exit' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') enterApp();
      }}
      tabIndex={0}
      aria-label="Capital Hills lock screen. Swipe up to open the app."
    >
      <div className="relative mx-auto grid min-h-[100dvh] w-full grid-cols-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src={laColinaImage} alt="" className="lock-building absolute inset-0 size-full object-cover object-[78%_78%] brightness-[.72] contrast-[1.05] saturate-[.7] lg:object-[70%_62%]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(75,30,45,.98)_0%,rgba(75,30,45,.9)_30%,rgba(75,30,45,.52)_62%,rgba(75,30,45,.72)_100%)] lg:bg-[linear-gradient(90deg,rgba(75,30,45,.96)_0%,rgba(75,30,45,.8)_38%,rgba(75,30,45,.45)_72%,rgba(75,30,45,.36)_100%)]" />
        </div>
        <section className="relative z-10 flex min-h-[100dvh] flex-1 flex-col justify-between overflow-hidden bg-transparent px-7 py-8 sm:px-12 lg:min-h-0 lg:px-[8vw] lg:py-12">
          <img src={capitalHillsMark} alt="" aria-hidden="true" className="watermark watermark-light pointer-events-none absolute -bottom-12 -right-20 z-0 size-[300px] object-contain sm:size-[420px] lg:-right-28 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2" />
          <div className="pointer-events-none absolute -right-24 top-28 size-[360px] rounded-full border-[1px] border-[#aa7b4b]/20 sm:size-[520px]" />
          <div className="pointer-events-none absolute -right-12 top-48 size-[270px] rounded-full border-[1px] border-[#aa7b4b]/15 sm:size-[400px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-28 size-[390px] rounded-full border-[1px] border-[#aa7b4b]/20" />
          <div className="animate-rise relative z-10">
            <Logo inverse />
          </div>

          <div className="animate-rise delay-1 relative z-10 mt-[14vh] max-w-[500px] lg:my-auto lg:pt-28">
            <p className="mono mb-5 text-[10px] uppercase tracking-[.24em] text-[#c9a36a]">Homes worth coming home to</p>
            <h1 className="serif max-w-[560px] text-[clamp(3.7rem,8vw,7rem)] leading-[.87] tracking-[-.035em]">
              A clearer path to <em className="text-[#c9a36a]">your place.</em>
            </h1>
            <p className="mt-8 max-w-[300px] text-sm leading-6 text-[#e6dacf]/80">
              Thoughtfully planned communities. A better tomorrow.
            </p>
            <span className="mt-8 block h-[3px] w-8 bg-[#c9a36a] lg:hidden" />
            <button
              type="button"
              data-testid="button-swipe-up"
              onClick={enterApp}
              className="swipe-prompt mt-12 flex items-center gap-4 text-left text-[#f6f0e4]/75 transition-colors hover:text-[#f6f0e4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a36a]"
            >
              <span className="grid size-11 place-items-center rounded-full border border-[#f6f0e4]/35">
                <ChevronUp size={18} className="swipe-arrow" />
              </span>
              <span>
                <span className="block text-xs font-medium">Swipe up to open</span>
                <span className="mono mt-1 block text-[8px] uppercase tracking-[.2em] text-[#c9a36a]">Your place awaits</span>
              </span>
            </button>
          </div>

          <div className="animate-rise delay-2 relative z-10 flex items-end justify-between pt-10">
            <p className="mono text-[8px] uppercase tracking-[.28em] text-[#c9a36a]/80">Planning<br />the future</p>
            <p className="max-w-[170px] text-right text-[10px] leading-4 text-[#e6dacf]/45">Cairo · Egypt<br />Since 2005</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div role="status" data-testid="status-feedback" className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#4b1e2d] px-4 py-3 text-xs text-[#f6f0e4] shadow-[0_12px_35px_rgba(45,17,27,.25)] md:bottom-8">
      <span className="grid size-5 place-items-center rounded-full bg-[#c9a36a] text-[#4b1e2d]"><Check size={12} strokeWidth={3} /></span>
      {message}
      <button type="button" data-testid="button-close-feedback" onClick={onClose} aria-label="Close notification" className="ml-1 opacity-60 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-full border border-[#4b1e2d]/15 bg-[#faf6ef] px-4 transition-colors focus-within:border-[#4b1e2d]/50">
      <Search size={16} className="text-[#4b1e2d]/65" />
      <input
        type="search"
        data-testid="input-project-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by location, project, or keyword"
        className="min-w-0 flex-1 bg-transparent text-xs text-[#4b1e2d] outline-none placeholder:text-[#4b1e2d]/45"
        aria-label="Search by location, project, or keyword"
      />
      <button type="button" data-testid="button-open-filters" aria-label="Open filters" className="grid size-7 place-items-center rounded-full text-[#4b1e2d]/65 transition-colors hover:bg-[#eadfce]"><SlidersHorizontal size={15} /></button>
    </label>
  );
}

function ProjectCard({ project, saved, onToggleSaved, onOpen, compact = false }: { project: Project; saved: boolean; onToggleSaved: () => void; onOpen: () => void; compact?: boolean }) {
  return (
    <article data-testid={`card-project-${project.id}`} className="group overflow-hidden rounded-[18px] border border-[#4b1e2d]/10 bg-[#faf6ef] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(75,30,45,.11)]">
      <div className={`relative overflow-hidden ${compact ? 'aspect-[1.48]' : 'aspect-[1.18]'}`}>
        <button type="button" data-testid={`button-open-project-${project.id}`} onClick={onOpen} className="absolute inset-0 z-0 cursor-pointer" aria-label={`View ${project.name}`} />
        <img src={project.image} alt={`${project.name} development`} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26131b]/45 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[#f6f0e4]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.11em] text-[#4b1e2d]">{project.status}</span>
        <button type="button" data-testid={`button-save-project-${project.id}`} aria-label={saved ? `Remove ${project.name} from saved` : `Save ${project.name}`} onClick={(event) => { event.stopPropagation(); onToggleSaved(); }} className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full transition-colors ${saved ? 'bg-[#c9a36a] text-[#4b1e2d]' : 'bg-[#f6f0e4]/85 text-[#4b1e2d] hover:bg-[#c9a36a]'}`}>
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button type="button" data-testid={`button-card-arrow-${project.id}`} onClick={onOpen} aria-label={`Open ${project.name}`} className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-[#f6f0e4] text-[#4b1e2d] opacity-0 transition-all group-hover:opacity-100 group-focus-within:opacity-100">
          <ArrowRight size={15} />
        </button>
      </div>
      <button type="button" data-testid={`button-card-info-${project.id}`} onClick={onOpen} className="w-full px-4 py-3.5 text-left">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="mono text-[9px] uppercase tracking-[.12em] text-[#4b1e2d]/50">{project.type} · {project.location}</p>
            <h3 className="serif mt-1 text-[23px] leading-none text-[#4b1e2d]">{project.name}</h3>
          </div>
          <div className="pt-1 text-right">
            <p className="text-[9px] text-[#4b1e2d]/50">From</p>
            <p className="text-xs font-semibold text-[#4b1e2d]">{project.price.replace('EGP ', 'EGP ')}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-4 border-t border-[#4b1e2d]/10 pt-3 text-[10px] text-[#4b1e2d]/65">
          <span>{project.beds}</span><span>{project.area}</span><span className="ml-auto flex items-center gap-1">Explore <ChevronRight size={12} /></span>
        </div>
      </button>
    </article>
  );
}

function CategoryPills({ category, setCategory }: { category: Category; setCategory: (category: Category) => void }) {
  const categories: Category[] = ['All', 'Apartments', 'Villas', 'Townhouses', 'Commercial'];
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {categories.map((item) => (
        <button key={item} type="button" data-testid={`button-category-${item.toLowerCase()}`} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-[10px] transition-all ${category === item ? 'bg-[#4b1e2d] text-[#f6f0e4]' : 'bg-[#eadfce] text-[#4b1e2d]/70 hover:bg-[#e0cfb7]'}`}>
          {item}
        </button>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="animate-rise delay-4 lg:col-span-2 mt-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-[#4b1e2d]">Kind words</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {testimonials.map((test) => (
          <div key={test.id} className="min-w-[260px] max-w-[320px] rounded-[18px] border border-[#4b1e2d]/10 bg-[#faf6ef] p-5 flex-shrink-0 transition-transform hover:-translate-y-1">
            <div className="flex text-[#c9a36a] mb-3">
              <Sparkles size={14} />
              <Sparkles size={14} />
              <Sparkles size={14} />
              <Sparkles size={14} />
              <Sparkles size={14} />
            </div>
            <p className="serif text-lg leading-tight text-[#4b1e2d] mb-4">"{test.quote}"</p>
            <div>
              <p className="text-[11px] font-semibold text-[#4b1e2d]">{test.name}</p>
              <p className="text-[9px] text-[#4b1e2d]/50">{test.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function JournalSection({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section className="animate-rise delay-5 lg:col-span-2 mt-2">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#4b1e2d]">Journal</p>
          <p className="mt-1 text-[10px] text-[#4b1e2d]/45">Insights and updates.</p>
        </div>
        <button type="button" onClick={onBrowse} className="text-[10px] text-[#4b1e2d]/55 hover:text-[#4b1e2d]">
          Read all <ArrowRight size={12} className="ml-1 inline" />
        </button>
      </div>
      <div className="grid gap-3">
        {articles.map((article) => (
          <div key={article.id} onClick={() => window.open('https://capitalhills.com', '_blank')} className="flex items-center justify-between rounded-[16px] bg-[#eadfce]/40 p-4 hover:bg-[#eadfce]/70 transition-colors cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-[#4b1e2d]">{article.title}</p>
              <p className="text-[9px] text-[#4b1e2d]/55 mt-1">{article.date} · {article.readTime} read</p>
            </div>
            <ChevronRight size={14} className="text-[#4b1e2d]/50" />
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeView({ onOpenProject, savedIds, onToggleSaved, onBrowse }: { onOpenProject: (project: Project) => void; savedIds: string[]; onToggleSaved: (id: string) => void; onBrowse: () => void }) {
  return (
    <div className="space-y-6 pb-4 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8 lg:space-y-0 lg:pb-8">
      <section className="animate-rise lg:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/55">Good morning,</p>
            <h1 className="serif mt-1 text-[39px] leading-[.92] text-[#4b1e2d]">Mohanned</h1>
            <p className="mt-2 text-xs text-[#4b1e2d]/55">Let’s find a place that feels like home.</p>
          </div>
          <button type="button" data-testid="button-notifications" aria-label="Notifications" className="relative mt-1 grid size-10 place-items-center rounded-full border border-[#4b1e2d]/12 bg-[#faf6ef] text-[#4b1e2d] hover:bg-[#eadfce]"><Bell size={17} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#c9a36a]" /></button>
        </div>
      </section>
      <div className="lg:col-span-2">
        <SearchBox value="" onChange={() => onBrowse()} />
      </div>
      <section className="animate-rise delay-1 lg:col-span-2">
        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-[#4b1e2d]">Explore by category</p><button type="button" data-testid="button-see-all-categories" onClick={onBrowse} className="text-[10px] text-[#4b1e2d]/55 hover:text-[#4b1e2d]">See all <ArrowRight size={12} className="ml-1 inline" /></button></div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Apartments', icon: Building2 },
            { label: 'Villas', icon: HomeIcon },
            { label: 'Townhouses', icon: KeyRound },
            { label: 'Commercial', icon: Compass },
          ].map(({ label, icon: Icon }) => (
            <button key={label} type="button" data-testid={`button-home-category-${label.toLowerCase()}`} onClick={onBrowse} className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl border border-[#4b1e2d]/8 bg-[#eadfce]/60 text-[#4b1e2d] transition-colors hover:bg-[#e0cfb7]">
              <Icon size={18} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5" />
              <span className="text-[9px]">{label}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="animate-rise delay-2 lg:col-span-1">
        <div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-semibold text-[#4b1e2d]">Featured project</p><p className="mt-1 text-[10px] text-[#4b1e2d]/45">A considered place to begin.</p></div><button type="button" data-testid="button-see-all-projects" onClick={onBrowse} className="text-[10px] text-[#4b1e2d]/55 hover:text-[#4b1e2d]">See all <ArrowRight size={12} className="ml-1 inline" /></button></div>
         <ProjectCard project={projects[0]} compact saved={savedIds.includes(projects[0].id)} onToggleSaved={() => onToggleSaved(projects[0].id)} onOpen={() => onOpenProject(projects[0])} />
      </section>
      <section className="animate-rise delay-3 lg:col-span-1">
        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-[#4b1e2d]">Explore by location</p><MapPin size={15} className="text-[#c9a36a]" /></div>
        <div className="grid grid-cols-3 gap-2">
          {['New Cairo', 'Sheikh Zayed', 'October'].map((location, index) => (
            <button key={location} type="button" data-testid={`button-location-${location.toLowerCase().replace(' ', '-')}`} onClick={onBrowse} className="relative min-w-0 h-[76px] overflow-hidden rounded-2xl bg-[#4b1e2d] p-3 text-left text-[#f6f0e4]">
              <img src={index === 1 ? pointNineImage : parkYardImage} alt="" className="absolute inset-0 size-full object-cover opacity-35 mix-blend-luminosity" />
              <span className="relative z-10 flex h-full min-w-0 flex-col justify-between"><span className="truncate text-[10px] font-semibold">{location}</span><span className="mono text-[8px] opacity-70">{[12, 8, 6][index]} projects</span></span>
            </button>
          ))}
        </div>
      </section>
      <TestimonialsSection />
      <JournalSection onBrowse={onBrowse} />
    </div>
  );
}

function ProjectsView({ onOpenProject, savedIds, onToggleSaved }: { onOpenProject: (project: Project) => void; savedIds: string[]; onToggleSaved: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [location, setLocation] = useState('New Cairo');
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const query = search.toLowerCase();
    return (category === 'All' || project.type === category) && (location === 'All locations' || project.location === location) && (!query || `${project.name} ${project.location} ${project.type}`.toLowerCase().includes(query));
  }), [category, location, search]);

  return (
    <div className="space-y-5 pb-8">
      <header className="animate-rise flex items-center justify-between">
        <div><p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/50">Discover</p><h1 className="serif mt-1 text-[38px] leading-none text-[#4b1e2d]">Projects</h1></div>
        <button type="button" data-testid="button-project-map" aria-label="View projects on map" className="grid size-10 place-items-center rounded-full border border-[#4b1e2d]/12 bg-[#faf6ef] text-[#4b1e2d] hover:bg-[#eadfce]"><MapPin size={17} /></button>
      </header>
      <SearchBox value={search} onChange={setSearch} />
      <div className="flex items-center gap-2">
        <CategoryPills category={category} setCategory={setCategory} />
      </div>
      <div className="flex items-center justify-between border-b border-[#4b1e2d]/10 pb-4">
        <div className="flex items-center gap-2"><MapPin size={14} className="text-[#c9a36a]" /><select aria-label="Filter by location" data-testid="select-location" value={location} onChange={(event) => setLocation(event.target.value)} className="bg-transparent text-xs font-semibold text-[#4b1e2d] outline-none"><option>New Cairo</option><option>Sheikh Zayed</option><option>6th of October</option><option>All locations</option></select><ChevronDown size={13} className="pointer-events-none -ml-1 text-[#4b1e2d]/45" /></div>
        <span data-testid="text-project-count" className="mono text-[9px] text-[#4b1e2d]/45">{filteredProjects.length} projects</span>
      </div>
      {filteredProjects.length > 0 ? <div className="grid gap-4 sm:grid-cols-2">{filteredProjects.map((project, index) => <div key={project.id} className={`animate-rise delay-${Math.min(index + 1, 4)}`}><ProjectCard project={project} saved={savedIds.includes(project.id)} onToggleSaved={() => onToggleSaved(project.id)} onOpen={() => onOpenProject(project)} /></div>)}</div> : <div data-testid="empty-projects" className="rounded-2xl border border-dashed border-[#4b1e2d]/20 bg-[#eadfce]/40 px-5 py-14 text-center"><Sparkles size={22} className="mx-auto text-[#c9a36a]" /><p className="serif mt-4 text-2xl text-[#4b1e2d]">A quieter search.</p><p className="mx-auto mt-2 max-w-[230px] text-xs leading-5 text-[#4b1e2d]/55">Nothing matches those filters yet. Try another neighbourhood or category.</p><button type="button" data-testid="button-clear-filters" onClick={() => { setSearch(''); setCategory('All'); setLocation('All locations'); }} className="mt-5 text-xs font-semibold text-[#4b1e2d] underline underline-offset-4">Clear filters</button></div>}
    </div>
  );
}

function SavedView({ savedIds, onToggleSaved, onOpenProject, onBrowse }: { savedIds: string[]; onToggleSaved: (id: string) => void; onOpenProject: (project: Project) => void; onBrowse: () => void }) {
  const savedProjects = projects.filter((project) => savedIds.includes(project.id));
  return <div className="space-y-6 pb-8"><header className="animate-rise"><p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/50">Your shortlist</p><h1 className="serif mt-1 text-[38px] leading-none text-[#4b1e2d]">Saved projects</h1><p className="mt-2 text-xs text-[#4b1e2d]/55">Places you’d like to return to.</p></header>{savedProjects.length ? <div className="grid gap-4 sm:grid-cols-2">{savedProjects.map((project) => <ProjectCard key={project.id} project={project} saved onToggleSaved={() => onToggleSaved(project.id)} onOpen={() => onOpenProject(project)} />)}</div> : <div data-testid="empty-saved" className="flex min-h-[390px] flex-col items-center justify-center rounded-[24px] border border-[#4b1e2d]/10 bg-[#eadfce]/45 px-8 text-center"><div className="grid size-16 place-items-center rounded-full border border-[#c9a36a]/60 text-[#c9a36a]"><Bookmark size={24} strokeWidth={1.3} /></div><h2 className="serif mt-5 text-3xl text-[#4b1e2d]">Keep a few close.</h2><p className="mt-2 max-w-[240px] text-xs leading-5 text-[#4b1e2d]/55">Tap the heart on any project and your shortlist will live here.</p><button type="button" data-testid="button-browse-from-saved" onClick={onBrowse} className="mt-6 rounded-full bg-[#4b1e2d] px-5 py-3 text-xs font-semibold text-[#f6f0e4] hover:bg-[#64283d]">Browse projects</button></div>}</div>;
}

function MessagesView() {
  return <div className="space-y-6 pb-8"><header className="animate-rise flex items-center justify-between"><div><p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/50">Stay in touch</p><h1 className="serif mt-1 text-[38px] leading-none text-[#4b1e2d]">Messages</h1></div><button type="button" data-testid="button-new-message" onClick={() => window.open('https://wa.me/', '_blank')} aria-label="Start a new message" className="grid size-10 place-items-center rounded-full bg-[#4b1e2d] text-[#f6f0e4]"><Send size={16} /></button></header><article className="animate-rise delay-1 rounded-[20px] border border-[#4b1e2d]/12 bg-[#faf6ef] p-5"><div className="flex items-start gap-3"><div className="grid size-11 place-items-center rounded-full bg-[#4b1e2d] text-[#c9a36a]"><span className="serif text-xl">C</span></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><p className="text-xs font-semibold text-[#4b1e2d]">Capital Hills team</p><p className="mt-0.5 text-[10px] text-[#4b1e2d]/45">Yesterday, 10:42 AM</p></div><span className="size-2 rounded-full bg-[#c9a36a]" /></div><p className="mt-4 text-sm leading-6 text-[#4b1e2d]/70">Welcome to a better way of finding home. We're here when you're ready to explore La Colina East.</p><button type="button" data-testid="button-reply-message" onClick={() => window.open('https://wa.me/', '_blank')} className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#4b1e2d]">Reply <ArrowRight size={14} /></button></div></div></article></div>;
}

function ProfileView() {
  return <div className="space-y-6 pb-8"><header className="animate-rise"><p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/50">Your account</p><h1 className="serif mt-1 text-[38px] leading-none text-[#4b1e2d]">Profile</h1></header><div className="animate-rise delay-1 flex items-center gap-4 rounded-[20px] border border-[#4b1e2d]/10 bg-[#faf6ef] p-5"><div className="grid size-14 place-items-center rounded-full bg-[#eadfce] text-[#4b1e2d]"><span className="serif text-2xl">M</span></div><div><p className="text-sm font-semibold text-[#4b1e2d]">Mohanned Ahmed</p><p className="mt-1 text-xs text-[#4b1e2d]/50">mohanned@capitalhills.com</p></div></div><div className="divide-y divide-[#4b1e2d]/10 overflow-hidden rounded-[20px] border border-[#4b1e2d]/10 bg-[#faf6ef]">{[['Viewing preferences', 'New Cairo · Apartments'], ['Saved searches', '2 active searches'], ['Notifications', 'On for new launches']].map(([label, value]) => <div key={label} className="flex w-full items-center justify-between px-5 py-4 text-left"><span><span className="block text-xs font-semibold text-[#4b1e2d]">{label}</span><span className="mt-1 block text-[10px] text-[#4b1e2d]/50">{value}</span></span></div>)}</div><button type="button" data-testid="button-sign-out" onClick={() => window.location.reload()} className="w-full rounded-full border border-[#4b1e2d]/15 py-3 text-xs font-semibold text-[#4b1e2d] hover:bg-[#eadfce]">Sign out</button></div>;
}

function DetailView({ project, onBack, saved, onToggleSaved, onFeedback }: { project: Project; onBack: () => void; saved: boolean; onToggleSaved: () => void; onFeedback: (message: string) => void }) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Details' | 'Location' | 'Payment'>('Overview');
  return (
    <div className="min-h-full bg-[#f6f0e4]">
      <div className="relative h-[48dvh] min-h-[350px] max-h-[600px] overflow-hidden">
        <img src={project.image} alt={`${project.name} exterior`} className="size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#26131b]/40 via-transparent to-[#26131b]/65" />
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between md:left-10 md:right-10 md:top-8">
          <button type="button" data-testid="button-detail-back" onClick={onBack} aria-label="Back to projects" className="grid size-10 place-items-center rounded-full bg-[#f6f0e4]/90 text-[#4b1e2d] hover:bg-[#fffaf2]"><ArrowLeft size={17} /></button>
          <div className="flex gap-2">
            <button type="button" data-testid="button-detail-save" onClick={onToggleSaved} aria-label={saved ? 'Remove from saved' : 'Save project'} className={`grid size-10 place-items-center rounded-full ${saved ? 'bg-[#c9a36a] text-[#4b1e2d]' : 'bg-[#f6f0e4]/90 text-[#4b1e2d]'}`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
            <button type="button" data-testid="button-detail-share" onClick={() => { navigator.clipboard.writeText(window.location.href); onFeedback('Link copied to clipboard!'); }} aria-label="Share project" className="grid size-10 place-items-center rounded-full bg-[#f6f0e4]/90 text-[#4b1e2d]"><Send size={16} /></button>
          </div>
        </div>
        <div className="absolute bottom-6 left-5 right-5 text-[#f6f0e4] md:left-10 md:right-10">
          <p className="mono text-[9px] uppercase tracking-[.2em] opacity-75">New Cairo · 01 / 12</p>
          <h1 className="serif mt-2 text-5xl leading-none md:text-7xl">{project.name}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-32 pt-7 md:px-10">
        <div className="flex flex-col justify-between gap-5 border-b border-[#4b1e2d]/12 pb-6 md:flex-row md:items-start">
          <div>
            <p className="mono text-[9px] uppercase tracking-[.18em] text-[#4b1e2d]/50">{project.status}</p>
            <p className="mt-1 text-sm text-[#4b1e2d]/60">Modern living in a well-connected community.</p>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] text-[#4b1e2d]/50">From</p>
            <p className="serif text-3xl text-[#4b1e2d]">{project.price}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 border-b border-[#4b1e2d]/12 py-6 text-center">
          <div><Building2 size={17} className="mx-auto mb-2 text-[#c9a36a]" /><p className="text-[10px] text-[#4b1e2d]">{project.type}</p></div>
          <div><LayoutGrid size={17} className="mx-auto mb-2 text-[#c9a36a]" /><p className="text-[10px] text-[#4b1e2d]">{project.area}</p></div>
          <div><KeyRound size={17} className="mx-auto mb-2 text-[#c9a36a]" /><p className="text-[10px] text-[#4b1e2d]">{project.beds}</p></div>
          <div><BathIcon /><p className="text-[10px] text-[#4b1e2d]">3 Baths</p></div>
        </div>
        <div className="flex gap-6 border-b border-[#4b1e2d]/12 py-4 text-[10px] text-[#4b1e2d]/50">
          {(['Overview', 'Details', 'Location', 'Payment'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-b-2 border-[#4b1e2d] pb-4 font-semibold text-[#4b1e2d]' : 'pb-4 hover:text-[#4b1e2d]'} transition-colors`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="grid gap-10 py-8 md:grid-cols-[1fr_280px]">
            <div>
              <h2 className="serif text-3xl text-[#4b1e2d]">A place with room to breathe.</h2>
              <p className="mt-4 max-w-[520px] text-sm leading-7 text-[#4b1e2d]/65">La Colina East is a thoughtfully planned community in the heart of New Cairo, offering modern homes, green spaces, and a connected lifestyle. Every detail is considered for the way life is lived now, and the years ahead.</p>
              {project.gallery && (
                <div className="mt-12 border-t border-[#4b1e2d]/10 pt-8">
                  <h3 className="serif text-2xl text-[#4b1e2d] mb-5">Gallery</h3>
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="break-inside-avoid overflow-hidden rounded-[20px] shadow-[0_4px_14px_rgba(75,30,45,.06)]">
                        <img src={img} alt={`${project.name} gallery ${i + 1}`} className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-[20px] bg-[#eadfce]/70 p-5">
              <p className="mono text-[9px] uppercase tracking-[.16em] text-[#4b1e2d]/50">Good to know</p>
              <div className="mt-4 space-y-3 text-xs text-[#4b1e2d]/70">
                <p className="flex gap-2"><Check size={14} className="shrink-0 text-[#c9a36a]" /> Phase 1 selling now</p>
                <p className="flex gap-2"><Check size={14} className="shrink-0 text-[#c9a36a]" /> Limited units available</p>
                <p className="flex gap-2"><Check size={14} className="shrink-0 text-[#c9a36a]" /> Flexible payment plans</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Details' && (
          <div className="py-8">
            <h2 className="serif text-3xl text-[#4b1e2d] mb-4">Project Details</h2>
            <ul className="space-y-4 text-sm text-[#4b1e2d]/70">
              <li><strong className="block text-xs uppercase tracking-wider text-[#4b1e2d]/50">Property Type</strong> {project.type}</li>
              <li><strong className="block text-xs uppercase tracking-wider text-[#4b1e2d]/50">Area</strong> {project.area}</li>
              <li><strong className="block text-xs uppercase tracking-wider text-[#4b1e2d]/50">Bedrooms</strong> {project.beds}</li>
              <li><strong className="block text-xs uppercase tracking-wider text-[#4b1e2d]/50">Status</strong> {project.status}</li>
            </ul>
          </div>
        )}
        {activeTab === 'Location' && (
          <div className="py-8">
            <h2 className="serif text-3xl text-[#4b1e2d] mb-4">Location</h2>
            <p className="text-sm text-[#4b1e2d]/70 mb-4">{project.location}</p>
            <div className="h-[250px] w-full max-w-2xl rounded-[20px] bg-[#eadfce]/45 overflow-hidden relative border border-[#4b1e2d]/10 flex items-center justify-center">
              <MapPin size={32} className="text-[#c9a36a]" />
            </div>
          </div>
        )}
        {activeTab === 'Payment' && (
          <div className="py-8">
            <h2 className="serif text-3xl text-[#4b1e2d] mb-4">Payment Plans</h2>
            <div className="rounded-[20px] bg-[#eadfce]/70 p-5 space-y-3 text-sm text-[#4b1e2d]/70 max-w-md">
              <p className="flex items-center gap-3"><Check size={16} className="text-[#c9a36a]" /> 10% Down payment</p>
              <p className="flex items-center gap-3"><Check size={16} className="text-[#c9a36a]" /> Up to 8 years installments</p>
              <p className="flex items-center gap-3"><Check size={16} className="text-[#c9a36a]" /> 0% Interest</p>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#4b1e2d]/10 bg-[#f6f0e4]/95 px-5 py-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
          <div className="mx-auto flex max-w-5xl gap-3">
            <button type="button" data-testid="button-contact" onClick={() => window.open('https://wa.me/', '_blank')} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#4b1e2d]/20 bg-[#faf6ef] text-xs font-semibold text-[#4b1e2d] hover:bg-[#eadfce]"><Phone size={15} /> Contact</button>
            <button type="button" data-testid="button-book-viewing" onClick={() => window.location.href = `mailto:info@capitalhills.com?subject=Book a Viewing for ${project.name}`} className="flex h-12 flex-[1.5] items-center justify-center gap-2 rounded-full bg-[#4b1e2d] text-xs font-semibold text-[#f6f0e4] hover:bg-[#64283d]"><CalendarDays size={15} /> Book a Viewing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BathIcon() {
  return <div className="mx-auto mb-2 grid size-[17px] place-items-center rounded-sm border border-[#c9a36a] text-[8px] text-[#c9a36a]">B</div>;
}

function BrowseShell() {
  const [view, setViewState] = useState<View>('home');
  const [started, setStarted] = useState(false);
  const [selectedProject, setSelectedProjectState] = useState<Project | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const notify = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 4200);
  };
  const setView = (nextView: View) => {
    if (nextView === view) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setViewState(nextView);
  };
  const setSelectedProject = (project: Project | null) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setSelectedProjectState(project);
  };
  const toggleSaved = (id: string) => {
    const isSaved = savedIds.includes(id);
    setSavedIds((current) => isSaved ? current.filter((savedId) => savedId !== id) : [...current, id]);
    notify(isSaved ? 'Removed from your saved projects.' : 'Saved to your shortlist.');
  };

  if (!started) return <Landing onStart={() => setStarted(true)} />;
  if (selectedProject) return <DetailView project={selectedProject} onBack={() => setSelectedProject(null)} saved={savedIds.includes(selectedProject.id)} onToggleSaved={() => toggleSaved(selectedProject.id)} onFeedback={notify} />;

  return <main className="grain h-[100dvh] overflow-hidden bg-[#f6f0e4] app-reveal"><div className="flex h-full w-full bg-[#f6f0e4] md:shadow-[0_0_80px_rgba(75,30,45,.06)]"><aside className="hidden h-full w-[230px] shrink-0 flex-col overflow-hidden bg-[#4b1e2d] px-7 py-8 text-[#f6f0e4] lg:flex"><Logo inverse /><div className="mt-24"><p className="mono mb-5 text-[9px] uppercase tracking-[.2em] text-[#c9a36a]">Your place to begin</p><nav className="space-y-2">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" data-testid={`button-sidebar-${id}`} onClick={() => setView(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition-colors ${view === id ? 'bg-[#f6f0e4] font-semibold text-[#4b1e2d]' : 'text-[#f6f0e4]/65 hover:bg-[#64283d] hover:text-[#f6f0e4]'}`}><Icon size={16} strokeWidth={1.7} />{label}{id === 'saved' && savedIds.length > 0 ? <span className="ml-auto rounded-full bg-[#c9a36a] px-1.5 py-0.5 text-[9px] text-[#4b1e2d]">{savedIds.length}</span> : null}</button>)}</nav></div><div className="mt-auto border-t border-[#f6f0e4]/15 pt-6"><p className="text-[11px] leading-5 text-[#f6f0e4]/55">Thoughtfully planned communities.<br />A better tomorrow.</p><button type="button" data-testid="button-desktop-switch-account" onClick={() => setView('profile')} className="mt-5 flex items-center gap-2 text-xs text-[#c9a36a]"><CircleUserRound size={15} /> Mohanned Ahmed</button></div></aside><section className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto"><img src={capitalHillsMark} alt="" aria-hidden="true" className="watermark watermark-dark pointer-events-none absolute -right-24 top-[18%] z-0 size-[360px] object-contain lg:size-[520px]" /><header className="relative z-10 flex h-[76px] items-center justify-between border-b border-[#4b1e2d]/10 px-5 md:px-10 lg:px-14"><div className="lg:hidden"><Logo /></div><div className="hidden lg:block"><p className="mono text-[9px] uppercase tracking-[.2em] text-[#4b1e2d]/45">{view === 'home' ? '' : 'Capital Hills / ' + view}</p></div><div className="flex items-center gap-2"><button type="button" data-testid="button-header-search" onClick={() => setView('projects')} aria-label="Search projects" className="grid size-9 place-items-center rounded-full text-[#4b1e2d] hover:bg-[#eadfce]"><Search size={17} /></button><button type="button" data-testid="button-header-profile" onClick={() => setView('profile')} aria-label="Open profile" className="ml-1 grid size-9 place-items-center rounded-full bg-[#eadfce] text-xs font-semibold text-[#4b1e2d]">MA</button></div></header><div key={view} className="relative z-10 screen-content px-5 pb-8 pt-8 md:px-10 md:pt-12 lg:px-14">{view === 'home' && <HomeView onOpenProject={setSelectedProject} savedIds={savedIds} onToggleSaved={toggleSaved} onBrowse={() => setView('projects')} />}{view === 'projects' && <ProjectsView onOpenProject={setSelectedProject} savedIds={savedIds} onToggleSaved={toggleSaved} />}{view === 'saved' && <SavedView savedIds={savedIds} onToggleSaved={toggleSaved} onOpenProject={setSelectedProject} onBrowse={() => setView('projects')} />}{view === 'messages' && <MessagesView />}{view === 'profile' && <ProfileView />}</div></section><nav className="safe-bottom fixed bottom-0 left-0 right-0 z-30 flex border-t border-[#4b1e2d]/10 bg-[#f6f0e4]/95 px-2 pt-2 backdrop-blur-lg lg:hidden">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" data-testid={`button-mobile-${id}`} onClick={() => setView(id)} className={`relative flex flex-1 flex-col items-center gap-1 py-1.5 text-[9px] transition-colors ${view === id ? 'font-semibold text-[#4b1e2d]' : 'text-[#4b1e2d]/45'}`}><Icon size={18} strokeWidth={view === id ? 2 : 1.5} />{label}{view === id ? <span className="absolute -top-2 size-1 rounded-full bg-[#c9a36a]" /> : null}</button>)}</nav></div><ContactFab />{feedback ? <Toast message={feedback} onClose={() => setFeedback('')} /> : null}</main>;
}

function ContactFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12">
      {isOpen && (
        <div className="animate-rise flex flex-col items-end gap-3 mb-2">
          <button className="flex items-center gap-3 rounded-full bg-[#faf6ef] px-4 py-2.5 text-xs font-semibold text-[#4b1e2d] shadow-[0_4px_14px_rgba(75,30,45,.12)] transition-transform hover:-translate-y-0.5" onClick={() => window.open('https://wa.me/', '_blank')}>
            WhatsApp <MessageCircle size={15} className="text-[#c9a36a]" />
          </button>
          <button className="flex items-center gap-3 rounded-full bg-[#faf6ef] px-4 py-2.5 text-xs font-semibold text-[#4b1e2d] shadow-[0_4px_14px_rgba(75,30,45,.12)] transition-transform hover:-translate-y-0.5" onClick={() => window.location.href = 'tel:+1234567890'}>
            Call Us <Phone size={15} className="text-[#c9a36a]" />
          </button>
          <button className="flex items-center gap-3 rounded-full bg-[#faf6ef] px-4 py-2.5 text-xs font-semibold text-[#4b1e2d] shadow-[0_4px_14px_rgba(75,30,45,.12)] transition-transform hover:-translate-y-0.5" onClick={() => window.location.href = 'mailto:info@capitalhills.com'}>
            Email <Mail size={15} className="text-[#c9a36a]" />
          </button>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="grid size-14 place-items-center rounded-full bg-[#4b1e2d] text-[#c9a36a] shadow-[0_8px_20px_rgba(75,30,45,.25)] transition-transform hover:scale-105 active:scale-95"
        aria-label="Contact options"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

function Router() {
  return <ErrorBoundary resetKey={window.location.pathname}><Switch><Route path="/" component={BrowseShell} /><Route component={() => <div className="grid min-h-[100dvh] place-items-center bg-[#f6f0e4] text-[#4b1e2d]"><p className="serif text-4xl">Page not found.</p></div>} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;