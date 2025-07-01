
import React from 'react';
import WeekView from './WeekView';
import MonthView from './MonthView';
import { Project, Todo, CalendarEvent } from '@/types';

interface CalendarViewProps {
  view: 'week' | 'month';
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
}

const CalendarView: React.FC<CalendarViewProps> = ({
  view,
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
}) => {
  const getProjectById = (projectId: string) => {
    return projects.find(p => p.id === projectId);
  };

  if (view === 'week') {
    return (
      <WeekView
        selectedDate={selectedDate}
        projects={projects}
        todos={todos}
        events={events}
        onTodoDrag={onTodoDrag}
        onTodoEdit={onTodoEdit}
        onTodoDelete={onTodoDelete}
        onTodoComplete={onTodoComplete}
        onEventEdit={onEventEdit}
        onEventDelete={onEventDelete}
        getProjectById={getProjectById}
      />
    );
  }

  return (
    <MonthView
      selectedDate={selectedDate}
      projects={projects}
      todos={todos}
      events={events}
      onTodoDrag={onTodoDrag}
      onTodoEdit={onTodoEdit}
      onTodoDelete={onTodoDelete}
      onTodoComplete={onTodoComplete}
      onEventEdit={onEventEdit}
      onEventDelete={onEventDelete}
      getProjectById={getProjectById}
    />
  );
};

export default CalendarView;
