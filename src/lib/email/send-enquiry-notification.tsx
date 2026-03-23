import { resend } from '@/lib/resend'
import { EnquiryNotification, type EnquiryNotificationProps } from './enquiry-notification'

export async function sendEnquiryNotification(data: EnquiryNotificationProps): Promise<void> {
  try {
    const recipients = (process.env.ENQUIRY_NOTIFICATION_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)

    if (recipients.length === 0) {
      console.warn('[email] ENQUIRY_NOTIFICATION_EMAILS is not set — skipping notification')
      return
    }

    await resend.emails.send({
      from: "Simon's Town Rental <notifications@simonstownrental.com>",
      to: recipients,
      replyTo: `${data.name} <${data.email}>`,
      subject: `New enquiry from ${data.name}`,
      react: <EnquiryNotification {...data} />,
    })
  } catch (err) {
    console.error('[email] Failed to send enquiry notification:', err)
  }
}
