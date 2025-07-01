
import React from 'react';
import { Project, Todo, CalendarEvent } from '@/types';
import TodoItem from './TodoItem';
import EventItem from './EventItem';

interface MonthViewProps {
  selectedDate: Date;
  projects: Project[];
  todos: Todo[];
  events: CalendarEvent[];
  onTodoDrag: (todoId: string, newDate: Date) => void;
  onTodoEdit: (todo: Todo) => void;
  onTodoDelete: (todoId: string) => void;
  onTodoComplete: (todoId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
}

const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  projects,
  todos,
  events,
  onTodoDrag,
  onTodoEdit,
  onTodoDelete,
  onTodoComplete,
  getProjectById,
}) => {
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const monthDays = getMonthDays(selectedDate);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const getTodosForDate = (date: Date) => {
    return todos.filter(todo => 
      todo.date.toDateString() === date.toDateString()
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('text/plain');
    onTodoDrag(todoId, date);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="p-3 text-center font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const dayTodos = getTodosForDate(day);
          const dayEvents = getEventsForDate(day);
          const showMax = 3; // 최대 표시할 아이템 수
          const totalItems = dayTodos.length + dayEvents.length;
          const hasMore = totalItems > showMax;
          
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                !isCurrentMonth(day) ? 'bg-gray-50' : ''
              } ${isToday(day) ? 'bg-blue-50' : ''}`}
              onDrop={(e) => handleDrop(e, day)}
              onDragOver={handleDragOver}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday(day) ? 'text-blue-600' : 
                isCurrentMonth(day) ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {day.getDate()}
              </div>
              
              <div className="space-y-1">
                {/* 이벤트 표시 */}
                {dayEvents.slice(0, showMax - dayTodos.length).map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    project={getProjectById(event.projectId || '')}
                    compact
                  />
                ))}
                
                {/* TODO 표시 */}
                {dayTodos.slice(0, showMax - dayEvents.length).map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    project={getProjectById(todo.projectId)}
                    onEdit={() => onTodoEdit(todo)}
                    onDelete={() => onTodoDelete(todo.id)}
                    onComplete={() => onTodoComplete(todo.id)}
                    compact
                    draggable
                  />
                ))}
                
                {/* 더 보기 표시 */}
                {hasMore && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    +{totalItems - showMax}개 더
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
