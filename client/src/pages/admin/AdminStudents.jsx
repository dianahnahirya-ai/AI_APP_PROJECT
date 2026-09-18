import { useState } from 'react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminStudents() {
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Reg. Number', accessorKey: 'regNo' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Class', accessorKey: 'class' },
    { header: 'Access Code', accessorKey: 'accessCode' },
    { 
      header: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">Edit</button>
          <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
        </div>
      )
    }
  ];

  const data = [
    { regNo: 'STU001', name: 'John Doe', class: 'JSS 1 A', accessCode: 'ABC12345' },
    { regNo: 'STU002', name: 'Jane Smith', class: 'JSS 1 A', accessCode: 'XYZ98765' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Students
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all students in your school including their name, registration number, class, and access code.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 max-w-md">
          <Input 
            placeholder="Search students..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={MagnifyingGlassIcon}
          />
        </div>
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
}
