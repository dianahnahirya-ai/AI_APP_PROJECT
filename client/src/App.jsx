import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  KeyRound, 
  UserCheck, 
  School, 
  Search, 
  Send, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Lock, 
  X, 
  LogOut, 
  FileText, 
  Award, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  User,
  Eye,
  EyeOff
} from 'lucide-react';

const MOCK_STUDENTS = {
  "M26B23/022": {
    registrationNumber: "M26B23/022",
    accessCode: "123456",
    firstName: "Dianah",
    lastName: "Tendo",
    schoolName: "Greenfield Academy",
    schoolCode: "GFA001",
    classStream: "Grade 10 - Stream A",
    academicYear: "2026-2027",
    term: "Term 1",
    parentPhone: "+256 700 000 001",
    parentEmail: "parent.tendo@gmail.com",
    classRank: "2nd out of 45",
    attendance: "98%",
    conduct: "Excellent",
    overallGrade: "A",
    averageScore: "88.6%",
    totalMarks: "266 / 300",
    headTeacherRemark: "Dianah has shown exemplary performance and dedication this term. Keep up the brilliant work!",
    classTeacherRemark: "Attentive, disciplined, and consistently strong in core scientific and analytical subjects.",
    subjects: [
      { code: "MATH", name: "Mathematics", score: 92, grade: "A+", points: 4.0, remarks: "Outstanding problem solver" },
      { code: "ENG", name: "English Language", score: 86, grade: "A", points: 3.6, remarks: "Fluent expression and strong writing skills" },
      { code: "SCI", name: "Integrated Science", score: 88, grade: "A", points: 3.6, remarks: "Thorough understanding of scientific concepts" }
    ]
  },
  "GFA-001": {
    registrationNumber: "GFA-001",
    accessCode: "654321",
    firstName: "John",
    lastName: "Doe",
    schoolName: "Greenfield Academy",
    schoolCode: "GFA001",
    classStream: "Grade 10 - Stream A",
    academicYear: "2026-2027",
    term: "Term 1",
    parentPhone: "+256 700 000 002",
    parentEmail: "parent.doe@gmail.com",
    classRank: "8th out of 45",
    attendance: "94%",
    conduct: "Very Good",
    overallGrade: "B+",
    averageScore: "78.3%",
    totalMarks: "235 / 300",
    headTeacherRemark: "A commendable performance. With a little more focus on Mathematics, John can reach Grade A.",
    classTeacherRemark: "Punctual, polite, and actively participates in classroom group discussions.",
    subjects: [
      { code: "MATH", name: "Mathematics", score: 71, grade: "B", points: 3.0, remarks: "Good, needs more practice in Algebra" },
      { code: "ENG", name: "English Language", score: 82, grade: "A", points: 3.6, remarks: "Very good creative writing" },
      { code: "SCI", name: "Integrated Science", score: 82, grade: "A", points: 3.6, remarks: "Good lab practical results" }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [regNumber, setRegNumber] = useState('M26B23/022');
  const [accessCode, setAccessCode] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeResult, setActiveResult] = useState(null);

  // Admin State
  const [adminEmail, setAdminEmail] = useState('admin@eduresults.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Request Access Code Modal
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [requestRegNum, setRequestRegNum] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [smsSending, setSmsSending] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState('');

  // Canvas particle background ref
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create glowing particles
    const particleCount = Math.min(Math.floor(width / 20), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? '#00f2fe' : '#4facfe'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleQueryResults = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanReg = regNumber.trim().toUpperCase();
      const student = MOCK_STUDENTS[cleanReg];

      if (student && student.accessCode === accessCode.trim()) {
        setActiveResult(student);
      } else {
        setErrorMessage('Invalid Registration Number or Access Code. Please verify your credentials or request an access code.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      if (adminEmail === 'admin@eduresults.com' && adminPassword === 'admin123') {
        setIsAdminLoggedIn(true);
      } else {
        setErrorMessage('Invalid administrator credentials.');
      }
      setIsLoading(false);
    }, 700);
  };

  const handleSendSmsCode = (e) => {
    e.preventDefault();
    setSmsSending(true);
    setSmsSuccess('');

    setTimeout(() => {
      setSmsSending(false);
      setSmsSuccess(`Access Code successfully dispatched via SMS to ${requestPhone || '+256 700 000 001'}`);
      setTimeout(() => {
        setIsSmsModalOpen(false);
        setSmsSuccess('');
        setRequestRegNum('');
        setRequestPhone('');
      }, 2500);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Decorative Ambient Radial Glow Background Elements */}
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <header className="border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 border border-cyan-300/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400">
                  EduResults
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium tracking-wide">
                  PORTAL 2026
                </span>
              </div>
            </div>

            {/* Right Status Badge / Direct Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSmsModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all duration-200"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>Request Access Code</span>
              </button>
              
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
          
          {/* Main Auth Container / Result Dashboard View */}
          {!activeResult && !isAdminLoggedIn ? (
            <div className="w-full max-w-lg mx-auto">
              
              {/* Portal Selector Navigation Tabs */}
              <div className="flex p-1.5 mb-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md shadow-xl">
                <button
                  onClick={() => { setActiveTab('student'); setErrorMessage(''); }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === 'student'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Student & Parent</span>
                </button>

                <button
                  onClick={() => { setActiveTab('admin'); setErrorMessage(''); }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === 'admin'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>School Admin</span>
                </button>
              </div>

              {/* Glowing Glassmorphic Form Card */}
              <div className="relative group">
                {/* Glow border ambient effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                
                <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50">
                  
                  {/* Error Notification Alert */}
                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start space-x-3 animate-fade-in">
                      <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* STUDENT & PARENT QUERY FORM */}
                  {activeTab === 'student' && (
                    <form onSubmit={handleQueryResults} className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Registration Number
                          </label>
                          <span className="text-[10px] text-slate-400">e.g. M26B23/022</span>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-4 h-4 text-cyan-400" />
                          </div>
                          <input
                            type="text"
                            required
                            value={regNumber}
                            onChange={(e) => setRegNumber(e.target.value)}
                            placeholder="Enter Student Reg No."
                            className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-500 text-sm transition duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Access Code
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsSmsModalOpen(true)}
                            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                          >
                            Lost / Forgot code?
                          </button>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <KeyRound className="w-4 h-4 text-cyan-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter 6-digit access code"
                            className="w-full pl-10 pr-10 py-3 bg-slate-950/70 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-500 text-sm transition duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-400"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform active:scale-[0.99] transition duration-200 flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>VIEW ACADEMIC REPORT</span>
                          </>
                        )}
                      </button>

                      {/* Sample Credentials Helper box */}
                      <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                        <p className="font-semibold text-cyan-400">Demo Credentials:</p>
                        <p>Reg No: <code className="text-cyan-200 bg-slate-900 px-1.5 py-0.5 rounded">M26B23/022</code> | Code: <code className="text-cyan-200 bg-slate-900 px-1.5 py-0.5 rounded">123456</code></p>
                      </div>
                    </form>
                  )}

                  {/* SCHOOL ADMIN LOGIN FORM */}
                  {activeTab === 'admin' && (
                    <form onSubmit={handleAdminLogin} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2">
                          School Administrator Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4 text-cyan-400" />
                          </div>
                          <input
                            type="email"
                            required
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            placeholder="admin@school.edu"
                            className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-500 text-sm transition duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4 text-cyan-400" />
                          </div>
                          <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-500 text-sm transition duration-200"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform active:scale-[0.99] transition duration-200 flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>ACCESS ADMIN DASHBOARD</span>
                          </>
                        )}
                      </button>

                      <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                        <p className="font-semibold text-cyan-400">Admin Demo Logins:</p>
                        <p>Email: <code className="text-cyan-200 bg-slate-900 px-1.5 py-0.5 rounded">admin@eduresults.com</code> | Pass: <code className="text-cyan-200 bg-slate-900 px-1.5 py-0.5 rounded">admin123</code></p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : activeResult ? (
            
            <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in print:p-0">
              
              {/* Back & Export Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
                <button
                  onClick={() => setActiveResult(null)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  <X className="w-4 h-4" />
                  <span>Exit Report View</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Report Card</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-bold transition shadow-md shadow-cyan-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Official Report Document Container */}
              <div id="printable-report" className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl backdrop-blur-2xl print:bg-white print:text-black print:border-none print:shadow-none">
                
                {/* Header Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-cyan-500/20 print:border-slate-300 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-8 h-8 text-cyan-400 print:text-blue-700" />
                      <h1 className="text-2xl font-black tracking-tight text-slate-100 print:text-black">
                        {activeResult.schoolName}
                      </h1>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
                      Official Academic Performance Report | School Code: <span className="text-cyan-400 font-mono print:text-blue-700">{activeResult.schoolCode}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 print:bg-slate-100 print:text-black">
                      {activeResult.academicYear} - {activeResult.term}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 print:text-slate-600">
                      Issue Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Student Personal Particulars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold print:text-slate-600">Student Name</span>
                    <p className="text-sm font-bold text-cyan-300 print:text-slate-900">{activeResult.firstName} {activeResult.lastName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold print:text-slate-600">Reg. Number</span>
                    <p className="text-sm font-bold font-mono text-slate-200 print:text-slate-900">{activeResult.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold print:text-slate-600">Class & Stream</span>
                    <p className="text-sm font-bold text-slate-200 print:text-slate-900">{activeResult.classStream}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold print:text-slate-600">Class Rank</span>
                    <p className="text-sm font-bold text-emerald-400 print:text-emerald-700">{activeResult.classRank}</p>
                  </div>
                </div>

                {/* Performance Summary Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center print:bg-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Score</span>
                    <p className="text-lg font-black text-cyan-300 print:text-black">{activeResult.totalMarks}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center print:bg-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Average</span>
                    <p className="text-lg font-black text-cyan-300 print:text-black">{activeResult.averageScore}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center print:bg-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall Grade</span>
                    <p className="text-lg font-black text-emerald-400 print:text-emerald-700">{activeResult.overallGrade}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center print:bg-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</span>
                    <p className="text-lg font-black text-cyan-300 print:text-black">{activeResult.attendance}</p>
                  </div>
                </div>

                {/* Subject Grade Breakdown Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-cyan-500/30 text-cyan-300 uppercase tracking-wider text-[11px] print:border-slate-300 print:text-slate-800">
                        <th className="py-3 px-3">Subject</th>
                        <th className="py-3 px-3 text-center">Score / 100</th>
                        <th className="py-3 px-3 text-center">Grade</th>
                        <th className="py-3 px-3 text-center">Grade Point</th>
                        <th className="py-3 px-3">Instructor Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                      {activeResult.subjects.map((sub) => (
                        <tr key={sub.code} className="hover:bg-slate-800/30 transition">
                          <td className="py-3.5 px-3 font-semibold text-slate-200 print:text-slate-900">
                            {sub.name} <span className="text-[10px] text-slate-400 font-mono">({sub.code})</span>
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-100 print:text-slate-900">
                            {sub.score}%
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold print:bg-slate-200 print:text-slate-900">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-300 print:text-slate-800">
                            {sub.points.toFixed(1)}
                          </td>
                          <td className="py-3.5 px-3 text-slate-300 text-xs print:text-slate-700">
                            {sub.remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Remarks & Endorsements */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-cyan-500/20 print:border-slate-300">
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 print:text-blue-800">Class Teacher's Remarks</span>
                    <p className="text-xs text-slate-300 mt-1 italic print:text-slate-800">"{activeResult.classTeacherRemark}"</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 print:text-blue-800">Head Teacher's Endorsement</span>
                    <p className="text-xs text-slate-300 mt-1 italic print:text-slate-800">"{activeResult.headTeacherRemark}"</p>
                  </div>
                </div>

                {/* Official Verification Watermark */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 border-t border-slate-800 print:border-slate-300">
                  <div className="flex items-center space-x-1 text-emerald-400 print:text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Digitally Verified & Signed by EduResults Central System</span>
                  </div>
                  <p className="mt-2 sm:mt-0">Verification Hash: <span className="font-mono">8f92a10b4c81e9</span></p>
                </div>
              </div>
            </div>
          ) : (
            
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">School Admin Portal</h2>
                  <p className="text-xs text-slate-400">Greenfield Academy Overview</p>
                </div>
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Admin Stat Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Total Enrolled</span>
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">450 Students</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Term Mean GPA</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">3.48 / 4.0</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Reports Published</span>
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">100% Complete</p>
                </div>
              </div>

              {/* Admin Table Mock */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Recently Uploaded Student Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2">Reg Number</th>
                        <th className="py-2">Student Name</th>
                        <th className="py-2">Class</th>
                        <th className="py-2">Parent Contact</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {Object.values(MOCK_STUDENTS).map((s) => (
                        <tr key={s.registrationNumber}>
                          <td className="py-3 font-mono text-cyan-300">{s.registrationNumber}</td>
                          <td className="py-3 font-medium text-slate-200">{s.firstName} {s.lastName}</td>
                          <td className="py-3 text-slate-400">{s.classStream}</td>
                          <td className="py-3 text-slate-400">{s.parentPhone}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setActiveResult(s)}
                              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-semibold"
                            >
                              Preview Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>

        {isSmsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl">
              <button
                onClick={() => setIsSmsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Request Access Code</h3>
                  <p className="text-xs text-slate-400">Receive access credentials via Parent SMS</p>
                </div>
              </div>

              {smsSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{smsSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleSendSmsCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-1.5">
                      Student Registration Number
                    </label>
                    <input
                      type="text"
                      required
                      value={requestRegNum}
                      onChange={(e) => setRequestRegNum(e.target.value)}
                      placeholder="e.g. M26B23/022"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 text-sm text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-1.5">
                      Registered Parent Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={requestPhone}
                      onChange={(e) => setRequestPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 text-sm text-slate-100"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    * The access code will only be dispatched if the phone number matches the student record registered in the school database.
                  </p>

                  <button
                    type="submit"
                    disabled={smsSending}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    {smsSending ? (
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND ACCESS CODE VIA SMS</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
          <p>© 2026 EduResults Portal. All rights reserved. Encrypted Academic Reporting System.</p>
        </footer>

      </div>
    </div>
  );
}