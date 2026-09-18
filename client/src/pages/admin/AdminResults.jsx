import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';

export default function AdminResults() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const classes = [
    { label: 'JSS 1 A', value: 'c1' },
    { label: 'JSS 1 B', value: 'c2' },
  ];

  const terms = [
    { label: 'Term 1, 2023/2024', value: 't1' },
    { label: 'Term 2, 2023/2024', value: 't2' },
  ];

  const subjects = [
    { label: 'Mathematics', value: 's1' },
    { label: 'English', value: 's2' },
  ];

  const students = [
    { id: 1, name: 'John Doe', regNo: 'STU001', score: 85, remark: 'Excellent' },
    { id: 2, name: 'Jane Smith', regNo: 'STU002', score: 72, remark: 'Good' },
    { id: 3, name: 'Mike Johnson', regNo: 'STU003', score: '', remark: '' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Results Entry
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Select class, term, and subject to enter or update student results.
        </p>
      </div>

      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Class"
            options={classes}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          />
          <Select
            label="Term"
            options={terms}
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          />
          <Select
            label="Subject"
            options={subjects}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Load Students</Button>
        </div>
      </Card>

      {selectedClass && selectedTerm && selectedSubject && (
        <Card title="Enter Scores">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reg No</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">Score (100)</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.regNo}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={student.score}
                        className="w-full text-center"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Input
                        type="text"
                        defaultValue={student.remark}
                        className="w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Publish Results</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
