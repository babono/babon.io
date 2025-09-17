import type { Payload } from 'payload'
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached
  const client = await getPayload({ config: payloadConfig })
  cached = client
  return client
}
