'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel
} from '@/components/ui/form'
import { ChevronRight, Sun, Moon, BookOpen, Pencil, GraduationCap, School, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Image from 'next/image'
import { toast } from 'sonner'

// Componente personalizado para mensajes de error
const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 mt-2 text-[#E31D93] text-sm animate-shake">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}

// Define el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string()
    .email('Ingrese un correo electrónico válido')
    .min(1, 'El correo electrónico es requerido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres')
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    console.log("Intentando hacer login con:", data);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Status de la respuesta:", response.status);
      const responseData = await response.json();
      console.log("Datos de respuesta:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Error en el inicio de sesión')
      }

      const { token, user } = responseData

      // Guardar token y datos del usuario
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      toast.success('Inicio de sesión exitoso')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Error en el inicio de sesión')
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 relative`}>
      {/* Background logo */}
      <div className="absolute top-0 left-0 right-0 flex justify-center p-4">
        <Image
          src="/placeholder.svg?height=50&width=200"
          alt="Logo ENLA"
          width={200}
          height={50}
          className="opacity-10"
        />
      </div>

      {/* Educational background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-16">
          {[BookOpen, Pencil, GraduationCap, School].map((Icon, index) => (
            <Icon key={index} size={64} className="text-[#1E3F8B] dark:text-[#F7A81B]" />
          ))}
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-4 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left column with ENLA branding */}
          <div className="md:w-1/2 bg-[#1E3F8B] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-4 left-4">
              <School className="w-16 h-16 text-[#F7A81B]" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center z-10 flex flex-col items-center"
            >
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-white">EN</span>
                <span className="text-[#F7A81B]">L</span>
                <span className="text-[#E31D93]">A</span>
              </h2>
              <h3 className="text-xl font-semibold text-white mb-2">Evaluación Nacional de Logros de Aprendizaje</h3>
              <p className="text-[#F7A81B]">Construyendo el futuro de Perú</p>
            </motion.div>
            {/* ENLA-inspired background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F7A81B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }} />
            </div>
          </div>
          
          {/* Right column with login form */}
          <CardContent className="md:w-1/2 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 bg-[#E31D93] rounded-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={toggleDarkMode}
                    aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
                  >
                    {isDarkMode ? <Sun className="h-6 w-6 text-[#F7A81B]" /> : <Moon className="h-6 w-6 text-[#1E3F8B]" />}
                  </Button>
                </div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold text-center text-[#1E3F8B] dark:text-[#F7A81B]"
                >
                  Bienvenido al Portal ENLA 2024
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-[#1E3F8B] dark:text-[#F7A81B]">Correo electrónico</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isLoading}
                            type="email"
                            placeholder="Ingrese su correo electrónico"
                            className={`w-full border-[#1E3F8B] dark:border-[#F7A81B] focus:ring-[#E31D93] ${
                              fieldState.error ? 'border-[#E31D93] focus:ring-[#E31D93]' : ''
                            }`}
                          />
                        </FormControl>
                        {fieldState.error && (
                          <ErrorMessage message={fieldState.error.message || ''} />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-[#1E3F8B] dark:text-[#F7A81B]">Contraseña</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isLoading}
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className={`w-full border-[#1E3F8B] dark:border-[#F7A81B] focus:ring-[#E31D93] ${
                              fieldState.error ? 'border-[#E31D93] focus:ring-[#E31D93]' : ''
                            }`}
                          />
                        </FormControl>
                        {fieldState.error && (
                          <ErrorMessage message={fieldState.error.message || ''} />
                        )}
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#E31D93] hover:bg-[#E31D93]/90 text-white transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        Iniciar Sesión
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
                <div className="text-center">
                  <a href="#" className="text-sm text-[#1E3F8B] hover:text-[#E31D93] dark:text-[#F7A81B] dark:hover:text-[#E31D93] transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
      
      {/* ENLA-inspired decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#1E3F8B] via-[#F7A81B] to-[#E31D93]" />

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  )
}