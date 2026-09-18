import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AdminSubjects() {
  const columns = [
    { header: 'Subject Code', accessorKey: 'code' },
    { header: 'Subject Name', accessorKey: 'name' },
    { header: 'Category', accessorKey: 'category' },
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
    { code: 'MTH', name: 'Mathematics', category: 'Core' },
    { code: 'ENG', name: 'English Language', category: 'Core' },
    { code: 'PHY', name: 'Physics', category: 'Science' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Subjects
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Subject
          </Button>
        </div>
      </div>

      <Card>
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
}
