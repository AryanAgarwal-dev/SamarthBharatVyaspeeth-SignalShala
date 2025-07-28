"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, DollarSign, TrendingUp, FileText } from "lucide-react"

interface FinancialInformationProps {
  data: any
  onUpdate: (data: any) => void
}

export function FinancialInformation({ data, onUpdate }: FinancialInformationProps) {
  const [formData, setFormData] = useState({
    fundingSources: data?.fundingSources || {
      corporate: false,
      foundation: false,
      individual: false,
      others: false,
      othersSpecify: "",
    },
    topDonors: data?.topDonors || [],
    externalAudit: data?.externalAudit || "",
    auditorDetails: data?.auditorDetails || {
      internalAuditor: "",
      externalAuditor: "",
      internalAuditorContact: "",
      externalAuditorContact: "",
    },
    averageInflow: data?.averageInflow || "",
    programExpenditure: data?.programExpenditure || [],
  })

  const handleFundingSourceChange = (source: string, checked: boolean) => {
    const updatedFundingSources = { ...formData.fundingSources, [source]: checked }
    const updatedData = { ...formData, fundingSources: updatedFundingSources }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addTopDonor = () => {
    const newDonor = {
      id: Date.now(),
      year: "",
      name: "",
      contactDetails: "",
      amount: "",
    }
    const updatedTopDonors = [...formData.topDonors, newDonor]
    const updatedData = { ...formData, topDonors: updatedTopDonors }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeTopDonor = (id: number) => {
    const updatedTopDonors = formData.topDonors.filter((donor: any) => donor.id !== id)
    const updatedData = { ...formData, topDonors: updatedTopDonors }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateTopDonor = (id: number, field: string, value: string) => {
    const updatedTopDonors = formData.topDonors.map((donor: any) =>
      donor.id === id ? { ...donor, [field]: value } : donor,
    )
    const updatedData = { ...formData, topDonors: updatedTopDonors }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addProgramExpenditure = () => {
    const newProgram = {
      id: Date.now(),
      programName: "",
      year1Amount: "",
      year1Percentage: "",
      year2Amount: "",
      year2Percentage: "",
      year3Amount: "",
      year3Percentage: "",
    }
    const updatedProgramExpenditure = [...formData.programExpenditure, newProgram]
    const updatedData = { ...formData, programExpenditure: updatedProgramExpenditure }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeProgramExpenditure = (id: number) => {
    const updatedProgramExpenditure = formData.programExpenditure.filter((program: any) => program.id !== id)
    const updatedData = { ...formData, programExpenditure: updatedProgramExpenditure }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateProgramExpenditure = (id: number, field: string, value: string) => {
    const updatedProgramExpenditure = formData.programExpenditure.map((program: any) =>
      program.id === id ? { ...program, [field]: value } : program,
    )
    const updatedData = { ...formData, programExpenditure: updatedProgramExpenditure }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Primary Sources of Funding</span>
          </CardTitle>
          <CardDescription>Rank the primary sources of funding in the last three years</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { key: "corporate", label: "Corporate" },
              { key: "foundation", label: "Foundation / Trust" },
              { key: "individual", label: "Individual" },
            ].map((source) => (
              <div key={source.key} className="flex items-center space-x-2">
                <Checkbox
                  id={source.key}
                  checked={formData.fundingSources[source.key]}
                  onCheckedChange={(checked) => handleFundingSourceChange(source.key, !!checked)}
                />
                <Label htmlFor={source.key}>{source.label}</Label>
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="others"
                checked={formData.fundingSources.others}
                onCheckedChange={(checked) => handleFundingSourceChange("others", !!checked)}
              />
              <Label htmlFor="others">Others</Label>
            </div>

            {formData.fundingSources.others && (
              <div className="ml-6 space-y-2">
                <Label>Please specify</Label>
                <Input
                  value={formData.fundingSources.othersSpecify}
                  onChange={(e) => {
                    const updatedFundingSources = { ...formData.fundingSources, othersSpecify: e.target.value }
                    const updatedData = { ...formData, fundingSources: updatedFundingSources }
                    setFormData(updatedData)
                    onUpdate(updatedData)
                  }}
                  placeholder="Specify other funding sources"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Top Donors (Last 3 Years)</span>
          </CardTitle>
          <CardDescription>Provide details of your top 3 donors in the last 3 years</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.topDonors.map((donor: any, index: number) => (
            <div key={donor.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Donor {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeTopDonor(donor.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Year *</Label>
                  <Select onValueChange={(value) => updateTopDonor(donor.id, "year", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (in INR) *</Label>
                  <Input
                    type="number"
                    value={donor.amount}
                    onChange={(e) => updateTopDonor(donor.id, "amount", e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Name of Donor/Organization *</Label>
                <Input
                  value={donor.name}
                  onChange={(e) => updateTopDonor(donor.id, "name", e.target.value)}
                  placeholder="Enter donor name or organization"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Details</Label>
                <Textarea
                  value={donor.contactDetails}
                  onChange={(e) => updateTopDonor(donor.id, "contactDetails", e.target.value)}
                  placeholder="Enter contact details (phone, email, address)"
                  className="min-h-[60px]"
                />
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addTopDonor} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Top Donor
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Audit Information</span>
          </CardTitle>
          <CardDescription>Provide details about your organization's audit practices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Do you conduct an external audit on an annual basis? *</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="externalAudit"
                  value="yes"
                  checked={formData.externalAudit === "yes"}
                  onChange={(e) => {
                    const updatedData = { ...formData, externalAudit: e.target.value }
                    setFormData(updatedData)
                    onUpdate(updatedData)
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="externalAudit"
                  value="no"
                  checked={formData.externalAudit === "no"}
                  onChange={(e) => {
                    const updatedData = { ...formData, externalAudit: e.target.value }
                    setFormData(updatedData)
                    onUpdate(updatedData)
                  }}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Internal Auditor Details</Label>
              <Input
                value={formData.auditorDetails.internalAuditor}
                onChange={(e) => {
                  const updatedAuditorDetails = { ...formData.auditorDetails, internalAuditor: e.target.value }
                  const updatedData = { ...formData, auditorDetails: updatedAuditorDetails }
                  setFormData(updatedData)
                  onUpdate(updatedData)
                }}
                placeholder="Name and firm"
              />
            </div>
            <div className="space-y-2">
              <Label>External Auditor Details</Label>
              <Input
                value={formData.auditorDetails.externalAuditor}
                onChange={(e) => {
                  const updatedAuditorDetails = { ...formData.auditorDetails, externalAuditor: e.target.value }
                  const updatedData = { ...formData, auditorDetails: updatedAuditorDetails }
                  setFormData(updatedData)
                  onUpdate(updatedData)
                }}
                placeholder="Name and firm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Internal Auditor Contact</Label>
              <Textarea
                value={formData.auditorDetails.internalAuditorContact}
                onChange={(e) => {
                  const updatedAuditorDetails = { ...formData.auditorDetails, internalAuditorContact: e.target.value }
                  const updatedData = { ...formData, auditorDetails: updatedAuditorDetails }
                  setFormData(updatedData)
                  onUpdate(updatedData)
                }}
                placeholder="Phone, email, address"
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label>External Auditor Contact</Label>
              <Textarea
                value={formData.auditorDetails.externalAuditorContact}
                onChange={(e) => {
                  const updatedAuditorDetails = { ...formData.auditorDetails, externalAuditorContact: e.target.value }
                  const updatedData = { ...formData, auditorDetails: updatedAuditorDetails }
                  setFormData(updatedData)
                  onUpdate(updatedData)
                }}
                placeholder="Phone, email, address"
                className="min-h-[60px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Grant Inflow</CardTitle>
          <CardDescription>Select the average amount of grant inflow in the last three years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Average Grant Inflow (Last 3 Years) *</Label>
            <Select
              onValueChange={(value) => {
                const updatedData = { ...formData, averageInflow: value }
                setFormData(updatedData)
                onUpdate(updatedData)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select average inflow range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-1-lakh">Less than INR 1,00,000</SelectItem>
                <SelectItem value="1-to-5-lakh">INR 1,00,000 – 5,00,000</SelectItem>
                <SelectItem value="5-to-15-lakh">INR 5,00,000 – 15,00,000</SelectItem>
                <SelectItem value="15-to-50-lakh">INR 15,00,000 – 50,00,000</SelectItem>
                <SelectItem value="greater-than-50-lakh">Greater than INR 50,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Program Expenditure (Last 3 Years)</CardTitle>
          <CardDescription>Allocation of funds/budget across different programs of the organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.programExpenditure.map((program: any, index: number) => (
            <div key={program.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Program {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeProgramExpenditure(program.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Program Name *</Label>
                <Input
                  value={program.programName}
                  onChange={(e) => updateProgramExpenditure(program.id, "programName", e.target.value)}
                  placeholder="Enter program name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <h5 className="font-medium text-center">Year 1</h5>
                  <div className="space-y-2">
                    <Label>Amount (INR Lakhs)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={program.year1Amount}
                      onChange={(e) => updateProgramExpenditure(program.id, "year1Amount", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Percentage (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={program.year1Percentage}
                      onChange={(e) => updateProgramExpenditure(program.id, "year1Percentage", e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-medium text-center">Year 2</h5>
                  <div className="space-y-2">
                    <Label>Amount (INR Lakhs)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={program.year2Amount}
                      onChange={(e) => updateProgramExpenditure(program.id, "year2Amount", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Percentage (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={program.year2Percentage}
                      onChange={(e) => updateProgramExpenditure(program.id, "year2Percentage", e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-medium text-center">Year 3</h5>
                  <div className="space-y-2">
                    <Label>Amount (INR Lakhs)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={program.year3Amount}
                      onChange={(e) => updateProgramExpenditure(program.id, "year3Amount", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Percentage (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="100"
                      value={program.year3Percentage}
                      onChange={(e) => updateProgramExpenditure(program.id, "year3Percentage", e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addProgramExpenditure} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}