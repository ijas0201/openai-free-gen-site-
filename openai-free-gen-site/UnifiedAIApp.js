```js
import React from 'react';
import AIContentGen from './AIContentGen';
import MediaGen from './MediaGen';
import DeepSearch from './DeepSearch';

export default function UnifiedAIApp() {
  return (
    <div className="p-4 space-y-12 max-w-5xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🧠 All-in-One Free AI Generator</h1>
        <p className="text-gray-600">Text | Image | Video | OCR | Web Search</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📝 Text & File Analyzer</h2>
        <AIContentGen />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🎨 Image & Video Generation</h2>
        <MediaGen />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🔍 Deep Web Search</h2>
        <DeepSearch />
      </section>
    </div>
  );
}
```