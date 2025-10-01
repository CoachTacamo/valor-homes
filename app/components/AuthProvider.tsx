'use client'

import { ReactNode } from 'react'
import ConfigureAmplifyClientSide from './ConfigureAmplifyClientSide'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <>
      <ConfigureAmplifyClientSide />
      {children}
    </>
  )
}
