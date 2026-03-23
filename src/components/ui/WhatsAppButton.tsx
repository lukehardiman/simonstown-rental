'use client'

const WA_MESSAGE = "Hi, I'm interested in booking Thomas Street House in Simon's Town."

export function WhatsAppButton({
  number,
  className,
  children,
}: {
  number: string
  className?: string
  children: React.ReactNode
}) {
  function handleClick() {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(WA_MESSAGE)}`
    window.open(url, '_blank', 'noopener')
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
