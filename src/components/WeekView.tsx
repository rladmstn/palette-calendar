
import React from 'react';
import { Project, Todo, CalendarEvent } from '@/types';
import TodoItem from './TodoItem';
import EventItem from './EventItem';

interface WeekViewProps {
  selectedDate: Date;
  projects: Project[];
  todos: Todo[];
  events: CalendarEvent[];
  onTodoDrag: (todoId: string, newDate: Date) => void;
  onTodoEdit: (todo: Todo) => void;
  onTodoDelete: (todoId: string) => void;
  onTodoComplete: (todoId: string) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
}

const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  projects,
  todos,
  events,
  onTodoDrag,
  onTodoEdit,
  onTodoDelete,
  onTodoComplete,
  onEventEdit,
  onEventDelete,
  getProjectById,
}) => {
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const diff = startOfWeek.getDate() - startOfWeek.getDay();
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(selectedDate);
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

  return (
    <div className="bg-card backdrop-blur-sm rounded-lg shadow-lg border">
      {/* 헤더 */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day, index) => (
          <div
            key={day.toISOString()}
            className={`p-4 text-center border-r last:border-r-0 ${
              isToday(day) ? 'bg-accent' : ''
            }`}
          >
            <div className="text-sm font-medium text-muted-foreground mb-1">
              {dayNames[index]}
            </div>
            <div className={`text-2xl font-semibold ${
              isToday(day) ? 'text-primary' : 'text-foreground'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* 캘린더 내용 */}
      <div className="grid grid-cols-7 min-h-[500px]">
        {weekDays.map((day) => {
          const dayTodos = getTodosForDate(day);
          const dayEvents = getEventsForDate(day);
          
          return (
            <div
              key={day.toISOString()}
              className={`p-3 border-r last:border-r-0 ${
                isToday(day) ? 'bg-accent/50' : ''
              }`}
              onDrop={(e) => handleDrop(e, day)}
              onDragOver={handleDragOver}
            >
              <div className="space-y-2">
                {/* 이벤트 표시 */}
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventEdit(event)}
                    className="cursor-pointer"
                  >
                    <EventItem
                      event={event}
                      project={getProjectById(event.projectId || '')}
                      compact
                    />
                  </div>
                ))}
                
                {/* TODO 표시 */}
                {dayTodos.map((todo) => (
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
                
                {/* 빈 날짜 표시 */}
                {dayTodos.length === 0 && dayEvents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    일정 없음
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

export default WeekView;
