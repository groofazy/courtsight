"use client";
import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('courtsight_bookmarks');
    const savedNotes = localStorage.getItem('courtsight_notes');
    
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) { console.error("Failed to parse bookmarks", e); }
    }
    
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) { console.error("Failed to parse notes", e); }
    }

    // This syncs the Header counter across different components/tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'courtsight_bookmarks' && e.newValue) {
        setBookmarks(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleBookmark = (id: string | number) => {
    const stringId = String(id); // Force everything to string for consistency
    
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(stringId);
      const next = isBookmarked 
        ? prev.filter(b => b !== stringId) 
        : [...prev, stringId];
      
      localStorage.setItem('courtsight_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const updateNote = (id: string | number, text: string) => {
    const stringId = String(id);
    setNotes((prev) => {
      const nextNotes = { ...prev, [stringId]: text };
      localStorage.setItem('courtsight_notes', JSON.stringify(nextNotes));
      return nextNotes;
    });
  };

  return { bookmarks, toggleBookmark, notes, updateNote };
}