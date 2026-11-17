import { z } from "zod";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

/** The rules the save-note action applies. The editor reads the same ones. */
export const saveNoteSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Write something before saving your note.")
    .max(
      MAX_NOTE_LENGTH,
      `Your note is over ${MAX_NOTE_LENGTH.toLocaleString("en")} characters, so it was not saved.`
    ),
});

export type NoteDraftState = {
  /** Characters that would be saved: the action trims before it measures. */
  length: number;
  max: number;
  tooLong: boolean;
  /** The draft differs from the saved body, which the action stored trimmed. */
  unsaved: boolean;
  /** Why the action would refuse this draft, or null if it would accept it. */
  problem: string | null;
  canSave: boolean;
};

export function noteDraftState(
  draft: string,
  savedBody: string | null
): NoteDraftState {
  const length = draft.trim().length;
  const unsaved = draft.trim() !== (savedBody ?? "");
  const parsed = saveNoteSchema.safeParse({ body: draft });
  const problem = parsed.success ? null : parsed.error.issues[0].message;

  return {
    length,
    max: MAX_NOTE_LENGTH,
    tooLong: length > MAX_NOTE_LENGTH,
    unsaved,
    problem,
    canSave: unsaved && problem === null,
  };
}
