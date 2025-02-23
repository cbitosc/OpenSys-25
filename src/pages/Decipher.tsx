import React, { useState, useEffect, memo } from 'react';
import { Mail, User, Phone, GraduationCap, Calendar, Hash, Sparkles, Share2, ListChecks, MessageCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BRANCH_OPTIONS = [
  'CSE', 'IT', 'AIML', 'AI&DS', 'CET (CSE-IOT)', 'CSM (CSE-AIML)',
  'ECE', 'EEE', 'VLSI', 'Mech', 'Prod', 'Civil', 'Biotech',
  'Chemical', 'MCA', 'MBA', 'other'
];
const COLLEGE_OPTIONS = ['CBIT', 'Other'];

const YEAR_OPTIONS = ['1', '2', '3', '4'];

const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Input = memo(({ icon: Icon, participant, field, label, type = "text", value, onChange, options, error, isCheckbox = false, ...props }) => (
    <div className="space-y-1">
      {isCheckbox ? (
        <div className="flex items-center space-x-3">
          <div className="pl-10 flex gap-4">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={value === option}
                  onChange={() => onChange(participant, field, option)}
                  className="form-radio h-4 w-4 text-[#FF0096] border-white/20 bg-white/5 focus:ring-[#FF0096]"
                  name={`${participant}-${field}`}
                  required
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none isolate z-10">
              <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-purple-300'} transform-gpu`} />
            </div>
          )}
          {options && !isCheckbox ? (
            <select
              value={value}
              onChange={(e) => onChange(participant, field, e.target.value)}
              className={`block w-full pl-10 pr-3 py-2.5 border ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[#FF0096]'} rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm`}
              required
            >
              <option value="">Select {label}</option>
              {options.map(option => (
                <option key={option} value={option} className="bg-gray-800">
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(participant, field, e.target.value)}
              className={`block w-full pl-10 pr-3 py-2.5 border ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[#FF0096]'} rounded-lg bg-white/5 text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm`}
              placeholder={label}
              {...props}
            />
          )}
        </div>
      )}
      {error && <p className="text-red-400 text-sm pl-2">{error}</p>}
    </div>
  ));
  
  const ParticipantFields = memo(({ number, formData, onInputChange, errors }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#FF0096] mb-6">
        Participant {number}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          icon={User} 
          participant={`participant${number}`} 
          field="name" 
          label="Full Name" 
          value={formData[`participant${number}`].name}
          onChange={onInputChange}
          error={errors?.[`participant${number}`]?.name}
          required 
        />
        <Input 
          icon={Mail} 
          participant={`participant${number}`} 
          field="email" 
          label="Email" 
          type="email" 
          value={formData[`participant${number}`].email}
          onChange={onInputChange}
          error={errors?.[`participant${number}`]?.email}
          required 
        />
        <Input 
          icon={GraduationCap} 
          participant={`participant${number}`} 
          field="college" 
          label="College" 
          value={formData[`participant${number}`].college}
          onChange={onInputChange}
          options={COLLEGE_OPTIONS}
          isCheckbox={true}
          error={errors?.[`participant${number}`]?.college}
          required 
        />
        <Input 
          icon={GraduationCap} 
          participant={`participant${number}`} 
          field="branch" 
          label="Branch" 
          value={formData[`participant${number}`].branch}
          onChange={onInputChange}
          options={BRANCH_OPTIONS}
          error={errors?.[`participant${number}`]?.branch}
          required 
        />
        <Input 
          icon={Phone} 
          participant={`participant${number}`} 
          field="phone" 
          label="Phone Number" 
          value={formData[`participant${number}`].phone}
          onChange={onInputChange}
          error={errors?.[`participant${number}`]?.phone}
          required 
        />
        <Input 
          icon={Hash} 
          participant={`participant${number}`} 
          field="rollNumber" 
          label="Roll Number" 
          value={formData[`participant${number}`].rollNumber}
          onChange={onInputChange}
          error={errors?.[`participant${number}`]?.rollNumber}
          required 
        />
        <Input 
          icon={Calendar} 
          participant={`participant${number}`} 
          field="year" 
          label="Year" 
          value={formData[`participant${number}`].year}
          onChange={onInputChange}
          options={YEAR_OPTIONS}
          error={errors?.[`participant${number}`]?.year}
          required 
        />
      </div>
    </div>
  ));

  const PostRegistrationOptions = ({ onRegisterAnother }) => {
    const [shareResult, setShareResult] = useState('');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);
    
    const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/Lgrw8392IKQArD6afwQi8o";
  
    const handleShare = async () => {
      const shareData = {
        title: 'Register for Decipher',
        text: 'A thrilling decryption challenge—crack the codes and emerge victorious!',
        url: window.location.href
      };
  
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          setShareResult('Shared successfully!');
        } else {
          await navigator.clipboard.writeText(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          );
          setShareResult('Link copied to clipboard!');
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          setShareResult('Share cancelled');
        } else {
          setShareResult('Error sharing. Link copied to clipboard instead.');
          navigator.clipboard.writeText(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          ).catch(console.error);
        }
      }
  
      setTimeout(() => setShareResult(''), 3000);
    };
  
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-2 rounded-full bg-green-500/20 text-green-400 mb-4">
            <ListChecks className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">Join Updates Group</h3>
            <p className="text-white/80 mb-4">You must join the WhatsApp group to receive important event announcements and updates!</p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Join Group
            </a>
          </div>
        </div>
  
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Explore More Exciting Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/register/odyssey"
                className="group relative overflow-hidden rounded-xl bg-black/30 border border-white/10 p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <h4 className="text-xl font-semibold text-white mb-3">Odyssey</h4>
                  <p className="text-white/60 mb-4">A fast-paced, two-day online challenge—solve all levels first to win!                  </p>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span>Register now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
  
              <Link
                to="/register/mazerift"
                className="group relative overflow-hidden rounded-xl bg-black/30 border border-white/10 p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <h4 className="text-xl font-semibold text-white mb-3">Mazerift</h4>
                  <p className="text-white/60 mb-4">Navigate, solve puzzles, and submit your final move to win!</p>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span>Register now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
  
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0096] to-[#FF0066] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <button
            onClick={onRegisterAnother}
            className="relative w-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300"
          >
            <ListChecks className="w-6 h-6 text-[#FF0096] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Register Another Team</h3>
            <p className="text-white/60">Want to register more participants? Click here</p>
          </button>
        </div>
  
        <button
          onClick={handleShare}
          className="w-full bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-4 text-center hover:bg-black/40 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2 text-white/60 hover:text-white/80">
            <Share2 className="w-5 h-5" />
            <span>Share with Friends</span>
          </div>
        </button>
  
        {shareResult && (
          <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/20">
            {shareResult}
          </div>
        )}
      </div>
    );
  };
    
    const DecipherRegistration = () => {
        const initialFormState = {
            participant1: {
              name: '',
              email: '',
              college: '',
              branch: '',
              phone: '',
              rollNumber: '',
              year: ''
            },
            participant2: {
              name: '',
              email: '',
              college: '',
              branch: '',
              phone: '',
              rollNumber: '',
              year: ''
            }
        };
      
        const [formData, setFormData] = useState(initialFormState);
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState(false);
        const [error, setError] = useState('');
        const [isRegistered, setIsRegistered] = useState(false);
        const [validationErrors, setValidationErrors] = useState({});
    
      useEffect(() => {
        const savedData = localStorage.getItem('participant1Data');
        const registrationStatus = localStorage.getItem('registeredForDecipher');
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setFormData(prev => ({
              ...prev,
              participant1: parsedData
            }));
          } catch (e) {
            console.error('Error parsing saved data:', e);
          }
        }
        
        setIsRegistered(registrationStatus === 'true');
      }, []);
    
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL_DECIPHER;
      const validateForm = () => {
        const errors = {};
        let isValid = true;
    
        ['participant1', 'participant2'].forEach(participant => {
          errors[participant] = {};
          
          if (!validatePhone(formData[participant].phone)) {
            errors[participant].phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
          }
    
          if (!validateEmail(formData[participant].email)) {
            errors[participant].email = 'Please enter a valid email address';
            isValid = false;
          }
        });
    
        setValidationErrors(errors);
        return isValid;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
          setError('Please fix the validation errors before submitting.');
          return;
        }
    
        setLoading(true);
    
        try {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          localStorage.setItem('participant1Data', JSON.stringify(formData.participant1));
          localStorage.setItem('registeredForDecipher', 'true');
          setSuccess(true);
          setIsRegistered(true);
          setFormData(initialFormState);
        } catch (err) {
          setError('Failed to submit registration. Please try again.');
          console.error('Registration error:', err);
        } finally {
          setLoading(false);
        }
      };
    
      const handleInputChange = (participant, field, value) => {
        setFormData(prev => ({
          ...prev,
          [participant]: {
            ...prev[participant],
            [field]: value
          }
        }));
    
        setValidationErrors(prev => ({
          ...prev,
          [participant]: {
            ...prev[participant],
            [field]: undefined
          }
        }));
      };
    
      const handleRegisterAnother = () => {
        localStorage.removeItem('registeredForDecipher');
        localStorage.removeItem('participant1Data');
        setIsRegistered(false);
        setSuccess(false);
        setFormData(initialFormState);
      };
    
      if (isRegistered) {
        return (
          <div className="min-h-screen font-sora p-6">
            <div className="max-w-4xl mx-auto pt-5">
              <PostRegistrationOptions onRegisterAnother={handleRegisterAnother} />
            </div>
          </div>
        );
      }
    
      return (
        <div className="min-h-screen font-sora p-6">
          <div className="max-w-4xl mx-auto pt-10">
            <div className="text-center mb-10">
              <div className="inline-block mb-4 pb-5">
              <div className='flex gap-3 items-center'>
           <img src="/LogoCOSC.svg" alt="COSC" className="h-8 sm:h-12" />
           <p className="text-lg sm:text-xl">|</p>
           <img src="/logo4x.png" alt="OpenSys" className="h-8 sm:h-12" />
        </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#E5DEFF] bg-clip-text text-transparent">
              Decipher 
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 mx-auto mb-6" />
              <p className="text-white/80 max-w-2xl mx-auto">
              A thrilling decryption challenge—crack the codes and emerge victorious!
              </p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <ParticipantFields 
            number={1} 
            formData={formData} 
            onInputChange={handleInputChange}
            errors={validationErrors}
          />
          <ParticipantFields 
            number={2} 
            formData={formData} 
            onInputChange={handleInputChange}
            errors={validationErrors}
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full bg-[rgb(255,0,150)] text-white hover:bg-[rgb(255,0,150)]/90 
              hover:scale-[1.02] transform-gpu active:scale-95 transition-all duration-300 font-medium
              shadow-[0_0_15px_rgba(255,0,150,0.5)] hover:shadow-[0_0_20px_rgba(255,0,150,0.7)]
              backdrop-blur-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </form>
          </div>
        </div>
      );
    };
    
    export default DecipherRegistration;