
import React, { useState, useEffect } from 'react';
import CalendarView from '@/components/CalendarView';
import ProjectSidebar from '@/components/ProjectSidebar';
import Header from '@/components/Header';
import TodoModal from '@/components/TodoModal';
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
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleProjectFilter = (projectIds: string[]) => {
    setFilteredProjects(projectIds);
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

  const handleCreateProject = (projectData: { name: string; color: string; description?: string }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date(),
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

  const filteredTodos = filteredProjects.length > 0 
    ? todos.filter(todo => filteredProjects.includes(todo.projectId))
    : todos;

  const filteredEvents = filteredProjects.length > 0
    ? events.filter(event => event.projectId && filteredProjects.includes(event.projectId))
    : events;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onCreateTodo={() => setShowTodoModal(true)}
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
