import { GraduationCap, User, Mail, Phone, Calendar, Target, Award } from 'lucide-react';
import { useState } from 'react';
import { UserData } from '../context/UserContext';

interface RegistrationPageProps {
  onRegister: (userData: UserData) => void;
}

export function RegistrationPage({ onRegister }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    targetExam: 'IELTS' as 'IELTS' | 'SAT' | 'Both',
    targetScore: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.targetScore) {
      alert('Please fill in all required fields');
      return;
    }

    const userData: UserData = {
      ...formData,
      avatar: 'https://i.pravatar.cc/150?img=12',
    };

    onRegister(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-white to-[#e8d4bf] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <GraduationCap className="w-16 h-16 text-[#ae8c5e]" />
            </div>
            <h1 
              className="text-4xl font-bold bg-gradient-to-r from-[#ae8c5e] to-[#8b6f4a] bg-clip-text text-transparent"
            >
              ORZU
            </h1>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Start your journey to exam success</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder="+998 90 123 45 67"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Target Exam */}
            <div>
              <label htmlFor="targetExam" className="block text-gray-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Target Exam *
              </label>
              <select
                id="targetExam"
                name="targetExam"
                value={formData.targetExam}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                required
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="Both">Both IELTS & SAT</option>
              </select>
            </div>

            {/* Target Score */}
            <div>
              <label htmlFor="targetScore" className="block text-gray-700 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Target Score *
              </label>
              <input
                id="targetScore"
                name="targetScore"
                type="text"
                value={formData.targetScore}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder={formData.targetExam === 'SAT' ? 'e.g., 1500' : formData.targetExam === 'IELTS' ? 'e.g., 7.5' : 'e.g., IELTS 7.5, SAT 1500'}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ae8c5e] to-[#8b6f4a] text-white py-3 rounded-lg hover:from-[#8b6f4a] hover:to-[#6d5438] transition shadow-md mt-6"
            >
              Create Account & Start Learning
            </button>
          </form>

          {/* Quote */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              "Your dream score starts here. Every expert was once a beginner."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
