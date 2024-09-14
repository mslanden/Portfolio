import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyzeMockWebsite } from '../utils/analyzerUtils';

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeWebsite = () => {
    const mockAnalysis = analyzeMockWebsite();
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
          <AnalysisResults analysis={analysis} />
          <CompetitorAnalysis competitors={analysis.competitors} />
          <CompetitorComparison data={analysis.competitorComparison} />
          <BusinessPlan plan={analysis.businessPlan} />
          <MarketValueAnalysis marketValue={analysis.marketValue} />
          <SimilarCompaniesAnalysis companies={analysis.similarCompanies} />
        </div>
      )}
    </div>
  );
};

const AnalysisResults = ({ analysis }) => (
  <Card>
    <CardHeader>
      <CardTitle>Website Analysis Results for {analysis.url}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>SEO Score: {analysis.seoScore}</p>
      <p>Performance Score: {analysis.performanceScore}</p>
      <p>Accessibility Score: {analysis.accessibilityScore}</p>
    </CardContent>
  </Card>
);

const CompetitorAnalysis = ({ competitors }) => (
  <Card>
    <CardHeader>
      <CardTitle>Competitors Analyzed</CardTitle>
    </CardHeader>
    <CardContent>
      {competitors && competitors.length > 0 ? (
        <ul className="list-disc pl-5">
          {competitors.map((competitor, index) => (
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
);

const CompetitorComparison = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Competitor Comparison</CardTitle>
    </CardHeader>
    <CardContent>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
);

const BusinessPlan = ({ plan }) => (
  <Card>
    <CardHeader>
      <CardTitle>Business Plan</CardTitle>
    </CardHeader>
    <CardContent>
      {plan ? (
        <>
          <h3 className="font-semibold">Strengths:</h3>
          <ul className="list-disc pl-5 mb-2">
            {plan.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
          <h3 className="font-semibold">Weaknesses:</h3>
          <ul className="list-disc pl-5 mb-2">
            {plan.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
          <h3 className="font-semibold">Opportunities:</h3>
          <ul className="list-disc pl-5 mb-2">
            {plan.opportunities.map((opportunity, index) => (
              <li key={index}>{opportunity}</li>
            ))}
          </ul>
          <h3 className="font-semibold">Threats:</h3>
          <ul className="list-disc pl-5 mb-2">
            {plan.threats.map((threat, index) => (
              <li key={index}>{threat}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No business plan data available.</p>
      )}
    </CardContent>
  </Card>
);

const MarketValueAnalysis = ({ marketValue }) => (
  <Card>
    <CardHeader>
      <CardTitle>Market Value Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      {marketValue ? (
        <>
          <p className="text-xl font-bold mb-2">Estimated Value: ${marketValue.estimatedValue.toLocaleString()}</p>
          <h3 className="font-semibold mt-4">Key Factors:</h3>
          <ul className="list-disc pl-5 mb-2">
            {marketValue.factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
          <p className="mt-4">Potential Growth: {marketValue.potentialGrowth}% annually</p>
        </>
      ) : (
        <p>No market value data available.</p>
      )}
    </CardContent>
  </Card>
);

const SimilarCompaniesAnalysis = ({ companies }) => (
  <Card>
    <CardHeader>
      <CardTitle>Similar Companies Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      {companies && companies.length > 0 ? (
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg">{company.name}</h3>
              <p>Website: <a href={company.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.url}</a></p>
              <p>Market Cap: ${company.marketCap.toLocaleString()}</p>
              <p>Annual Revenue: ${company.revenue.toLocaleString()}</p>
              <p>Employees: {company.employees}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No similar companies data available.</p>
      )}
    </CardContent>
  </Card>
);

export default WebsiteAnalyzer;
