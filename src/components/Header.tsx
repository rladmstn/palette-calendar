
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
    <header className="bg-gradient-to-r from-blue-50 to-indigo-100 border-b border-blue-200 shadow-lg">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          {/* 로고 및 제목 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <CalendarCheck className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Palette Calendar
              </h1>
            </div>
            
            {/* 뷰 전환 버튼 */}
            <div className="flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-white/20">
              <button
                onClick={() => onViewChange('week')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentView === 'week'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => onViewChange('month')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentView === 'month'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
                }`}
              >
                월간
              </button>
            </div>
          </div>

          {/* 날짜 네비게이션 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border border-white/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="h-9 w-9 p-0 hover:bg-blue-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <h2 className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
                {formatDate(selectedDate)}
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className="h-9 w-9 p-0 hover:bg-blue-100 rounded-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Button
              onClick={() => onDateChange(new Date())}
              className="bg-white/80 hover:bg-white text-blue-700 border border-blue-200 font-semibold px-4 py-2 rounded-lg shadow-sm"
              size="sm"
            >
              오늘
            </Button>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onCreateTodo}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              TODO 추가
            </Button>
            
            <Button
              onClick={onCreateEvent}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              일정 추가
            </Button>
            
            <Button
              onClick={onCreateProject}
              className="bg-white/90 hover:bg-white text-gray-700 border border-gray-200 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
