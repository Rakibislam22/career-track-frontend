import { useState } from "react";
import {
    KanbanSquare,
    LayoutDashboard,
    SlidersHorizontal,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Clock,
    Sparkles,
    ExternalLink,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

const previewApplications = [
    {
        id: "1",
        company: "Vercel",
        title: "Frontend Engineer",
        status: "Interview",
        date: "2 days ago",
        notes: "Technical round scheduled for Thursday at 3 PM.",
    },
    {
        id: "2",
        company: "Stripe",
        title: "Backend Developer",
        status: "Applied",
        date: "5 days ago",
        notes: "Application submitted via referral. Waiting for recruiter review.",
    },
    {
        id: "3",
        company: "Linear",
        title: "Product Designer",
        status: "Offer",
        date: "1 week ago",
        notes: "Received offer package! Reviewing benefits and equity.",
    },
];

const statusBadgeClass = {
    Saved: "badge-neutral border border-white/20 text-white/80",
    Applied: "badge-info text-white",
    Assessment: "badge-warning text-white",
    Interview: "badge-warning text-white",
    Rejected: "badge-error text-white",
    Offer: "badge-success text-white",
};

const pipelineStages = [
    { name: "Saved", desc: "Bookmark job openings to apply to later", badge: "badge-neutral" },
    { name: "Applied", desc: "Keep track of submitted resumes and dates", badge: "badge-info" },
    { name: "Assessment", desc: "Track take-home projects and coding tests", badge: "badge-warning" },
    { name: "Interview", desc: "Stay prepared for recruiter, tech, and culture rounds", badge: "badge-warning" },
    { name: "Offer", desc: "Celebrate and evaluate incoming offers", badge: "badge-success" },
    { name: "Rejected", desc: "Maintain data without cluttering active conversations", badge: "badge-error" },
];

export default function LandingPage() {
    const [selectedAppId, setSelectedAppId] = useState("1");
    const activeApp = previewApplications.find((a) => a.id === selectedAppId) || previewApplications[0];

    return (
        <div className="min-h-screen text-white selection:bg-primary selection:text-white flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* ================= HERO ================= */}
                <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        <div className="lg:col-span-7 flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-300 mb-6 shadow-sm">
                                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                <span>Built for the modern job hunt</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                                Every application,
                                <br />
                                <span className="text-primary drop-shadow-sm">one place to track it.</span>
                            </h1>

                            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                                Stop losing track of where you applied. CareerTrack Lite keeps
                                every company, status, and follow-up organized — so you can
                                focus on landing interviews, not managing messy spreadsheets.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                                <Link
                                    to="/register"
                                    className="btn btn-primary btn-md sm:btn-lg gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all justify-center"
                                >
                                    <span>Start tracking free</span>
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="btn btn-outline border-white/25 text-white hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all justify-center"
                                >
                                    See how it works
                                </a>
                            </div>

                            {/* Trust metrics */}
                            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left w-full max-w-md">
                                <div>
                                    <p className="text-2xl font-bold text-white">100%</p>
                                    <p className="text-xs text-white/70">Free to use</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">&lt; 15s</p>
                                    <p className="text-xs text-white/70">To log a job</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">Private</p>
                                    <p className="text-xs text-white/70">JWT secured</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Preview Component */}
                        <div className="lg:col-span-5 relative w-full">
                            <div className="glass-surface rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/15 relative z-10 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-error/70"></div>
                                        <div className="h-3 w-3 rounded-full bg-warning/70"></div>
                                        <div className="h-3 w-3 rounded-full bg-success/70"></div>
                                        <span className="text-xs font-semibold text-white/70 ml-2">
                                            Interactive Live Preview
                                        </span>
                                    </div>
                                    <span className="badge badge-neutral text-white/80 badge-sm font-mono">
                                        3 active
                                    </span>
                                </div>

                                <p className="text-xs text-white/60 mb-3">
                                    Click any row below to preview details:
                                </p>

                                <div className="flex flex-col gap-2.5" role="list">
                                    {previewApplications.map((app) => {
                                        const isSelected = app.id === selectedAppId;
                                        return (
                                            <button
                                                key={app.id}
                                                type="button"
                                                onClick={() => setSelectedAppId(app.id)}
                                                className={`w-full text-left flex items-center justify-between rounded-xl p-3 sm:p-3.5 transition-all focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                                                        ? "bg-white/15 border-primary/60 shadow-md shadow-primary/10 border"
                                                        : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                                                    }`}
                                                aria-label={`View ${app.company} application details`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
                                                        {app.company[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-white">{app.company}</p>
                                                        <p className="text-xs text-white/70">{app.title}</p>
                                                    </div>
                                                </div>
                                                <span className={`badge ${statusBadgeClass[app.status]} badge-sm font-medium`}>
                                                    {app.status}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Active Application Details Snippet */}
                                <div className="mt-4 pt-4 border-t border-white/10 bg-black/20 rounded-xl p-3.5 text-xs">
                                    <div className="flex items-center justify-between text-white/70 mb-1.5">
                                        <span className="font-semibold text-white">{activeApp.company} Notes</span>
                                        <span className="flex items-center gap-1 text-white/50">
                                            <Clock className="h-3 w-3" /> {activeApp.date}
                                        </span>
                                    </div>
                                    <p className="text-white/80 italic">&ldquo;{activeApp.notes}&rdquo;</p>
                                </div>
                            </div>

                            {/* Floating Highlight Badge */}
                            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-4 sm:-left-4 bg-primary text-primary-content shadow-xl rounded-xl p-3.5 flex items-center gap-3 z-20 border border-emerald-400/20">
                                <div className="h-8 w-8 rounded-full bg-black/20 flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/90 font-medium">This month</p>
                                    <p className="text-xl font-extrabold text-white leading-tight">+12 Applied</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= FEATURES ================= */}
                <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-2xl mb-14">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                                Everything the job hunt actually needs
                            </h2>
                            <p className="text-base text-white/80 leading-relaxed">
                                No noise, no unnecessary features — just the streamlined tools to stay
                                organized from first application to final offer letter.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: KanbanSquare,
                                    title: "Full CRUD tracking",
                                    desc: "Add, edit, and remove applications in seconds. Keep company, role, salary, and notes in sync.",
                                },
                                {
                                    icon: LayoutDashboard,
                                    title: "Live dashboard",
                                    desc: "See totals, interviews, and offers at a glance, updated the moment your pipeline changes.",
                                },
                                {
                                    icon: SlidersHorizontal,
                                    title: "Search & filter",
                                    desc: "Find any application instantly by company, title, status, or source — sorted your way.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Private by design",
                                    desc: "JWT-secured accounts ensure your job hunt data is private and visible only to you.",
                                },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="glass-surface rounded-xl p-6 hover:border-primary/50 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                                            <Icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                        <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= HOW IT WORKS ================= */}
                <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-white/[0.02] border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                                Three steps. Zero friction.
                            </h2>
                            <p className="text-base text-white/80">
                                Get set up in seconds and start managing your search right away.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {[
                                {
                                    step: "01",
                                    title: "Create your account",
                                    desc: "Register with your email in under 30 seconds. Your data is isolated and encrypted from click one.",
                                },
                                {
                                    step: "02",
                                    title: "Log an application",
                                    desc: "Company, role, job post link, and initial status — added effortlessly in under 15 seconds.",
                                },
                                {
                                    step: "03",
                                    title: "Track it to the offer",
                                    desc: "Update statuses as you progress through screening, technical rounds, and offer negotiation.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className="glass-surface rounded-2xl p-6 sm:p-8 flex flex-col border border-white/10 relative"
                                >
                                    <div className="text-3xl font-black text-primary/40 font-mono mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-white/75 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= PIPELINE SHOWCASE ================= */}
                <section id="pipeline" className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-white/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                            Follow every stage of your pipeline
                        </h2>
                        <p className="text-base text-white/80 mb-12 max-w-xl mx-auto leading-relaxed">
                            Six clear statuses accurately reflect how modern hiring pipelines move —
                            nothing missing, nothing overcomplicated.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {pipelineStages.map((stage) => (
                                <div
                                    key={stage.name}
                                    className="glass-surface rounded-xl p-4 flex items-center gap-3 border border-white/10 hover:border-white/20 transition-colors text-left"
                                >
                                    <span className={`badge ${stage.badge} font-semibold py-3 px-3 shrink-0`}>
                                        {stage.name}
                                    </span>
                                    <p className="text-xs text-white/75 leading-snug">{stage.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= FINAL CTA ================= */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-white/10 text-center bg-gradient-to-b from-transparent to-primary/10">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                            Your next offer starts with staying organized
                        </h2>
                        <p className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
                            Free forever for individual job seekers. No credit card required.
                        </p>
                        <Link
                            to="/register"
                            className="btn btn-primary btn-lg gap-2 shadow-xl shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all"
                        >
                            <span>Create your free account</span>
                            <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="border-t border-white/10 bg-[#0a0f16] px-4 sm:px-6 lg:px-8 py-12 text-white/70">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-white mb-3">
                        <KanbanSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>CareerTrack <span className="text-primary">Lite</span></span>
                    </div>

                    <p className="text-sm text-white/80 mb-2">
                        Crafted with care by{" "}
                        <a
                            href="https://mdrakibali.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
                            aria-label="Md Rakib Ali's personal website (opens in a new tab)"
                        >
                            <span>Md Rakib Ali</span>
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                    </p>

                    <p className="text-xs text-white/60 max-w-md mb-6">
                        Track applications • Stay organized • Land your dream job
                    </p>

                    <div className="h-px w-24 bg-white/10 mb-6"></div>

                    <p className="text-xs text-white/50">
                        © {new Date().getFullYear()} CareerTrack Lite. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
