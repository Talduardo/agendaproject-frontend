// src/services/authService.js
// Funções de cadastro, login e verificação de papel (empresa/cliente)
// usando Firebase Authentication + Firestore

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc, setDoc, getDoc, serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase.js'

// ── CADASTRO ─────────────────────────────────────────────────

/**
 * Cadastra um novo usuário no Firebase Auth + salva perfil no Firestore.
 * @param {string} name    - Nome completo
 * @param {string} email
 * @param {string} password
 * @param {'empresa'|'cliente'} role
 * @param {object} extra   - Dados extras (ex: clinicName para empresa)
 */
export async function register(name, email, password, role, extra = {}) {
  // 1. Cria conta no Firebase Auth
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // 2. Salva perfil no Firestore — coleção "users"
  await setDoc(doc(db, 'users', user.uid), {
    uid:       user.uid,
    name,
    email,
    role,          // 'empresa' ou 'cliente'
    createdAt: serverTimestamp(),
    ...extra,
  })

  return user
}

// ── LOGIN ─────────────────────────────────────────────────────

/**
 * Faz login e retorna o usuário com o papel (role) do Firestore.
 * @param {string} email
 * @param {string} password
 * @param {'empresa'|'cliente'} expectedRole - papel esperado
 */
export async function login(email, password, expectedRole) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)

  // Busca o perfil no Firestore para verificar o papel
  const profile = await getUserProfile(user.uid)

  if (!profile) throw new Error('Perfil não encontrado. Entre em contato com o suporte.')

  // Verifica se o papel bate com a tela de login
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

/**
 * Busca o perfil completo do usuário no Firestore.
 */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

/**
 * Escuta mudanças no estado de autenticação.
 * Retorna a função de cancelamento do listener.
 */
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
