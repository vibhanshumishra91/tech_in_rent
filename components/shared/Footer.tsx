export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-700 to-emerald-700 text-sm font-bold">
              TR
            </span>
            <span className="text-lg font-medium">TechInRent</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            We help professionals and teams accelerate LinkedIn growth through secure account solutions,
            transparent support, and measurable outcomes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-slate-200">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="#services" className="transition hover:text-white">Services</a></li>
            <li><a href="#why-us" className="transition hover:text-white">Why Us</a></li>
            <li><a href="#contact" className="transition hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-slate-200">Get in Touch</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="mailto:hello@techinrent.com" className="transition hover:text-white">hello@techinrent.com</a></li>
            <li><a href="https://t.me/techinrentadmin" className="transition hover:text-white">Telegram</a></li>
            <li><a href="https://wa.me/919999999999" className="transition hover:text-white">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 TechInRent. All rights reserved.</p>
          <p>Built for secure, scalable LinkedIn growth.</p>
        </div>
      </div>
    </footer>
  );
}
