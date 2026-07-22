import {
    KanbanSquare,
    LayoutDashboard,
    SlidersHorizontal,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

const previewApplications = [
    { company: "Vercel", title: "Frontend Engineer", status: "Interview" },
    { company: "Stripe", title: "Backend Developer", status: "Applied" },
    { company: "Linear", title: "Product Designer", status: "Offer" },
];

const statusBadgeClass = {
    Saved: "badge-neutral",
    Applied: "badge-info",
    Assessment: "badge-warning",
    Interview: "badge-warning",
    Rejected: "badge-error",
    Offer: "badge-success",
};

export default function LandingPage() {
    return (
        <div className="min-h-screen text-white">
            <Navbar />

            {/* ================= HERO ================= */}
            <section className="relative px-6 lg:px-16 pt-20 pb-24">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="badge badge-outline badge-lg mb-6 gap-2 py-4 border-white/20 text-white/80">
                            Built for the modern job hunt
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
                            Every application,
                            <br />
                            <span className="text-primary">one place to track it.</span>
                        </h1>
                        <p className="text-lg text-white/60 mb-8 max-w-md">
                            Stop losing track of where you applied. CareerTrack Lite keeps
                            every company, status, and follow-up organized — so you can
                            focus on interviews, not spreadsheets.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/register" className="btn btn-primary">
                                Start tracking free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a href="#how-it-works" className="btn btn-outline border-white/20 text-white">
                                See how it works
                            </a>
                        </div>
                    </div>

                    {/* Signature element — glass preview card, rounded */}
                    <div className="relative">
                        <div className="glass-surface rounded-2xl shadow-2xl hover:border-white/20 hover:shadow-primary/10 transition-all duration-300">
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-white/60">
                                        Your Applications
                                    </span>
                                    <span className="badge badge-ghost badge-sm text-white/70">
                                        {previewApplications.length} active
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {previewApplications.map((app) => (
                                        <div
                                            key={app.company}
                                            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-white/20 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium text-sm">{app.company}</p>
                                                <p className="text-xs text-white/50">{app.title}</p>
                                            </div>
                                            <span className={`badge ${statusBadgeClass[app.status]} badge-sm`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-5 -left-5 card bg-primary text-primary-content shadow-lg hidden sm:block rounded-xl">
                            <div className="card-body p-4">
                                <p className="text-xs opacity-80">This month</p>
                                <p className="text-2xl font-bold">+12 applied</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section id="features" className="px-6 lg:px-16 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-xl mb-14">
                        <h2 className="text-3xl font-bold tracking-tight mb-3">
                            Everything the job hunt actually needs
                        </h2>
                        <p className="text-white/60">
                            No noise, no unnecessary features — just the tools to stay
                            organized from first application to offer letter.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: KanbanSquare,
                                title: "Full CRUD tracking",
                                desc: "Add, edit, and remove applications in seconds. Every detail — company, role, source — stays in sync.",
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
                                desc: "JWT-secured accounts mean your applications are visible to you, and only you.",
                            },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="glass-surface rounded-xl p-6 hover:border-primary/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="text-sm text-white/60">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section id="how-it-works" className="px-6 lg:px-16 py-24">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-14 text-center">
                        Three steps. Zero friction.
                    </h2>

                    <ul className="steps steps-vertical lg:steps-horizontal w-full">
                        <li className="step step-primary">
                            <div className="text-left lg:text-center pt-4 max-w-xs mx-auto">
                                <p className="font-semibold mb-1">Create your account</p>
                                <p className="text-sm text-white/50">
                                    Register with email — your data is scoped to you from the
                                    first click.
                                </p>
                            </div>
                        </li>
                        <li className="step step-primary">
                            <div className="text-left lg:text-center pt-4 max-w-xs mx-auto">
                                <p className="font-semibold mb-1">Log an application</p>
                                <p className="text-sm text-white/50">
                                    Company, role, source, and status — added in under 15
                                    seconds.
                                </p>
                            </div>
                        </li>
                        <li className="step step-primary">
                            <div className="text-left lg:text-center pt-4 max-w-xs mx-auto">
                                <p className="font-semibold mb-1">Track it to the offer</p>
                                <p className="text-sm text-white/50">
                                    Update status as you move through interviews, right up to
                                    the offer.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* ================= PIPELINE SHOWCASE ================= */}
            <section id="pipeline" className="px-6 lg:px-16 py-24 border-t border-white/10">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">
                        Follow every stage of your pipeline
                    </h2>
                    <p className="text-white/60 mb-12 max-w-lg mx-auto">
                        Six statuses map to exactly how a real application moves —
                        nothing invented, nothing missing.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {["Saved", "Applied", "Assessment", "Interview", "Rejected", "Offer"].map(
                            (status) => (
                                <span
                                    key={status}
                                    className={`badge ${statusBadgeClass[status]} badge-lg px-5 py-4`}
                                >
                                    {status}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <section className="px-6 lg:px-16 py-24 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Your next offer starts with staying organized
                    </h2>
                    <p className="text-white/60 mb-8">
                        Free to use. No credit card. Just a cleaner way to job hunt.
                    </p>
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Create your free account
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="footer footer-center px-6 py-10 border-t border-white/10 text-white/50">
                <div>
                    <div className="flex items-center gap-2 font-semibold text-white mb-1">
                        <KanbanSquare className="h-4 w-4 text-primary" />
                        CareerTrack Lite
                    </div>
                    <p className="text-xs">Built as a full-stack project — CareerTrack Lite © 2026</p>
                </div>
            </footer>
        </div>
    );
}
