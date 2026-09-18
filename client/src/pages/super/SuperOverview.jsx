import { Card } from '../../components/ui/Card';
import { BuildingOfficeIcon, UsersIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

export default function SuperOverview() {
  const statCards = [
    { name: 'Total Schools', value: 45, icon: BuildingOfficeIcon, color: 'bg-indigo-500' },
    { name: 'Total Students', value: 24500, icon: UsersIcon, color: 'bg-blue-500' },
    { name: 'Results Generated', value: '142.5k', icon: DocumentCheckIcon, color: 'bg-green-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Platform Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
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

      <Card title="Recent Platform Activity" className="mt-8">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">New school registered: Green Valley High</p>
          <p className="text-sm text-gray-600">Subscription renewed: Sunrise Academy</p>
          <p className="text-sm text-gray-600">System maintenance completed successfully</p>
        </div>
      </Card>
    </div>
  );
}
