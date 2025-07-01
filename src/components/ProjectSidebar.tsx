
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { Filter, Edit, Trash2 } from 'lucide-react';

interface ProjectSidebarProps {
  projects: Project[];
  onProjectFilter: (projectIds: string[]) => void;
  filteredProjects: string[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  projects,
  onProjectFilter,
  filteredProjects,
  onEditProject,
  onDeleteProject,
}) => {
  const toggleProjectFilter = (projectId: string) => {
    if (filteredProjects.includes(projectId)) {
      onProjectFilter(filteredProjects.filter(id => id !== projectId));
    } else {
      onProjectFilter([...filteredProjects, projectId]);
    }
  };

  const clearAllFilters = () => {
    onProjectFilter([]);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-600" />
            프로젝트 필터
          </h3>
          {filteredProjects.length > 0 && (
            <Button
              onClick={clearAllFilters}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-800"
            >
              전체 보기
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {projects.map((project) => {
            const isFiltered = filteredProjects.includes(project.id);
            const isActive = filteredProjects.length === 0 || isFiltered;

            return (
              <div
                key={project.id}
                className={`group p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-gray-300 bg-white shadow-sm'
                    : 'border-gray-100 bg-gray-50 opacity-60'
                }`}
                onClick={() => toggleProjectFilter(project.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      {project.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProject(project);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(project.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isFiltered && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      필터 적용됨
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1">
              새 프로젝트를 추가해보세요!
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 프로젝트를 클릭하면 해당 일정만 표시됩니다</li>
            <li>• 여러 프로젝트를 동시에 선택할 수 있습니다</li>
            <li>• 색상으로 프로젝트를 쉽게 구분하세요</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
