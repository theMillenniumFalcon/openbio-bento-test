'use client';
import { useEffect, useState } from 'react';
import { KanbanBoardContext } from '@/contexts/kanban-board-context';
import { fetchInitialKanbabData } from '@/scripts';

export default function KanbanBoardContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [kanbanData, setKanbanData] = useState<KanbanListType[]>([]);
  const [filteredKanbanData, setFilteredKanbanData] = useState<
    KanbanListType[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Ensure code runs only on the client side
        if (typeof window !== 'undefined' && window.localStorage) {
          let response: KanbanListType[] = await fetchInitialKanbabData();
          setKanbanData(response);

          // Filter individual tasks based on searchQuery
          const filteredData = response.map((list) => ({
            ...list,
            listItems: list.listItems.filter((task) => {
              const isTitleMatch = task.taskTitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
              const isAssigneeMatch = task.assignees.some((assignee) =>
                assignee.username
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              );
              const isTagMatch = task.tags?.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase()),
              );
              const isTeamNameMatch = task.teamName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

              // Customize this condition based on your search requirements
              return (
                isTitleMatch || isAssigneeMatch || isTagMatch || isTeamNameMatch
              );
            }),
          }));

          setFilteredKanbanData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [searchQuery]);

  return (
    <KanbanBoardContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        kanbanData,
        setKanbanData,
        filteredKanbanData,
        setFilteredKanbanData,
      }}>
      {children}
    </KanbanBoardContext.Provider>
  );
}
