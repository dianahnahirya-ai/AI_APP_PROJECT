import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { UsersIcon, AcademicCapIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    totalSubjects: 0,
    currentTerm: 'Term 1 2023'
  });

  useEffect(() => {
    // Mock fetch
    setStats({
      totalStudents: 1250,
      totalClasses: 24,
      totalSubjects: 15,
      currentTerm: 'Term 3, 2023/2024'
    });
  }, []);

  const statCards = [
    { name: 'Total Students', value: stats.totalStudents, icon: UsersIcon, color: 'bg-blue-500' },
    { name: 'Total Classes', value: stats.totalClasses, icon: AcademicCapIcon, color: 'bg-green-500' },
    { name: 'Subjects', value: stats.totalSubjects, icon: BookOpenIcon, color: 'bg-purple-500' },
    { name: 'Current Term', value: stats.currentTerm, icon: ClockIcon, color: 'bg-amber-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <Card key={item.name} className="relative overflow-hidden">
            <dt>
              <div className={`absolute rounded-md p-3 ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </dd>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card title="Recent Activity">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Results published for JSS 1 A</p>
            <p className="text-sm text-gray-600">New student registered: John Doe</p>
            <p className="text-sm text-gray-600">Term 3 configuration updated</p>
          </div>
        </Card>
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded text-center hover:bg-gray-50 text-sm font-medium text-primary-600">
              Enter Results
            </button>
            <button className="p-4 border rounded text-center hover:bg-gray-50 text-sm font-medium text-primary-600">
              Add Student
            </button>
            <button className="p-4 border rounded text-center hover:bg-gray-50 text-sm font-medium text-primary-600">
              Generate Access Codes
            </button>
            <button className="p-4 border rounded text-center hover:bg-gray-50 text-sm font-medium text-primary-600">
              Print Reports
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
