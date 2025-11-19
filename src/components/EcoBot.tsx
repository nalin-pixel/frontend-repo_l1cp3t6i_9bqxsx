import { useState } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

export default function EcoBot(){
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<{role:'user'|'bot',text:string}[]>([])

  async function ask(){
    if(!input.trim()) return
    setLoading(true)
    setHistory(h=>[...h, {role:'user', text: input}])
    setInput('')
    try{
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const prompt = `You are EcoBot, a helpful sustainability assistant for Indonesian users. Keep answers concise and actionable. Question: ${input}`
      const res = await model.generateContent(prompt)
      const text = res.response.text()
      setHistory(h=>[...h, {role:'bot', text}])
    }catch(e:any){
      setHistory(h=>[...h, {role:'bot', text: 'Sorry, I could not fetch tips right now.'}])
    }finally{ setLoading(false) }
  }

  return (
    <>
      <button aria-label="Open EcoBot" onClick={()=>setOpen(!open)} className="fixed z-50 bottom-6 right-6 h-14 w-14 rounded-2xl bg-emerald-500 text-slate-900 shadow-[0_12px_0_rgba(16,185,129,0.7)] hover:translate-y-[-2px] hover:shadow-[0_14px_0_rgba(16,185,129,0.7)] active:translate-y-0 active:shadow-[0_12px_0_rgba(16,185,129,0.7)] grid place-items-center">
        <Bot/>
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 w-[min(420px,calc(100vw-2rem))] glass rounded-2xl p-4 card-pop">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-emerald-400"/>
            <h3 className="font-semibold">EcoBot</h3>
          </div>
          <div className="max-h-72 overflow-auto space-y-2 pr-1">
            {history.map((m,i)=> (
              <div key={i} className={`text-sm ${m.role==='user'? 'text-slate-100':'text-emerald-300'}`}>{m.text}</div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') ask() }} placeholder="Ask EcoBot about recycling..." className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"/>
            <button onClick={ask} disabled={loading} className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-900 disabled:opacity-60"><Send size={16}/></button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Powered by Google Gemini</p>
        </div>
      )}
    </>
  )
}
