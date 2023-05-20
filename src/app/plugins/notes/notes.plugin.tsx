import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteNote, openAddNote, openEditNote } from "./notes.slice";
import { WidgetLayout } from "../../layouts/widget.layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import "./notes.plugin.scss";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const Notes = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();
  return (
    <WidgetLayout
      title="Notes"
      actions={() => (
        <AiOutlinePlus
          className="notes__add"
          onClick={() => dispatch(openAddNote())}
        />
      )}
    >
      <div className="notes__container">
        {notes.length === 0 && (
          <p className="notes__empty">There are no notes yet!</p>
        )}
        {notes.length !== 0 &&
          notes.map((note, i) => {
            return (
              <Accordion
                key={i}
                expanded={expanded === i}
                onChange={handleChange(i)}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  className="note__header"
                >
                  <Tooltip title={note.title}>
                    <Typography
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        flexGrow: "1",
                        whiteSpace: "nowrap",
                        width: 0,
                      }}
                    >
                      {note.title}
                    </Typography>
                  </Tooltip>
                  <div className="note__actions">
                    <IconButton
                      onClick={() => dispatch(openEditNote(note.index))}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(deleteNote(note));
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontSize={`0.6em`}>
                    {new Date(note.createdDate).toDateString()}
                  </Typography>
                  <Typography>{note.note}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </WidgetLayout>
  );
};

export const NotesContainer = () => {
  return <Notes />;
};
