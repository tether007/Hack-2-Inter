import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CompanyEditor() {
  const [company, setCompany] = useState({
    name: '',
    description: '',
    website: '',
    industry: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the company data to your backend
    console.log('Company data:', company)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Manage your company details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              id="companyName" 
              value={company.name} 
              onChange={(e) => setCompany({...company, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Description</Label>
            <Textarea 
              id="companyDescription" 
              value={company.description} 
              onChange={(e) => setCompany({...company, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Website</Label>
            <Input 
              id="companyWebsite" 
              type="url" 
              value={company.website} 
              onChange={(e) => setCompany({...company, website: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyIndustry">Industry</Label>
            <Input 
              id="companyIndustry" 
              value={company.industry} 
              onChange={(e) => setCompany({...company, industry: e.target.value})}
            />
          </div>
          <Button type="submit">Save Company Info</Button>
        </form>
      </CardContent>
    </Card>
  )
}

