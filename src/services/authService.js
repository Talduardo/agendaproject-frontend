// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase.js'

// ── CADASTRO ──────────────────────────────────────────────────
export async function register(name, email, password, role, extra = {}) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    createdAt: serverTimestamp(),
    ...extra,
  })

  return user
}

// ── LOGIN ─────────────────────────────────────────────────────
export async function login(email, password, expectedRole) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)

  const profile = await getUserProfile(user.uid)
  if (!profile) throw new Error('Perfil não encontrado.')

  if (profile.role !== expectedRole) {
    await signOut(auth)
    throw new Error(
      expectedRole === 'empresa'
        ? 'Este e-mail não está cadastrado como empresa.'
        : 'Este e-mail não está cadastrado como paciente.'
    )
  }

  return { user, profile }
}

// ── LOGOUT ────────────────────────────────────────────────────
export async function logout() {
  await signOut(auth)
}

// ── PERFIL ────────────────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

// ── LISTENER ─────────────────────────────────────────────────
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid)
      callback(user, profile)
    } else {
      callback(null, null)
    }
  })
}
