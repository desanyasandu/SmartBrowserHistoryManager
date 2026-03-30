import React, { useMemo } from 'react';
import type { Page } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie 
} from 'recharts';
import { TrendingUp, Globe, Star, Activity, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsDashboardProps {
  pages: Page[];
  totalVisits: number;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ pages, totalVisits }) => {
  
  // Categorization mapping
  const CATEGORY_MAP: Record<string, string> = {
    'google.com': 'Search',
    'youtube.com': 'Entertainment',
    'facebook.com': 'Social',
    'twitter.com': 'Social',
    'instagram.com': 'Social',
    'github.com': 'Development',
    'stackoverflow.com': 'Development',
    'reddit.com': 'Community',
    'netflix.com': 'Entertainment',
    'amazon.com': 'Shopping',
    'wikipedia.org': 'Education',
  };

  const getCategory = (domain: string) => {
    for (const [key, value] of Object.entries(CATEGORY_MAP)) {
      if (domain.includes(key)) return value;
    }
    return 'Other';
  };

  // Aggregate data by domain and category
  const { domainData, categoryData } = useMemo(() => {
    const domainCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    pages.forEach(p => {
      let domain = 'other';
      try {
        // Try parsing as full URL
        const url_obj = new URL(p.url.includes('://') ? p.url : `https://${p.url}`);
        domain = url_obj.hostname.replace('www.', '');
      } catch {
        // Fallback: simplified hostname extraction
        domain = p.url.split('/')[0].replace('www.', '') || 'other';
      }

      domainCounts[domain] = (domainCounts[domain] || 0) + p.visitCount;
      const cat = getCategory(domain);
      categoryCounts[cat] = (categoryCounts[cat] || 0) + p.visitCount;
    });

    const domains = Object.entries(domainCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const categories = Object.entries(categoryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { domainData: domains, categoryData: categories };
  }, [pages]);

  const bookmarkCount = useMemo(() => pages.filter(p => p.isBookmarked).length, [pages]);
  const uniqueSites = useMemo(() => new Set(pages.map(p => {
      try { return new URL(p.url).hostname; } catch { return p.url; }
  })).size, [pages]);

  if (pages.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Metrics Row */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Visits', value: totalVisits, icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
           { label: 'Unique Sites', value: uniqueSites, icon: Globe, color: 'text-sky-400', bg: 'bg-sky-500/10' },
           { label: 'Bookmarks', value: bookmarkCount, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
           { label: 'Efficiency', value: '98%', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
         ].map((stat, i) => (
           <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{stat.label}</p>
                <p className="text-xl font-bold text-white leading-tight">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Top Domains Bar Chart */}
      <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Top Visited Domains
          </h3>
        </div>
        
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainData} layout="vertical" margin={{ left: 30, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                width={80}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {domainData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl">
        <h3 className="text-sm font-bold text-slate-300 mb-6">Activity Categories</h3>
        <div className="h-[200px] w-full flex items-center justify-center">
           <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
           </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
           {categoryData.map((entry, index) => (
             <div key={index} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </span>
                <span className="text-slate-200 font-mono">{entry.value}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
