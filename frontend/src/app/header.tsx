"use client"

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiBriefcase, FiCheck, FiChevronRight, FiDollarSign, FiFileText, FiFilter, FiMail, FiRefreshCw, FiSend, FiTrash2, FiTrendingUp, FiX } from 'react-icons/fi';

const Image = dynamic(() => import('next/image'), { ssr: false });

interface EmailItem {
  isUrgent: boolean;
  summary: string;
  timestamp: string | number | Date;
  id: string;
  subject: string;
  from: string;
  date: string;
  message : string;
  category: string;
}

const EmailPanel: React.FC<{ emails: EmailItem[], onSelectEmail: (email: EmailItem) => void, selectedEmailId: string | null }> = ({ emails, onSelectEmail, selectedEmailId }) => {
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-800">Inbox</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => alert("Delete feature in progress")}
          >
            <FiTrash2 className="text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => alert("Select all feature in progress")}
          >
            <FiCheck className="text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => alert("Filter feature in progress")}
          >
            <FiFilter className="text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => alert("Refresh feature in progress")}
          >
            <FiRefreshCw className="text-gray-600" />
          </motion.button>
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        {emails.map((email) => (
          <motion.div
            key={email.id}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
              email.read ? 'opacity-70' : 'opacity-100'
            } ${selectedEmailId === email.id ? 'bg-emerald-50' : ''}`}
            onMouseEnter={() => setHoveredEmail(email.id)}
            onMouseLeave={() => setHoveredEmail(null)}
            onClick={() => onSelectEmail(email)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-grow">
                {email.isUrgent === true && <FiAlertCircle className="text-red-500 mr-2 flex-shrink-0" />}
                <p className={`font-medium ${email.read ? 'text-gray-600' : 'text-gray-800'} truncate text-sm sm:text-base`}>
                  {email.summary}
                </p>
              </div>
              <FiChevronRight className="text-gray-400 flex-shrink-0 ml-2" />
            </div>
            <AnimatePresence>
              {hoveredEmail === email.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 text-xs sm:text-sm text-gray-600"
                >
                  <p>From: {email.from}</p>
                  <p>Sent: {new Date(email.timestamp).toLocaleString()}</p>
                  <p>Category: {email.category}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EmailContent: React.FC<{ email: EmailItem, onClose: () => void }> = ({ email, onClose }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 h-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{email.subject}</h2>
        <button onClick={onClose} className="">
          <FiX className="text-gray-600 hover:text-gray-800" size={24} />
        </button>
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-2">From: {email.from}</p>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        {new Date(email.timestamp).toLocaleString()}
      </p>
      <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg mb-4">
        <p className="text-emerald-800 font-medium text-base sm:text-lg mb-2">AI Summary:</p>
        <p className="text-emerald-700 text-sm sm:text-base">{email.summary}</p>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{email.message}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        Reply
      </motion.button>
      <AnimatePresence>
        {showReplyBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-gray-50 p-3 sm:p-4 rounded-lg"
          >
            <input
              type="text"
              placeholder="To: (auto-filled)"
              className="w-full p-2 mb-2 border rounded text-sm sm:text-base"
              value={email.from}
              readOnly
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 mb-2 border rounded text-sm sm:text-base"
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 mb-2 border rounded h-24 text-sm sm:text-base"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition-colors flex items-center"
              onClick={() => alert("Send feature in progress")}
            >
              <FiSend className="mr-2" /> Send
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmailStats: React.FC<{ emails: EmailItem[] }> = ({ emails }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const unreadEmails = emails.filter(e => !e.read).length;
  const priorityEmails = emails.filter(e => e.isUrgent === true).length;
  
  const categoryStats = emails.reduce((acc, email) => {
    acc[email.category] = (acc[email.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'marketing': return FiTrendingUp;
      case 'sales': return FiDollarSign;
      case 'work': return FiBriefcase;
      case 'bills': return FiFileText;
      default: return FiMail;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 h-full overflow-y-auto flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4 sm:mb-6">Email Stats</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {[
          { label: 'Unread', icon: FiMail, color: 'text-blue-500', value: unreadEmails },
          { label: 'Priority', icon: FiAlertCircle, color: 'text-red-500', value: priorityEmails },
          ...Object.entries(categoryStats).map(([category, count]) => ({
            label: category.charAt(0).toUpperCase() + category.slice(1),
            icon: getCategoryIcon(category),
            color: 'text-emerald-500',
            value: count
          }))
        ].map(({ label, icon: Icon, color, value }) => (
          <div key={label} className="flex flex-col items-center bg-gray-50 p-3 sm:p-4 rounded-lg">
            <Icon className={`mb-1 sm:mb-2 ${color}`} size={20} />
            <span className="text-sm sm:text-base font-medium text-gray-700">{label}</span>
            <span className={`text-lg sm:text-2xl font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow flex items-center justify-center relative">
        {isMounted && (
          <Image 
            src="/logo-no-text.png"
            width={200}
            height={133}
            alt="Logo"
            style={{
              filter: 'grayscale(100%)',
              opacity: 0.5,
            }}
          />
        )}
      </div>
    </div>
  );
};
type Prop = {
  user: string;
}

const EmailDashboard: React.FC<Prop> = ({user}) => {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailContent, setShowEmailContent] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/emails.json');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to parse email data. Please check the format of emails.json.');
          console.error('Error parsing email data:', err);
        } else {
          setError('Failed to fetch emails. Please try again later.');
          console.error('Error fetching emails:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

const sortedEmails = [...emails].sort((a, b) => {
  // Sort by urgency first
  if (a.isUrgent !== b.isUrgent) {
    return a.isUrgent ? -1 : 1;
  }
  
  // If urgency is the same, sort by timestamp (most recent first)
  const timeA = new Date(a.timestamp).getTime();
  const timeB = new Date(b.timestamp).getTime();
  return timeB - timeA;
});



  const handleSelectEmail = (email: EmailItem) => {
    setSelectedEmail(email);
    setShowEmailContent(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">Welcome Back!</h1>
          <p className="text-lg sm:text-xl font-semibold text-emerald-600">{user}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className={`lg:col-span-3 h-[600px] ${showEmailContent ? 'hidden lg:block' : ''}`}>
            <EmailPanel
              emails={sortedEmails}
              onSelectEmail={handleSelectEmail}
              selectedEmailId={selectedEmail?.id || null}
            />
          </div>
          <div className={`lg:col-span-2 h-[600px] ${!showEmailContent ? 'hidden lg:block' : ''}`}>
            {selectedEmail ? (
              <EmailContent 
                email={selectedEmail} 
                onClose={() => {
                  setSelectedEmail(null);
                  setShowEmailContent(false);
                }} 
              />
            ) : (
              <EmailStats emails={emails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;