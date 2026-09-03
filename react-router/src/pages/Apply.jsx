import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { jobs } from '../data/jobs'

// ── Validation ────────────────────────────────────────────────────────────────

function validateStep1(form) {
  const errs = {}
  if (!form.name.trim()) errs.name = 'Name is required.'
  else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'
  if (!form.email.trim()) errs.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
  return errs
}

function validateStep2(form) {
  const errs = {}
  if (!form.coverLetter.trim()) errs.coverLetter = 'Cover letter is required.'
  else if (form.coverLetter.trim().length < 50)
    errs.coverLetter = `Too short — ${form.coverLetter.trim().length}/50 chars minimum.`
  return errs
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null
  return <p className="text-red-500 text-xs mt-1">{message}</p>
}

function inputClass(hasError) {
  return `w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
    hasError ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-300 focus:ring-indigo-400'
  }`
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepBar({ step }) {
  const steps = ['Personal Info', 'Your Application']
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => {
        const num = i + 1
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? 'bg-green-500 text-white'
                    : active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {done ? '✓' : num}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  active ? 'text-indigo-600' : done ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 mb-4 transition-colors ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = jobs.find(j => j.id === Number(id))

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '', linkedin: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleBlur(e) { // this will update the error
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errs = step === 1 ? validateStep1(form) : validateStep2(form)
    setErrors(errs)
  }

  function showError(field) { // to should the errro if synats is wron
    return touched[field] && errors[field]
  }

  function handleNext(e) {
    e.preventDefault()
    setTouched({ name: true, email: true })
    const errs = validateStep1(form) // name and email is done start validation for step 1
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStep(2)
    setErrors({})
    setTouched({})
    window.scrollTo(0, 0)
  }

  function handleSubmit(e) {
    e.preventDefault() // we will add the backend 
    setTouched({ coverLetter: true })
    const errs = validateStep2(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    navigate('/success')
  }

  if (!job) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-500 mb-4">Job not found.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">← Back to jobs</Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      {/* Job context header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 ${job.color} rounded-lg flex items-center justify-center text-white font-bold shrink-0`}>
          {job.company[0]}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Apply for {job.title}</h1>
          <p className="text-sm text-indigo-600 font-medium">{job.company} · {job.location}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <StepBar step={step} />

        {step === 1 && (
          <form onSubmit={handleNext} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text" name="name"
                value={form.name} onChange={handleChange} onBlur={handleBlur}
                placeholder="Jane Doe"
                className={inputClass(showError('name'))}
              />
              <FieldError message={showError('name') ? errors.name : null} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email" name="email"
                value={form.email} onChange={handleChange} onBlur={handleBlur}
                placeholder="jane@example.com"
                className={inputClass(showError('email'))}
              />
              <FieldError message={showError('email') ? errors.email : null} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel" name="phone"
                value={form.phone} onChange={handleChange}
                placeholder="+1 555 000 0000"
                className={inputClass(false)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url" name="linkedin"
                value={form.linkedin} onChange={handleChange}
                placeholder="https://linkedin.com/in/janedoe"
                className={inputClass(false)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Continue →
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why are you a great fit?
              </label>
              <textarea
                name="coverLetter"
                value={form.coverLetter} onChange={handleChange} onBlur={handleBlur}
                rows={7}
                placeholder={`Tell ${job.company} why you're excited about this role and what makes you stand out (min 50 characters)...`}
                className={inputClass(showError('coverLetter'))}
              />
              <div className="flex justify-between items-center mt-1">
                <FieldError message={showError('coverLetter') ? errors.coverLetter : null} />
                <span className={`text-xs ml-auto ${form.coverLetter.length >= 50 ? 'text-green-500' : 'text-gray-400'}`}>
                  {form.coverLetter.length}/50
                </span>
              </div>
            </div>

            {/* Summary of step 1 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-sm">
              <p className="font-medium text-gray-700 mb-1">Applying as</p>
              <p className="text-gray-600">{form.name} · {form.email}</p>
              {form.phone && <p className="text-gray-400 text-xs mt-0.5">{form.phone}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setStep(1); setErrors({}); setTouched({}) }}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
