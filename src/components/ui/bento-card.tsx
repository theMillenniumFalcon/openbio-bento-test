import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Badge } from './badge';
import { BadgeThemeForTeam } from '@/common/constants';
import { motion } from 'framer-motion';
import { Tooltip } from './tooltip';
import { RectangleVertical, Trash2, Square } from 'lucide-react';

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    KanbanCardType {
  index: number;
  onToggleExpansion?: (ticketID: number, isExpanded: boolean) => void;
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
      onToggleExpansion,
      ...args
    },
    ref,
  ) => {
    const handleRectangleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isExpanded) {
        onToggleExpansion?.(ticketID, true);
      }
    };

    const handleSquareClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpansion?.(ticketID, false);
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
        }}>
        <Tooltip
          content={
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1 rounded cursor-pointer",
                isExpanded ? "bg-black" : "bg-white"
              )}>
                <Square 
                  size={16} 
                  className={cn(
                    isExpanded ? "text-white" : "text-black"
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
              <Trash2 size={16} className="cursor-pointer hover:text-gray-300" />
            </div>
          }
        >
          <div
            ref={ref}
            className={cn(
              'kanban-card bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-lg transition-all active:scale-90 select-none flex flex-col',
              isExpanded ? 'h-[408px] w-[180px]' : 'h-[180px] w-[180px]',
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
