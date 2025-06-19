import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Badge } from './badge';
import { BadgeThemeForTeam } from '@/common/constants';
import { motion } from 'framer-motion';
import { Tooltip } from './tooltip';
import { RectangleVertical, Trash2, Square, RectangleHorizontal } from 'lucide-react';

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    KanbanCardType {
  index: number;
  onToggleExpansion?: (ticketID: number, isExpanded: boolean) => void;
  onToggleHorizontalExpansion?: (ticketID: number, isExpanded: boolean) => void;
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      taskTitle,
      teamName,
      ticketID,
      tags,
      assignees,
      index,
      isExpanded = false,
      isHorizontallyExpanded = false,
      onToggleExpansion,
      onToggleHorizontalExpansion,
      ...args
    },
    ref,
  ) => {
    const handleHorizontalRectangleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      // If already horizontally expanded, collapse it
      if (isHorizontallyExpanded) {
        onToggleHorizontalExpansion?.(ticketID, false);
      } else {
        // If not horizontally expanded, expand horizontally and collapse vertical
        onToggleExpansion?.(ticketID, false);
        onToggleHorizontalExpansion?.(ticketID, true);
      }
    };

    const handleRectangleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      // If already vertically expanded, collapse it
      if (isExpanded) {
        onToggleExpansion?.(ticketID, false);
      } else {
        // If not vertically expanded, expand vertically and collapse horizontal
        onToggleHorizontalExpansion?.(ticketID, false);
        onToggleExpansion?.(ticketID, true);
      }
    };

    const handleSquareClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpansion?.(ticketID, false);
      onToggleHorizontalExpansion?.(ticketID, false);
    };

    // Determine card dimensions based on expansion state
    const getCardDimensions = () => {
      if (isExpanded && isHorizontallyExpanded) {
        return 'h-[408px] w-[408px]';
      } else if (isExpanded) {
        return 'h-[408px] w-[180px]';
      } else if (isHorizontallyExpanded) {
        return 'h-[180px] w-[408px]';
      } else {
        return 'h-[180px] w-[180px]';
      }
    };

    return (
      <motion.div
        initial={{
          y: (index + 1) * 12,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
        }}
        whileTap={{
          rotate: -4,
        }}
        className={cn(
          isHorizontallyExpanded && 'relative z-10'
        )}>
        <Tooltip
          content={
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1 rounded cursor-pointer",
                (isExpanded || isHorizontallyExpanded) ? "bg-black" : "bg-white"
              )}>
                <Square 
                  size={16} 
                  className={cn(
                    (isExpanded || isHorizontallyExpanded) ? "text-white" : "text-black"
                  )}
                  onClick={handleSquareClick}
                />
              </div>
              <div className={cn(
                "p-1 rounded",
                isExpanded ? "bg-white" : "bg-black"
              )}>
                <RectangleVertical 
                  size={16} 
                  className={cn(
                    "cursor-pointer hover:text-gray-300",
                    isExpanded ? "text-black" : "text-white"
                  )}
                  onClick={handleRectangleClick}
                />
              </div>
              <div className={cn(
                "p-1 rounded",
                isHorizontallyExpanded ? "bg-white" : "bg-black"
              )}>
                <RectangleHorizontal 
                  size={16} 
                  className={cn(
                    "cursor-pointer hover:text-gray-300",
                    isHorizontallyExpanded ? "text-black" : "text-white"
                  )}
                  onClick={handleHorizontalRectangleClick}
                />
              </div>
              <Trash2 size={16} className="cursor-pointer hover:text-gray-300" />
            </div>
          }
        >
          <div
            ref={ref}
            className={cn(
              'kanban-card bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-lg transition-all active:scale-90 select-none flex flex-col',
              getCardDimensions(),
              // isHorizontallyExpanded && 'absolute left-0',
              className,
            )}
            id={`${taskTitle.replaceAll(' ', '-')}-${ticketID}`}
            {...args}>
            <Badge theme={BadgeThemeForTeam[teamName]} className="self-start">
              {teamName}
            </Badge>
            <p className="kanban-card-title text-sm font-medium flex-1 flex items-center overflow-hidden">{taskTitle}</p>
          </div>
        </Tooltip>
      </motion.div>
    );
  },
);

BentoCard.displayName = 'BentoCard';
