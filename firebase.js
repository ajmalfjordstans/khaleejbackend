import admin from 'firebase-admin'
import dotenv from 'dotenv';
import credentials from './key.json' with { type: 'json' }

dotenv.config();

// const credentials = {
//   "type": "service_account",
//   "project_id": process.env.PROJECT_ID,
//   "private_key_id": process.env.PRIVATE_KEY_ID,
//   "private_key": process.env.PRIVATE_KEY,
//   "client_email": process.env.CLIENT_EMAIL,
//   "client_id": process.env.CLIENT_ID,
//   "auth_uri": process.env.AUTH_URI,
//   "token_uri": process.env.TOKEN_URI,
//   "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
//   "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
//   "universe_domain": "googleapis.com"
// }


admin.initializeApp({
  credential: admin.credential.cert(credentials),
  projectId: credentials.project_id
})

// Simple sanity logs
// console.log('Firebase Admin initialized for project:', admin.app().options.projectId);
// console.log('Service account fields present:', {
//   project_id: !!credentials.project_id,
//   client_email: !!credentials.client_email,
//   private_key: !!credentials.private_key,
// });

const db = admin.firestore()

export default db