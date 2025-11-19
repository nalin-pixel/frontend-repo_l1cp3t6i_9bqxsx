import Navbar from '../components/Navbar'
import Lightbox from '../components/Lightbox'
import { useState } from 'react'

const team = [
  { name: 'Ayu Pratama', role: 'Program Lead', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Budi Santoso', role: 'Education', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop' },
  { name: 'Siti Nurhaliza', role: 'Community', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Rangga Putra', role: 'Developer', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop' },
]

export default function About(){
  const [preview, setPreview] = useState<string|null>(null)

  return (
    <div>
      <div className="mesh-bg"/>
      <Navbar/>

      <main className="pt-28 mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">We are a multidisciplinary team building delightful education tools that help Indonesians live more sustainably.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {team.map((m)=> (
            <button key={m.name} onClick={()=>setPreview(m.img)} className="group glass rounded-2xl overflow-hidden text-left">
              <img src={m.img} alt={m.name} className="h-48 w-full object-cover group-hover:scale-105 transition will-change-transform"/>
              <div className="p-4">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-slate-400">{m.role}</div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Lightbox src={preview} onClose={()=>setPreview(null)}/>
    </div>
  )
}
