import { createContext } from 'react';
import { INITIAL_KANBAN_DATA } from '@/data/initial-kanban-data';

export type KanbanBoardContextType = {
  kanbanData: KanbanListType[];
  setKanbanData: (data: KanbanListType[]) => void;
  filteredKanbanData: KanbanListType[];
  setFilteredKanbanData: (data: KanbanListType[]) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
};

export const INITIAL_KANBAN_CONTEXT_DATA: KanbanBoardContextType = {
  kanbanData: INITIAL_KANBAN_DATA,
  setKanbanData: () => {},
  filteredKanbanData: INITIAL_KANBAN_DATA,
  setFilteredKanbanData: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
} satisfies KanbanBoardContextType;

export const KanbanBoardContext: React.Context<KanbanBoardContextType> =
  createContext<KanbanBoardContextType>(INITIAL_KANBAN_CONTEXT_DATA);
