import { Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <>
      <JournalLayout>
        <Typography variant="h6">JournalPage</Typography>
        {false && <NothingSelectedView />}
        <NoteView />
      </JournalLayout>
    </>
  );
};
