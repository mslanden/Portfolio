import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeWebsite = () => {
    // In a real application, this would make an API call to perform the analysis
    // For this example, we'll use mock data
    const mockAnalysis = {
      seoScore: Math.floor(Math.random() * 100),
      performanceScore: Math.floor(Math.random() * 100),
      accessibilityScore: Math.floor(Math.random() * 100),
      competitors: [
        { name: 'Competitor A', url: 'https://competitora.com' },
        { name: 'Competitor B', url: 'https://competitorb.com' },
        { name: 'Competitor C', url: 'https://competitorc.com' },
      ],
      competitorComparison: [
        { name: 'Your Site', seo: Math.floor(Math.random() * 100), performance: Math.floor(Math.random() * 100), accessibility: Math.floor(Math.random() * 100) },
        { name: 'Competitor A', seo: Math.floor(Math.random() * 100), performance: Math.floor(Math.random() * 100), accessibility: Math.floor(Math.random() * 100) },
        { name: 'Competitor B', seo: Math.floor(Math.random() * 100), performance: Math.floor(Math.random() * 100), accessibility: Math.floor(Math.random() * 100) },
        { name: 'Competitor C', seo: Math.floor(Math.random() * 100), performance: Math.floor(Math.random() * 100), accessibility: Math.floor(Math.random() * 100) },
      ],
      businessPlan: {
        strengths: ['Strong SEO', 'Excellent performance'],
        weaknesses: ['Accessibility could be improved'],
        opportunities: ['Enhance accessibility features', 'Expand content strategy'],
        threats: ['Competitor B has better overall scores'],
      },
      marketValue: {
        estimatedValue: Math.floor(Math.random() * 1000000) + 500000, // Random value between 500,000 and 1,500,000
        factors: [
          'Domain authority',
          'Traffic volume',
          'Revenue potential',
          'Brand recognition'
        ],
        potentialGrowth: Math.floor(Math.random() * 50) + 10 // Random growth percentage between 10% and 60%
      }
    };

    setAnalysis(mockAnalysis);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={analyzeWebsite}>Analyze</Button>
      </div>

      {analysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Analysis Results for {url}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>SEO Score: {analysis.seoScore}</p>
              <p>Performance Score: {analysis.performanceScore}</p>
              <p>Accessibility Score: {analysis.accessibilityScore}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitors Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.competitors && analysis.competitors.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysis.competitors.map((competitor, index) => (
                    <li key={index}>
                      {competitor.name} - <a href={competitor.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{competitor.url}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No competitors analyzed.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitor Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.competitorComparison && analysis.competitorComparison.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysis.competitorComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="seo" fill="#8884d8" />
                    <Bar dataKey="performance" fill="#82ca9d" />
                    <Bar dataKey="accessibility" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No competitor comparison data available.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.businessPlan ? (
                <>
                  <h3 className="font-semibold">Strengths:</h3>
                  <ul className="list-disc pl-5 mb-2">
                    {analysis.businessPlan.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold">Weaknesses:</h3>
                  <ul className="list-disc pl-5 mb-2">
                    {analysis.businessPlan.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold">Opportunities:</h3>
                  <ul className="list-disc pl-5 mb-2">
                    {analysis.businessPlan.opportunities.map((opportunity, index) => (
                      <li key={index}>{opportunity}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold">Threats:</h3>
                  <ul className="list-disc pl-5 mb-2">
                    {analysis.businessPlan.threats.map((threat, index) => (
                      <li key={index}>{threat}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No business plan data available.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Value Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.marketValue ? (
                <>
                  <p className="text-xl font-bold mb-2">Estimated Value: ${analysis.marketValue.estimatedValue.toLocaleString()}</p>
                  <h3 className="font-semibold mt-4">Key Factors:</h3>
                  <ul className="list-disc pl-5 mb-2">
                    {analysis.marketValue.factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                  <p className="mt-4">Potential Growth: {analysis.marketValue.potentialGrowth}% annually</p>
                </>
              ) : (
                <p>No market value data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WebsiteAnalyzer;