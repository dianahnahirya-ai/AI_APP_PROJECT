import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Settings
        </h1>
      </div>

      <div className="space-y-6">
        <Card title="School Profile">
          <form className="space-y-4 max-w-2xl">
            <Input label="School Name" defaultValue="EduResults High School" />
            <Input label="Address" defaultValue="123 Education Avenue" />
            <Input label="Email Address" type="email" defaultValue="admin@eduresults.com" />
            <Input label="Phone Number" defaultValue="+1234567890" />
            <div className="flex justify-end pt-4">
              <Button>Save Profile</Button>
            </div>
          </form>
        </Card>

        <Card title="Grading System">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-500 mb-4">Configure the score ranges for each grade.</p>
            <div className="space-y-3">
              {[
                { grade: 'A', min: 70, max: 100 },
                { grade: 'B', min: 60, max: 69 },
                { grade: 'C', min: 50, max: 59 },
                { grade: 'D', min: 45, max: 49 },
                { grade: 'E', min: 40, max: 44 },
                { grade: 'F', min: 0, max: 39 },
              ].map((g) => (
                <div key={g.grade} className="flex items-center gap-4">
                  <div className="w-16 font-bold text-lg">{g.grade}</div>
                  <Input type="number" defaultValue={g.min} className="w-24" />
                  <span>to</span>
                  <Input type="number" defaultValue={g.max} className="w-24" />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-6">
              <Button>Save Grading Scale</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
