import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AdminClasses() {
  const columns = [
    { header: 'Class Name', accessorKey: 'name' },
    { header: 'Capacity', accessorKey: 'capacity' },
    { header: 'Students Enrolled', accessorKey: 'enrolled' },
    { 
      header: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">Edit</button>
        </div>
      )
    }
  ];

  const data = [
    { name: 'JSS 1 A', capacity: 40, enrolled: 35 },
    { name: 'JSS 1 B', capacity: 40, enrolled: 38 },
    { name: 'SSS 3 Science', capacity: 35, enrolled: 30 },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Classes
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Class
          </Button>
        </div>
      </div>

      <Card>
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
}
