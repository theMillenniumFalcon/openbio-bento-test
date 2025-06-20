import { createContext } from 'react';
import { INITIAL_KANBAN_DATA } from '@/data/initial-kanban-data';

export type KanbanBoardContextType = {
  kanbanData: KanbanListType[];
  setKanbanData: (data: KanbanListType[]) => void;
  filteredKanbanData: KanbanListType[];
  setFilteredKanbanData: (data: KanbanListType[]) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
  expandedCards: Set<number>;
  setExpandedCards: (expandedCards: Set<number>) => void;
  toggleCardExpansion: (ticketID: number, isExpanded: boolean) => void;
  horizontallyExpandedCards: Set<number>;
  setHorizontallyExpandedCards: (expandedCards: Set<number>) => void;
  toggleHorizontalCardExpansion: (ticketID: number, isExpanded: boolean) => void;
};

export const INITIAL_KANBAN_CONTEXT_DATA: KanbanBoardContextType = {
  kanbanData: INITIAL_KANBAN_DATA,
  setKanbanData: () => {},
  filteredKanbanData: INITIAL_KANBAN_DATA,
  setFilteredKanbanData: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  expandedCards: new Set(),
  setExpandedCards: () => {},
  toggleCardExpansion: () => {},
  horizontallyExpandedCards: new Set(),
  setHorizontallyExpandedCards: () => {},
  toggleHorizontalCardExpansion: () => {},
} satisfies KanbanBoardContextType;

export const KanbanBoardContext: React.Context<KanbanBoardContextType> =
  createContext<KanbanBoardContextType>(INITIAL_KANBAN_CONTEXT_DATA);
