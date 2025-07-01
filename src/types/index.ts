
export interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: Date;
  members?: string[]; // 프로젝트 멤버 이메일 목록
  isShared?: boolean;
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
  type: 'meeting' | 'deadline' | 'event' | 'personal';
  description?: string;
  isPersonal?: boolean; // 개인 일정 여부
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'project_manager' | 'freelancer' | 'student';
}
