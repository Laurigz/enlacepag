import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react"
import { INSTAGRAM, RUBROS_OPCIONES, SERVICIOS_OPCIONES, type ServicioOpcion } from "../data/content"
import { sendLead, type Lead } from "../lib/send-lead"
import { Container } from "./Container"

type Field = keyof Lead
type Errors = Partial<Record<Field, string>>
type Status = "idle" | "sending" | "success" | "error"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Lead): Errors {
  const e: Errors = {}
  if (v.nombre.trim().length < 2) e.nombre = "Ingresá tu nombre y apellido."
  if (!v.rubro) e.rubro = "Elegí el rubro de tu empresa."
  if (!v.email.trim()) e.email = "Ingresá tu email."
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Revisá el email: parece incompleto."
  if (v.telefono.trim() && v.telefono.replace(/\D/g, "").length < 8)
    e.telefono = "Revisá el número: debería tener al menos 8 dígitos."
  if (v.mensaje.trim().length < 10) e.mensaje = "Contanos en una o dos líneas qué necesitás."
  return e
}

const inputBase =
  "block w-full rounded-lg border bg-paper/60 px-4 text-base text-ink placeholder:text-body/60 transition-[border-color,box-shadow] duration-150 focus:bg-white focus:outline-none focus:ring-4"

function inputClass(error?: string) {
  return `${inputBase} ${
    error ? "border-red-700 focus:border-red-700 focus:ring-red-700/15" : "border-ink/20 focus:border-cobalt focus:ring-cobalt/15"
  }`
}

type FieldProps = {
  id: Field
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}

