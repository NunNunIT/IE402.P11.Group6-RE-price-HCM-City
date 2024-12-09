import { connectToDb } from './lib/db'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await connectToDb()
  }
}
