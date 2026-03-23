<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Simon's Town Rental</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8fafc;
            color: #1a2234;
            font-size: 15px;
            line-height: 1.6;
          }

          header {
            background: #1a2234;
            color: #fff;
            padding: 24px 32px;
          }

          header p {
            font-size: 11px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            opacity: 0.6;
            margin-bottom: 4px;
          }

          header h1 {
            font-size: 20px;
            font-weight: 400;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 32px;
          }

          .meta {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 32px;
          }

          .meta strong {
            color: #1a2234;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 4px rgba(0,0,0,0.07);
          }

          thead tr {
            background: #1a2234;
            color: #fff;
          }

          thead th {
            padding: 12px 16px;
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          tbody tr {
            border-bottom: 1px solid #e2e8f0;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background: #f0f9fb;
          }

          td {
            padding: 12px 16px;
            vertical-align: middle;
          }

          td.url a {
            color: #2e91a5;
            text-decoration: none;
            word-break: break-all;
          }

          td.url a:hover {
            text-decoration: underline;
          }

          td.center {
            text-align: center;
            color: #64748b;
            font-size: 13px;
          }

          .priority-bar {
            display: inline-block;
            height: 6px;
            border-radius: 3px;
            background: #2e91a5;
            vertical-align: middle;
            margin-right: 6px;
          }

          .priority-label {
            font-size: 13px;
            color: #64748b;
            vertical-align: middle;
          }

          footer {
            text-align: center;
            padding: 32px;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <header>
          <p>Simon's Town Rental</p>
          <h1>XML Sitemap</h1>
        </header>

        <div class="container">
          <p class="meta">
            <strong><xsl:value-of select="count(sm:urlset/sm:url)"/></strong> URLs indexed.
            For search engine use — submit this sitemap via
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style="color:#2e91a5;">Google Search Console</a>.
          </p>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td class="url">
                    <a href="{sm:loc}" target="_blank" rel="noopener noreferrer">
                      <xsl:value-of select="sm:loc"/>
                    </a>
                  </td>
                  <td class="center">
                    <xsl:if test="sm:lastmod">
                      <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                    </xsl:if>
                  </td>
                  <td class="center">
                    <xsl:value-of select="sm:changefreq"/>
                  </td>
                  <td class="center">
                    <xsl:if test="sm:priority">
                      <span class="priority-bar">
                        <xsl:attribute name="style">
                          width: <xsl:value-of select="number(sm:priority) * 48"/>px
                        </xsl:attribute>
                      </span>
                      <span class="priority-label"><xsl:value-of select="sm:priority"/></span>
                    </xsl:if>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>

        <footer>
          simonstownrental.com
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
