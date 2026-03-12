/** Single prototype variant (URL + label). */
export interface UsabilityVariant {
  url: string;
  label: string;
}

export type UsabilityAudience = 'employee' | 'customer';

/** Guided flow: tasks and pre/post questions. */
export interface GuidedTask {
  id: string;
  text: string;
}

export type QuestionType = 'text' | 'rating' | 'single_choice';

export interface GuidedQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
}

export interface GuidedFlow {
  tasks: GuidedTask[];
  questions_pre: GuidedQuestion[];
  questions_post: GuidedQuestion[];
  template?: 'variant_comparison' | 'single_prototype' | null;
}

export interface UsabilityTest {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  audience: UsabilityAudience;
  variants: UsabilityVariant[];
  guided_flow: GuidedFlow;
  created_at: string;
  updated_at: string;
}

export type InviteStatus = 'pending' | 'started' | 'completed';

export interface UsabilityInvite {
  id: string;
  test_id: string;
  email: string;
  session_token: string;
  status: InviteStatus;
  created_at: string;
  expires_at: string | null;
}

export interface UsabilityFeedbackSession {
  id: string;
  invite_id: string;
  variant_index: number;
  started_at: string;
  ended_at: string | null;
  answers: Record<string, unknown>;
}

export type SessionEventType = 'mousemove' | 'click' | 'scroll';

export interface UsabilitySessionEvent {
  id: string;
  feedback_session_id: string;
  event_type: SessionEventType;
  x: number | null;
  y: number | null;
  timestamp_ms: number;
  scroll_y?: number | null;
}

export interface UsabilityComment {
  id: string;
  feedback_session_id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  created_at: string;
}

/** Client payload for batch session events. */
export interface SessionEventBatch {
  feedback_session_id: string;
  session_token: string;
  events: Array<{
    event_type: SessionEventType;
    x?: number;
    y?: number;
    timestamp_ms: number;
    scroll_y?: number;
  }>;
}
