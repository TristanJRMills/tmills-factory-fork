import { useState } from "react";
import { useFetcher } from "react-router";
import { CheckCircle2, NotebookPen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatRelativeTime } from "~/lib/utils";
import { describeNoteDraft } from "~/modules/lesson-note";

export function LessonNote({
  note,
}: {
  note: { body: string; updatedAt: string } | null;
}) {
  const fetcher = useFetcher<{ ok: boolean; error?: string }>();
  const [draft, setDraft] = useState(note?.body ?? "");
  const isSaving = fetcher.state !== "idle";
  const error = fetcher.data?.error;
  const { length, max, tooLong, unsaved, canSave } = describeNoteDraft(
    draft,
    note?.body ?? null
  );

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <NoteHeading />
          <NoteStatus
            isSaving={isSaving}
            unsaved={unsaved}
            updatedAt={note?.updatedAt ?? null}
          />
        </div>

        <fetcher.Form method="post" className="space-y-2">
          <input type="hidden" name="intent" value="save-note" />
          <Textarea
            name="body"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Your notes on this lesson"
            aria-invalid={tooLong || undefined}
            placeholder="Key ideas, questions to ask, code to try later..."
            className="min-h-32 resize-y"
          />
          <NoteFooter
            canSave={canSave && !isSaving}
            isSaving={isSaving}
            error={error}
            length={length}
            max={max}
            tooLong={tooLong}
          />
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}

function NoteFooter({
  canSave,
  isSaving,
  error,
  length,
  max,
  tooLong,
}: {
  canSave: boolean;
  isSaving: boolean;
  error: string | undefined;
  length: number;
  max: number;
  tooLong: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button type="submit" size="sm" disabled={!canSave}>
        {isSaving ? "Saving..." : "Save note"}
      </Button>
      {error && <span className="text-sm text-destructive">{error}</span>}
      <span
        className={cn(
          "ml-auto text-xs",
          tooLong ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {length} / {max}
      </span>
    </div>
  );
}

function NoteHeading() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <NotebookPen className="size-5 text-primary" />
        <h2 className="text-xl font-semibold">Your Notes</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Private to you. Jot things down while you watch.
      </p>
    </div>
  );
}

function NoteStatus({
  isSaving,
  unsaved,
  updatedAt,
}: {
  isSaving: boolean;
  unsaved: boolean;
  updatedAt: string | null;
}) {
  if (isSaving) {
    return <span className="text-xs text-muted-foreground">Saving...</span>;
  }
  if (unsaved) {
    return (
      <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
        Unsaved changes
      </span>
    );
  }
  if (!updatedAt) return null;
  return (
    <span
      suppressHydrationWarning
      className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"
    >
      <CheckCircle2 className="size-3.5 text-green-600" />
      Saved {formatRelativeTime(updatedAt)}
    </span>
  );
}
