import { EmailTemplate } from '../../../components/email-templete';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['darshilmahraur67@gmail.com'],
      subject: 'DSCE Onboarding',
      react: EmailTemplate({ firstName: 'Darshil' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
