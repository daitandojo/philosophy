export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
  page?: string;
}

const ANALYTICS_EVENTS: AnalyticsEvent[] = [];

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  const enrichedEvent = {
    ...event,
    timestamp: event.timestamp || new Date(),
  };

  ANALYTICS_EVENTS.push(enrichedEvent);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', enrichedEvent);
  }
}

export async function trackPageView(
  page: string,
  userId?: string,
  properties?: Record<string, string | number>
): Promise<void> {
  await trackEvent({
    name: 'page_view',
    properties,
    page,
    userId,
  });
}

export async function trackVerseView(
  verseId: string,
  philosopher: string,
  userId?: string
): Promise<void> {
  await trackEvent({
    name: 'verse_view',
    properties: { verseId, philosopher },
    userId,
  });
}

export async function trackChatStarted(
  philosopherId: string,
  userId?: string
): Promise<void> {
  await trackEvent({
    name: 'chat_started',
    properties: { philosopherId },
    userId,
  });
}

export async function trackLearningProgress(
  pathId: string,
  lessonId: string,
  progress: number,
  userId?: string
): Promise<void> {
  await trackEvent({
    name: 'learning_progress',
    properties: { pathId, lessonId, progress },
    userId,
  });
}

export async function trackSignUp(
  method: string,
  userId: string
): Promise<void> {
  await trackEvent({
    name: 'user_signed_up',
    properties: { method },
    userId,
  });
}

export async function trackAchievementUnlocked(
  achievementCode: string,
  userId: string
): Promise<void> {
  await trackEvent({
    name: 'achievement_unlocked',
    properties: { achievementCode },
    userId,
  });
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  return [...ANALYTICS_EVENTS];
}

export function clearAnalyticsEvents(): void {
  ANALYTICS_EVENTS.length = 0;
}
