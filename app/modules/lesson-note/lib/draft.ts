import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraftState = {
  /** Characters that would be saved: the action trims before it measures. */
  length: number;
  max: number;
  tooLong: boolean;
  empty: boolean;
  /** The draft differs from the saved body, which the action stored trimmed. */
  unsaved: boolean;
  canSave: boolean;
};

export function noteDraftState(
  draft: string,
  savedBody: string | null
): NoteDraftState {
  const trimmed = draft.trim();
  const length = trimmed.length;
  const tooLong = length > MAX_NOTE_LENGTH;
  const empty = length === 0;
  const unsaved = trimmed !== (savedBody ?? "");

  return {
    length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    empty,
    unsaved,
    canSave: unsaved && !empty && !tooLong,
  };
}
