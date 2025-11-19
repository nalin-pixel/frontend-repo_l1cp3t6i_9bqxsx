import Navbar from '../components/Navbar'
import TiltCard from '../components/TiltCard'
import EcoBot from '../components/EcoBot'
import { Leaf, Recycle, Rocket, Sparkles, TreePine } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <div className="mesh-bg"/>
      <Navbar/>

      <main className="pt-28">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              EcoDigital Nusantara
            </h1>
            <p className="mt-4 text-slate-300 max-w-xl">Empowering Indonesia through tech-driven environmental education, tools, and community programs.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/education" className="card-pop px-5 py-3 rounded-xl bg-emerald-500 text-slate-900 font-medium">Start Learning</Link>
              <Link to="/about" className="card-pop px-5 py-3 rounded-xl glass">About Us</Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-2"><TreePine className="text-emerald-400" size={18}/>Carbon-aware</div>
              <div className="flex items-center gap-2"><Recycle className="text-emerald-400" size={18}/>Circular</div>
              <div className="flex items-center gap-2"><Sparkles className="text-emerald-400" size={18}/>AI Assisted</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Leaf, title: 'Green Programs', desc: 'Community clean-ups & tree planting' },
              { icon: Rocket, title: 'Innovation', desc: 'Tech-powered eco solutions' },
              { icon: Recycle, title: 'Waste Smart', desc: 'Recycle right, every time' },
              { icon: Sparkles, title: 'Eco Tips', desc: 'Daily actions that matter' },
            ].map((c,i)=> (
              <TiltCard key={i}>
                <div className="h-full">
                  <c.icon className="text-emerald-400"/>
                  <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
                  <p className="text-slate-300 text-sm">{c.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Program Features */}
        <section className="mx-auto max-w-7xl px-4 mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold">Program Features</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Waste Calculator', 'Eco-Tip Generator', 'Photo Gallery', 'Community Map', 'Workshops', 'Green Challenges'].map((t,i)=> (
              <div key={i} className="card-pop glass rounded-2xl p-5">
                <h3 className="font-semibold">{t}</h3>
                <p className="text-sm text-slate-300 mt-1">Learn, measure, and take action with beautiful, fast tools.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <EcoBot/>
    </div>
  )
}
