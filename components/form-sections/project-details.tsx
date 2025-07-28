"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, MapPin, Users, Calendar, BarChart3, DollarSign } from "lucide-react"

interface ProjectDetailsProps {
  data: any
  onUpdate: (data: any) => void
}

export function ProjectDetails({ data, onUpdate }: ProjectDetailsProps) {
  const [formData, setFormData] = useState({
    projectName: data?.projectName || "",
    briefSummary: data?.briefSummary || "",
    problemStatement: data?.problemStatement || "",
    objectives: data?.objectives || "",
    geographicalArea: data?.geographicalArea || "",
    expectedBeneficiaries: data?.expectedBeneficiaries || "",
    projectDuration: data?.projectDuration || "",
    monitoringMechanism: data?.monitoringMechanism || "",
    volunteerEngagement: data?.volunteerEngagement || "",
    budget: data?.budget || "",
  })

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Project Overview</span>
          </CardTitle>
          <CardDescription>
            Provide basic information about the project for which funding support is sought
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project/Proposed Project Name *</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
              placeholder="Enter the project name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="briefSummary">Brief Summary of Project *</Label>
            <Textarea
              id="briefSummary"
              value={formData.briefSummary}
              onChange={(e) => handleChange("briefSummary", e.target.value)}
              placeholder="Provide a concise summary of the project including its main goals and activities"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemStatement">Problem Statement *</Label>
            <Textarea
              id="problemStatement"
              value={formData.problemStatement}
              onChange={(e) => handleChange("problemStatement", e.target.value)}
              placeholder="Clearly describe the problem or issue that this project aims to address"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Objectives *</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => handleChange("objectives", e.target.value)}
              placeholder="List the specific, measurable objectives of the project"
              className="min-h-[100px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Project Scope & Coverage</span>
          </CardTitle>
          <CardDescription>Define the geographical and demographic scope of your project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="geographicalArea">Geographical Area/Coverage *</Label>
            <Textarea
              id="geographicalArea"
              value={formData.geographicalArea}
              onChange={(e) => handleChange("geographicalArea", e.target.value)}
              placeholder="Specify the geographical areas where the project will be implemented (states, districts, villages, etc.)"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedBeneficiaries">Expected Number of Beneficiaries and Outcomes *</Label>
            <Textarea
              id="expectedBeneficiaries"
              value={formData.expectedBeneficiaries}
              onChange={(e) => handleChange("expectedBeneficiaries", e.target.value)}
              placeholder="Describe the target beneficiaries (demographics, numbers) and expected outcomes/impact"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDuration">Project Duration *</Label>
            <Input
              id="projectDuration"
              value={formData.projectDuration}
              onChange={(e) => handleChange("projectDuration", e.target.value)}
              placeholder="e.g., 12 months, 2 years, etc."
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Implementation & Monitoring</span>
          </CardTitle>
          <CardDescription>Describe how the project will be monitored and implemented</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monitoringMechanism">Monitoring and Reporting Mechanism *</Label>
            <Textarea
              id="monitoringMechanism"
              value={formData.monitoringMechanism}
              onChange={(e) => handleChange("monitoringMechanism", e.target.value)}
              placeholder="Describe the monitoring framework, key performance indicators, reporting schedule, and evaluation methods"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="volunteerEngagement">Volunteer Engagement *</Label>
            <Textarea
              id="volunteerEngagement"
              value={formData.volunteerEngagement}
              onChange={(e) => handleChange("volunteerEngagement", e.target.value)}
              placeholder="Describe how volunteers will be engaged in the project, their roles, and expected contribution"
              className="min-h-[100px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <span>Project Budget</span>
          </CardTitle>
          <CardDescription>Provide detailed budget information for the project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Details *</Label>
            <Textarea
              id="budget"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              placeholder="Provide detailed budget breakdown including personnel costs, program costs, administrative expenses, etc. You may attach a separate budget sheet as well."
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Please attach a detailed budget sheet as a separate document with line-item
              breakdowns, including personnel costs, program expenses, administrative costs, and any other relevant
              budget categories.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
          <CardDescription>Review the key details of your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Project Name:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{formData.projectName || "Not specified"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="font-medium">Duration:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{formData.projectDuration || "Not specified"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Coverage:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {formData.geographicalArea
                  ? formData.geographicalArea.length > 50
                    ? formData.geographicalArea.substring(0, 50) + "..."
                    : formData.geographicalArea
                  : "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Beneficiaries:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {formData.expectedBeneficiaries
                  ? formData.expectedBeneficiaries.length > 50
                    ? formData.expectedBeneficiaries.substring(0, 50) + "..."
                    : formData.expectedBeneficiaries
                  : "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
