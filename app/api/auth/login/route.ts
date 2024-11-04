// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import * as z from "zod"
import jwt from "jsonwebtoken"

const loginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "Mínimo 6 caracteres requeridos",
  }),
})

// Función principal de login con tipo de retorno específico
async function handleLogin(req: Request): Promise<NextResponse> {
  console.log("🟢 API: Inicio alberto de solicitud POST /api/auth/login");
  
  console.log("🟡 API: Intentando leer el body de la solicitud");
  const body = await req.json()
  console.log("📨 API: Body recibido:", body);

  console.log("🟡 API: Validando campos con Zod");
  const validatedFields = loginSchema.safeParse(body)
  
  if (!validatedFields.success) {
    console.log("🔴 API: Error de validación:", validatedFields.error);
    return NextResponse.json(
      { error: "Datos inválidos" },
      { status: 400 }
    )
  }

  const { email, password: providedPassword } = validatedFields.data
  console.log("📧 API: Buscando usuario con email:", email);

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
      active: true,
    }
  })

  console.log("👤 API: Usuario encontrado:", user ? "Sí" : "No");

  if (!user || !user.password || !user.active) {
    console.log("🔴 API: Usuario no encontrado o inactivo");
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    )
  }

  console.log("🔐 API: Verificando contraseña");
  const passwordMatch = await bcrypt.compare(providedPassword, user.password)

  if (!passwordMatch) {
    console.log("🔴 API: Contraseña incorrecta");
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    )
  }

  console.log("✅ API: Contraseña correcta, generando token");
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  console.log("⏰ API: Actualizando último login");
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
  })

  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    active: user.active,
  }

  console.log("🟢 API: Login exitoso, enviando respuesta");
  return NextResponse.json({
    user: userResponse,
    token,
  })
}

// Route handler con tipo de retorno específico
export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Crear una promesa con timeout
    const loginWithTimeout = Promise.race([
      handleLogin(req),
      new Promise<NextResponse>((_, reject) => 
        setTimeout(() => {
          console.log("⏰ API: Timeout alcanzado");
          reject(new Error('Timeout'))
        }, 8000)
      )
    ]);

    return await loginWithTimeout;

  } catch (error) {
    console.error("🔴 API: Error en el proceso de login:", error)
    
    if (error instanceof Error && error.message === 'Timeout') {
      return NextResponse.json(
        { error: "El servidor tardó demasiado en responder. Por favor, intenta de nuevo." },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}