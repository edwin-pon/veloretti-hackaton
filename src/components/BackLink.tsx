/**
 * Block-level so it never shares a line with the eyebrow that follows it —
 * an inline button next to an inline label renders as "Back to onboardingSTEP 01".
 */
export default function BackLink({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      className="vr-underline"
      onClick={onClick}
      style={{
        display: 'block',
        width: 'fit-content',
        fontSize: 'var(--fs-body-s)',
        marginBottom: 32,
      }}
    >
      {children}
    </button>
  )
}
