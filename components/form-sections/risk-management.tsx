"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, AlertTriangle, Scale, FileX } from "lucide-react"

interface RiskManagementProps {
  data: any
  onUpdate: (data: any) => void
}

const predefinedRisks = [
  "Interference from politicians",
  "Interference / lack of cooperation from local administration",
  "Interference / lack of cooperation from local government",
  "Too much monitoring from funding agencies",
  "Lack of cooperation / involvement of funding agencies",
  "Resistance from communities / intended beneficiaries",
  "Lack of funds for projects",
  "Shortage of skilled manpower",
]

export function RiskManagement({ data, onUpdate }: RiskManagementProps) {
  const [formData, setFormData] = useState({
    riskAssessment: data?.riskAssessment || {},
    customRisks: data?.customRisks || [],
    finesAndPenalties: data?.finesAndPenalties || [],
    legalCases: data?.legalCases || [],
  })

  const handleRiskAssessment = (risk: string, level: string) => {
    const updatedRiskAssessment = { ...formData.riskAssessment, [risk]: level }
    const updatedData = { ...formData, riskAssessment: updatedRiskAssessment }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addCustomRisk = () => {
    const newRisk = {
      id: Date.now(),
      description: "",
      level: "",
    }
    const updatedCustomRisks = [...formData.customRisks, newRisk]
    const updatedData = { ...formData, customRisks: updatedCustomRisks }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeCustomRisk = (id: number) => {
    const updatedCustomRisks = formData.customRisks.filter((risk: any) => risk.id !== id)
    const updatedData = { ...formData, customRisks: updatedCustomRisks }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateCustomRisk = (id: number, field: string, value: string) => {
    const updatedCustomRisks = formData.customRisks.map((risk: any) =>
      risk.id === id ? { ...risk, [field]: value } : risk,
    )
    const updatedData = { ...formData, customRisks: updatedCustomRisks }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addFineOrPenalty = () => {
    const newItem = {
      id: Date.now(),
      caseEntity: "",
      financialLiability: "",
      nonFinancialLiability: "",
    }
    const updatedFinesAndPenalties = [...formData.finesAndPenalties, newItem]
    const updatedData = { ...formData, finesAndPenalties: updatedFinesAndPenalties }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeFineOrPenalty = (id: number) => {
    const updatedFinesAndPenalties = formData.finesAndPenalties.filter((item: any) => item.id !== id)
    const updatedData = { ...formData, finesAndPenalties: updatedFinesAndPenalties }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateFineOrPenalty = (id: number, field: string, value: string) => {
    const updatedFinesAndPenalties = formData.finesAndPenalties.map((item: any) =>
      item.id === id ? { ...item, [field]: value } : item,
    )
    const updatedData = { ...formData, finesAndPenalties: updatedFinesAndPenalties }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addLegalCase = () => {
    const newCase = {
      id: Date.now(),
      caseEntity: "",
      isOngoing: "",
      resolution: "",
    }
    const updatedLegalCases = [...formData.legalCases, newCase]
    const updatedData = { ...formData, legalCases: updatedLegalCases }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeLegalCase = (id: number) => {
    const updatedLegalCases = formData.legalCases.filter((case_: any) => case_.id !== id)
    const updatedData = { ...formData, legalCases: updatedLegalCases }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateLegalCase = (id: number, field: string, value: string) => {
    const updatedLegalCases = formData.legalCases.map((case_: any) =>
      case_.id === id ? { ...case_, [field]: value } : case_,
    )
    const updatedData = { ...formData, legalCases: updatedLegalCases }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Risk Assessment</span>
          </CardTitle>
          <CardDescription>
            Identify and score the risks that affect or are likely to affect smooth functioning/execution of your
            project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {predefinedRisks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">{risk}</Label>
                  {formData.riskAssessment[risk] && (
                    <Badge className={getRiskBadgeColor(formData.riskAssessment[risk])}>
                      {formData.riskAssessment[risk].charAt(0).toUpperCase() + formData.riskAssessment[risk].slice(1)}{" "}
                      Risk
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`risk-${index}`}
                      value="low"
                      checked={formData.riskAssessment[risk] === "low"}
                      onChange={(e) => handleRiskAssessment(risk, e.target.value)}
                    />
                    <span className="text-sm">Low Risk</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`risk-${index}`}
                      value="moderate"
                      checked={formData.riskAssessment[risk] === "moderate"}
                      onChange={(e) => handleRiskAssessment(risk, e.target.value)}
                    />
                    <span className="text-sm">Moderate Risk</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`risk-${index}`}
                      value="high"
                      checked={formData.riskAssessment[risk] === "high"}
                      onChange={(e) => handleRiskAssessment(risk, e.target.value)}
                    />
                    <span className="text-sm">High Risk</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Additional Risks</h4>
            {formData.customRisks.map((risk: any, index: number) => (
              <div key={risk.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Custom Risk {index + 1}</h5>
                  <Button variant="ghost" size="sm" onClick={() => removeCustomRisk(risk.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Risk Description *</Label>
                  <Input
                    value={risk.description}
                    onChange={(e) => updateCustomRisk(risk.id, "description", e.target.value)}
                    placeholder="Describe the additional risk"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Risk Level *</Label>
                  <Select onValueChange={(value) => updateCustomRisk(risk.id, "level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addCustomRisk} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Risk
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Risk Definitions:</strong>
              </p>
              <p>
                <strong>Low Risk:</strong> Does not affect projects/the organization
              </p>
              <p>
                <strong>Moderate Risk:</strong> Affects the organization or projects; usually managed without
                compromising project objectives or values
              </p>
              <p>
                <strong>High Risk:</strong> Risks project execution or existence of organization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-red-600" />
            <span>Fines and Penalties</span>
          </CardTitle>
          <CardDescription>
            Provide details of fines/penalties imposed by courts/regulators/stakeholders in the past five financial
            years
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.finesAndPenalties.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileX className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No fines or penalties to report</p>
              <p className="text-sm">Click "Add Fine/Penalty" if you have any to report</p>
            </div>
          )}

          {formData.finesAndPenalties.map((item: any, index: number) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Fine/Penalty {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeFineOrPenalty(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Case/Imposing Entity *</Label>
                <Input
                  value={item.caseEntity}
                  onChange={(e) => updateFineOrPenalty(item.id, "caseEntity", e.target.value)}
                  placeholder="Describe the case and the entity that imposed the fine/penalty"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Financial Liability (INR)</Label>
                  <Input
                    type="number"
                    value={item.financialLiability}
                    onChange={(e) => updateFineOrPenalty(item.id, "financialLiability", e.target.value)}
                    placeholder="Enter amount in INR"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Non-Financial Liability</Label>
                  <Input
                    value={item.nonFinancialLiability}
                    onChange={(e) => updateFineOrPenalty(item.id, "nonFinancialLiability", e.target.value)}
                    placeholder="e.g., suspension, cancellation of registration"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addFineOrPenalty} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Fine/Penalty
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-purple-600" />
            <span>Legal Cases</span>
          </CardTitle>
          <CardDescription>
            Provide details of cases in courts or with regulators in the past five financial years
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.legalCases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Scale className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No legal cases to report</p>
              <p className="text-sm">Click "Add Legal Case" if you have any to report</p>
            </div>
          )}

          {formData.legalCases.map((case_: any, index: number) => (
            <div key={case_.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Legal Case {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeLegalCase(case_.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Case/Imposing Entity *</Label>
                <Input
                  value={case_.caseEntity}
                  onChange={(e) => updateLegalCase(case_.id, "caseEntity", e.target.value)}
                  placeholder="Describe the case and the court/regulator"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Case Status *</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`status-${case_.id}`}
                      value="ongoing"
                      checked={case_.isOngoing === "ongoing"}
                      onChange={(e) => updateLegalCase(case_.id, "isOngoing", e.target.value)}
                    />
                    <span>On-going</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`status-${case_.id}`}
                      value="resolved"
                      checked={case_.isOngoing === "resolved"}
                      onChange={(e) => updateLegalCase(case_.id, "isOngoing", e.target.value)}
                    />
                    <span>Resolved</span>
                  </label>
                </div>
              </div>

              {case_.isOngoing === "resolved" && (
                <div className="space-y-2">
                  <Label>Resolution Details</Label>
                  <Textarea
                    value={case_.resolution}
                    onChange={(e) => updateLegalCase(case_.id, "resolution", e.target.value)}
                    placeholder="Provide details of the resolution and in whose favor"
                    className="min-h-[60px]"
                  />
                </div>
              )}
            </div>
          ))}

          <Button variant="outline" onClick={addLegalCase} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Legal Case
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
