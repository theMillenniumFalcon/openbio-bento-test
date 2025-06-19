import { useContext, useState } from 'react';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd';
import { ResponsiveControl } from '../layouts/responsive-control';
import { KanbanBoardContext } from '@/contexts/kanban-board-context';
import { BentoList } from '../ui/bento-list';
import MessageView from './message-view';

export default function BentoView(): React.ReactElement {
  const { filteredKanbanData, setFilteredKanbanData, setKanbanData } = useContext(KanbanBoardContext);
  const [draggedItem, setDraggedItem] = useState<KanbanCardType | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const onDragStart = (initial: DragStart): void => {
    const { source } = initial;
    const sourceList = filteredKanbanData.find(
      (list) => list.listName === source.droppableId,
    );
    const draggedTask = sourceList?.listItems[source.index];
    setDraggedItem(draggedTask || null);
  };

  const onDragUpdate = (update: DragUpdate): void => {
    const { destination } = update;
    setDraggedOverIndex(destination?.index || null);
  };

  const onDragEnd = (result: DropResult): void => {
    // Reset state
    setDraggedItem(null);
    setDraggedOverIndex(null);

    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Update the data after dragging and dropping
    const updatedKanbanData = [...filteredKanbanData];
    const sourceList = updatedKanbanData.find(
      (list) => list.listName === source.droppableId,
    );
    const destinationList = updatedKanbanData.find(
      (list) => list.listName === destination.droppableId,
    );
    const [draggedTask] = sourceList!.listItems.splice(source.index, 1);
    
    // Preserve the expanded state when moving the card
    const cardWithExpandedState = {
      ...draggedTask,
      isExpanded: draggedTask.isExpanded || false,
      isHorizontallyExpanded: draggedTask.isHorizontallyExpanded || false
    };
    
    destinationList!.listItems.splice(destination.index, 0, cardWithExpandedState);

    // Update the local storage with the latest Kanban data
    localStorage.setItem('kanban', JSON.stringify(updatedKanbanData));

    // Update both filtered and global kanban data to trigger a re-render
    setFilteredKanbanData(updatedKanbanData);
    setKanbanData(updatedKanbanData);
  };

  return (
    <div className="kanban-view py-12 flex flex-row items-start justify-start w-full">
      <MessageView />
      <div className="w-2/3">
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}>
          <ResponsiveControl className="flex flex-row items-start justify-center gap-12 max-xl:overflow-x-scroll bg-blue-500 p-4">
            {filteredKanbanData.map((list: KanbanListType, index: number) => {
              return <BentoList key={index} index={index} {...list} />;
            })}
          </ResponsiveControl>
        </DragDropContext>
      </div>
    </div>
  );
}
