"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Award, Star, Shield, Trophy } from "lucide-react"

interface ThirdPartyEndorsementsProps {
  data: any
  onUpdate: (data: any) => void
}

export function ThirdPartyEndorsements({ data, onUpdate }: ThirdPartyEndorsementsProps) {
  const [formData, setFormData] = useState({
    accreditations: data?.accreditations || [],
    ratings: data?.ratings || [],
    certifications: data?.certifications || [],
    awards: data?.awards || [],
  })

  const addItem = (category: string) => {
    const newItem = {
      id: Date.now(),
      name: "",
      issuingOrganization: "",
      dateReceived: "",
      validUntil: "",
      description: "",
      type: category === "awards" ? "public" : "",
    }

    const updatedData = {
      ...formData,
      [category]: [...formData[category], newItem],
    }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeItem = (category: string, id: number) => {
    const updatedData = {
      ...formData,
      [category]: formData[category].filter((item: any) => item.id !== id),
    }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateItem = (category: string, id: number, field: string, value: string) => {
    const updatedData = {
      ...formData,
      [category]: formData[category].map((item: any) => (item.id === id ? { ...item, [field]: value } : item)),
    }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const renderItemForm = (category: string, item: any, icon: React.ReactNode) => (
    <div key={item.id} className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h4 className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1, -1)} Details</h4>
        </div>
        <Button variant="ghost" size="sm" onClick={() => removeItem(category, item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name/Title *</Label>
          <Input
            value={item.name}
            onChange={(e) => updateItem(category, item.id, "name", e.target.value)}
            placeholder={`Enter ${category.slice(0, -1)} name`}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Issuing Organization *</Label>
          <Input
            value={item.issuingOrganization}
            onChange={(e) => updateItem(category, item.id, "issuingOrganization", e.target.value)}
            placeholder="Enter issuing organization"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date Received *</Label>
          <Input
            type="date"
            value={item.dateReceived}
            onChange={(e) => updateItem(category, item.id, "dateReceived", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Valid Until</Label>
          <Input
            type="date"
            value={item.validUntil}
            onChange={(e) => updateItem(category, item.id, "validUntil", e.target.value)}
            placeholder="Leave blank if permanent"
          />
        </div>
      </div>

      {category === "awards" && (
        <div className="space-y-2">
          <Label>Type</Label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`type-${item.id}`}
                value="public"
                checked={item.type === "public"}
                onChange={(e) => updateItem(category, item.id, "type", e.target.value)}
              />
              <span>Public</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`type-${item.id}`}
                value="private"
                checked={item.type === "private"}
                onChange={(e) => updateItem(category, item.id, "type", e.target.value)}
              />
              <span>Private</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`type-${item.id}`}
                value="international"
                checked={item.type === "international"}
                onChange={(e) => updateItem(category, item.id, "type", e.target.value)}
              />
              <span>International</span>
            </label>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={item.description}
          onChange={(e) => updateItem(category, item.id, "description", e.target.value)}
          placeholder={`Describe the ${category.slice(0, -1)} and its significance`}
          className="min-h-[80px]"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Accreditations</span>
          </CardTitle>
          <CardDescription>
            List any accreditations your organization has received from recognized bodies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.accreditations.map((item: any) =>
            renderItemForm("accreditations", item, <Shield className="h-4 w-4 text-blue-600" />),
          )}

          <Button variant="outline" onClick={() => addItem("accreditations")} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Accreditation
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Ratings</span>
          </CardTitle>
          <CardDescription>
            Include any ratings or evaluations from third-party assessment organizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.ratings.map((item: any) =>
            renderItemForm("ratings", item, <Star className="h-4 w-4 text-yellow-600" />),
          )}

          <Button variant="outline" onClick={() => addItem("ratings")} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Rating
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-green-600" />
            <span>Certifications</span>
          </CardTitle>
          <CardDescription>
            List professional certifications and quality standards your organization maintains
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.certifications.map((item: any) =>
            renderItemForm("certifications", item, <Award className="h-4 w-4 text-green-600" />),
          )}

          <Button variant="outline" onClick={() => addItem("certifications")} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            <span>Awards</span>
          </CardTitle>
          <CardDescription>Include awards and recognitions received for your work and impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.awards.map((item: any) =>
            renderItemForm("awards", item, <Trophy className="h-4 w-4 text-purple-600" />),
          )}

          <Button variant="outline" onClick={() => addItem("awards")} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Award
          </Button>
        </CardContent>
      </Card>

      {(formData.accreditations.length > 0 ||
        formData.ratings.length > 0 ||
        formData.certifications.length > 0 ||
        formData.awards.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Overview of your organization's third-party endorsements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.accreditations.length > 0 && (
                <Badge variant="secondary">
                  {formData.accreditations.length} Accreditation{formData.accreditations.length > 1 ? "s" : ""}
                </Badge>
              )}
              {formData.ratings.length > 0 && (
                <Badge variant="secondary">
                  {formData.ratings.length} Rating{formData.ratings.length > 1 ? "s" : ""}
                </Badge>
              )}
              {formData.certifications.length > 0 && (
                <Badge variant="secondary">
                  {formData.certifications.length} Certification{formData.certifications.length > 1 ? "s" : ""}
                </Badge>
              )}
              {formData.awards.length > 0 && (
                <Badge variant="secondary">
                  {formData.awards.length} Award{formData.awards.length > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
