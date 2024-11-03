'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Download } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NextLogin from '@/components/bashboard/nextlogin'

export default function Component() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.08, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Refined Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ opacity, scale }}
          className="text-[10vw] font-bold text-[#1E3F8B]/10 transform -rotate-15 select-none"
        >
          <div className="flex flex-col items-center">
            <span>ENLA</span>
            <span>2024</span>
          </div>
        </motion.div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#4D4D4D] p-4 shadow-md sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#E51D25] p-1 text-white text-sm font-bold">
              PERÚ
            </div>
            <div className="text-white text-sm">
              Ministerio de Educación
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            {['Inicio', 'Recursos', 'Consultas', 'Enlaces'].map((item) => (
              <a key={item} href="#" className="text-white hover:text-[#F7A81B] transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-20"
        >
          <Card className="w-full max-w-4xl shadow-lg border-none overflow-hidden backdrop-blur-sm bg-white/90">
            <CardHeader className="text-center space-y-4 relative">
              <motion.div 
                className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3F8B] via-[#F7A81B] to-[#E31D93]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-6xl font-bold tracking-tight relative">
                  <span className="text-[#1E3F8B]">EN</span>
                  <span className="text-[#F7A81B]">L</span>
                  <span className="text-[#E31D93]">A</span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-[#4D4D4D]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                </div>
              </motion.div>
              <CardTitle className="text-3xl font-bold text-[#4D4D4D]">
                Evaluación Nacional de Logros de Aprendizaje
              </CardTitle>
              <p className="text-2xl text-[#4D4D4D] font-semibold">2024</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-[#4D4D4D] text-lg italic">
                Conociendo la situación de los aprendizajes de los estudiantes a nivel nacional
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  className="bg-gradient-to-br from-[#1E3F8B]/5 to-[#1E3F8B]/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-semibold text-[#1E3F8B] mb-2 flex items-center">
                    Evaluación
                  </h3>
                  <p className="text-[#4D4D4D]">
                    Aplicación de pruebas y cuestionarios a estudiantes en los grados seleccionados
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-[#F7A81B]/5 to-[#F7A81B]/10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-semibold text-[#F7A81B] mb-2 flex items-center">
                    Participantes
                  </h3>
                  <p className="text-[#4D4D4D]">
                    Estudiantes, docentes, directores y familias de escuelas de educación básica
                  </p>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <NextLogin continua={true}>
                    <Button className="bg-[#E31D93] hover:bg-[#E31D93]/90 text-white font-semibold py-2 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                      Siguiente
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </NextLogin>
                </motion.div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="outline"
                          className="border-[#1E3F8B] text-[#1E3F8B] hover:bg-[#1E3F8B] hover:text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Guía
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Descargar guía para directores y docentes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-[#4D4D4D] text-center">
                Implementado por el Minedu a través de la Oficina de Medición de la Calidad de los Aprendizajes (UMC)
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#4D4D4D] text-white py-4 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center md:flex-row justify-between text-sm">
          <div className="mb-4 md:mb-0">
            © 2024 Ministerio de Educación del Perú. Todos los derechos reservados.
          </div>
          <div>
            <a href="#" className="text-white hover:text-[#F7A81B] transition-colors">Política de privacidad</a> | 
            <a href="#" className="text-white hover:text-[#F7A81B] transition-colors"> Términos de uso</a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
