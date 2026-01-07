import { NextRequest, NextResponse } from 'next/server';
import { registerDeviceScan, getDeviceUsage } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();

    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID requerido', success: false },
        { status: 400 }
      );
    }

    const scanCount = await registerDeviceScan(deviceId);

    return NextResponse.json({
      success: true,
      scanCount,
    });
  } catch (error) {
    console.error('Error registrando escaneo:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Error al registrar escaneo', details: errorMessage, success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID requerido' },
        { status: 400 }
      );
    }

    const usage = await getDeviceUsage(deviceId);

    return NextResponse.json({
      scanCount: usage?.scanCount || 0,
      paid: usage?.paid || false,
    });
  } catch (error) {
    console.error('Error obteniendo uso:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}
