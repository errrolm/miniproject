import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export async function registerUser(name: string, email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, 'pokedexUsers', result.user.uid), {
    name: name,
    email: email,
  });

  return result.user;
}

export async function loginUser(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
}