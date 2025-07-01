
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Project, CalendarEvent } from '@/types';
import { Calendar, Users } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
  projects: Project[];
  editingEvent?: CalendarEvent | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projects,
  editingEvent,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    type: 'event' as 'meeting' | 'deadline' | 'event',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    isPersonal: false,
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || '',
        projectId: editingEvent.projectId || '',
        type: editingEvent.type as 'meeting' | 'deadline' | 'event',
        date: editingEvent.date.toISOString().split('T')[0],
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        isPersonal: editingEvent.isPersonal || false,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        projectId: '',
        type: 'event',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        isPersonal: false,
      });
    }
  }, [editingEvent, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;
    if (!formData.isPersonal && !formData.projectId) return;

    const eventData = {
      ...formData,
      date: new Date(formData.date),
      projectId: formData.isPersonal ? undefined : formData.projectId,
    };

    if (editingEvent) {
      onSave({
        ...editingEvent,
        ...eventData,
      });
    } else {
      onSave(eventData);
    }
  };

  const selectedProject = projects.find(p => p.id === formData.projectId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>{editingEvent ? '일정 수정' : '새 일정 추가'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="일정 제목을 입력하세요"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="상세 설명을 입력하세요 (선택사항)"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPersonal"
              checked={formData.isPersonal}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, isPersonal: !!checked, projectId: checked ? '' : formData.projectId })
              }
            />
            <Label htmlFor="isPersonal" className="text-sm font-medium">
              개인 일정
            </Label>
          </div>

          {!formData.isPersonal && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project">프로젝트 *</Label>
                <Select 
                  value={formData.projectId} 
                  onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="프로젝트 선택">
                      {selectedProject && (
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: selectedProject.color }}
                          />
                          <span>{selectedProject.name}</span>
                          {selectedProject.isShared && <Users className="h-3 w-3" />}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          <span>{project.name}</span>
                          {project.isShared && <Users className="h-3 w-3" />}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">유형</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'meeting' | 'deadline' | 'event') => 
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">미팅</SelectItem>
                    <SelectItem value="deadline">마감</SelectItem>
                    <SelectItem value="event">이벤트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">날짜</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">시작 시간</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">종료 시간</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.title.trim() || (!formData.isPersonal && !formData.projectId)}
            >
              {editingEvent ? '수정' : '추가'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
