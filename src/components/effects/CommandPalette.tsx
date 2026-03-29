'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Code, Briefcase, Mail, FileText, X } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { id: '#hero', title: 'Go to Home', icon: Map, category: 'Navigation' },
    { id: '#about', title: 'Go to About Me', icon: Map, category: 'Navigation' },
    { id: '#projects', title: 'View Projects', icon: Code, category: 'Navigation' },
    { id: '#experience', title: 'View Experience', icon: Briefcase, category: 'Navigation' },
    { id: '#techstack', title: 'View Skills', icon: Code, category: 'Navigation' },
    { id: '#contact', title: 'Contact Me', icon: Mail, category: 'Navigation' },
    { id: '/resume.pdf', title: 'Download Resume', icon: FileText, category: 'Actions', isExternal: true },
    { id: 'copy-email', title: 'Copy Email Address', icon: Mail, category: 'Actions', action: () => {
      navigator.clipboard.writeText('jeseem.502329@sxcce.edu.in');
      alert('Email copied to clipboard!');
    }},
  ];

  const filteredCommands = commands.filter((command) =>
    command.title.toLowerCase().includes(search.toLowerCase())
  );

  const executeCommand = (command: typeof commands[0]) => {
    if (command.action) {
      command.action();
    } else if (command.isExternal) {
      window.open(command.id, '_blank');
    } else {
      const el = document.getElementById(command.id.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[10000] p-4"
          >
            <div className="bg-[#0D0D10]/90 glass-strong border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Search Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/5">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-gray-500 font-mono"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Command List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 font-mono text-sm">
                    No results found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((command, i) => (
                      <button
                        key={`${command.id}-${i}`}
                        onClick={() => executeCommand(command)}
                        className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-[#00D4FF]/10 hover:text-white text-gray-300 transition-colors group text-left"
                      >
                        <command.icon className="w-4 h-4 mr-3 text-gray-500 group-hover:text-[#00D4FF] transition-colors" />
                        <span className="font-medium text-sm flex-1">{command.title}</span>
                        <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider group-hover:text-[#00D4FF]/50">
                          {command.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-xs text-gray-500 font-mono">
                <div className="flex items-center gap-2">
                  <span>Press</span>
                  <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10">ESC</kbd>
                  <span>to close</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Use Keyboard Navigation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
