import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import ImgHigh from '@/assets/img-high.jpg'

export default function HeavyComponent() {
  const [data, setData] = useState<number[]>([])

  // Simulasi perhitungan berat (Fibonacci)
  function expensiveCalculation(n: number): number {
    if (n <= 1) return n
    return expensiveCalculation(n - 1) + expensiveCalculation(n - 2)
  }

  useEffect(() => {
    const calculatedData = Array.from({ length: 20 }, (_, i) =>
      expensiveCalculation(i),
    )
    setData(calculatedData)
  }, [])

  return (
    <div>
      <h2>🔥 Heavy Component Rendered!</h2>

      {/* Grafik Berat */}
      <Line
        data={{
          labels: data.map((_, i) => `Step ${i}`),
          datasets: [{ label: 'Fibonacci', data, borderColor: 'red' }],
        }}
      />

      {/* Gambar Besar */}
      <img {...ImgHigh} />

      <p>Data Fibonacci (berat dihitung): {JSON.stringify(data)}</p>
    </div>
  )
}
