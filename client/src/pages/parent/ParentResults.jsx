import { useLocation, Navigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { PrinterIcon, ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { formatScore, getGradeColor } from '../../utils/helpers';
import ReportCard from '../../components/ReportCard';

export default function ParentResults() {
  const location = useLocation();
  const { resultData } = location.state || {};

  if (!resultData) {
    return <Navigate to="/" replace />;
  }

  // Example structure of resultData
  // { student: { name, regNo, className }, term: { name, year }, results: [...], summary: { total, average, position, grade, remarks } }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center print:hidden">
        <Link to="/" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Check Another Student
        </Link>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handlePrint}>
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print
          </Button>
          <Button variant="primary">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
        <ReportCard data={resultData} />
      </div>
    </div>
  );
}
