import { useEffect, useRef } from 'react'
import './Noise.css'

export type NoiseProps = {
  /** Frames between grain redraws (@react-bits default: 2) */
  patternRefreshInterval?: number
  /** Grain alpha 0–255 (@react-bits default: 15) */
  patternAlpha?: number
}

/**
 * @react-bits/Noise-JS-CSS (installed via shadcn registry), typed for this project.
 * Canvas film-grain overlay; respects `prefers-reduced-motion`.
 */
export function Noise({
  patternRefreshInterval = 2,
  patternAlpha = 14,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId = 0
    const canvasSize = 1024

    const resize = () => {
      if (!canvas) return
      canvas.width = canvasSize
      canvas.height = canvasSize
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
    }

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain()
      }
      frame++
      animationId = window.requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize()
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationId)
    }
  }, [patternRefreshInterval, patternAlpha])

  return (
    <canvas
      ref={grainRef}
      className="noise-overlay"
      aria-hidden
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

export default Noise
