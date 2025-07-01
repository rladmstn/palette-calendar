
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Project, CalendarEvent } from '@/types';
import { Clock, Users, AlertTriangle, Calendar, Heart } from 'lucide-react';

interface EventItemProps {
  event: CalendarEvent;
  project?: Project;
  compact?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  project,
  compact = false,
}) => {
  const getEventIcon = (type: string, isPersonal?: boolean) => {
    if (isPersonal) return <Heart className="h-3 w-3" />;
    
    switch (type) {
      case 'meeting': return <Users className="h-3 w-3" />;
      case 'deadline': return <AlertTriangle className="h-3 w-3" />;
      default: return <Calendar className="h-3 w-3" />;
    }
  };

  const getEventColor = (type: string, isPersonal?: boolean) => {
    if (isPersonal) return 'bg-pink-100 text-pink-800 border-pink-200';
    
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getEventTypeText = (type: string, isPersonal?: boolean) => {
    if (isPersonal) return '개인 일정';
    
    switch (type) {
      case 'meeting': return '미팅';
      case 'deadline': return '마감';
      default: return '이벤트';
    }
  };

  if (compact) {
    return (
      <div
        className={`text-xs p-2 rounded border-l-4 ${getEventColor(event.type, event.isPersonal)}`}
        style={{ 
          borderLeftColor: event.isPersonal ? '#ec4899' : (project?.color || '#gray'),
          backgroundColor: event.isPersonal ? '#fdf2f8' : (project ? `${project.color}15` : undefined)
        }}
      >
        <div className="flex items-center space-x-1 mb-1">
          {getEventIcon(event.type, event.isPersonal)}
          <span className="font-medium">{event.title}</span>
        </div>
        
        <div className="text-xs opacity-80">
          {event.startTime} - {event.endTime}
        </div>
        
        {!event.isPersonal && project && (
          <div className="mt-1 flex items-center space-x-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-xs font-medium" style={{ color: project.color }}>
              {project.name}
              {project.isShared && <span className="ml-1">👥</span>}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`p-4 rounded-lg border-2 ${getEventColor(event.type, event.isPersonal)}`}
      style={{ 
        backgroundColor: event.isPersonal ? '#fdf2f8' : (project ? `${project.color}10` : undefined),
        borderColor: event.isPersonal ? '#ec4899' : (project?.color || undefined)
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {!event.isPersonal && project && (
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            )}
            {getEventIcon(event.type, event.isPersonal)}
            <h4 className="font-medium text-gray-900">{event.title}</h4>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Clock className="h-4 w-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          {event.description && (
            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
          )}
          
          <div className="flex items-center space-x-2">
            <Badge className={getEventColor(event.type, event.isPersonal)}>
              {getEventTypeText(event.type, event.isPersonal)}
            </Badge>
            
            {!event.isPersonal && project && (
              <Badge variant="outline" style={{ color: project.color, borderColor: project.color }}>
                {project.name}
                {project.isShared && <span className="ml-1">👥</span>}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
