import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react"
import { RUBROS_OPCIONES, SERVICIOS_OPCIONES, type ServicioOpcion } from "../data/content"
import { INSTAGRAM, ROUTES } from "../config/site"
import { sendLead, type Lead } from "../lib/send-lead"
import { track } from "../lib/analytics"
import { isArgentinePhone, isValidEmail, isValidFullName } from "../lib/validation"
import { Container } from "./Container"
import { WhatsAppLink } from "./WhatsAppLink"

type Field = keyof Lead
type Errors = Partial<Record<Field, string>>
type Status = "idle" | "submitting" | "success" | "error"
type Values = Omit<Lead, "servicio">

const EMPTY: Values = { nombre: "", empresa: "", rubro: "", email: "", telefono: "", mensaje: "" }

/** Envíos más rápidos que esto (desde que cargó el formulario) se tratan como bots. */
const MIN_FILL_MS = 2500

function validate(v: Lead): Errors {
  const e: Errors = {}
  if (!isValidFullName(v.nombre)) e.nombre = "Ingresá nombre y apellido, solo con letras."
  if (!(RUBROS_OPCIONES as readonly string[]).includes(v.rubro)) e.rubro = "Elegí el rubro de tu empresa."
  if (!v.email.trim()) e.email = "Ingresá tu email."
  else if (!isValidEmail(v.email)) e.email = "Revisá el email: parece incompleto."
  if (v.telefono.trim() && !isArgentinePhone(v.telefono))
    e.telefono = "Ingresá un número argentino con código de área. Ej.: 11 2345-6789."
  const msg = v.mensaje.trim().length
  if (msg < 10) e.mensaje = "Contanos en una o dos líneas qué necesitás."
  else if (msg > 2000) e.mensaje = "El mensaje es muy largo: máximo 2000 caracteres."
  return e
}

const inputBase =
  "block w-full rounded-lg border bg-paper/60 px-4 text-base text-ink placeholder:text-[#64748B] transition-[border-color,box-shadow] duration-150 focus:bg-white focus:outline-none focus:ring-4"

function inputClass(error?: string) {
  return `${inputBase} ${
    error ? "border-red-700 focus:border-red-700 focus:ring-red-700/15" : "border-ink/20 focus:border-cobalt focus:ring-cobalt/15"
  }`
}

