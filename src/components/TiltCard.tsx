import { PropsWithChildren, useEffect, useRef } from 'react'

export default function TiltCard({ children }: PropsWithChildren){
  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const el = ref.current!
    let raf = 0
    function onMove(e: MouseEvent){
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(()=>{
        el.style.transform = `rotateY(${px*10}deg) rotateX(${-py*10}deg)`
      })
    }
    function reset(){ el.style.transform = 'rotateY(0) rotateX(0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return ()=>{ el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', reset); cancelAnimationFrame(raf) }
  },[])

  return (
    <div ref={ref} className="tilt rounded-2xl glass card-pop p-6">
      <div className="tilt-inner">
        {children}
      </div>
    </div>
  )
}
