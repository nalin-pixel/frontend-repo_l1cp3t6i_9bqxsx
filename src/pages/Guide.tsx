import Navbar from '../components/Navbar'

export default function Guide(){
  const dos = [
    'Bilas wadah makanan/minuman sebelum didaur ulang',
    'Pisahkan organik (basah) dan anorganik (kering)',
    'Gunakan kantong terpisah untuk B3 (baterai, lampu, elektronik)'
  ]
  const donts = [
    'Jangan campur minyak/oli dengan sampah lain',
    'Jangan membakar sampah plastik',
    'Jangan memasukkan barang berbahaya ke tong umum'
  ]

  return (
    <div>
      <div className="mesh-bg"/>
      <Navbar/>

      <main className="pt-28 mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold">Do's and Don'ts</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="glass rounded-2xl p-6 card-pop">
            <h2 className="font-semibold text-emerald-400">Do's</h2>
            <ul className="mt-2 list-disc list-inside text-slate-300 space-y-1">
              {dos.map((d,i)=> <li key={i}>{d}</li>)}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6 card-pop">
            <h2 className="font-semibold text-rose-400">Don'ts</h2>
            <ul className="mt-2 list-disc list-inside text-slate-300 space-y-1">
              {donts.map((d,i)=> <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
