'use client'

import { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { confirmSignUp, signIn, resendSignUpCode } from 'aws-amplify/auth'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  useEffect(() => {
    // Redirect to signup if no email provided
    if (!email) {
      router.push('/signup')
    }
  }, [email, router])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Confirm the sign-up with the code
      await confirmSignUp({
        username: email,
        confirmationCode: code
      })

      // Auto sign-in after successful verification
      await signIn({
        username: email,
        password: '' // We don't have the password here, so redirect to login instead
      })

      // Redirect to dashboard (or login if auto sign-in fails)
      router.push('/listings')
    } catch (err) {
      console.error('Verification error:', err)

      // Type guard to safely access err.name
      if (err && typeof err === 'object' && 'name' in err) {
        const name = (err as { name?: string }).name
        if (name === 'CodeMismatchException') {
          setError('Invalid verification code. Please check and try again.')
        } else if (name === 'ExpiredCodeException') {
          setError('Verification code has expired. Please request a new code.')
        } else if (name === 'NotAuthorizedException') {
          // Code was correct but auto sign-in failed, redirect to login
          router.push('/login?verified=true')
          return
        } else {
          setError('An error occurred during verification. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendCode() {
    setResendMessage('')
    setError('')

    try {
      await resendSignUpCode({
        username: email
      })
      setResendMessage('Verification code sent! Check your email.')
    } catch (err) {
      console.error('Resend code error:', err)
      setError('Failed to resend code. Please try again.')
    }
  }

  if (!email) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              alt="ValorHomes"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Verify your email</h2>
            <p className="mt-2 text-sm/6 text-gray-500">
              We sent a verification code to <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          <div className="mt-10">
            <div>
              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              {resendMessage && (
                <div className="mb-4 rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">{resendMessage}</h3>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm/6 font-medium text-gray-900">
                    Verification code
                  </label>
                  <div className="mt-2">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      required
                      autoComplete="one-time-code"
                      placeholder="Enter 6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      disabled={isLoading}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || code.length !== 6}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify email'}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <p className="text-center text-sm/6 text-gray-500">
                  Didn&apos;t receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          alt=""
          src="/veteran_login_splash.png"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
