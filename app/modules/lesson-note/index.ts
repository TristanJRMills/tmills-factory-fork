import {
  noteDraftState,
  saveNoteSchema,
  type NoteDraftState,
} from "./lib/draft";

export type { NoteDraftState };
export { saveNoteSchema };

export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraftState {
  return noteDraftState(draft, savedBody);
}
