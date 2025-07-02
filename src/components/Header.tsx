
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CalendarCheck, Plus, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: 'week' | 'month';
  onViewChange: (view: 'week' | 'month') => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCreateTodo: () => void;
  onCreateEvent: () => void;
  onCreateProject: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  selectedDate,
  onDateChange,
  onCreateTodo,
  onCreateEvent,
  onCreateProject,
  isDarkMode,
  onThemeToggle,
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
    <header className={`${
      isDarkMode 
        ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700' 
        : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
    } border-b shadow-lg`}>
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          {/* 로고 및 제목 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
                <CalendarCheck className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Palette Calendar
              </h1>
            </div>
            
            {/* 뷰 전환 버튼 */}
            <div className={`flex ${
              isDarkMode 
                ? 'bg-slate-800/70 border-slate-600/20' 
                : 'bg-white/70 border-gray-200/50'
            } backdrop-blur-sm rounded-xl p-1 shadow-sm border`}>
              <button
                onClick={() => onViewChange('week')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentView === 'week'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : isDarkMode
                      ? 'text-slate-300 hover:text-purple-400 hover:bg-slate-700/50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => onViewChange('month')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentView === 'month'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : isDarkMode
                      ? 'text-slate-300 hover:text-purple-400 hover:bg-slate-700/50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
                }`}
              >
                월간
              </button>
            </div>
          </div>

          {/* 날짜 네비게이션 */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-3 ${
              isDarkMode 
                ? 'bg-slate-800/70 border-slate-600/20' 
                : 'bg-white/70 border-gray-200/50'
            } backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className={`h-9 w-9 p-0 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-slate-700 text-slate-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <h2 className={`text-lg font-semibold min-w-[140px] text-center ${
                isDarkMode ? 'text-slate-200' : 'text-gray-800'
              }`}>
                {formatDate(selectedDate)}
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className={`h-9 w-9 p-0 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-slate-700 text-slate-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Button
              onClick={() => onDateChange(new Date())}
              className={`font-semibold px-4 py-2 rounded-lg shadow-sm ${
                isDarkMode 
                  ? 'bg-slate-700/80 hover:bg-slate-700 text-slate-200 border-slate-600' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300'
              } border`}
              size="sm"
            >
              오늘
            </Button>
          </div>

          {/* 테마 토글 및 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            {/* 테마 토글 */}
            <div className="flex items-center space-x-2">
              <Sun className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-yellow-500'}`} />
              <Switch
                checked={isDarkMode}
                onCheckedChange={onThemeToggle}
                className="data-[state=checked]:bg-slate-600 data-[state=unchecked]:bg-yellow-200"
              />
              <Moon className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={onCreateTodo}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                TODO 추가
              </Button>
              
              <Button
                onClick={onCreateEvent}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                일정 추가
              </Button>
              
              <Button
                onClick={onCreateProject}
                className={`font-semibold shadow-md hover:shadow-lg transition-all duration-200 border ${
                  isDarkMode 
                    ? 'bg-slate-700/90 hover:bg-slate-700 text-slate-200 border-slate-600' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                프로젝트 추가
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
