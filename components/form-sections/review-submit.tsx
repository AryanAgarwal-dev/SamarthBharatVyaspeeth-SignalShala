"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface ReviewSubmitProps {
  data: any
  onUpdate: (data: any) => void
}

export function ReviewSubmit({ data, onUpdate }: ReviewSubmitProps) {
  const [formData, setFormData] = useState({
    certifications: data?.certifications || {
      dataAccuracy: false,
      documentAuthenticity: false,
      legalCompliance: false,
      informationConsent: false
    },
    additionalComments: data?.additionalComments || "",
    submissionDate: data?.submissionDate || new Date().toISOString().split('T')[0]
  })

  const handleCertificationChange = (field: string, checked: boolean) => {
    const updatedCertifications = { ...formData.certifications, [field]: checked }
    const updatedData = { ...formData, certifications: updatedCertifications }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleSubmit = () => {
    console.log("Submitting form data:", data)
    alert("Application submitted successfully! You will receive a confirmation email shortly.")
  }

  const allCertificationsChecked = Object.values(formData.certifications).every(Boolean)

  const sectionStatus = {
    organizationProfile: { completed: true, required: true },
    legalStatus: { completed: true, required: true },
    thirdPartyEndorsements: { completed: false, required: false },
    governanceElements: { completed: true, required: true },
    financialInformation: { completed: true, required: true },
    projectDetails: { completed: true, required: true },
    riskManagement: { completed: false, required: true }
  }

  const completedSections = Object.values(sectionStatus).filter(s => s.completed).length
  const totalSections = Object.keys(sectionStatus).length
  const requiredSections = Object.values(sectionStatus).filter(s => s.required)
  const completedRequiredSections = requiredSections.filter(s => s.completed).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Application Progress</span>
          </CardTitle>
          <CardDescription>
            Review your application completion status before submission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant={completedSections === totalSections ? "default" : "secondary"}>
              {completedSections}/{totalSections} Sections Complete
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Required Sections Completed</span>
            <Badge variant={completedRequiredSections === requiredSections.length ? "default" : "secondary"}>
              {completedRequiredSections}/{requiredSections.length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}