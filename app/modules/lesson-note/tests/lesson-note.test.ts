import { describe, expect, it } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("cannot save an empty draft when nothing is saved", () => {
    const state = describeNoteDraft("", null);
    expect(state).toEqual({
      length: 0,
      max: MAX_NOTE_LENGTH,
      tooLong: false,
      empty: true,
      unsaved: false,
      canSave: false,
    });
  });

  it("treats a whitespace-only draft as empty", () => {
    const state = describeNoteDraft("   \n ", null);
    expect(state.empty).toBe(true);
    expect(state.length).toBe(0);
    expect(state.canSave).toBe(false);
  });

  it("can save a new draft", () => {
    const state = describeNoteDraft("Cursor pagination", null);
    expect(state.length).toBe(17);
    expect(state.unsaved).toBe(true);
    expect(state.canSave).toBe(true);
  });

  it("has nothing to save when the draft matches the saved note", () => {
    const state = describeNoteDraft("Cursor pagination", "Cursor pagination");
    expect(state.unsaved).toBe(false);
    expect(state.canSave).toBe(false);
  });

  it("ignores surrounding whitespace when comparing with the saved note", () => {
    const state = describeNoteDraft(
      "  Cursor pagination\n",
      "Cursor pagination"
    );
    expect(state.unsaved).toBe(false);
  });

  it("can save an edit to a saved note", () => {
    const state = describeNoteDraft("Offset pagination", "Cursor pagination");
    expect(state.unsaved).toBe(true);
    expect(state.canSave).toBe(true);
  });

  it("cannot save a cleared note", () => {
    const state = describeNoteDraft("", "Cursor pagination");
    expect(state.unsaved).toBe(true);
    expect(state.canSave).toBe(false);
  });

  it("accepts a draft exactly at the limit", () => {
    const state = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH), null);
    expect(state.tooLong).toBe(false);
    expect(state.canSave).toBe(true);
  });

  it("refuses a draft one character over the limit", () => {
    const state = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH + 1), null);
    expect(state.tooLong).toBe(true);
    expect(state.length).toBe(MAX_NOTE_LENGTH + 1);
    expect(state.canSave).toBe(false);
  });

  it("measures the trimmed draft against the limit", () => {
    const state = describeNoteDraft(` ${"a".repeat(MAX_NOTE_LENGTH)} `, null);
    expect(state.tooLong).toBe(false);
  });
});
