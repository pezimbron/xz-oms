'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Job {
  id: string
  jobId: string
  modelName: string
  targetDate: string
  captureAddress?: string
  city?: string
  state?: string
  schedulingNotes?: string
  techInstructions?: string
  lineItems?: any[]
  completionFormSubmitted?: boolean
}

export default function JobCompletionForm() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    completionStatus: 'completed',
    incompletionReason: '',
    incompletionNotes: '',
    techFeedback: '',
  })

  useEffect(() => {
    fetchJob()
  }, [params.token])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/forms/job/${params.token}`)
      if (!response.ok) {
        throw new Error('Invalid or expired link')
      }
      const data = await response.json()
      setJob(data)
    } catch (error: any) {
      setError(error.message || 'Failed to load job')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/forms/job/${params.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          scannedDate: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Show success message
      alert('Thank you! Your completion report has been submitted successfully.')
      router.push('/forms/success')
    } catch (error: any) {
      setError(error.message || 'Failed to submit form')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg font-medium text-gray-700">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
          <p className="text-gray-600 mb-4">{error || 'This completion form link is invalid or has expired.'}</p>
          <p className="text-sm text-gray-500">Please contact XZ OMS if you need assistance.</p>
        </div>
      </div>
    )
  }

  if (job.completionFormSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Already Submitted</h2>
          <p className="text-gray-600">This job completion form has already been submitted.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              XZ
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Completion Report</h1>
              <p className="text-gray-600">XZ Operations Management System</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Job ID</label>
                <p className="text-gray-900 font-medium">{job.jobId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Model/Project</label>
                <p className="text-gray-900 font-medium">{job.modelName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Scheduled Date</label>
                <p className="text-gray-900">{new Date(job.targetDate).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900">
                  {job.captureAddress || 'N/A'}
                  {job.city && `, ${job.city}`}
                  {job.state && `, ${job.state}`}
                </p>
              </div>
            </div>

            {job.schedulingNotes && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">Scheduling Notes</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">{job.schedulingNotes}</p>
              </div>
            )}

            {job.techInstructions && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">Instructions</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1 whitespace-pre-wrap">{job.techInstructions}</p>
              </div>
            )}

            {job.lineItems && job.lineItems.length > 0 && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">Services / To-Do List</label>
                <div className="mt-2 space-y-2">
                  {job.lineItems.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900">{item.product?.name || 'Service'} (Qty: {item.quantity || 1})</p>
                      {item.instructions && (
                        <p className="text-sm text-gray-600 mt-1">{item.instructions}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completion Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Completion Report</h2>

          {/* Completion Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Completion Status <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.completionStatus}
              onChange={(e) => setFormData({...formData, completionStatus: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="completed">Completed</option>
              <option value="partially-completed">Partially Completed</option>
              <option value="not-completed">Not Able to Complete</option>
            </select>
          </div>

          {/* Incompletion Reason */}
          {(formData.completionStatus === 'not-completed' || formData.completionStatus === 'partially-completed') && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={formData.incompletionReason}
                  onChange={(e) => setFormData({...formData, incompletionReason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a reason...</option>
                  <option value="no-access">Not able to access location</option>
                  <option value="poc-no-show">POC didn&apos;t show up</option>
                  <option value="poc-reschedule">POC asked to reschedule</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={formData.incompletionNotes}
                  onChange={(e) => setFormData({...formData, incompletionNotes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide any additional details..."
                />
              </div>
            </>
          )}

          {/* Tech Feedback */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes / Feedback
            </label>
            <textarea
              value={formData.techFeedback}
              onChange={(e) => setFormData({...formData, techFeedback: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any notes, issues encountered, or feedback about the job..."
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Completion Report'}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            By submitting this form, you confirm that the information provided is accurate.
          </p>
        </form>
      </div>
    </div>
  )
}
