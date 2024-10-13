"use client"

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiBriefcase, FiCheck, FiChevronRight, FiDollarSign, FiFileText, FiFilter, FiMail, FiRefreshCw, FiSend, FiTrash2, FiTrendingUp, FiX } from 'react-icons/fi';

const Image = dynamic(() => import('next/image'), { ssr: false });

interface EmailItem {
  id: string;
  subject: string;
  sender: string;
  date: string;
  content: string;
  aiSummary: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  category: 'marketing' | 'sales' | 'work' | 'bills' | 'other';
}

// Static email data
const staticEmails: EmailItem[] = [
  {
    id: 'email-1',
    subject: "Project update",
    sender: "john.doe@example.com",
    date: "2024-10-10T10:00:00Z",
    content: "Dear Team, I hope this email finds you well. I wanted to provide a comprehensive update regarding our ongoing project...",
    aiSummary: "AI: Project progress overview with key milestones",
    priority: 'high',
    read: false,
    category: 'work'
  },
  {
    id: 'email-2',
    subject: "Team lunch next week",
    sender: "jane.smith@example.com",
    date: "2024-10-09T14:30:00Z",
    content: "Hello everyone, I'm organizing a team lunch for next week. Please let me know your availability and any dietary restrictions...",
    aiSummary: "AI: Team lunch details and RSVP request",
    priority: 'low',
    read: true,
    category: 'other'
  },
  // Add more static emails as needed
];

const EmailPanel: React.FC<{ emails: EmailItem[], onSelectEmail: (email: EmailItem) => void, selectedEmailId: string | null }> = ({ emails, onSelectEmail, selectedEmailId }) => {
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[800px]">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-emerald-800">Inbox</h2>
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
                {email.priority === 'high' && <FiAlertCircle className="text-red-500 mr-2 flex-shrink-0" />}
                <p className={`font-medium ${email.read ? 'text-gray-600' : 'text-gray-800'} truncate text-base`}>
                  {email.aiSummary}
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
                  className="mt-2 text-sm text-gray-600"
                >
                  <p>From: {email.sender}</p>
                  <p>Sent: {new Date(email.date).toLocaleString()}</p>
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
    <div className="bg-white rounded-xl p-6 h-[800px] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{email.subject}</h2>
        <button onClick={onClose}>
          <FiX className="text-gray-600 hover:text-gray-800" size={24} />
        </button>
      </div>
      <p className="text-base text-gray-600 mb-2">From: {email.sender}</p>
      <p className="text-base text-gray-600 mb-4">
        {new Date(email.date).toLocaleString()}
      </p>
      <div className="bg-emerald-50 p-4 rounded-lg mb-4">
        <p className="text-emerald-800 font-medium text-lg mb-2">AI Summary:</p>
        <p className="text-emerald-700 text-base">{email.aiSummary}</p>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        <p className="text-gray-800 whitespace-pre-wrap text-base leading-relaxed">{email.content}</p>
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
            className="mt-4 bg-gray-50 p-4 rounded-lg"
          >
            <input
              type="text"
              placeholder="To: (auto-filled)"
              className="w-full p-2 mb-2 border rounded"
              value={email.sender}
              readOnly
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 mb-2 border rounded h-24"
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
  const priorityEmails = emails.filter(e => e.priority === 'high').length;
  const categoryStats = {
    marketing: emails.filter(e => e.category === 'marketing').length,
    sales: emails.filter(e => e.category === 'sales').length,
    work: emails.filter(e => e.category === 'work').length,
    bills: emails.filter(e => e.category === 'bills').length,
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketing': return FiTrendingUp;
      case 'sales': return FiDollarSign;
      case 'work': return FiBriefcase;
      case 'bills': return FiFileText;
      default: return FiMail;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 h-[800px] overflow-y-auto flex flex-col">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Email Stats</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
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
          <div key={label} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
            <Icon className={`mb-2 ${color}`} size={24} />
            <span className="text-base font-medium text-gray-700">{label}</span>
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow flex items-center justify-center relative">
        {isMounted && (
          <Image 
            src="/logo-no-text.png"
            width={300}
            height={200}
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

const EmailDashboard: React.FC = () => {
  const [emails, setEmails] = useState<EmailItem[]>(staticEmails);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get<EmailItem[]>('/api/emails');
        setEmails(response.data);
      } catch (err) {
        setError('Failed to fetch emails. Please try again later.');
        console.error('Error fetching emails:', err);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment the next line to fetch emails from API instead of using static data
    // fetchEmails();
  }, []);

  const sortedEmails = emails.sort((a, b) => {
    if (a.priority === 'high' && !a.read) return -1;
    if (b.priority === 'high' && !b.read) return 1;
    if (!a.read && b.read) return -1;
    if (a.read && !b.read) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-full mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-800">Welcome Back!</h1>
          <p className="text-xl font-semibold text-emerald-600">user8687391766990</p>
        </header>

        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3">
            <EmailPanel
              emails={sortedEmails}
              onSelectEmail={setSelectedEmail}
              selectedEmailId={selectedEmail?.id || null}
            />
          </div>
          <div className="col-span-2">
            {selectedEmail ? (
              <EmailContent email={selectedEmail} onClose={() => setSelectedEmail(null)} />
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