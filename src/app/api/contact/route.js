import nodemailer from 'nodemailer';

export async function POST(req) {
  const { nombre, email, telefono, mensaje } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true para puerto 465, false para 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${nombre}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // Enviar a tu propio correo
    subject: `Nuevo mensaje de contacto de ${nombre}`,
    text: `
      Nombre: ${nombre}
      Email: ${email}
      Teléfono: ${telefono}
      Mensaje: ${mensaje}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Correo enviado con éxito' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(JSON.stringify({ message: 'Error al enviar el correo' }), {
      status: 500,
    });
  }
}
