import { forwardRef, ReactNode, useContext } from 'react';
import { cn } from '@/utils/cn';
import { BentoCard } from './bento-card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { KanbanBoardContext } from '@/contexts/kanban-board-context';

export interface BentoListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    KanbanListType {
  index: number;
  children?: ReactNode;
}

export const BentoList = forwardRef<HTMLDivElement, BentoListProps>(
  ({ className, listItems = [], listName, index, ...args }, ref) => {
    const { expandedCards, horizontallyExpandedCards, toggleCardExpansion, toggleHorizontalCardExpansion } = useContext(KanbanBoardContext);

    // Check if any cards are expanded to determine grid layout
    const hasExpandedCards = expandedCards.size > 0 || horizontallyExpandedCards.size > 0;

    return (
      <div>
        {/* <div className="kanban-list-details-wrapper px-2 mb-2">
          <p className="leading-snug font-medium tracking-tight text-gray-500 text-sm">
            {listName}
          </p>
        </div> */}
        <Droppable droppableId={listName} key={listName}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                'kanban-list border-b-4 border-transparent bg-red-800 w-fit min-h-[200px]',
                // Adjust max width to accommodate horizontally expanded cards
                horizontallyExpandedCards.size > 0 ? 'max-w-[500px]' : 'max-w-[250px]',
                className,
              )}
              {...args}>
              <div className={cn(
                'grid gap-12',
                'grid-cols-1 auto-rows-[180px]'
              )}>
                {listItems.map((card: KanbanCardType, index: number) => {
                  const isExpanded = card.isExpanded || expandedCards.has(card.ticketID);
                  const isHorizontallyExpanded = card.isHorizontallyExpanded || horizontallyExpandedCards.has(card.ticketID);
                  return (
                    <Draggable
                      key={`${card.taskTitle.replaceAll(' ', '-')}-${card.ticketID}`}
                      draggableId={`${card.taskTitle.replaceAll(' ', '-')}-${card.ticketID}`}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            isExpanded && 'row-span-2'
                          )}>
                          <BentoCard 
                            key={index} 
                            {...card} 
                            index={index} 
                            isExpanded={isExpanded}
                            isHorizontallyExpanded={isHorizontallyExpanded}
                            onToggleExpansion={toggleCardExpansion}
                            onToggleHorizontalExpansion={toggleHorizontalCardExpansion}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  },
);

BentoList.displayName = 'BentoList';
