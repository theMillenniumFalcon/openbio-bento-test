import { Modal } from './modal';
import { Badge } from './badge';
import { BadgeThemeForTeam } from '@/common/constants';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: KanbanCardType;
}

export const CardDetailModal = ({ isOpen, onClose, card }: CardDetailModalProps) => {
  const { teamName, taskTitle, ticketID, assignees, tags } = card;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge theme={BadgeThemeForTeam[teamName]} className="text-sm">
              {teamName}
            </Badge>
            <span className="text-sm text-gray-500">#{ticketID}</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">{taskTitle}</h2>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Assignees Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Assignees</h3>
            {assignees.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {assignees.map((assignee, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={assignee.avatar} alt={assignee.username} />
                      <AvatarFallback className="text-xs">
                        {assignee.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {assignee.username}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No assignees</p>
            )}
          </div>

          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Team</span>
                <p className="text-sm font-medium text-gray-900">{teamName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Ticket ID</span>
                <p className="text-sm font-medium text-gray-900">#{ticketID}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}; 