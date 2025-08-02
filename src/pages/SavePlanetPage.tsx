import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, Leaf, Trash2, ChevronRight, X, Loader2, Sparkles, Award, Eye, ArrowLeft, Camera, Star, Zap, Heart, TreePine, Droplets, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

type Task = {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  imageUrl?: string;
};

const SavePlanetPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards'>('tasks');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Clean Up Your Local Park',
      description: 'Spend 30 minutes picking up trash in your local park or neighborhood.',
      points: 50,
      completed: false,
    },
    {
      id: '2',
      title: 'Plant a Tree',
      description: 'Plant a tree in your yard or community space.',
      points: 100,
      completed: false,
    },
    {
      id: '3',
      title: 'Donate to a Food Bank',
      description: 'Donate non-perishable food items to a local food bank.',
      points: 75,
      completed: false,
    },
    {
      id: '4',
      title: 'Use Reusable Bags',
      description: 'Go shopping with reusable bags instead of plastic ones.',
      points: 30,
      completed: false,
    },
    {
      id: '5',
      title: 'Volunteer at a Shelter',
      description: 'Spend 2 hours volunteering at an animal or homeless shelter.',
      points: 150,
      completed: false,
    },
    {
      id: '6',
      title: 'Start Composting',
      description: 'Set up a home composting system for organic waste.',
      points: 80,
      completed: false,
    },
    {
      id: '7',
      title: 'Use Public Transportation',
      description: 'Take public transport instead of driving for one week.',
      points: 90,
      completed: false,
    },
    {
      id: '8',
      title: 'Organize a Beach Cleanup',
      description: 'Organize and participate in a beach or waterway cleanup event.',
      points: 120,
      completed: false,
    },
    {
      id: '9',
      title: 'Install Solar Panels',
      description: 'Install solar panels or renewable energy source at home.',
      points: 200,
      completed: false,
    },
    {
      id: '10',
      title: 'Create a Recycling Station',
      description: 'Set up a community recycling station in your neighborhood.',
      points: 130,
      completed: false,
    },
    {
      id: '11',
      title: 'Water Conservation',
      description: 'Install water-saving devices and reduce water usage by 20%.',
      points: 70,
      completed: false,
    },
    {
      id: '12',
      title: 'Organic Garden',
      description: 'Start an organic vegetable garden using sustainable practices.',
      points: 110,
      completed: false,
    },
  ]);

  const totalPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
  const completionPercentage = (totalPoints / 500) * 100; // 500 points to get a reward

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedTask) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a preview URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      
      // Update the task with the image URL
      const updatedTasks = tasks.map(task => 
        task.id === selectedTask.id 
          ? { ...task, completed: true, imageUrl }
          : task
      );
      
      setTasks(updatedTasks);
      setShowSuccess(true);
      
      // Show success message
      toast({
        title: '🌱 Task Completed!',
        description: `You've earned ${selectedTask.points} points!`,
      });
      
      // Check if user has enough points for a reward
      const newPoints = updatedTasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
      if (newPoints >= 500) {
        setTimeout(() => setShowReward(true), 1000);
      }
      
      // Auto-close the modal after 2 seconds
      setTimeout(() => {
        setSelectedTask(null);
        setShowSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: '❌ Upload Failed',
        description: 'There was an error uploading your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const claimReward = () => {
    if (totalPoints >= 500) {
      // Show reward animation
      setShowReward(true);
      
      // Show success message
      toast({
        title: '🎉 Congratulations!',
        description: 'You\'ve earned a new Pokémon! Check your rewards.',
      });
      
      // In a real app, you would save this to the user's profile
      // For now, we'll just reset the tasks
      setTimeout(() => {
        setTasks(tasks.map(task => ({
          ...task,
          completed: false,
          imageUrl: undefined
        })));
        setShowReward(false);
      }, 3000);
      
    } else {
      toast({
        title: '⏳ Keep Going!',
        description: `You need ${500 - totalPoints} more points to claim a reward.`,
        variant: 'default',
      });
    }
  };

  const getTaskIcon = (taskId: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '1': <Trash2 className="h-4 w-4" />,
      '2': <TreePine className="h-4 w-4" />,
      '3': <Heart className="h-4 w-4" />,
      '4': <Recycle className="h-4 w-4" />,
      '5': <Heart className="h-4 w-4" />,
      '6': <Leaf className="h-4 w-4" />,
      '7': <Zap className="h-4 w-4" />,
      '8': <Droplets className="h-4 w-4" />,
      '9': <Star className="h-4 w-4" />,
      '10': <Recycle className="h-4 w-4" />,
      '11': <Droplets className="h-4 w-4" />,
      '12': <TreePine className="h-4 w-4" />,
    };
    return iconMap[taskId] || <Leaf className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen app" style={{ background: 'var(--background-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link to="/">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-white hover:bg-white/10 backdrop-filter backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: '"Young Serif", serif',
              color: 'white',
              textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            🌍 Save Our Planet
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: '"Roboto Serif", serif' }}>
            Complete sustainable tasks, upload proof, and earn rewards while making a positive impact on the environment!
          </p>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card 
            className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--backdrop-blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: '1rem'
            }}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-white" style={{ fontFamily: '"Young Serif", serif' }}>
                    🌟 Your Impact
                  </CardTitle>
                  <CardDescription className="text-white/80" style={{ fontFamily: '"Roboto Serif", serif' }}>
                    Complete tasks to earn points and rewards
                  </CardDescription>
                </div>
                <div 
                  className="text-right px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-primary-yellow)' }}>
                    {totalPoints} / 500
                  </div>
                  <div className="text-sm text-white/70">Points to next reward</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/90">
                  <span>Progress</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <div className="relative">
                  <div 
                    className="h-3 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <motion.div 
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary-yellow) 0%, var(--color-primary-orange) 50%, var(--color-accent-pink) 100%)'
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, type: 'spring' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <div className="text-sm text-white/80">
                {totalPoints >= 500 ? (
                  <span className="font-medium flex items-center" style={{ color: 'var(--color-primary-yellow)' }}>
                    <Sparkles className="h-4 w-4 mr-1" /> Ready to claim your reward!
                  </span>
                ) : (
                  `Only ${500 - totalPoints} points to go!`
                )}
              </div>
              <Button 
                onClick={claimReward}
                disabled={totalPoints < 500}
                className={`w-full sm:w-auto transition-all duration-300 font-medium`}
                style={{
                  fontFamily: '"Young Serif", serif',
                  background: totalPoints >= 500 
                    ? 'linear-gradient(135deg, var(--color-primary-yellow), var(--color-primary-orange))'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: totalPoints >= 500 ? 'black' : 'rgba(255, 255, 255, 0.5)',
                  border: totalPoints >= 500 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: totalPoints >= 500 ? 'pointer' : 'not-allowed'
                }}
              >
                {totalPoints >= 500 ? (
                  <>
                    <Award className="mr-2 h-4 w-4" /> Claim Your Pokémon
                  </>
                ) : (
                  'Keep Going!'
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex mb-8 relative"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            className={`relative py-3 px-6 font-medium text-sm transition-colors`}
            style={{
              fontFamily: '"Young Serif", serif',
              color: activeTab === 'tasks' ? 'var(--color-primary-yellow)' : 'rgba(255, 255, 255, 0.7)'
            }}
            onClick={() => setActiveTab('tasks')}
          >
            🌱 Available Tasks
            {activeTab === 'tasks' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'var(--color-primary-orange)' }}
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
          <button
            className={`relative py-3 px-6 font-medium text-sm transition-colors`}
            style={{
              fontFamily: '"Young Serif", serif',
              color: activeTab === 'rewards' ? 'var(--color-primary-yellow)' : 'rgba(255, 255, 255, 0.7)'
            }}
            onClick={() => setActiveTab('rewards')}
          >
            🏆 Your Rewards
            {activeTab === 'rewards' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'var(--color-primary-orange)' }}
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </motion.div>

        {activeTab === 'tasks' ? (
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, staggerChildren: 0.1 }}
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, type: 'spring', stiffness: 300 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <Card className="h-full overflow-hidden border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-blue-400 mr-2"></div>
                          )}
                          {task.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
                          {task.description}
                        </CardDescription>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                        {task.points} pts
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    {task.completed ? (
                      <div className="w-full space-y-3">
                        <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                          <CheckCircle className="h-4 w-4 mr-1.5" /> Task Completed!
                        </div>
                        {task.imageUrl && (
                          <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img 
                              src={task.imageUrl} 
                              alt="Task completion proof" 
                              className="h-32 w-full object-cover transition-transform group-hover:scale-105" 
                            />
                            <button 
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setSelectedTask(task)}
                            >
                              <span className="text-white text-sm font-medium bg-black/70 px-3 py-1.5 rounded-full flex items-center">
                                <Eye className="h-3.5 w-3.5 mr-1.5" /> View Submission
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button 
                        onClick={() => setSelectedTask(task)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Proof
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <Leaf className="h-16 w-16 text-green-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Rewards Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Complete tasks to earn points and unlock amazing Pokémon rewards!
              </p>
              <Button 
                onClick={() => setActiveTab('tasks')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                View Available Tasks
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Image Upload Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Complete: {selectedTask.title}</CardTitle>
              <CardDescription>{selectedTask.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {uploading ? (
                  <div className="py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Uploading your photo...</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Upload a photo as proof of your completed task
                    </p>
                    <input
                      type="file"
                      id="task-proof"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    <label
                      htmlFor="task-proof"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTask(null)}
                disabled={uploading}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SavePlanetPage;
