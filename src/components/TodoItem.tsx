
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Project, Todo } from '@/types';
import { Edit, Trash2, CheckCircle } from 'lucide-react';

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
      case 'high': return 'bg-red-900/40 text-red-300 dark:bg-red-900/40 dark:text-red-300';
      case 'medium': return 'bg-yellow-900/40 text-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300';
      default: return 'bg-green-900/40 text-green-300 dark:bg-green-900/40 dark:text-green-300';
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
        className={`group text-xs p-2 rounded border-l-4 cursor-move transition-all hover:shadow-lg backdrop-blur-sm ${
          todo.completed 
            ? 'bg-slate-800/30 dark:bg-slate-800/30 bg-gray-100/30 opacity-60' 
            : 'bg-slate-800/50 dark:bg-slate-800/50 bg-gray-100/50'
        }`}
        style={{ 
          borderLeftColor: project?.color || '#6b7280',
          backgroundColor: project ? `${project.color}15` : 'rgba(107, 114, 128, 0.1)' 
        }}
        draggable={draggable}
        onDragStart={handleDragStart}
      >
        <div className="flex items-center space-x-2 mb-1">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={onComplete}
            className="h-3 w-3 border-slate-400 dark:border-slate-400 border-gray-600"
          />
          <span className={`flex-1 ${
            todo.completed 
              ? 'line-through text-slate-500 dark:text-slate-500 text-gray-500' 
              : 'text-gray-900 dark:text-slate-100 font-medium'
          }`}>
            {todo.title}
          </span>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 text-slate-400 dark:text-slate-400 text-gray-600 hover:text-purple-400 dark:hover:text-purple-400 hover:text-purple-600"
            >
              <Edit className="h-2 w-2" />
            </Button>
          </div>
        </div>
        
        {project && (
          <div className="mt-1 flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-xs font-medium" style={{ color: project.color }}>
              {project.name}
            </span>
            {project.isShared && (
              <Badge variant="outline" className="text-xs px-1 border-slate-600 dark:border-slate-600 border-gray-400 text-slate-400 dark:text-slate-400 text-gray-600">
                공유됨
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group p-4 rounded-lg border-2 transition-all cursor-move hover:shadow-2xl backdrop-blur-sm ${
        todo.completed 
          ? 'bg-slate-800/30 dark:bg-slate-800/30 bg-gray-100/30 border-slate-700/50 dark:border-slate-700/50 border-gray-300/50 opacity-60' 
          : 'bg-slate-800/50 dark:bg-slate-800/50 bg-gray-100/50 border-slate-700/50 dark:border-slate-700/50 border-gray-300/50 hover:border-slate-600/50 dark:hover:border-slate-600/50 hover:border-gray-400/50'
      }`}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start space-x-3 mb-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={onComplete}
              className="h-4 w-4 mt-1 border-slate-400 dark:border-slate-400 border-gray-600"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {project && (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                )}
                <h4 className={`font-medium ${
                  todo.completed 
                    ? 'line-through text-slate-500 dark:text-slate-500 text-gray-500' 
                    : 'text-gray-900 dark:text-slate-100 font-semibold'
                }`}>
                  {todo.title}
                </h4>
              </div>
              
              {todo.description && (
                <p className="text-sm text-slate-400 dark:text-slate-400 text-gray-600 mb-2">{todo.description}</p>
              )}
              
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(todo.priority)}>
                  {getPriorityText(todo.priority)}
                </Badge>
                
                {project && (
                  <Badge variant="outline" style={{ color: project.color, borderColor: project.color }}>
                    {project.name}
                    {project.isShared && <span className="ml-1">👥</span>}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 dark:text-slate-400 text-gray-600 hover:text-purple-400 dark:hover:text-purple-400 hover:text-purple-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 dark:text-slate-400 text-gray-600 hover:text-red-400 dark:hover:text-red-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
