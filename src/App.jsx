import React, { useState } from 'react';
import {
  BarChart3, BookOpen, Calendar, FileText, TrendingUp, Target,
  Edit3, CheckCircle, Activity
} from 'lucide-react';

const TradingJournal = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [tradePlans, setTradePlans] = useState([]);
  const [trades, setTrades] = useState([]);
  const [notes, setNotes] = useState({});
  const [newPlan, setNewPlan] = useState({
    ticker: '', entry: '', target: '', stopLoss: '',
    position: 'long', quantity: '', notes: ''
  });

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'plan-trader', name: 'Plan Trader', icon: Target },
    { id: 'smart-journal', name: 'Smart Journal', icon: BookOpen },
    { id: 'daily-view', name: 'Daily View', icon: Calendar },
    { id: 'trade-log', name: 'Trade Log', icon: FileText },
    { id: 'notebook', name: 'Notebook', icon: Edit3 },
    { id: 'performance', name: 'Performance Review', icon: TrendingUp }
  ];

  const getCurrentDate = () => new Date().toISOString().split('T')[0];
  const calculateRiskReward = (entry, target, stopLoss, position) => {
    const e = parseFloat(entry), t = parseFloat(target), s = parseFloat(stopLoss);
    if (!e || !t || !s) return { ratio: 0, risk: 0, reward: 0 };
    let risk = position === 'long' ? e - s : s - e;
    let reward = position === 'long' ? t - e : e - t;
    const ratio = risk !== 0 ? (reward / risk).toFixed(2) : 0;
    return { ratio, risk: Math.abs(risk).toFixed(2), reward: Math.abs(reward).toFixed(2) };
  };

  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="text-xl font-bold">Welcome to Trading Journal Pro</div>
      <div>Use the navigation bar to start planning and logging trades.</div>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return renderDashboard();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Trading Journal Pro</h1>
        </div>
        <div className="text-sm text-gray-600">{new Date().toDateString()}</div>
      </header>
      <nav className="bg-white shadow-sm px-4">
        <div className="flex space-x-4 overflow-x-auto">
          {modules.map(({ id, name, icon: Icon }) => (
            <button key={id}
              onClick={() => setActiveModule(id)}
              className={`flex items-center py-3 text-sm font-medium border-b-2 ${
                activeModule === id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5 mr-1" /> {name}
            </button>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">{renderContent()}</main>
    </div>
  );
};

export default TradingJournal;
