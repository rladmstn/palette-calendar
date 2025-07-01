import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentView: 'week' | 'month';
  onViewChange: (view: 'week' | 'month') => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCreateTodo: () => void;
  onCreateEvent: () => void;
  onCreateProject: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  selectedDate,
  onDateChange,
  onCreateTodo,
  onCreateEvent,
  onCreateProject,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    onDateChange(newDate);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 및 제목 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarCheck className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">통합 캘린더</h1>
            </div>
            
            {/* 뷰 전환 버튼 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewChange('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'week'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => onViewChange('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'month'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                월간
              </button>
            </div>
          </div>

          {/* 날짜 네비게이션 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h2 className="text-lg font-semibold text-gray-900 min-w-[120px] text-center">
                {formatDate(selectedDate)}
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={() => onDateChange(new Date())}
              variant="outline"
              size="sm"
            >
              오늘
            </Button>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={onCreateTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              TODO 추가
            </Button>
            
            <Button
              onClick={onCreateEvent}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              일정 추가
            </Button>
            
            <Button
              onClick={onCreateProject}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              프로젝트 추가
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
