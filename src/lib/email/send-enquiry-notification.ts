import { resend } from '@/lib/resend'

export interface EnquiryNotificationProps {
  name: string
  email: string
  phone?: string
  arrivalDate?: string
  departureDate?: string
  guests?: number
  message: string
  property?: string
}

function esc(value: string | number | undefined): string {
  if (value === undefined) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string | number | undefined): string {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#1e293b;width:160px;vertical-align:top;border-bottom:1px solid #e2e8f0;">${label}</td>
      <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #e2e8f0;">${esc(value)}</td>
    </tr>`
}

function buildEnquiryHtml(data: EnquiryNotificationProps): string {
  const { name, email, phone, arrivalDate, departureDate, guests, message, property } = data
  return `<!DOCTYPE html>
<html>
<head></head>
<body style="font-family:Georgia,serif;background:#f8fafc;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f2942;padding:28px 32px;color:#ffffff;">
              <p style="margin:0;font-size:13px;opacity:0.7;letter-spacing:0.08em;text-transform:uppercase;">Simon's Town Rental</p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:400;letter-spacing:-0.01em;">New Enquiry Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
                <tbody>
                  ${row('Name', name)}
                  ${row('Email', email)}
                  ${row('Phone', phone)}
                  ${row('Property', property)}
                  ${row('Arrival', arrivalDate)}
                  ${row('Departure', departureDate)}
                  ${row('Guests', guests)}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px;">
              <p style="margin:0 0 8px;font-weight:600;color:#1e293b;font-size:14px;">Message</p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;color:#334155;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:16px 32px;color:#64748b;font-size:13px;">
              Reply directly to this email to respond to ${esc(name)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

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
      html: buildEnquiryHtml(data),
    })
  } catch (err) {
    console.error('[email] Failed to send enquiry notification:', err)
  }
}
