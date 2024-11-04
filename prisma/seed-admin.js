// prisma/seed-admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar si el admin ya existe
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'escuela@escuela.com',
      },
    });

    if (existingAdmin) {
      console.log('❗ El usuario administrador ya existe');
      return;
    }

    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('Admin123!', 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'escuela@escuela.com',
        name: 'Administrador',
        password: adminPassword,
        role: 'ADMIN',
        dni:77493318,
        active: true,
      },
    });

    console.log('✅ Usuario administrador creado exitosamente:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error('❌ Error durante la creación del admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en seed principal:', e);
    process.exit(1);
  });