export interface Note {
  index: number;
  title: string;
  note: string;
  createdDate: Date;
  archived: boolean;
}
export const notes: Note[] = [];

export const loadNotes = () => {
  const data = localStorage.getItem("notes");
  if (data) {
    notes.splice(0, notes.length);
    notes.push(
      ...(JSON.parse(data) as Note[]).map((note) => ({
        ...note,
        createdDate: new Date(note.createdDate),
        archived: false,
      }))
    );
  }
  return notes;
};

export const addNote = (title: string, note: string) => {
  notes.push({
    index: notes.length === 0 ? 1 : notes[notes.length - 1].index + 1,
    title,
    note,
    createdDate: new Date(),
    archived: false,
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};
