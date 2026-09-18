import { Outlet } from 'react-router-dom';

export default function ParentLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-primary-600">EduResults</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white mt-auto border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-center">
          <p className="text-center text-sm leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} EduResults Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
