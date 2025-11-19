import Navbar from '../components/Navbar'
import { Calculator, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

type Material = {
  name: string
  pricePerKg: number
}

const materials: Material[] = [
  { name: 'Plastic (PET)', pricePerKg: 4500 },
  { name: 'Aluminium', pricePerKg: 14000 },
  { name: 'Paper/Cardboard', pricePerKg: 2500 },
  { name: 'Glass', pricePerKg: 800 },
  { name: 'E-waste (mixed)', pricePerKg: 3000 },
]

export default function Education(){
  // Waste calculator state
  const [selected, setSelected] = useState<Material>(materials[0])
  const [weight, setWeight] = useState<number>(1)

  const value = useMemo(()=> (selected.pricePerKg * (weight||0)).toLocaleString('id-ID', { style:'currency', currency:'IDR' }), [selected, weight])

  // Eco tip generator
  const [tip, setTip] = useState('')
  const [loading, setLoading] = useState(false)

  async function getTip(){
    setLoading(true)
    try{
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const res = await model.generateContent('Give one actionable eco tip for Indonesian households in 40 words or less. Use Bahasa Indonesia.')
      setTip(res.response.text())
    }catch{ setTip('Tidak bisa mengambil saran saat ini. Coba lagi nanti.') }
    finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="mesh-bg"/>
      <Navbar/>

      <main className="pt-28 mx-auto max-w-7xl px-4 space-y-10">
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 card-pop">
            <div className="flex items-center gap-2 mb-3"><Calculator className="text-emerald-400"/><h2 className="font-semibold text-lg">Waste Calculator</h2></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-300">Material</label>
                <select value={selected.name} onChange={e=> setSelected(materials.find(m=>m.name===e.target.value) || materials[0])} className="mt-1 w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  {materials.map(m=> <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300">Weight (kg)</label>
                <input type="number" min={0} step={0.1} value={weight} onChange={e=> setWeight(parseFloat(e.target.value))} className="mt-1 w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10"/>
              </div>
            </div>
            <div className="mt-4 text-slate-300">Estimated value</div>
            <div className="text-3xl font-extrabold text-emerald-400">{value}</div>
          </div>

          <div className="glass rounded-2xl p-6 card-pop">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="text-emerald-400"/><h2 className="font-semibold text-lg">Eco-Tip Generator</h2></div>
            <button onClick={getTip} disabled={loading} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 disabled:opacity-60">{loading? 'Generating...' : 'Generate Tip'}</button>
            <p className="mt-3 text-slate-300 min-h-[3rem]">{tip}</p>
          </div>
        </section>

        <section className="glass rounded-2xl p-6 card-pop">
          <div className="flex items-center gap-2"><ImageIcon className="text-emerald-400"/><h2 className="font-semibold text-lg">Photo Gallery</h2></div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from({length:8}).map((_,i)=> (
              <img key={i} className="rounded-xl object-cover h-32 w-full hover:scale-105 transition will-change-transform" src={`https://images.unsplash.com/photo-15${40+i}d?auto=format&fit=crop&w=600&q=60`} alt="gallery"/>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
