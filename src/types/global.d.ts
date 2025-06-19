declare type AssigneeType = {
  username: string;
  avatar: string;
};

declare type TeamNameType = 'CHRONOS' | 'LABS' | 'PHOENIX' | 'LUMOS';

declare type KanbanCardType = {
  teamName: TeamNameType;
  taskTitle: string;
  ticketID: number;
  assignees: AssigneeType[];
  tags?: string[];
  isExpanded?: boolean;
  isHorizontallyExpanded?: boolean;
};

declare type KanbanListType = {
  listName: string;
  listItems: KanbanCardType[];
};
