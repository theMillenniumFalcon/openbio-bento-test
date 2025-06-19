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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // Load expanded cards from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedExpandedCards = localStorage.getItem('expandedCards');
      if (storedExpandedCards) {
        try {
          const parsedCards = JSON.parse(storedExpandedCards);
          setExpandedCards(new Set(parsedCards));
        } catch (error) {
          console.error('Error parsing expanded cards from localStorage:', error);
        }
      }
    }
  }, []);

  // Save expanded cards to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('expandedCards', JSON.stringify(Array.from(expandedCards)));
    }
  }, [expandedCards]);

  const toggleCardExpansion = (ticketID: number, isExpanded: boolean) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.add(ticketID);
      } else {
        newSet.delete(ticketID);
      }
      return newSet;
    });

    // Update the card objects in both kanbanData and filteredKanbanData
    setKanbanData(prevData => {
      const updatedData = prevData.map(list => ({
        ...list,
        listItems: list.listItems.map(card => 
          card.ticketID === ticketID 
            ? { ...card, isExpanded } 
            : card
        )
      }));
      
      // Update localStorage with the new data
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('kanban', JSON.stringify(updatedData));
      }
      
      return updatedData;
    });

    setFilteredKanbanData(prevData => {
      return prevData.map(list => ({
        ...list,
        listItems: list.listItems.map(card => 
          card.ticketID === ticketID 
            ? { ...card, isExpanded } 
            : card
        )
      }));
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Ensure code runs only on the client side
        if (typeof window !== 'undefined' && window.localStorage) {
          let response: KanbanListType[] = await fetchInitialKanbabData();
          setKanbanData(response);

          // Restore expanded state from card objects
          const expandedFromCards = new Set<number>();
          response.forEach(list => {
            list.listItems.forEach(card => {
              if (card.isExpanded) {
                expandedFromCards.add(card.ticketID);
              }
            });
          });
          
          // Merge with any existing expanded cards from localStorage
          const storedExpandedCards = localStorage.getItem('expandedCards');
          if (storedExpandedCards) {
            try {
              const parsedCards = JSON.parse(storedExpandedCards);
              parsedCards.forEach((ticketID: number) => expandedFromCards.add(ticketID));
            } catch (error) {
              console.error('Error parsing expanded cards from localStorage:', error);
            }
          }
          
          setExpandedCards(expandedFromCards);

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
        expandedCards,
        setExpandedCards,
        toggleCardExpansion,
      }}>
      {children}
    </KanbanBoardContext.Provider>
  );
}
