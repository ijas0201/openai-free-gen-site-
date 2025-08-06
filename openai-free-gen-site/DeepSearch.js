```js
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DeepSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`);
      const data = await res.json();
      setResult(data.AbstractText || 'No result found.');
    } catch {
      setResult('Error retrieving data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="space-y-4 p-4">
        <h2 className="text-xl font-semibold">Deep Web Search</h2>
        <Input
          placeholder="Type your question or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {result && <div className="p-2 border rounded bg-gray-50 whitespace-pre-wrap">{result}</div>}
      </CardContent>
    </Card>
  );
}
```
