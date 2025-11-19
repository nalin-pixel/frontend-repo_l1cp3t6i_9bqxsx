import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Lightbox({ src, onClose }: { src: string|null, onClose: () => void }){
  useEffect(()=>{
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[])

  if(!src) return null
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4 lightbox-enter" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20"><X/></button>
        <img src={src} className="w-full h-auto rounded-xl shadow-2xl" alt="Preview" />
      </div>
    </div>
  )
}
