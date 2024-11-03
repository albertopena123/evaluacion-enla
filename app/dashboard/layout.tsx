// app/dashboard/layout.tsx


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Aquí podrías agregar lógica de verificación del token
  return <>{children}</>
}