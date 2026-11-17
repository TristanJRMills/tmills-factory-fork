import { noteDraftState, type NoteDraftState } from "./lib/draft";

export type { NoteDraftState };

/**
 * What the Lesson page's note editor shows for a draft: how long it is
 * against the limit, whether it differs from the saved Note, and whether
 * Save would be accepted by the action.
 */
export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraftState {
  return noteDraftState(draft, savedBody);
}
