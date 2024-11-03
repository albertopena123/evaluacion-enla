// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, User, Shield, Calendar } from "lucide-react"

interface UserData {
  id: string
  email: string
  name: string | null
  role: string
  active: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E31D93]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-[#1E3F8B] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">ENLA Dashboard</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Información del Usuario
              </CardTitle>
              <User className="h-4 w-4 text-[#E31D93]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-bold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Role Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rol del Usuario
              </CardTitle>
              <Shield className="h-4 w-4 text-[#F7A81B]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{user?.role}</p>
                <p className="text-sm text-gray-500">Nivel de acceso</p>
              </div>
            </CardContent>
          </Card>

          {/* Last Login Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Último Acceso
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#1E3F8B]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-bold">
                  {new Date().toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-500">Fecha de ingreso</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Content based on role */}
        {user?.role === 'ADMIN' && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Panel de Administración</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Bienvenido al panel de administración. Aquí podrás gestionar usuarios,
                  cursos y más.
                </p>
                {/* Aquí puedes agregar más funcionalidades para el admin */}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

