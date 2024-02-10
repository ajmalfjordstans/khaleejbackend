import admin from 'firebase-admin'
import credentials from './key.json' assert { type: "json" }

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

const db = admin.firestore()

export default db