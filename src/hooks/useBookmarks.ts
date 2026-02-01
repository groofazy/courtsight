import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('courtsight_bookmarks');
    const savedNotes = localStorage.getItem('courtsight_notes');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  const toggleBookmark = (id: string) => {
    const next = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('courtsight_bookmarks', JSON.stringify(next));
  };

  const updateNote = (id: string, text: string) => {
    const nextNotes = { ...notes, [id]: text };
    setNotes(nextNotes);
    localStorage.setItem('courtsight_notes', JSON.stringify(nextNotes));
  };

  return { bookmarks, toggleBookmark, notes, updateNote };
}