type FieldProps = {
  id: Field
  label: string
  optional?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

function FormField({ id, label, optional, hint, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`cf-${id}`} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-body">(opcional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`cf-${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`cf-${id}-hint`} className="mt-1.5 text-sm text-body">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

type Props = {
  servicio: ServicioOpcion
  onServicioChange: (s: ServicioOpcion) => void
}

export function Contact({ servicio, onServicioChange }: Props) {
  const [values, setValues] = useState<Values>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [honeypot, setHoneypot] = useState("")
  const startedAt = useRef(Date.now())
  const successRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const lead: Lead = { ...values, servicio }
  const errors = validate(lead)
  const show = (f: Field) => (submitted || touched[f] ? errors[f] : undefined)

  useEffect(() => {
    if (status === "success") successRef.current?.focus()
  }, [status])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "servicio") onServicioChange(value as ServicioOpcion)
    else setValues((v) => ({ ...v, [name]: value }))
  }

  const onBlur = (e: { target: { name: string } }) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const fieldProps = (f: Field, hint?: boolean) => ({
    id: `cf-${f}`,
    name: f,
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": show(f) ? `cf-${f}-error` : hint ? `cf-${f}-hint` : undefined,
    onChange,
    onBlur,
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "submitting") return
    setSubmitted(true)

    const fields = Object.keys(errors) as Field[]
    if (fields.length > 0) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${fields[0]}`)?.focus()
      return
    }

    // Anti-spam: campo trampa completado o envío inhumanamente rápido → se descarta en silencio.
    if (honeypot || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus("success")
      return
    }

    setStatus("submitting")
    try {
      await sendLead({
        nombre: lead.nombre.trim().replace(/\s+/g, " "),
        empresa: lead.empresa.trim(),
        rubro: lead.rubro,
        email: lead.email.trim().toLowerCase(),
        telefono: lead.telefono.trim(),
        servicio: lead.servicio,
        mensaje: lead.mensaje.trim(),
      })
      track("generate_lead", { form_name: "presupuesto", servicio: lead.servicio, rubro: lead.rubro })
      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  function reset() {
    setValues(EMPTY)
    setTouched({})
    setSubmitted(false)
    setStatus("idle")
    startedAt.current = Date.now()
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="on-dark scroll-mt-16 bg-ink py-20 text-white sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="tnum text-xs font-bold uppercase tracking-[0.14em] text-celeste">
            07 <span aria-hidden="true">—</span> Contacto
          </p>
          <h2 id="contacto-title" className="mt-6 text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl">
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
          <WhatsAppLink />
        </div>

        <div className="rounded-2xl bg-white p-5 text-ink sm:p-10 lg:col-span-7">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center" aria-live="polite">
              <CheckCircle2 className="h-10 w-10 text-cobalt" strokeWidth={2} aria-hidden="true" />
              <h3 ref={successRef} tabIndex={-1} className="mt-6 text-3xl font-extrabold tracking-[-0.02em] focus:outline-none">
                Recibimos tu consulta
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-body">
                Gracias{values.nombre.trim() ? `, ${values.nombre.trim().split(" ")[0]}` : ""}. Te vamos a responder a{" "}
                <span className="break-all font-semibold text-ink">{values.email.trim()}</span>.
              </p>
              <button type="button" onClick={reset} className="btn btn-outline mt-8">
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              aria-label="Formulario de presupuesto"
              aria-busy={status === "submitting"}
              className="grid gap-5 sm:grid-cols-2"
            >
              <FormField id="nombre" label="Nombre y apellido" error={show("nombre")} className="sm:col-span-2">
                <input
                  {...fieldProps("nombre")}
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  required
                  value={values.nombre}
                  className={`${inputClass(show("nombre"))} h-12`}
                />
              </FormField>

              <FormField id="empresa" label="Empresa" optional>
                <input
                  {...fieldProps("empresa")}
                  type="text"
                  autoComplete="organization"
                  maxLength={100}
                  value={values.empresa}
                  className={`${inputClass()} h-12`}
                />
              </FormField>

              <FormField id="rubro" label="Rubro" error={show("rubro")}>
                <div className="relative">
                  <select
                    {...fieldProps("rubro")}
                    required
                    value={values.rubro}
                    className={`${inputClass(show("rubro"))} h-12 appearance-none pr-11 ${values.rubro ? "" : "text-[#64748B]"}`}
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
                  {...fieldProps("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={254}
                  required
                  value={values.email}
                  className={`${inputClass(show("email"))} h-12`}
                />
              </FormField>

              <FormField
                id="telefono"
                label="Teléfono / WhatsApp"
                optional
                hint="Con código de área. Ej.: 11 2345-6789"
                error={show("telefono")}
              >
                <input
                  {...fieldProps("telefono", true)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={30}
                  value={values.telefono}
                  className={`${inputClass(show("telefono"))} h-12`}
                />
              </FormField>

              <FormField id="servicio" label="Servicio de interés" className="sm:col-span-2">
                <div className="relative">
                  <select {...fieldProps("servicio")} value={servicio} className={`${inputClass()} h-12 appearance-none pr-11`}>
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
                  {...fieldProps("mensaje")}
                  rows={4}
                  maxLength={2000}
                  required
                  value={values.mensaje}
                  placeholder="Ej.: Tenemos una fábrica de aberturas y queremos recibir pedidos de presupuesto desde la web."
                  className={`${inputClass(show("mensaje"))} resize-y py-3 leading-relaxed`}
                />
              </FormField>

              {/* Campo trampa anti-spam: invisible y fuera del orden de tabulación. */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="cf-website">No completar este campo</label>
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
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-primary group w-full disabled:opacity-70 sm:order-2 sm:w-auto"
                >
                  {status === "submitting" ? (
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
                <p className="text-sm leading-relaxed text-body sm:order-1 sm:max-w-xs">
                  Usamos tus datos solo para responder esta consulta. Al enviar, aceptás la{" "}
                  <a href={ROUTES.privacidad} className="font-semibold text-cobalt underline underline-offset-2">
                    Política de privacidad
                  </a>
                  .
                </p>
              </div>

              <div aria-live="polite" className="sm:col-span-2">
                {status === "error" && (
                  <p role="alert" className="rounded-lg border border-red-700/30 bg-red-50 px-4 py-3 text-[15px] text-red-800">
                    No pudimos enviar tu consulta. Probá de nuevo en unos minutos o escribinos por Instagram a{" "}
                    <a
                      href={INSTAGRAM.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("click_social", { platform: "instagram", link_location: "error_formulario" })}
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
