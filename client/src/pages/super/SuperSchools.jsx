import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Badge } from '../../components/ui/Badge';

export default function SuperSchools() {
  const columns = [
    { header: 'School Name', accessorKey: 'name' },
    { header: 'Admin Email', accessorKey: 'email' },
    { header: 'Students', accessorKey: 'studentsCount' },
    { 
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      )
    },
    { 
      header: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">Edit</button>
          <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">Manage</button>
        </div>
      )
    }
  ];

  const data = [
    { name: 'EduResults High School', email: 'admin@eduresults.com', studentsCount: 1250, status: 'Active' },
    { name: 'Green Valley Academy', email: 'principal@gva.edu', studentsCount: 840, status: 'Active' },
    { name: 'Sunrise International', email: 'info@sunrise.edu', studentsCount: 420, status: 'Inactive' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Registered Schools
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add School
          </Button>
        </div>
      </div>

      <Card>
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
}
