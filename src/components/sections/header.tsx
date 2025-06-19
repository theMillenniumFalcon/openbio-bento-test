'use client';

import { useContext } from 'react';
import { ResponsiveControl } from '../layouts/responsive-control';
import { Input } from '../ui/input';
import { KanbanBoardContext } from '@/contexts/kanban-board-context';

/**
 * Functional component representing the header of the Kanban board section.
 * @function
 * @name Header
 * @memberof module:components/sections
 * @returns {React.ReactElement} The Header component.
 */
export default function Header(): React.ReactElement {
  const { searchQuery, setSearchQuery } = useContext(KanbanBoardContext);
  return (
    <header className="py-3 border-b">
      <ResponsiveControl className="flex flex-row items-center justify-between">
        <div className="header-content-wrapper">
          <h3 className="leading-snug text-lg font-semibold tracking-tight">
            {'Engineering Team / Task Board'}
          </h3>
        </div>
        <div className="header-global-search-wrapper">
          <Input
            className="w-[420px]"
            placeholder="Search tasks by title, assignee or tags"
            onChange={(e) => setSearchQuery(e.target.value as string)}
            value={searchQuery}
          />
        </div>
      </ResponsiveControl>
    </header>
  );
}
