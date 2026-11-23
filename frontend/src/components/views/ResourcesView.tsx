import React, { useState } from 'react';
import {
  Download,
  PlusCircle,
  Search,
  BookOpen,
  Calendar
} from 'lucide-react';
import { Note, User as UserType } from '../../types';

interface ResourcesViewProps {
  notes: Note[];
  currentUser: UserType | null;
  onOpenCreateNote: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  notes,
  currentUser,
  onOpenCreateNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin' || !currentUser;

  const filteredNotes = notes.filter(n => {
    const matchesCourse = selectedCourse === 'ALL' || n.courseId === selectedCourse;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const handleDownload = (note: Note) => {
    setDownloadSuccessId(note.id);
    // Simulate instantaneous download of study notes text file
    const element = document.createElement("a");
    const file = new Blob([`# ${note.title}\nCourse: ${note.courseName}\nAuthor: ${note.author}\nDate: ${note.createdAt}\n\n${note.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${note.title.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#5B4BD8]" />
            Academic Learning Repository
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Study Resources & Lecture Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access certified course materials, faculty lecture notes, and downloadable revision decks.
          </p>
        </div>

        {/* Faculty Push Button */}
        {isFaculty && (
          <button
            onClick={onOpenCreateNote}
            className="px-5 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Push Lecture Note</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by keyword, topic, or faculty author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-slate-50/50"
          />
        </div>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-white font-medium"
        >
          <option value="ALL">All Enrolled Courses</option>
          <option value="CRS-101">CS 101 - Algorithms</option>
          <option value="CRS-204">MATH 204 - Calculus</option>
          <option value="CRS-402">AI 402 - Machine Learning</option>
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group hover:border-[#5B4BD8]/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5B4BD8] text-[11px] font-bold">
                  {note.courseName}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.createdAt}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors leading-snug">
                {note.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {note.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                Author: {note.author}
              </span>

              <button
                onClick={() => handleDownload(note)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  downloadSuccessId === note.id
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-purple-50 hover:bg-[#5B4BD8] text-[#5B4BD8] hover:text-white border border-purple-100'
                }`}
                title="Download study note"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccessId === note.id ? 'Downloaded!' : 'Download'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
