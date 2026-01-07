import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | undefined;
let db: Firestore | undefined;

function getFirebaseAdmin(): { app: App; db: Firestore } {
  if (!app) {
    // Check if already initialized
    if (getApps().length === 0) {
      // Parse service account from environment variable
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

      if (!serviceAccountJson) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
      }

      let serviceAccount;
      try {
        serviceAccount = JSON.parse(serviceAccountJson);
      } catch {
        throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON');
      }

      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
    } else {
      app = getApps()[0];
    }
  }

  if (!db) {
    db = getFirestore(app);
  }

  return { app: app!, db: db! };
}

export async function markDeviceAsPaid(deviceId: string): Promise<boolean> {
  try {
    const { db } = getFirebaseAdmin();

    await db.collection('usage').doc(deviceId).set({
      deviceId,
      paid: true,
      paidAt: new Date(),
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('Error marking device as paid:', error);
    return false;
  }
}

export async function registerDeviceScan(deviceId: string): Promise<number> {
  console.log('[Firebase] registerDeviceScan called for:', deviceId);
  
  try {
    console.log('[Firebase] Getting Firebase Admin...');
    const { db } = getFirebaseAdmin();
    console.log('[Firebase] Got Firestore instance');
    
    const docRef = db.collection('usage').doc(deviceId);
    console.log('[Firebase] Getting document...');
    const docSnap = await docRef.get();
    console.log('[Firebase] Document exists:', docSnap.exists);

    if (docSnap.exists) {
      const data = docSnap.data();
      const newCount = (data?.scanCount || 0) + 1;
      console.log('[Firebase] Updating scanCount to:', newCount);
      await docRef.update({ scanCount: newCount });
      return newCount;
    } else {
      console.log('[Firebase] Creating new document with scanCount: 1');
      await docRef.set({
        deviceId,
        scanCount: 1,
        paid: false,
        createdAt: new Date(),
      });
      return 1;
    }
  } catch (error) {
    console.error('[Firebase] Error registering scan:', error);
    // Return more info about the error
    throw error;
  }
}

export async function getDeviceUsage(deviceId: string): Promise<{
  scanCount: number;
  paid: boolean;
} | null> {
  try {
    const { db } = getFirebaseAdmin();
    const docSnap = await db.collection('usage').doc(deviceId).get();

    if (docSnap.exists) {
      const data = docSnap.data();
      return {
        scanCount: data?.scanCount || 0,
        paid: data?.paid || false,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting device usage:', error);
    return null;
  }
}
