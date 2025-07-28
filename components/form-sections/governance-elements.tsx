"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, X, Users, User, Building } from "lucide-react"

interface GovernanceElementsProps {
  data: any
  onUpdate: (data: any) => void
}

export function GovernanceElements({ data, onUpdate }: GovernanceElementsProps) {
  const [formData, setFormData] = useState({
    boardGovernance: data?.boardGovernance || {
      hasIndependentBoard: "",
      meetingFrequency: "",
      lastMeetingDate: "",
      shortestGap: "",
      longestGap: "",
      quorum: "",
    },
    boardMembers: data?.boardMembers || [],
    chiefExecutive: data?.chiefExecutive || {
      name: "",
      dateOfAppointment: "",
      isFounder: "",
      isFullTime: "",
      otherOccupation: "",
      networkMemberships: "",
      phone: "",
      email: "",
    },
    teamComposition: data?.teamComposition || {
      fullTimeStaff: "",
      partTimeStaff: "",
      volunteers: "",
    },
    seniorManagement: data?.seniorManagement || "",
  })

  const handleBoardGovernanceChange = (field: string, value: string) => {
    const updatedBoardGovernance = { ...formData.boardGovernance, [field]: value }
    const updatedData = { ...formData, boardGovernance: updatedBoardGovernance }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleChiefExecutiveChange = (field: string, value: string) => {
    const updatedChiefExecutive = { ...formData.chiefExecutive, [field]: value }
    const updatedData = { ...formData, chiefExecutive: updatedChiefExecutive }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleTeamCompositionChange = (field: string, value: string) => {
    const updatedTeamComposition = { ...formData.teamComposition, [field]: value }
    const updatedData = { ...formData, teamComposition: updatedTeamComposition }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const addBoardMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      address: "",
      occupation: "",
      relationToOthers: "",
      roleOnBoard: "",
      annualBenefits: "",
    }
    const updatedBoardMembers = [...formData.boardMembers, newMember]
    const updatedData = { ...formData, boardMembers: updatedBoardMembers }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const removeBoardMember = (id: number) => {
    const updatedBoardMembers = formData.boardMembers.filter((member: any) => member.id !== id)
    const updatedData = { ...formData, boardMembers: updatedBoardMembers }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  const updateBoardMember = (id: number, field: string, value: string) => {
    const updatedBoardMembers = formData.boardMembers.map((member: any) =>
      member.id === id ? { ...member, [field]: value } : member,
    )
    const updatedData = { ...formData, boardMembers: updatedBoardMembers }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span>Board Governance</span>
          </CardTitle>
          <CardDescription>Provide details about your organization's board structure and governance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Does the Organization have an Independent Board? *</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hasIndependentBoard"
                  value="yes"
                  checked={formData.boardGovernance.hasIndependentBoard === "yes"}
                  onChange={(e) => handleBoardGovernanceChange("hasIndependentBoard", e.target.value)}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hasIndependentBoard"
                  value="no"
                  checked={formData.boardGovernance.hasIndependentBoard === "no"}
                  onChange={(e) => handleBoardGovernanceChange("hasIndependentBoard", e.target.value)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Frequency of Board Meetings *</Label>
            <Select onValueChange={(value) => handleBoardGovernanceChange("meetingFrequency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="bi-annually">Bi-Annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date of Last Board Meeting *</Label>
              <Input
                type="date"
                value={formData.boardGovernance.lastMeetingDate}
                onChange={(e) => handleBoardGovernanceChange("lastMeetingDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Shortest Gap Between Meetings (months)</Label>
              <Input
                type="number"
                value={formData.boardGovernance.shortestGap}
                onChange={(e) => handleBoardGovernanceChange("shortestGap", e.target.value)}
                placeholder="Enter in months"
              />
            </div>
            <div className="space-y-2">
              <Label>Longest Gap Between Meetings (months)</Label>
              <Input
                type="number"
                value={formData.boardGovernance.longestGap}
                onChange={(e) => handleBoardGovernanceChange("longestGap", e.target.value)}
                placeholder="Enter in months"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quorum for Board Meetings and Resolutions *</Label>
            <Input
              value={formData.boardGovernance.quorum}
              onChange={(e) => handleBoardGovernanceChange("quorum", e.target.value)}
              placeholder="Describe the quorum requirements"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Board Members</span>
          </CardTitle>
          <CardDescription>Provide details of all board members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.boardMembers.map((member: any, index: number) => (
            <div key={member.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Board Member {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeBoardMember(member.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => updateBoardMember(member.id, "name", e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Occupation *</Label>
                  <Input
                    value={member.occupation}
                    onChange={(e) => updateBoardMember(member.id, "occupation", e.target.value)}
                    placeholder="Current or past occupation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={member.address}
                  onChange={(e) => updateBoardMember(member.id, "address", e.target.value)}
                  placeholder="Enter complete address"
                  className="min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Relation to Other Senior Office Bearers</Label>
                  <Input
                    value={member.relationToOthers}
                    onChange={(e) => updateBoardMember(member.id, "relationToOthers", e.target.value)}
                    placeholder="Any family or professional relations"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role on Board *</Label>
                  <Input
                    value={member.roleOnBoard}
                    onChange={(e) => updateBoardMember(member.id, "roleOnBoard", e.target.value)}
                    placeholder="e.g., Chairperson, Secretary, Treasurer"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Annual Benefits Received (Money Value)</Label>
                <Input
                  value={member.annualBenefits}
                  onChange={(e) => updateBoardMember(member.id, "annualBenefits", e.target.value)}
                  placeholder="Enter amount in INR or 'None'"
                />
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addBoardMember} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Board Member
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-purple-600" />
            <span>Chief Executive/Functionary</span>
          </CardTitle>
          <CardDescription>Provide details about the chief executive or main functionary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.chiefExecutive.name}
                onChange={(e) => handleChiefExecutiveChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Appointment *</Label>
              <Input
                type="date"
                value={formData.chiefExecutive.dateOfAppointment}
                onChange={(e) => handleChiefExecutiveChange("dateOfAppointment", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Is Chief Executive the Founder of the Organization? *</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isFounder"
                    value="yes"
                    checked={formData.chiefExecutive.isFounder === "yes"}
                    onChange={(e) => handleChiefExecutiveChange("isFounder", e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isFounder"
                    value="no"
                    checked={formData.chiefExecutive.isFounder === "no"}
                    onChange={(e) => handleChiefExecutiveChange("isFounder", e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Does Chief Executive work full time with Organization? *</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isFullTime"
                    value="yes"
                    checked={formData.chiefExecutive.isFullTime === "yes"}
                    onChange={(e) => handleChiefExecutiveChange("isFullTime", e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isFullTime"
                    value="no"
                    checked={formData.chiefExecutive.isFullTime === "no"}
                    onChange={(e) => handleChiefExecutiveChange("isFullTime", e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {formData.chiefExecutive.isFullTime === "no" && (
              <div className="space-y-2">
                <Label>Other Occupation Details</Label>
                <Textarea
                  value={formData.chiefExecutive.otherOccupation}
                  onChange={(e) => handleChiefExecutiveChange("otherOccupation", e.target.value)}
                  placeholder="Provide details of other occupation"
                  className="min-h-[60px]"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Network Memberships (Government or Otherwise)</Label>
            <Textarea
              value={formData.chiefExecutive.networkMemberships}
              onChange={(e) => handleChiefExecutiveChange("networkMemberships", e.target.value)}
              placeholder="List any network memberships"
              className="min-h-[60px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                value={formData.chiefExecutive.phone}
                onChange={(e) => handleChiefExecutiveChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.chiefExecutive.email}
                onChange={(e) => handleChiefExecutiveChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Composition</CardTitle>
          <CardDescription>Provide the current team composition numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Full-time Staff *</Label>
              <Input
                type="number"
                value={formData.teamComposition.fullTimeStaff}
                onChange={(e) => handleTeamCompositionChange("fullTimeStaff", e.target.value)}
                placeholder="Number of full-time staff"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Part-time Staff</Label>
              <Input
                type="number"
                value={formData.teamComposition.partTimeStaff}
                onChange={(e) => handleTeamCompositionChange("partTimeStaff", e.target.value)}
                placeholder="Number of part-time staff"
              />
            </div>
            <div className="space-y-2">
              <Label>Volunteers</Label>
              <Input
                type="number"
                value={formData.teamComposition.volunteers}
                onChange={(e) => handleTeamCompositionChange("volunteers", e.target.value)}
                placeholder="Number of volunteers"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Senior Management Background</CardTitle>
          <CardDescription>
            Provide background information on senior management and program team leaders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Senior Management Bios (Top 3-4 Key Persons) *</Label>
            <Textarea
              value={formData.seniorManagement}
              onChange={(e) => setFormData({ ...formData, seniorManagement: e.target.value })}
              placeholder="Provide detailed background information including education, experience, and key achievements for your top 3-4 senior management personnel"
              className="min-h-[150px]"
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
