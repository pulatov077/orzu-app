import { ArrowLeft, Award, Calendar, Download } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockCertificates } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../context/UserContext';
import jsPDF from 'jspdf';

interface CertificatesPageProps {
  navigate: (page: Page) => void;
}

export function CertificatesPage({ navigate }: CertificatesPageProps) {
  const { isDarkMode } = useDarkMode();
  const { userData } = useUser();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const downloadCertificate = (certificate: typeof mockCertificates[0]) => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Set background gradient colors
    const primaryRGB = isDarkMode ? [1, 222, 157] : [174, 140, 94];
    const secondaryRGB = isDarkMode ? [0, 179, 126] : [139, 111, 74];
    
    // Draw gradient background (approximated with rectangles)
    const steps = 50;
    for (let i = 0; i < steps; i++) {
      const ratio = i / steps;
      const r = primaryRGB[0] + (secondaryRGB[0] - primaryRGB[0]) * ratio;
      const g = primaryRGB[1] + (secondaryRGB[1] - primaryRGB[1]) * ratio;
      const b = primaryRGB[2] + (secondaryRGB[2] - primaryRGB[2]) * ratio;
      
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i * (210 / steps), 297, 210 / steps, 'F');
    }

    // Add decorative border
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(2);
    pdf.rect(15, 15, 267, 180);
    
    pdf.setLineWidth(0.5);
    pdf.rect(20, 20, 257, 170);

    // Add decorative corners
    pdf.setFillColor(255, 255, 255, 0.1);
    
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('CERTIFICATE OF COMPLETION', 148.5, 50, { align: 'center' });

    // Divider line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(80, 55, 217, 55);

    // Course name
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(certificate.courseName, 148.5, 75, { align: 'center' });

    // Award icon text
    pdf.setFontSize(40);
    pdf.text('🎓', 148.5, 95, { align: 'center' });

    // Student name section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This certifies that', 148.5, 110, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(userData.name, 148.5, 120, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('has successfully completed the course', 148.5, 128, { align: 'center' });

    // Instructor and date section
    pdf.setFontSize(11);
    const completionDate = new Date(certificate.completionDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Left side - Instructor
    pdf.setFont('helvetica', 'bold');
    pdf.text('Instructor:', 60, 155);
    pdf.setFont('helvetica', 'normal');
    pdf.text(certificate.instructor, 60, 162);
    
    // Signature line
    pdf.line(50, 170, 100, 170);
    pdf.setFontSize(9);
    pdf.text('Signature', 75, 175, { align: 'center' });

    // Right side - Date
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Completion Date:', 197, 155, { align: 'right' });
    pdf.setFont('helvetica', 'normal');
    pdf.text(completionDate, 197, 162, { align: 'right' });
    
    // Date line
    pdf.line(197, 170, 247, 170);
    pdf.setFontSize(9);
    pdf.text('Date', 222, 175, { align: 'center' });

    // Footer branding
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ORZU', 148.5, 190, { align: 'center' });

    // Save the PDF
    const fileName = `${certificate.courseName.replace(/[^a-z0-9]/gi, '_')}_Certificate.pdf`;
    pdf.save(fileName);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ type: 'dashboard' })}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-8 h-8 text-gray-900 dark:text-white" />
          <div>
            <h1 className="text-gray-900 dark:text-white">Certificates</h1>
            <p className="text-gray-600 dark:text-gray-400">Your achievements and completed courses</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition"
            >
              {/* Certificate Design */}
              <div 
                className="relative p-8 text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                }}
              >
                <div className="absolute top-4 right-4">
                  <Award className="w-12 h-12 text-white/30" />
                </div>
                
                <div className="relative">
                  <p className="opacity-90 text-sm mb-2">Certificate of Completion</p>
                  <h2 className="text-white mb-4">{certificate.courseName}</h2>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="opacity-90 text-sm">Instructor</p>
                      <p className="text-white">{certificate.instructor}</p>
                    </div>
                    
                    <div>
                      <p className="opacity-90 text-sm">Completion Date</p>
                      <p className="text-white">
                        {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-br-full"></div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700/50 flex gap-3">
                <button 
                  className="flex-1 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                  onClick={() => downloadCertificate(certificate)}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockCertificates.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <Award className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">No certificates yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete your courses to earn certificates
            </p>
            <button
              onClick={() => navigate({ type: 'courses' })}
              className="text-white px-6 py-3 rounded-lg transition"
              style={{ backgroundColor: primaryColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
            >
              Browse Courses
            </button>
          </div>
        )}

        {/* Achievement Stats */}
        {mockCertificates.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 rounded-xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Great Job! 🎉</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You've completed {mockCertificates.length} {mockCertificates.length === 1 ? 'course' : 'courses'} and earned {mockCertificates.length} {mockCertificates.length === 1 ? 'certificate' : 'certificates'}. Keep up the excellent work!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <NavigationBar navigate={navigate} currentPage="certificates" />
    </div>
  );
}