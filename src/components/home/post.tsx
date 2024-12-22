import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchModel, PredictResponse } from '@/app/actions/fetch_model';
import { ProbPieChart } from './prob_pie_chart';

export function Post() {
  // State to store values
  const [content, setContent] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const handleSubmit = async () => {
    setLoading(true);
    const result = await fetchModel(content, selectedModel);
    setResult(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-4 w-2/3 gap-8">
      <div className="grid col-span-3 w-full justify-center mb-4">
        <h1 className="font-semibold text-4xl mb-16">Analyst Content</h1>
      </div>
      {/* Form Card */}
      <Card className="grid col-span-1 row-span-2">
        <CardHeader>
          <CardTitle>Post Content</CardTitle>
          <CardDescription>
            Fill in the information below to create a new post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} // Update content state
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="model">Model</Label>
                <Select onValueChange={(value) => setSelectedModel(value)}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="cnn">CNN</SelectItem>
                    <SelectItem value="electra">Electra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
      {/* ProbPieChart */}
      <div className="grid col-span-2 row-span-3">
        {result ? <ProbPieChart data={result} /> : null}
      </div>
    </div>
  );
}
