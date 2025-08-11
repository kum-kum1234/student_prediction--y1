"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Brain, TrendingUp, Users, Target, AlertCircle, CheckCircle } from 'lucide-react'
import { SimpleBarChart } from "@/components/charts/simple-bar-chart"
import { SimplePieChart } from "@/components/charts/simple-pie-chart"

interface StudentProfile {
  age: number
  gender: number
  high_school_gpa: number
  study_hours_per_week: number
  attendance_rate: number
  math_grade: number
  english_grade: number
  science_grade: number
  family_income: number
  parent_education: number
  extracurricular_activities: number
  part_time_job: number
  stress_level: number
  social_support: number
  has_computer: number
  internet_quality: number
}

interface PredictionResult {
  success_probability: number
  prediction: number
  confidence: number
  risk_factors: string[]
  recommendations: string[]
}

export default function StudentSuccessPrediction() {
  const [profile, setProfile] = useState<StudentProfile>({
    age: 20,
    gender: 0,
    high_school_gpa: 3.0,
    study_hours_per_week: 10,
    attendance_rate: 85,
    math_grade: 75,
    english_grade: 78,
    science_grade: 73,
    family_income: 1,
    parent_education: 1,
    extracurricular_activities: 2,
    part_time_job: 0,
    stress_level: 5,
    social_support: 7,
    has_computer: 1,
    internet_quality: 1
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [modelStats, setModelStats] = useState<any>(null)
  const [chartsLoaded, setChartsLoaded] = useState(false)

  useEffect(() => {
    // Check if Recharts is available
    const timer = setTimeout(() => {
      setChartsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Mock model statistics (in a real app, this would come from your trained model)
  useEffect(() => {
    setModelStats({
      accuracy: 0.847,
      precision: 0.823,
      recall: 0.891,
      f1_score: 0.856,
      total_students: 1000,
      successful_predictions: 847
    })
  }, [])

  const predictSuccess = async () => {
    setLoading(true)
    
    // Simulate API call to prediction service
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock prediction logic (in a real app, this would call your trained model)
    const features = Object.values(profile)
    
    // Simple scoring algorithm for demonstration
    let score = 0
    score += (profile.high_school_gpa - 2.0) / 2.0 * 0.25
    score += Math.min(profile.study_hours_per_week / 20, 1) * 0.20
    score += profile.attendance_rate / 100 * 0.15
    score += ((profile.math_grade + profile.english_grade + profile.science_grade) / 3 - 50) / 50 * 0.20
    score += (profile.extracurricular_activities / 4) * 0.05
    score += (profile.social_support / 10) * 0.05
    score += (1 - profile.stress_level / 10) * 0.05
    score += profile.has_computer * 0.05
    
    const success_probability = Math.max(0, Math.min(1, score + Math.random() * 0.1 - 0.05))
    const prediction_result = success_probability > 0.6 ? 1 : 0
    const confidence = Math.abs(success_probability - 0.5) * 2
    
    // Generate risk factors and recommendations
    const risk_factors = []
    const recommendations = []
    
    if (profile.high_school_gpa < 3.0) {
      risk_factors.push("Low high school GPA")
      recommendations.push("Consider academic support programs")
    }
    if (profile.study_hours_per_week < 10) {
      risk_factors.push("Insufficient study time")
      recommendations.push("Increase weekly study hours to at least 15-20")
    }
    if (profile.attendance_rate < 80) {
      risk_factors.push("Poor attendance")
      recommendations.push("Improve class attendance to above 90%")
    }
    if (profile.stress_level > 7) {
      risk_factors.push("High stress levels")
      recommendations.push("Seek counseling or stress management resources")
    }
    if (profile.social_support < 5) {
      risk_factors.push("Limited social support")
      recommendations.push("Join study groups or student organizations")
    }
    if (!profile.has_computer) {
      risk_factors.push("Limited technology access")
      recommendations.push("Utilize campus computer labs or seek technology assistance")
    }
    
    if (risk_factors.length === 0) {
      recommendations.push("Continue current academic practices")
      recommendations.push("Consider mentoring other students")
    }
    
    setPrediction({
      success_probability,
      prediction: prediction_result,
      confidence,
      risk_factors,
      recommendations
    })
    
    setLoading(false)
  }

  const updateProfile = (field: keyof StudentProfile, value: number) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const loadSampleProfile = (type: 'high-risk' | 'average' | 'high-potential') => {
    const profiles = {
      'high-risk': {
        age: 19,
        gender: 0,
        high_school_gpa: 2.3,
        study_hours_per_week: 5,
        attendance_rate: 65,
        math_grade: 58,
        english_grade: 62,
        science_grade: 55,
        family_income: 0,
        parent_education: 0,
        extracurricular_activities: 0,
        part_time_job: 1,
        stress_level: 8,
        social_support: 3,
        has_computer: 0,
        internet_quality: 0
      },
      'average': {
        age: 20,
        gender: 1,
        high_school_gpa: 3.2,
        study_hours_per_week: 12,
        attendance_rate: 82,
        math_grade: 74,
        english_grade: 76,
        science_grade: 71,
        family_income: 1,
        parent_education: 1,
        extracurricular_activities: 2,
        part_time_job: 1,
        stress_level: 6,
        social_support: 6,
        has_computer: 1,
        internet_quality: 1
      },
      'high-potential': {
        age: 21,
        gender: 0,
        high_school_gpa: 3.8,
        study_hours_per_week: 18,
        attendance_rate: 95,
        math_grade: 88,
        english_grade: 91,
        science_grade: 86,
        family_income: 2,
        parent_education: 2,
        extracurricular_activities: 4,
        part_time_job: 0,
        stress_level: 4,
        social_support: 9,
        has_computer: 1,
        internet_quality: 2
      }
    }
    setProfile(profiles[type])
    setPrediction(null)
  }

  const chartData = [
    { name: 'GPA', value: profile.high_school_gpa * 25, max: 100 }, // Scale to 100
    { name: 'Study Hrs', value: Math.min(profile.study_hours_per_week * 2.5, 100), max: 100 },
    { name: 'Attendance', value: profile.attendance_rate, max: 100 },
    { name: 'Math', value: profile.math_grade, max: 100 },
    { name: 'English', value: profile.english_grade, max: 100 },
    { name: 'Science', value: profile.science_grade, max: 100 },
  ]

  const pieData = [
    { name: 'Successful', value: modelStats?.successful_predictions || 0, color: '#10b981' },
    { name: 'At Risk', value: (modelStats?.total_students || 0) - (modelStats?.successful_predictions || 0), color: '#ef4444' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Student Success Prediction</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced machine learning models to predict student academic success and provide personalized recommendations
          </p>
        </div>

        <Tabs defaultValue="prediction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prediction">Make Prediction</TabsTrigger>
            <TabsTrigger value="analytics">Model Analytics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="prediction" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Profile
                  </CardTitle>
                  <CardDescription>
                    Enter student information to predict academic success
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadSampleProfile('high-risk')}
                    >
                      High Risk
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadSampleProfile('average')}
                    >
                      Average
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadSampleProfile('high-potential')}
                    >
                      High Potential
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={profile.age}
                        onChange={(e) => updateProfile('age', parseInt(e.target.value) || 0)}
                        min="16"
                        max="30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={profile.gender.toString()} onValueChange={(value) => updateProfile('gender', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Female</SelectItem>
                          <SelectItem value="1">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gpa">High School GPA</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.1"
                      value={profile.high_school_gpa}
                      onChange={(e) => updateProfile('high_school_gpa', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="study-hours">Study Hours/Week</Label>
                      <Input
                        id="study-hours"
                        type="number"
                        value={profile.study_hours_per_week}
                        onChange={(e) => updateProfile('study_hours_per_week', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="attendance">Attendance Rate (%)</Label>
                      <Input
                        id="attendance"
                        type="number"
                        value={profile.attendance_rate}
                        onChange={(e) => updateProfile('attendance_rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="math">Math Grade</Label>
                      <Input
                        id="math"
                        type="number"
                        value={profile.math_grade}
                        onChange={(e) => updateProfile('math_grade', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="english">English Grade</Label>
                      <Input
                        id="english"
                        type="number"
                        value={profile.english_grade}
                        onChange={(e) => updateProfile('english_grade', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="science">Science Grade</Label>
                      <Input
                        id="science"
                        type="number"
                        value={profile.science_grade}
                        onChange={(e) => updateProfile('science_grade', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="family-income">Family Income</Label>
                      <Select value={profile.family_income.toString()} onValueChange={(value) => updateProfile('family_income', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Low</SelectItem>
                          <SelectItem value="1">Medium</SelectItem>
                          <SelectItem value="2">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="parent-education">Parent Education</Label>
                      <Select value={profile.parent_education.toString()} onValueChange={(value) => updateProfile('parent_education', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">High School</SelectItem>
                          <SelectItem value="1">Bachelor</SelectItem>
                          <SelectItem value="2">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="extracurricular">Extracurricular Activities</Label>
                      <Input
                        id="extracurricular"
                        type="number"
                        value={profile.extracurricular_activities}
                        onChange={(e) => updateProfile('extracurricular_activities', parseInt(e.target.value) || 0)}
                        min="0"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="part-time">Part-time Job</Label>
                      <Select value={profile.part_time_job.toString()} onValueChange={(value) => updateProfile('part_time_job', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stress">Stress Level (1-10)</Label>
                      <Input
                        id="stress"
                        type="number"
                        value={profile.stress_level}
                        onChange={(e) => updateProfile('stress_level', parseInt(e.target.value) || 0)}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="support">Social Support (1-10)</Label>
                      <Input
                        id="support"
                        type="number"
                        value={profile.social_support}
                        onChange={(e) => updateProfile('social_support', parseInt(e.target.value) || 0)}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="computer">Has Computer</Label>
                      <Select value={profile.has_computer.toString()} onValueChange={(value) => updateProfile('has_computer', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="internet">Internet Quality</Label>
                      <Select value={profile.internet_quality.toString()} onValueChange={(value) => updateProfile('internet_quality', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Poor</SelectItem>
                          <SelectItem value="1">Good</SelectItem>
                          <SelectItem value="2">Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={predictSuccess} 
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? "Analyzing..." : "Predict Success"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-6">
                {/* Profile Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Overview</CardTitle>
                    <CardDescription>Student performance metrics (scaled to 100%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartsLoaded ? (
                      <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                            <XAxis 
                              dataKey="name" 
                              angle={-45} 
                              textAnchor="end" 
                              height={80}
                              fontSize={12}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              domain={[0, 100]}
                              fontSize={12}
                              stroke="#6b7280"
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px'
                              }}
                              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
                            />
                            <Bar 
                              dataKey="value" 
                              fill="#3b82f6"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <SimpleBarChart data={chartData} />
                    )}
                  </CardContent>
                </Card>

                {/* Prediction Results */}
                {prediction && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Prediction Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className={`text-6xl font-bold mb-2 ${prediction.prediction ? 'text-green-600' : 'text-red-600'}`}>
                          {(prediction.success_probability * 100).toFixed(1)}%
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          {prediction.prediction ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className="text-lg font-medium">
                            {prediction.prediction ? 'Likely to Succeed' : 'At Risk'}
                          </span>
                        </div>
                        <Badge variant={prediction.prediction ? 'default' : 'destructive'} className="mt-2">
                          Confidence: {(prediction.confidence * 100).toFixed(1)}%
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-600">Risk Factors:</h4>
                        {prediction.risk_factors.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {prediction.risk_factors.map((factor, index) => (
                              <li key={index} className="text-sm text-gray-600">{factor}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-green-600">No significant risk factors identified</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-600">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {prediction.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-600">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{((modelStats?.accuracy || 0) * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Precision</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{((modelStats?.precision || 0) * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    True positive rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recall</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{((modelStats?.recall || 0) * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Sensitivity measure
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{((modelStats?.f1_score || 0) * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Harmonic mean
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Success Distribution</CardTitle>
                  <CardDescription>
                    Distribution of successful vs at-risk students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {chartsLoaded ? (
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [value, 'Students']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <SimplePieChart data={pieData} />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>
                    Key performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span>{((modelStats?.accuracy || 0) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(modelStats?.accuracy || 0) * 100} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Precision</span>
                      <span>{((modelStats?.precision || 0) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(modelStats?.precision || 0) * 100} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Recall</span>
                      <span>{((modelStats?.recall || 0) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(modelStats?.recall || 0) * 100} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>F1 Score</span>
                      <span>{((modelStats?.f1_score || 0) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(modelStats?.f1_score || 0) * 100} className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Success Factors</CardTitle>
                  <CardDescription>
                    Most important factors for student success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">High School GPA</span>
                      <Badge>25% Impact</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Course Grades</span>
                      <Badge>20% Impact</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Study Hours</span>
                      <Badge>20% Impact</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Attendance Rate</span>
                      <Badge>15% Impact</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Social Support</span>
                      <Badge>10% Impact</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Other Factors</span>
                      <Badge>10% Impact</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Intervention Strategies</CardTitle>
                  <CardDescription>
                    Evidence-based recommendations for at-risk students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Academic Support:</strong> Students with GPA below 3.0 benefit from tutoring programs and study skills workshops.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Attendance Monitoring:</strong> Early intervention for students with attendance below 80% can improve outcomes by 15%.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Stress Management:</strong> Counseling services for high-stress students (level 7+) show significant improvement in retention.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Technology Access:</strong> Providing computer access increases success probability by 5-8% for disadvantaged students.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Model Insights</CardTitle>
                <CardDescription>
                  Understanding the prediction model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Random Forest</h3>
                    <p className="text-sm text-gray-600">
                      Primary model using ensemble learning with 100 decision trees. 
                      Excellent for handling mixed data types and providing feature importance.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Logistic Regression</h3>
                    <p className="text-sm text-gray-600">
                      Linear model providing interpretable coefficients and probability estimates. 
                      Good baseline for understanding feature relationships.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Support Vector Machine</h3>
                    <p className="text-sm text-gray-600">
                      Non-linear model with RBF kernel for complex pattern recognition. 
                      Effective for high-dimensional feature spaces.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
