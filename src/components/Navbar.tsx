import { useEffect, useState } from 'react'
import { Menu, Leaf, Bot, Info, BookOpen, GraduationCap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(()=>{ setOpen(false) }, [location.pathname])

  const link = 'px-4 py-2 rounded-xl hover:bg-white/10 transition text-sm font-medium'

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled? 'py-2':'py-4'}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass rounded-2xl ${scrolled? 'py-2':'py-3'} px-4 flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 grid place-items-center text-emerald-400">
              <Leaf size={18}/>
            </div>
            <span className="font-semibold tracking-tight">EcoDigital Nusantara</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={link}><BookOpen className="inline mr-2" size={16}/>Home</Link>
            <Link to="/about" className={link}><Info className="inline mr-2" size={16}/>About</Link>
            <Link to="/education" className={link}><GraduationCap className="inline mr-2" size={16}/>Education</Link>
            <Link to="/guide" className={link}><Bot className="inline mr-2" size={16}/>Guide</Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={()=>setOpen(!open)}>
            <Menu/>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-2 space-y-1">
            <Link to="/" className={link}>Home</Link>
            <Link to="/about" className={link}>About</Link>
            <Link to="/education" className={link}>Education</Link>
            <Link to="/guide" className={link}>Guide</Link>
          </div>
        )}
      </div>
    </div>
  )
}
