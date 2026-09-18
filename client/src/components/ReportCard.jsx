import { Badge } from './ui/Badge';
import { formatScore, getGradeColor, cn } from '../utils/helpers';

export default function ReportCard({ data }) {
  if (!data || !data.student) return null;

  const { student, enrollments } = data;

  // Use the first (most recent) enrollment
  const enrollment = enrollments?.[0];
  if (!enrollment) {
    return (
      <div className="bg-white p-8 text-center">
        <p className="text-gray-500">No results available for this student yet.</p>
      </div>
    );
  }

  const term = enrollment.term;
  const academicYear = term?.academicYear;
  const className = enrollment.class?.name + (enrollment.class?.stream ? ` ${enrollment.class.stream}` : '');
  const results = enrollment.results || [];

  return (
    <div className="bg-white p-8 print:p-4">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-indigo-600 pb-6">
        {student.logo && (
          <img src={student.logo} alt="School Logo" className="h-16 mx-auto mb-2" />
        )}
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">
          {student.school}
        </h1>
        <h2 className="text-xl font-semibold text-indigo-700 mt-4 uppercase">
          Terminal Academic Report
        </h2>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Student Name</p>
          <p className="font-semibold text-gray-900 text-lg">
            {student.firstName} {student.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Registration Number</p>
          <p className="font-semibold text-gray-900">{student.registrationNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Class</p>
          <p className="font-semibold text-gray-900">{className}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Academic Term</p>
          <p className="font-semibold text-gray-900">
            {term?.name} {academicYear?.name ? `- ${academicYear.name}` : ''}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {results.map((result, index) => (
              <tr key={result.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {result.subject?.name || 'Unknown Subject'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">
                  {formatScore(result.score)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold',
                    getGradeColor(result.grade)
                  )}>
                    {result.grade}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{result.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm text-indigo-600 font-medium">Total Score</p>
          <p className="text-2xl font-bold text-indigo-900">
            {enrollment.totalMarks != null ? formatScore(enrollment.totalMarks) : '-'}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm text-indigo-600 font-medium">Average</p>
          <p className="text-2xl font-bold text-indigo-900">
            {enrollment.average != null ? `${formatScore(enrollment.average)}%` : '-'}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm text-indigo-600 font-medium">Position</p>
          <p className="text-2xl font-bold text-indigo-900">
            {enrollment.position || '-'}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm text-indigo-600 font-medium">Overall Grade</p>
          <p className="text-2xl font-bold text-indigo-900">
            {enrollment.overallGrade || '-'}
          </p>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6 border-t border-gray-200 pt-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Class Teacher&apos;s Remarks</h4>
          <p className="text-gray-700 italic bg-gray-50 p-3 rounded border border-gray-100">
            {enrollment.teacherComment || 'No comment provided.'}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Head Teacher&apos;s Remarks</h4>
          <p className="text-gray-700 italic bg-gray-50 p-3 rounded border border-gray-100">
            {enrollment.headTeacherComment || 'No comment provided.'}
          </p>
        </div>
      </div>

      {/* Term Navigation for Multiple Terms */}
      {enrollments.length > 1 && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Other Terms Available</h4>
          <div className="flex flex-wrap gap-2">
            {enrollments.map((enr, idx) => (
              <span
                key={enr.id}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  idx === 0
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200'
                )}
              >
                {enr.term?.name} {enr.term?.academicYear?.name ? `(${enr.term.academicYear.name})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
