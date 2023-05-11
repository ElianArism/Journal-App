import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  const { activeNote } = useSelector((state) => state.journal);
  return (
    <>
      <JournalLayout className="animate__animated animate__fadeIn animate__faster">
        <Typography variant="h6">JournalPage</Typography>
        {activeNote ? <NoteView /> : <NothingSelectedView />}
      </JournalLayout>
    </>
  );
};
