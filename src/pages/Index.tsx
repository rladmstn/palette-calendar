
import React, { useState, useEffect } from 'react';
import CalendarView from '@/components/CalendarView';
import ProjectSidebar from '@/components/ProjectSidebar';
import Header from '@/components/Header';
import TodoModal from '@/components/TodoModal';
import EventModal from '@/components/EventModal';
import ProjectModal from '@/components/ProjectModal';
import { mockProjects, mockTodos, mockEvents } from '@/data/mockData';
import { Project, Todo, CalendarEvent } from '@/types';

const Index = () => {
  const [currentView, setCurrentView] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [filteredProjects, setFilteredProjects] = useState<string[]>([]);
  const [showPersonalOnly, setShowPersonalOnly] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleProjectFilter = (projectIds: string[]) => {
    setFilteredProjects(projectIds);
  };

  const handleTogglePersonalFilter = () => {
    setShowPersonalOnly(!showPersonalOnly);
    if (!showPersonalOnly) {
      setFilteredProjects([]);
    }
  };

  const handleCreateTodo = (todoData: { title: string; projectId: string; date: Date; priority: 'low' | 'medium' | 'high' }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
    setShowTodoModal(false);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditingTodo(null);
    setShowTodoModal(false);
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleCreateEvent = (eventData: any) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      ...eventData,
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setEditingEvent(null);
    setShowEventModal(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleCreateProject = (projectData: { name: string; color: string; description?: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date(),
      members: [],
      isShared: false,
    };
    setProjects([...projects, newProject]);
    setShowProjectModal(false);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
    setEditingProject(null);
    setShowProjectModal(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setTodos(todos.filter(todo => todo.projectId !== projectId));
    setEvents(events.filter(event => event.projectId !== projectId));
  };

  const handleDragTodo = (todoId: string, newDate: Date) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, date: newDate } : todo
    ));
  };

  const filteredTodos = showPersonalOnly 
    ? [] // 개인 일정 필터일 때는 TODO 숨김
    : filteredProjects.length > 0 
      ? todos.filter(todo => filteredProjects.includes(todo.projectId))
      : todos;

  const filteredEvents = showPersonalOnly
    ? events.filter(event => event.isPersonal)
    : filteredProjects.length > 0
      ? events.filter(event => 
          event.isPersonal || (event.projectId && filteredProjects.includes(event.projectId))
        )
      : events;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onCreateTodo={() => setShowTodoModal(true)}
        onCreateEvent={() => setShowEventModal(true)}
        onCreateProject={() => setShowProjectModal(true)}
      />
      
      <div className="flex">
        <ProjectSidebar 
          projects={projects}
          onProjectFilter={handleProjectFilter}
          filteredProjects={filteredProjects}
          onEditProject={(project) => {
            setEditingProject(project);
            setShowProjectModal(true);
          }}
          onDeleteProject={handleDeleteProject}
          showPersonalOnly={showPersonalOnly}
          onTogglePersonalFilter={handleTogglePersonalFilter}
        />
        
        <main className="flex-1 p-6">
          <CalendarView 
            view={currentView}
            selectedDate={selectedDate}
            projects={projects}
            todos={filteredTodos}
            events={filteredEvents}
            onTodoDrag={handleDragTodo}
            onTodoEdit={(todo) => {
              setEditingTodo(todo);
              setShowTodoModal(true);
            }}
            onTodoDelete={handleDeleteTodo}
            onTodoComplete={(todoId) => {
              setTodos(todos.map(todo => 
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
              ));
            }}
            onEventEdit={(event) => {
              setEditingEvent(event);
              setShowEventModal(true);
            }}
            onEventDelete={handleDeleteEvent}
          />
        </main>
      </div>

      {showTodoModal && (
        <TodoModal
          isOpen={showTodoModal}
          onClose={() => {
            setShowTodoModal(false);
            setEditingTodo(null);
          }}
          onSave={editingTodo ? handleUpdateTodo : handleCreateTodo}
          projects={projects}
          editingTodo={editingTodo}
        />
      )}

      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setEditingEvent(null);
          }}
          onSave={editingEvent ? handleUpdateEvent : handleCreateEvent}
          projects={projects}
          editingEvent={editingEvent}
        />
      )}

      {showProjectModal && (
        <ProjectModal
          isOpen={showProjectModal}
          onClose={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
          onSave={editingProject ? handleUpdateProject : handleCreateProject}
          editingProject={editingProject}
        />
      )}
    </div>
  );
};

export default Index;
