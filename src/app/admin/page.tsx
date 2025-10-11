'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  ChefHat, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Star,
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Loader from '@/components/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

interface DashboardStats {
  totalUsers: number;
  totalRecipes: number;
  totalReviews: number;
  activeUsers: number;
  newUsersThisMonth: number;
  newRecipesThisMonth: number;
  newReviewsThisMonth: number;
}

interface TopRecipe {
  _id: string;
  title: string;
  averageRating: number;
  reviewCount: number;
  images: string[];
}

interface RecentUser {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}

interface RecentRecipe {
  _id: string;
  title: string;
  category: string;
  images: string[];
  createdAt: string;
  user: {
    fullName: string;
  };
}

interface ChartData {
  userGrowth: { month: string; users: number }[];
  recipeCategories: { category: string; count: number }[];
  ratingsDistribution: { rating: number; count: number }[];
  monthlyActivity: { month: string; recipes: number; reviews: number }[];
}

interface DashboardData {
  stats: DashboardStats;
  topRecipes: TopRecipe[];
  recentUsers: RecentUser[];
  recentRecipes: RecentRecipe[];
  charts: ChartData;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchDashboardData = async () => {
      try {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [mounted]);

  if (!mounted || loading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg font-outfit">{error || 'Failed to load dashboard'}</p>
      </div>
    );
  }

  // Fallback data for charts if no data exists
  const safeChartData = {
    userGrowth: data.charts?.userGrowth?.length > 0 ? data.charts.userGrowth : [
      { month: 'Jan', users: 0 }, { month: 'Feb', users: 0 }, { month: 'Mar', users: 0 }
    ],
    recipeCategories: data.charts?.recipeCategories?.length > 0 ? data.charts.recipeCategories : [
      { category: 'No Data', count: 1 }
    ],
    ratingsDistribution: data.charts?.ratingsDistribution?.length > 0 ? data.charts.ratingsDistribution : [
      { rating: 1, count: 0 }, { rating: 2, count: 0 }, { rating: 3, count: 0 }, { rating: 4, count: 0 }, { rating: 5, count: 0 }
    ],
    monthlyActivity: data.charts?.monthlyActivity?.length > 0 ? data.charts.monthlyActivity : [
      { month: 'Jan', recipes: 0, reviews: 0 }
    ]
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: number;
    change: number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium font-outfit">{title}</p>
          <p className="text-2xl font-bold text-gray-900 font-outfit">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-outfit">
            +{change} this month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-caveat">Dashboard</h1>
        <p className="text-gray-600 font-outfit">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={data.stats.totalUsers}
          change={data.stats.newUsersThisMonth}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Recipes"
          value={data.stats.totalRecipes}
          change={data.stats.newRecipesThisMonth}
          icon={ChefHat}
          color="bg-green-500"
        />
        <StatCard
          title="Total Reviews"
          value={data.stats.totalReviews}
          change={data.stats.newReviewsThisMonth}
          icon={MessageSquare}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Users"
          value={data.stats.activeUsers}
          change={0}
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">User Growth</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Line
              data={{
                labels: safeChartData.userGrowth.map(d => d.month),
                datasets: [
                  {
                    label: 'New Users',
                    data: safeChartData.userGrowth.map(d => d.users),
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        {/* Recipe Categories Chart */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">Recipe Categories</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Doughnut
              data={{
                labels: safeChartData.recipeCategories.map(d => d.category),
                datasets: [
                  {
                    data: safeChartData.recipeCategories.map(d => d.count),
                    backgroundColor: [
                      '#ef4444', '#f97316', '#eab308', '#22c55e',
                      '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
                    ],
                    borderWidth: 0,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                    labels: { usePointStyle: true }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Ratings Distribution Chart */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">Ratings Distribution</h2>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="h-64">
            <Bar
              data={{
                labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                datasets: [
                  {
                    label: 'Number of Ratings',
                    data: [1, 2, 3, 4, 5].map(rating => 
                      safeChartData.ratingsDistribution.find(r => r.rating === rating)?.count || 0
                    ),
                    backgroundColor: [
                      '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'
                    ],
                    borderRadius: 4,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        {/* Monthly Activity Chart */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">Monthly Activity</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Bar
              data={{
                labels: safeChartData.monthlyActivity.map(d => d.month),
                datasets: [
                  {
                    label: 'Recipes',
                    data: safeChartData.monthlyActivity.map(d => d.recipes),
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderRadius: 4,
                  },
                  {
                    label: 'Reviews',
                    data: safeChartData.monthlyActivity.map(d => d.reviews),
                    backgroundColor: 'rgba(147, 51, 234, 0.8)',
                    borderRadius: 4,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Rated Recipes */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">Top Rated Recipes</h2>
            <Link href="/admin/recipes" className="text-green-600 hover:text-green-700 text-sm font-medium font-outfit">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {data.topRecipes.map((recipe) => (
              <div key={recipe._id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition-colors">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={recipe.images[0] || 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=100&h=100&fit=crop'}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=100&h=100&fit=crop';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate font-outfit">{recipe.title}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 font-outfit">{recipe.averageRating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-outfit">({recipe.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-caveat">Recent Users</h2>
            <Link href="/admin/users" className="text-green-600 hover:text-green-700 text-sm font-medium font-outfit">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {data.recentUsers.map((user) => (
              <div key={user._id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate font-outfit">{user.fullName}</p>
                  <p className="text-xs text-gray-500 truncate font-outfit">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Recipes */}
      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-caveat">Recent Recipes</h2>
          <Link href="/admin/recipes" className="text-green-600 hover:text-green-700 text-sm font-medium font-outfit">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recentRecipes.map((recipe) => (
            <div key={recipe._id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative h-32">
                <Image
                  src={recipe.images[0] || 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=300&h=200&fit=crop'}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=300&h=200&fit=crop';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 font-outfit truncate">{recipe.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-outfit">By {recipe.user.fullName}</span>
                  <span className="font-outfit">{recipe.category}</span>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="font-outfit">{new Date(recipe.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
