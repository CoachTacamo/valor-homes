'use client'

import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'

// Configure Amplify on the client side
Amplify.configure(outputs)

export default function ConfigureAmplifyClientSide() {
  return null
}
