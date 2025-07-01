
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project, Todo } from '@/types';
import { Edit, Trash2, Check } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  project?: Project;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  compact?: boolean;
  draggable?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  project,
  onEdit,
  onDelete,
  onComplete,
  compact = false,
  draggable = false,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (draggable) {
      e.dataTransfer.setData('text/plain', todo.id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '높음';
      case 'medium': return '보통';
      default: return '낮음';
    }
  };

  if (compact) {
    return (
      <div
        className={`group text-xs p-2 rounded border-l-4 cursor-move transition-all hover:shadow-sm ${
          todo.completed ? 'bg-gray-50 opacity-60' : 'bg-white'
        }`}
        style={{ 
          borderLeftColor: project?.color || '#gray',
          backgroundColor: project ? `${project.color}10` : undefined 
        }}
        draggable={draggable}
        onDragStart={handleDragStart}
      >
        <div className="flex items-center justify-between">
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </span>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Check className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {project && (
          <div className="mt-1">
            <span className="text-xs font-medium" style={{ color: project.color }}>
              {project.name}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group p-4 rounded-lg border-2 transition-all cursor-move hover:shadow-md ${
        todo.completed 
          ? 'bg-gray-50 border-gray-200 opacity-60' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {project && (
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            )}
            <h4 className={`font-medium ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h4>
          </div>
          
          {todo.description && (
            <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
          )}
          
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(todo.priority)}>
              {getPriorityText(todo.priority)}
            </Badge>
            
            {project && (
              <Badge variant="outline" style={{ color: project.color, borderColor: project.color }}>
                {project.name}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={onComplete}
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${
              todo.completed 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-400 hover:text-green-600'
            }`}
          >
            <Check className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
