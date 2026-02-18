'use client';

interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  const parseContent = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        elements.push(
          <p 
            key={`p-${elements.length}`}
            style={{ 
              marginBottom: '1.75rem', 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: '#2a3a2a',
            }}
            dangerouslySetInnerHTML={{ __html: processInlineFormatting(paragraphText) }}
          />
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul 
            key={`ul-${elements.length}`}
            style={{ 
              marginBottom: '1.75rem', 
              paddingLeft: '1.5rem',
              lineHeight: 1.9,
            }}
          >
            {listItems.map((item, i) => (
              <li 
                key={i}
                style={{ marginBottom: '0.5rem' }}
                dangerouslySetInnerHTML={{ __html: processInlineFormatting(item) }}
              />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const processInlineFormatting = (str: string): string => {
      return str
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/^> (.+)$/gm, '<blockquote style="border-left: 3px solid #c9a962; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #5a4a3a;">$1</blockquote>');
    };

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h2 
            key={`h2-${elements.length}`}
            style={{ 
              marginTop: '2.5rem', 
              marginBottom: '1rem', 
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#1a3a2a',
              borderBottom: '2px solid rgba(201, 169, 98, 0.3)',
              paddingBottom: '0.5rem',
            }}
          >
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h3 
            key={`h3-${elements.length}`}
            style={{ 
              marginTop: '2rem', 
              marginBottom: '0.75rem', 
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#2e4a3d',
            }}
          >
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('> ')) {
        flushParagraph();
        flushList();
        elements.push(
          <blockquote 
            key={`bq-${elements.length}`}
            style={{ 
              borderLeft: '4px solid #c9a962',
              paddingLeft: '1.5rem',
              margin: '2rem 0',
              fontStyle: 'italic',
              color: '#5a4a3a',
              fontSize: '1.15rem',
              background: 'rgba(201, 169, 98, 0.05)',
              padding: '1rem 1.5rem',
              borderRadius: '0 8px 8px 0',
            }}
          >
            {processInlineFormatting(trimmedLine.substring(2))}
          </blockquote>
        );
      } else if (trimmedLine === '') {
        flushParagraph();
        flushList();
      } else {
        currentParagraph.push(trimmedLine);
      }
    }

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <div style={{ 
      fontFamily: '"Georgia", "Times New Roman", serif',
      fontSize: '1.1rem',
      lineHeight: 1.85,
      color: '#2a3a2a',
    }}>
      {parseContent(content)}
    </div>
  );
}
