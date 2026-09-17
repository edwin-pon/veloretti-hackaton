import blackWordmark from '../assets/veloretti-wordmark-black.svg'
import whiteWordmark from '../assets/veloretti-wordmark-white.svg'

/**
 * The official wordmark. The brand guide is explicit: never redraw or recolour
 * it, and keep clear space around it — hence the fixed aspect and the two
 * supplied colour variants only.
 */
export default function Wordmark({
  width = 148,
  variant = 'black',
}: {
  width?: number
  variant?: 'black' | 'white'
}) {
  return (
    <img
      src={variant === 'white' ? whiteWordmark : blackWordmark}
      alt="Veloretti"
      width={width}
      height={Math.round((width / 338.7) * 38.9)}
      style={{ display: 'block' }}
    />
  )
}
