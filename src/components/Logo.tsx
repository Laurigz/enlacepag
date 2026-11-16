export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/logo-enlace-mark.webp" alt="" aria-hidden="true" width={256} height={159} className="h-7 w-auto" />
      <span className="text-[17px] font-extrabold tracking-[-0.02em] text-ink">
        Enlace<span className="text-cobalt">Studio</span>
      </span>
    </span>
  )
}
