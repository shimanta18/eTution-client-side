import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const AdminDashBoard = () => {
    const {user,logOut} =useAuth()
    const navigate = useNavigate()
const [activeTab,setActiveTab] = useState('Dashboard')
const [loading,setLoading] = useState(false)

 const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tuitions, setTuitions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const tabs=['Dashboard', 'User Management', 'Tuition Management', 'Reports & Analytics']
 
  useEffect(()=>{
    if(activeTab==="Dashboard"){
        fetchStats()
    }
    else if(activeTab ==="User Management"){
        fetchUsers()
    }

    else if(activeTab  ==="Tution Management"){
        fetchTutions()
    }

     else if(activeTab  ==='Reports & Analytics'){
        fetchTransactions()
    }
  },
  
  [activeTab])

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchTuitions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/tuitions');
      if (response.ok) {
        const data = await response.json();
        setTuitions(data);
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

    const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };



 
  const handleUpdateRole = async (uid, newRole) => {
    if (!confirm(`Change user role to ${newRole}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${uid}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        alert('Role updated successfully!');
        fetchUsers();
      } else {
        alert('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error updating role');
    }
  };

  const handleDeleteUser = async (uid) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${uid}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('User deleted successfully!');
        fetchUsers();
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const handleUpdateTuitionStatus = async (id, status) => {
    if (!confirm(`${status === 'APPROVED' ? 'Approve' : 'Reject'} this tuition?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/tuitions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        alert(`Tuition ${status.toLowerCase()} successfully!`);
        fetchTuitions();
      } else {
        alert('Failed to update tuition status');
      }
    } catch (error) {
      console.error('Error updating tuition:', error);
      alert('Error updating tuition');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
          <div className="w-9 h-9 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">eT</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">eTuitionBd</span>
        </div>

        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.displayName || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.displayName}
                </span>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.displayName?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Tab */}
            {activeTab === 'Dashboard' && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : stats && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <p className="text-sm text-gray-600 mb-1">Total Users</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.users.total}</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <p className="text-sm text-gray-600 mb-1">Total Students</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.users.students}</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <p className="text-sm text-gray-600 mb-1">Total Tutors</p>
                        <p className="text-3xl font-bold text-green-600">{stats.users.tutors}</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                        <p className="text-3xl font-bold text-orange-600">৳{stats.earnings.total}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tuition Statistics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Tuitions</span>
                            <span className="text-lg font-semibold text-gray-900">{stats.tuitions.total}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Pending Review</span>
                            <span className="text-lg font-semibold text-orange-600">{stats.tuitions.pending}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Approved</span>
                            <span className="text-lg font-semibold text-green-600">{stats.tuitions.approved}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                        <div className="space-y-3">
                          {stats.recentTransactions.slice(0, 5).map((transaction, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.studentName}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(transaction.paidAt).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-green-600">
                                + ৳{transaction.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'User Management' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {user.photoURL ? (
                                      <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-full" />
                                    ) : (
                                      <span className="text-sm font-semibold text-gray-600">
                                        {user.name?.charAt(0) || 'U'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={user.role}
                                  onChange={(e) => handleUpdateRole(user.uid, e.target.value)}
                                  className="text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                      <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleDeleteUser(user.uid)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tuition Management Tab */}
            {activeTab === 'Tuition Management' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tuition Management</h2>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) :
                
                
                (
                  <div className="space-y-4">
                    {tuitions.map((tuition) => (
                      <div 
                        key={tuition._id} 
                        className="bg-white border border-gray-200 rounded-lg p-5"
                      >
                        <div className="flex items-start justify-between">



 <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
           {tuition.subject} - {tuition.classGrade}
                              </h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tuition.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                tuition.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                
                                
                                {tuition.status}
                              </span>
                            </div>
                            <div className="space-y-1 mb-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Student:</span> {tuition.studentName}
                              </p>
                              <p className="text-sm text-gray-600"> {tuition.location}</p>


                              <p className="text-sm text-gray-600"> Budget: ৳{tuition.budget}/month</p>
                              <p className="text-sm text-gray-700 mt-2">{tuition.description}</p>
                            </div>
<p className="text-xs text-gray-500">Posted: 
    
    {new Date(tuition.postedAt).toLocaleString()}
                            </p>
                          </div>
                          
{tuition.status === 'PENDING' &&
 (
        <div className="flex gap-2 ml-4">
        <button
            onClick={() => handleUpdateTuitionStatus(tuition._id, 'APPROVED')}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                              >
                                Approve
        </button>
             <button
         onClick={() => handleUpdateTuitionStatus(tuition._id, 'REJECTED')}
                   className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                              >Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reports & Analytics Tab */}


            {activeTab === 'Reports & Analytics' && 
            
            (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div>


 <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                        <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
            </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student
</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor
                        </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount
                              </th>
                            </tr>
</thead>
<tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
         {new Date(transaction.paidAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.tutorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-600">
        Bdt{transaction.amount}
                                </td>
                                </tr>
                            ))}
                </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};





export default AdminDashBoard
