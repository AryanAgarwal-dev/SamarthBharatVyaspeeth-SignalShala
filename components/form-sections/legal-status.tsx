"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"

interface LegalStatusProps {
  data: any
  onUpdate: (data: any) => void
}

const registrationTypes = [
  { id: "societies", label: "Societies Registration Certificate as per Societies Registration Act, 1860" },
  { id: "publicTrust", label: "Public Trust Certificate as per Indian Trusts Act, 1882" },
  { id: "privateTrust", label: "Private Trust Certificate as per Indian Trusts Act, 1882" },
  { id: "section8", label: "Non-Profit Company as per Section 8, Companies Act, 2013" },
  { id: "cooperative", label: "Co-operative Society as per Cooperative Credit Societies Act, 1904" },
  { id: "multiState", label: "Certificate of Incorporate as per The Multi-State Co-operative Societies Act, 2002" },
  { id: "trustDeed", label: "Trust Deed with the Local Registrar under the Indian Trusts Act, 1882" },
  { id: "memorandum", label: "Memorandum of Association as per Societies Registration Act, 1860" },
  { id: "incorporation", label: "Certificate of Incorporation from the Regional Director" },
]

const taxRegistrations = [
  { id: "pan", label: "Income Tax Permanent Account No. (PAN)" },
  { id: "tan", label: "Tax Deduction Account No. (TAN)" },
  { id: "fcra", label: "FCRA" },
  { id: "12a", label: "12A" },
  { id: "80g", label: "80G" },
]

export function LegalStatus({ data, onUpdate }: LegalStatusProps) {
  const [formData, setFormData] = useState({
    registrations: data?.registrations || {},
    taxRegistrations: data?.taxRegistrations || {},
    uploadedDocuments: data?.uploadedDocuments || [],
  })

  const handleRegistrationChange = (id: string, field: string, value: string) => {
    const updatedRegistrations = {
      ...formData.registrations,
      [id]: {
        ...formData.registrations[id],
        [field]: value,
      },
    }
    const updatedData = { ...formData, registrations: updatedRegistrations }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleTaxRegistrationChange = (id: string, field: string, value: string) => {
    const updatedTaxRegistrations = {
      ...formData.taxRegistrations,
      [id]: {
        ...formData.taxRegistrations[id],
        [field]: value,
      },
    }
    const updatedData = { ...formData, taxRegistrations: updatedTaxRegistrations }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newDocuments = Array.from(files).map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
      }))
      const updatedDocuments = [...formData.uploadedDocuments, ...newDocuments]
      const updatedData = { ...formData, uploadedDocuments: updatedDocuments }
      setFormData(updatedData)
      onUpdate(updatedData)
    }
  }

  const removeDocument = (id: number) => {
    const updatedDocuments = formData.uploadedDocuments.filter((doc: any) => doc.id !== id)
    const updatedData = { ...formData, uploadedDocuments: updatedDocuments }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
          <CardDescription>Provide details of your organization's legal registrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {registrationTypes.map((type) => (
            <div key={type.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={!!formData.registrations[type.id]?.applicable}
                  onCheckedChange={(checked) => handleRegistrationChange(type.id, "applicable", checked ? "true" : "")}
                />
                <Label htmlFor={type.id} className="text-sm font-medium">
                  {type.label}
                </Label>
              </div>

              {formData.registrations[type.id]?.applicable && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                  <div className="space-y-2">
                    <Label>Date of Registration</Label>
                    <Input
                      type="date"
                      value={formData.registrations[type.id]?.dateOfRegistration || ""}
                      onChange={(e) => handleRegistrationChange(type.id, "dateOfRegistration", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input
                      value={formData.registrations[type.id]?.registrationNumber || ""}
                      onChange={(e) => handleRegistrationChange(type.id, "registrationNumber", e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Validity</Label>
                    <Select onValueChange={(value) => handleRegistrationChange(type.id, "validity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select validity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Registrations</CardTitle>
          <CardDescription>Provide details of tax-related registrations and certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {taxRegistrations.map((tax) => (
            <div key={tax.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={tax.id}
                  checked={!!formData.taxRegistrations[tax.id]?.applicable}
                  onCheckedChange={(checked) =>
                    handleTaxRegistrationChange(tax.id, "applicable", checked ? "true" : "")
                  }
                />
                <Label htmlFor={tax.id} className="text-sm font-medium">
                  {tax.label}
                </Label>
              </div>

              {formData.taxRegistrations[tax.id]?.applicable && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                  <div className="space-y-2">
                    <Label>Date of Registration</Label>
                    <Input
                      type="date"
                      value={formData.taxRegistrations[tax.id]?.dateOfRegistration || ""}
                      onChange={(e) => handleTaxRegistrationChange(tax.id, "dateOfRegistration", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input
                      value={formData.taxRegistrations[tax.id]?.registrationNumber || ""}
                      onChange={(e) => handleTaxRegistrationChange(tax.id, "registrationNumber", e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Validity</Label>
                    <Select onValueChange={(value) => handleTaxRegistrationChange(tax.id, "validity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select validity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>Upload all required legal and registration documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
            <Button variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Files
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
          </div>

          {formData.uploadedDocuments.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Documents</Label>
              <div className="space-y-2">
                {formData.uploadedDocuments.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeDocument(doc.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
