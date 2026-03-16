'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface EnquiryFormData {
  name: string
  email: string
  phone?: string
  arrivalDate?: string
  departureDate?: string
  guests?: number
  message: string
}

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>()

  const onSubmit = async (data: EnquiryFormData) => {
    setError(null)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try emailing us directly at info@simonstownrental.com')
    }
  }

  if (submitted) {
    return (
      <div className="bg-sea-50 border border-sea-200 rounded-lg p-8 text-center">
        <div className="text-sea-600 text-4xl mb-4">✓</div>
        <h3 className="text-fluid-xl mb-2">Thank you for your enquiry</h3>
        <p className="text-navy-600">
          We&rsquo;ll get back to you within 24 hours, usually much sooner.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1.5">
            Name <span className="text-fynbos-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Your name is required' })}
            className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                       text-navy-950 placeholder:text-stone-400
                       focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                       transition-colors"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-sm text-fynbos-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
            Email <span className="text-fynbos-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
            className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                       text-navy-950 placeholder:text-stone-400
                       focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                       transition-colors"
            placeholder="you@email.com"
          />
          {errors.email && (
            <p className="text-sm text-fynbos-600 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1.5">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                     text-navy-950 placeholder:text-stone-400
                     focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                     transition-colors"
          placeholder="+44 or +27..."
        />
      </div>

      {/* Dates & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-navy-700 mb-1.5">
            Arrival
          </label>
          <input
            id="arrivalDate"
            type="date"
            {...register('arrivalDate')}
            className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                       text-navy-950
                       focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                       transition-colors"
          />
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-navy-700 mb-1.5">
            Departure
          </label>
          <input
            id="departureDate"
            type="date"
            {...register('departureDate')}
            className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                       text-navy-950
                       focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                       transition-colors"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-navy-700 mb-1.5">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={10}
            {...register('guests', { valueAsNumber: true })}
            className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                       text-navy-950
                       focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                       transition-colors"
            placeholder="2"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1.5">
          Message <span className="text-fynbos-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: 'Please include a message' })}
          className="w-full px-4 py-3 border border-stone-300 rounded-sm bg-white
                     text-navy-950 placeholder:text-stone-400
                     focus:outline-none focus:ring-2 focus:ring-sea-500 focus:border-sea-500
                     transition-colors resize-y"
          placeholder="Tell us about your plans — dates, interests, anything you'd like to know..."
        />
        {errors.message && (
          <p className="text-sm text-fynbos-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-fynbos-50 border border-fynbos-200 rounded p-4 text-sm text-fynbos-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-warm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
