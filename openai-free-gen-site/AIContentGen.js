```js
// Text Generation + OCR (Free APIs)
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export default function AIContentGen() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);
    setLoading(true);
    try {
      const res = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: { apikey: 'helloworld' },
        body: formData
      });
      const data = await res.json();
      setResult(data.ParsedResults?.[0]?.ParsedText || 'No text found.');
    } catch {
      setResult('Error analyzing file.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.textcortex.com/v1/texts/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 27e199c3-b8f2-4a7b-b602-1b097bf25028'
        },
        body: JSON.stringify({ max_tokens: 100, model: 'gpt-3.5-turbo', prompt, temperature: 0.7 })
      });
      const data = await res.json();
      setResult(data?.data?.outputs?.[0]?.text || 'No output.');
    } catch {
      setResult('Error generating text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4 p-4">
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt..." />
          <Button onClick={handleGenerateText} disabled={loading}>{loading ? 'Generating...' : 'Generate Text'}</Button>
          {result && <div className="p-2 border rounded bg-gray-50 whitespace-pre-wrap">{result}</div>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Upload /> Upload file for OCR
            <Input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          {file && <div>File: {file.name}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
```

---