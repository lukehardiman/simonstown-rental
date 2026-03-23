import * as React from 'react'

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

export function EnquiryNotification({
  name,
  email,
  phone,
  arrivalDate,
  departureDate,
  guests,
  message,
  property,
}: EnquiryNotificationProps) {
  const row = (label: string, value: string | number | undefined) =>
    value ? (
      <tr key={label}>
        <td
          style={{
            padding: '8px 12px',
            fontWeight: 600,
            color: '#1e293b',
            width: '160px',
            verticalAlign: 'top',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          {label}
        </td>
        <td
          style={{
            padding: '8px 12px',
            color: '#334155',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          {value}
        </td>
      </tr>
    ) : null

  return (
    <html>
      <head />
      <body style={{ fontFamily: 'Georgia, serif', background: '#f8fafc', margin: 0, padding: 0 }}>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ background: '#f8fafc', padding: '40px 0' }}
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      background: '#0f2942',
                      padding: '28px 32px',
                      color: '#ffffff',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Simon&apos;s Town Rental
                    </p>
                    <h1 style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: 400, letterSpacing: '-0.01em' }}>
                      New Enquiry Received
                    </h1>
                  </td>
                </tr>

                {/* Details table */}
                <tr>
                  <td style={{ padding: '28px 32px 8px' }}>
                    <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <tbody>
                        {row('Name', name)}
                        {row('Email', email)}
                        {row('Phone', phone)}
                        {row('Property', property)}
                        {row('Arrival', arrivalDate)}
                        {row('Departure', departureDate)}
                        {row('Guests', guests)}
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* Message */}
                <tr>
                  <td style={{ padding: '16px 32px 32px' }}>
                    <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>Message</p>
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '14px 16px',
                        color: '#334155',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {message}
                    </div>
                  </td>
                </tr>

                {/* Reply nudge */}
                <tr>
                  <td
                    style={{
                      borderTop: '1px solid #e2e8f0',
                      padding: '16px 32px',
                      color: '#64748b',
                      fontSize: '13px',
                    }}
                  >
                    Reply directly to this email to respond to {name}.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