function FormField({ id, label, optional, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`cf-${id}`} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-body">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`cf-${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

type Props = {
  servicio: ServicioOpcion
  onServicioChange: (s: ServicioOpcion) => void
}

export function Contact({ servicio, onServicioChange }: Props) {
  const [values, setValues] = useState<Omit<Lead, "servicio">>({
    nombre: "",
    empresa: "",
    rubro: "",
    email: "",
    telefono: "",
    mensaje: "",
  })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [honeypot, setHoneypot] = useState("")
  const successRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const lead: Lead = { ...values, servicio }
  const errors = validate(lead)
  const show = (f: Field) => ((submitted || touched[f]) ? errors[f] : undefined)

  useEffect(() => {
    if (status === "success") successRef.current?.focus()
  }, [status])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "servicio") onServicioChange(value as ServicioOpcion)
    else setValues((v) => ({ ...v, [name]: value }))
  }

  const onBlur = (e: { target: { name: string } }) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const a11y = (f: Field) => ({
    id: `cf-${f}`,
    name: f,
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": show(f) ? `cf-${f}-error` : undefined,
    onChange,
    onBlur,
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      const first = (Object.keys(errors) as Field[])[0]
      formRef.current?.querySelector<HTMLElement>(`#cf-${first}`)?.focus()
      return
    }
    // Campo trampa: si un bot lo completó, se descarta en silencio.
    if (honeypot) {
      setStatus("success")
      return
    }
    setStatus("sending")
    try {
      await sendLead({
        ...lead,
        nombre: lead.nombre.trim(),
        empresa: lead.empresa.trim(),
        email: lead.email.trim(),
        telefono: lead.telefono.trim(),
        mensaje: lead.mensaje.trim(),
      })
      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  function reset() {
    setValues({ nombre: "", empresa: "", rubro: "", email: "", telefono: "", mensaje: "" })
    setTouched({})
    setSubmitted(false)
    setStatus("idle")
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="on-dark scroll-mt-16 bg-ink py-20 text-white sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="tnum text-xs font-bold uppercase tracking-[0.14em] text-celeste">
            07 <span aria-hidden="true">—</span> Contacto
          </p>
          <h2
            id="contacto-title"
            className="mt-6 text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl"
          >
            Contanos qué necesitás
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
            Completá el formulario y te respondemos con una propuesta para tu rubro, el presupuesto y el plazo de entrega.
          </p>
          <dl className="mt-10 max-w-md divide-y divide-white/15 border-y border-white/15">
            {[
              ["Landing page", "$220.000 · pago único"],
              ["Entrega", "2 a 4 semanas"],
              ["Cobertura", "Toda Argentina"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-4 text-[15px]">
                <dt className="text-white/70">{k}</dt>
                <dd className="tnum text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-6 text-ink sm:p-10 lg:col-span-7">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center" aria-live="polite">
              <CheckCircle2 className="h-10 w-10 text-cobalt" strokeWidth={2} aria-hidden="true" />
              <h3 ref={successRef} tabIndex={-1} className="mt-6 text-3xl font-extrabold tracking-[-0.02em] focus:outline-none">
                Recibimos tu consulta.
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-body">
                Gracias{values.nombre.trim() ? `, ${values.nombre.trim().split(" ")[0]}` : ""}. Te vamos a responder a{" "}
                <span className="font-semibold text-ink">{values.email.trim()}</span>.
              </p>
              <button type="button" onClick={reset} className="btn btn-outline mt-8">
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <FormField id="nombre" label="Nombre y apellido" error={show("nombre")} className="sm:col-span-2">
                <input
                  {...a11y("nombre")}
                  type="text"
                  autoComplete="name"
                  required
                  value={values.nombre}
                  className={`${inputClass(show("nombre"))} h-12`}
                />
              </FormField>

              <FormField id="empresa" label="Empresa" optional error={show("empresa")}>
                <input
                  {...a11y("empresa")}
                  type="text"
                  autoComplete="organization"
                  value={values.empresa}
                  className={`${inputClass()} h-12`}
                />
              </FormField>

              <FormField id="rubro" label="Rubro" error={show("rubro")}>
                <div className="relative">
                  <select
                    {...a11y("rubro")}
                    required
                    value={values.rubro}
                    className={`${inputClass(show("rubro"))} h-12 appearance-none pr-11 ${values.rubro ? "" : "text-body/70"}`}
                  >
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    {RUBROS_OPCIONES.map((r) => (
                      <option key={r} value={r} className="text-ink">
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body" aria-hidden="true" />
                </div>
              </FormField>

              <FormField id="email" label="Email" error={show("email")}>
                <input
                  {...a11y("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  className={`${inputClass(show("email"))} h-12`}
                />
              </FormField>

              <FormField id="telefono" label="Teléfono / WhatsApp" optional error={show("telefono")}>
                <input
                  {...a11y("telefono")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.telefono}
                  className={`${inputClass(show("telefono"))} h-12`}
                />
              </FormField>

              <FormField id="servicio" label="Servicio de interés" className="sm:col-span-2">
                <div className="relative">
                  <select {...a11y("servicio")} value={servicio} className={`${inputClass()} h-12 appearance-none pr-11`}>
                    {SERVICIOS_OPCIONES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body" aria-hidden="true" />
                </div>
              </FormField>

              <FormField id="mensaje" label="Mensaje" error={show("mensaje")} className="sm:col-span-2">
                <textarea
                  {...a11y("mensaje")}
                  rows={4}
                  required
                  value={values.mensaje}
                  placeholder="Ej.: Tenemos una fábrica de aberturas y queremos recibir pedidos de presupuesto desde la web."
                  className={`${inputClass(show("mensaje"))} resize-y py-3 leading-relaxed`}
                />
              </FormField>

              {/* Campo trampa anti-spam: invisible para personas. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="cf-website">No completar</label>
                <input
                  id="cf-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-body">Usamos tus datos solo para responder esta consulta.</p>
                <button type="submit" disabled={status === "sending"} className="btn btn-primary group disabled:opacity-70">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar consulta
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>

              <div aria-live="polite" className="sm:col-span-2">
                {status === "error" && (
                  <p role="alert" className="rounded-lg border border-red-700/30 bg-red-50 px-4 py-3 text-[15px] text-red-800">
                    No pudimos enviar tu consulta. Probá de nuevo en unos minutos o escribinos por Instagram a{" "}
                    <a
                      href={INSTAGRAM.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2"
                    >
                      {INSTAGRAM.handle}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
