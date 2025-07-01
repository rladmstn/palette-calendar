
export interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  projectId: string;
  date: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  projectId?: string;
  type: 'meeting' | 'deadline' | 'event';
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'project_manager' | 'freelancer' | 'student';
}
