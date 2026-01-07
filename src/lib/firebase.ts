import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBN7Rnj2-9FFROQ-RCt2DXMfIwyWDgDxIY",
  authDomain: "cancelaya.firebaseapp.com",
  projectId: "cancelaya",
  storageBucket: "cancelaya.firebasestorage.app",
  messagingSenderId: "562237221944",
  appId: "1:562237221944:web:2fd79304cc5efc48c18acd",
  measurementId: "G-Z7FRWWYGPR"
};

// Inicializar Firebase solo si no está inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Generar o recuperar device ID único
function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let deviceId = localStorage.getItem('cancelaya_device_id');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('cancelaya_device_id', deviceId);
  }
  return deviceId;
}

export interface UserUsage {
  deviceId: string;
  scanCount: number;
  paid: boolean;
  paidAt?: Date;
  createdAt: Date;
}

// Obtener datos de uso del usuario
export async function getUserUsage(): Promise<UserUsage | null> {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, 'usage', deviceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        deviceId,
        scanCount: data.scanCount || 0,
        paid: data.paid || false,
        paidAt: data.paidAt?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user usage:', error);
    return null;
  }
}

// Registrar un nuevo escaneo
export async function registerScan(): Promise<number> {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, 'usage', deviceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Incrementar contador
      await updateDoc(docRef, {
        scanCount: increment(1),
      });
      return (docSnap.data().scanCount || 0) + 1;
    } else {
      // Crear nuevo documento
      await setDoc(docRef, {
        deviceId,
        scanCount: 1,
        paid: false,
        createdAt: new Date(),
      });
      return 1;
    }
  } catch (error) {
    console.error('Error registering scan:', error);
    return 0;
  }
}

// Marcar como pagado
export async function markAsPaid(): Promise<boolean> {
  try {
    const deviceId = getDeviceId();
    const docRef = doc(db, 'usage', deviceId);
    
    await setDoc(docRef, {
      deviceId,
      paid: true,
      paidAt: new Date(),
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error marking as paid:', error);
    return false;
  }
}

export { db, getDeviceId };

