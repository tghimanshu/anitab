/**
 * Interface representing a note.
 */
export interface Note {
  /**
   * Unique index/ID of the note.
   */
  index: number;
  /**
   * Title of the note.
   */
  title: string;
  /**
   * Content of the note.
   */
  note: string;
  /**
   * Date the note was created.
   */
  createdDate: Date;
  /**
   * Whether the note is archived.
   */
  archived: boolean;
}

/**
 * Array to store notes in memory.
 */
export const notes: Note[] = [];

/**
 * Loads notes from local storage.
 *
 * This function retrieves the 'notes' item from localStorage, parses it,
 * converts the date strings back to Date objects, and populates the `notes` array.
 *
 * @returns {Note[]} The loaded notes array.
 */
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

/**
 * Adds a new note.
 *
 * Creates a new note object with the given title and content, adds it to the
 * `notes` array, and saves the updated array to localStorage.
 *
 * @param {string} title - The title of the new note.
 * @param {string} note - The content of the new note.
 */
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
