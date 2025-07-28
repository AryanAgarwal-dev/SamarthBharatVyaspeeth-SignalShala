"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react"
import { OrganizationProfile } from "@/components/form-sections/organization-profile"
import { LegalStatus } from "@/components/form-sections/legal-status"
import { ThirdPartyEndorsements } from "@/components/form-sections/third-party-endorsements"
import { GovernanceElements } from "@/components/form-sections/governance-elements"
import { FinancialInformation } from "@/components/form-sections/financial-information"
import { ProjectDetails } from "@/components/form-sections/project-details"
import { RiskManagement } from "@/components/form-sections/risk-management"
import { ReviewSubmit } from "@/components/form-sections/review-submit"

const formSections = [
  { id: 1, title: "Organization Profile", component: OrganizationProfile },
  { id: 2, title: "Legal Status & Compliances", component: LegalStatus },
  { id: 3, title: "Third Party Endorsements", component: ThirdPartyEndorsements },
  { id: 4, title: "Governance Elements", component: GovernanceElements },
  { id: 5, title: "Financial Information", component: FinancialInformation },
  { id: 6, title: "Project Details", component: ProjectDetails },
  { id: 7, title: "Risk Management", component: RiskManagement },
  { id: 8, title: "Review & Submit", component: ReviewSubmit },
]

export default function DueDiligenceForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [savedSections, setSavedSections] = useState<number[]>([])

  const progress = (currentStep / formSections.length) * 100
  const CurrentComponent = formSections[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < formSections.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    setSavedSections([...savedSections, currentStep])
    // Here you would typically save to a backend
    console.log("Saving section:", currentStep, formData)
  }

  const updateFormData = (sectionData: any) => {
    setFormData({ ...formData, ...sectionData })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </a>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Due Diligence Form</h1>
                <p className="text-sm text-gray-600">
                  Step {currentStep} of {formSections.length}: {formSections[currentStep - 1].title}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={savedSections.includes(currentStep) ? "default" : "secondary"}>
                {savedSections.includes(currentStep) ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Saved
                  </>
                ) : (
                  "Unsaved"
                )}
              </Badge>
              <Button onClick={handleSave} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {formSections[currentStep - 1].title}
                <Badge variant="outline">
                  {currentStep}/{formSections.length}
                </Badge>
              </CardTitle>
              <CardDescription>Please fill out all required fields in this section before proceeding.</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrentComponent data={formData} onUpdate={updateFormData} />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrevious} disabled={currentStep === 1} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button onClick={handleSave} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save & Continue Later
              </Button>

              {currentStep < formSections.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                  Submit Application
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
