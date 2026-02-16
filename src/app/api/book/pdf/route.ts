import { NextResponse } from 'next/server';
import { bookContent, bookMeta } from '@/lib/book-content';
import { bookImages } from '@/lib/book-images';

export const runtime = 'nodejs';

export async function GET() {
  const html = generatePrintableHTML();
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'attachment; filename="history-of-persian-wisdom.html"',
    },
  });
}

function generatePrintableHTML(): string {
  const sections = bookContent.map((section, index) => {
    const imageUrl = bookImages[section.id] || bookImages['part1'];
    
    const quotesHTML = section.quotes.map(quote => `
      <div class="quote">
        <div class="persian-text">${quote.text}</div>
        <div class="transliteration">${quote.transliteration}</div>
        <div class="translation">${quote.translation}</div>
      </div>
    `).join('');

    const contentHTML = section.content.split('\n\n').map(para => {
      if (para.startsWith('### ')) return `<h3>${para.replace('### ', '')}</h3>`;
      if (para.startsWith('**') && para.endsWith('**')) return `<h2>${para.replace(/\*\*/g, '')}</h2>`;
      if (para.startsWith('- ') || para.startsWith('* ')) {
        const items = para.split('\n').filter(Boolean);
        return '<ul>' + items.map(item => `<li>${item.replace(/^-\s|\*\s/, '')}</li>`).join('') + '</ul>';
      }
      return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }).join('');

    return `
      <div class="section" data-section="${index + 1}">
        ${index === 0 ? `<div class="cover-page">
          <h1>${bookMeta.title}</h1>
          <h2>${bookMeta.subtitle}</h2>
          <p class="author">${bookMeta.author}</p>
        </div>` : ''}
        
        <div class="section-header">
          <img src="${imageUrl}" alt="${section.title}" class="section-image" />
          <div class="section-title-block">
            <span class="section-number">${section.title}</span>
            ${section.subtitle ? `<h2>${section.subtitle}</h2>` : ''}
          </div>
        </div>
        
        <div class="content">
          ${contentHTML}
        </div>
        
        ${quotesHTML ? `
        <div class="quotes-section">
          <h3>Persian Terms & Quotations</h3>
          ${quotesHTML}
        </div>
        ` : ''}
        
        <div class="page-break"></div>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${bookMeta.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.7;
      color: #2c2c2c;
      background: white;
      padding: 0;
    }
    
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #8b4513 100%);
      color: white;
      padding: 40px;
    }
    
    .cover-page h1 {
      font-size: 48pt;
      font-weight: 300;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
    
    .cover-page h2 {
      font-size: 24pt;
      font-weight: 300;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .cover-page .author {
      font-size: 14pt;
      opacity: 0.7;
    }
    
    .section {
      padding: 40px 50px;
      page-break-after: always;
    }
    
    .section:last-child {
      page-break-after: avoid;
    }
    
    .section-header {
      display: flex;
      gap: 30px;
      margin-bottom: 30px;
      align-items: center;
    }
    
    .section-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .section-title-block {
      flex: 1;
    }
    
    .section-number {
      display: block;
      font-size: 10pt;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #8b4513;
      margin-bottom: 5px;
    }
    
    .section-title-block h2 {
      font-size: 22pt;
      font-weight: 700;
      color: #2e4a3d;
    }
    
    .content {
      text-align: justify;
    }
    
    .content p {
      margin-bottom: 15px;
    }
    
    .content h2 {
      font-size: 14pt;
      color: #8b4513;
      margin: 25px 0 10px;
      font-weight: 600;
    }
    
    .content h3 {
      font-size: 13pt;
      color: #2e4a3d;
      margin: 20px 0 10px;
      font-weight: 600;
    }
    
    .content ul {
      margin: 10px 0 15px 25px;
    }
    
    .content li {
      margin-bottom: 5px;
    }
    
    .content strong {
      color: #8b4513;
    }
    
    .quotes-section {
      margin-top: 30px;
      padding: 20px;
      background: #f9f8f5;
      border-radius: 8px;
      border-left: 4px solid #8b4513;
    }
    
    .quotes-section h3 {
      font-size: 11pt;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #c9a962;
      margin-bottom: 15px;
    }
    
    .quote {
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    
    .quote:last-child {
      border-bottom: none;
    }
    
    .persian-text {
      font-family: 'Vazirmatn', 'Tahoma', sans-serif;
      font-size: 16pt;
      color: #1a3a2a;
      text-align: right;
      direction: rtl;
      margin-bottom: 5px;
    }
    
    .transliteration {
      font-style: italic;
      font-size: 10pt;
      color: #666;
      margin-bottom: 3px;
    }
    
    .translation {
      font-size: 9pt;
      color: #888;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    @media print {
      body {
        font-size: 11pt;
      }
      
      .section {
        padding: 30px 40px;
      }
      
      .cover-page {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  ${sections}
</body>
</html>
  `;
}
