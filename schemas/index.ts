import * as z from "zod"

// Regex para validaciones
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,20}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/

// Schema de Login
export const loginSchema = z.object({
  username: z.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres')
    .regex(USERNAME_REGEX, 'Usuario inválido. Use letras, números, puntos, guiones o guiones bajos'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(PASSWORD_REGEX, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número')
})

// Schema de Registro
export const registerSchema = z.object({
  username: z.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres')
    .regex(USERNAME_REGEX, 'Usuario inválido. Use letras, números, puntos, guiones o guiones bajos'),
  email: z.string()
    .email('Correo electrónico inválido')
    .min(5, 'El correo es muy corto')
    .max(50, 'El correo es muy largo'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(PASSWORD_REGEX, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Schema de Recuperación de Contraseña
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Correo electrónico inválido')
    .min(5, 'El correo es muy corto')
    .max(50, 'El correo es muy largo'),
})

// Schema de Reset de Contraseña
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(PASSWORD_REGEX, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  token: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Schema de Actualización de Perfil
export const updateProfileSchema = z.object({
  username: z.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres')
    .regex(USERNAME_REGEX, 'Usuario inválido. Use letras, números, puntos, guiones o guiones bajos')
    .optional(),
  email: z.string()
    .email('Correo electrónico inválido')
    .min(5, 'El correo es muy corto')
    .max(50, 'El correo es muy largo')
    .optional(),
  currentPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .optional(),
  newPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(PASSWORD_REGEX, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número')
    .optional(),
  confirmNewPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .optional(),
}).refine((data) => {
  if (data.newPassword) {
    return data.newPassword === data.confirmNewPassword;
  }
  return true;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"],
}).refine((data) => {
  if (data.newPassword) {
    return !!data.currentPassword;
  }
  return true;
}, {
  message: "La contraseña actual es requerida para cambiar la contraseña",
  path: ["currentPassword"],
})

// Tipos inferidos de los schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>