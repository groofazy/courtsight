import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('courtsight_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (id: string) => {
    const next = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('courtsight_bookmarks', JSON.stringify(next));
  };

  return { bookmarks, toggleBookmark };
}