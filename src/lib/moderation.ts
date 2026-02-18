const BLOCKED_PATTERNS = [
  /\b(violence|harm|kill|murder|attack|terrorist)\b/i,
  /\b(hate|racist|discriminat)\b/i,
  /\b(illegal|drug|weapon|explosiv)\b/i,
  /\b(pedophil|child.?abus)\b/i,
  /\b(self.?harm|suicid)\b/i,
];

const FLAGGED_PATTERNS = [
  /\b(anger|hate|furious|rage)\b/i,
  /\b(death|dying|kill)\b/i,
  /\b(weapon|gun|knife)\b/i,
  /\b(attack|fight|war)\b/i,
];

interface ModerationResult {
  safe: boolean;
  flagged: boolean;
  categories: string[];
  reasons: string[];
}

export async function moderateContent(text: string): Promise<ModerationResult> {
  const categories: string[] = [];
  const reasons: string[] = [];

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      const match = pattern.toString().match(/\(([^)]+)\)/);
      if (match) {
        categories.push('blocked');
        reasons.push(`Content contains inappropriate topic: ${match[1]}`);
      }
    }
  }

  if (reasons.length > 0) {
    return {
      safe: false,
      flagged: true,
      categories,
      reasons,
    };
  }

  for (const pattern of FLAGGED_PATTERNS) {
    if (pattern.test(text)) {
      const match = pattern.toString().match(/\(([^)]+)\)/);
      if (match) {
        categories.push('sensitive');
        reasons.push(`Content may contain sensitive topic: ${match[1]}`);
      }
    }
  }

  return {
    safe: true,
    flagged: reasons.length > 0,
    categories,
    reasons,
  };
}

export function filterResponse(text: string): string {
  let filtered = text;

  const replacements: Record<string, string> = {
    violence: 'conflict',
    kill: 'pass away',
    murder: 'take a life',
    death: 'the end of life',
    weapon: 'tool',
    war: 'dispute',
    attack: 'confrontation',
  };

  for (const [word, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, replacement);
  }

  return filtered;
}
