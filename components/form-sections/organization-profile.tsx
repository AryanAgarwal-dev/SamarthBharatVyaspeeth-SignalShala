"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OrganizationProfileProps {
  data: any
  onUpdate: (data: any) => void
}

export function OrganizationProfile({ data, onUpdate }: OrganizationProfileProps) {
  const [formData, setFormData] = useState({
    organizationName: data?.organizationName || "",
    acronym: data?.acronym || "",
    natureOfOrganization: data?.natureOfOrganization || "",
    vision: data?.vision || "",
    issuesOfFocus: data?.issuesOfFocus || "",
    areaOfFocus: data?.areaOfFocus || "",
    dateOfEstablishment: data?.dateOfEstablishment || "",
    registeredAddress: data?.registeredAddress || "",
    contactNumber: data?.contactNumber || "",
    numberOfOffices: data?.numberOfOffices || "",
    websiteUrl: data?.websiteUrl || "",
    concernedPerson: data?.concernedPerson || "",
    concernedPersonDesignation: data?.concernedPersonDesignation || "",
    concernedPersonEmail: data?.concernedPersonEmail || "",
    concernedPersonMobile: data?.concernedPersonMobile || "",
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
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide basic details about your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="Enter organization name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acronym">Acronym (if any)</Label>
              <Input
                id="acronym"
                value={formData.acronym}
                onChange={(e) => handleChange("acronym", e.target.value)}
                placeholder="Enter acronym"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="natureOfOrganization">Nature of Organization *</Label>
            <Select onValueChange={(value) => handleChange("natureOfOrganization", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select nature of organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ngo">Non-Governmental Organization</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
                <SelectItem value="society">Society</SelectItem>
                <SelectItem value="foundation">Foundation</SelectItem>
                <SelectItem value="cooperative">Cooperative Society</SelectItem>
                <SelectItem value="company">Section 8 Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vision">Vision/Mission and Core Value Statement *</Label>
            <Textarea
              id="vision"
              value={formData.vision}
              onChange={(e) => handleChange("vision", e.target.value)}
              placeholder="Describe your organization's vision, mission, and core values"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issuesOfFocus">Issues of Focus *</Label>
              <Textarea
                id="issuesOfFocus"
                value={formData.issuesOfFocus}
                onChange={(e) => handleChange("issuesOfFocus", e.target.value)}
                placeholder="List the main issues your organization focuses on"
                className="min-h-[80px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="areaOfFocus">Area of Focus *</Label>
              <Textarea
                id="areaOfFocus"
                value={formData.areaOfFocus}
                onChange={(e) => handleChange("areaOfFocus", e.target.value)}
                placeholder="Describe your geographical or thematic areas of focus"
                className="min-h-[80px]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfEstablishment">Date of Establishment *</Label>
            <Input
              id="dateOfEstablishment"
              type="date"
              value={formData.dateOfEstablishment}
              onChange={(e) => handleChange("dateOfEstablishment", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Provide contact details and office information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registeredAddress">Registered Address *</Label>
            <Textarea
              id="registeredAddress"
              value={formData.registeredAddress}
              onChange={(e) => handleChange("registeredAddress", e.target.value)}
              placeholder="Enter complete registered address"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number (with STD Code) *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="e.g., 011-12345678"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleChange("websiteUrl", e.target.value)}
                placeholder="https://www.example.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfOffices">Number of Offices (list locations) *</Label>
            <Textarea
              id="numberOfOffices"
              value={formData.numberOfOffices}
              onChange={(e) => handleChange("numberOfOffices", e.target.value)}
              placeholder="List all office locations with addresses"
              className="min-h-[80px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Primary Contact Person</CardTitle>
          <CardDescription>Details of the main contact person for this application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="concernedPerson">Name *</Label>
              <Input
                id="concernedPerson"
                value={formData.concernedPerson}
                onChange={(e) => handleChange("concernedPerson", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concernedPersonDesignation">Designation *</Label>
              <Input
                id="concernedPersonDesignation"
                value={formData.concernedPersonDesignation}
                onChange={(e) => handleChange("concernedPersonDesignation", e.target.value)}
                placeholder="Enter designation"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="concernedPersonEmail">Email *</Label>
              <Input
                id="concernedPersonEmail"
                type="email"
                value={formData.concernedPersonEmail}
                onChange={(e) => handleChange("concernedPersonEmail", e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concernedPersonMobile">Mobile *</Label>
              <Input
                id="concernedPersonMobile"
                type="tel"
                value={formData.concernedPersonMobile}
                onChange={(e) => handleChange("concernedPersonMobile", e.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
