```js
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function MediaGen() {
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loadingImg, setLoadingImg] = useState(false);

  const handleImageGen = async () => {
    setLoadingImg(true);
    try {
      const res = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(imgPrompt)}`);
      const data = await res.json();
      setImgUrl(data.images?.[0]?.src || '');
    } catch {
      setImgUrl('');
    } finally {
      setLoadingImg(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-4">
          <Textarea
            placeholder="Enter prompt to generate image"
            value={imgPrompt}
            onChange={(e) => setImgPrompt(e.target.value)}
          />
          <Button onClick={handleImageGen} disabled={loadingImg}>
            {loadingImg ? 'Generating...' : 'Generate Image'}
          </Button>
          {imgUrl && <img src={imgUrl} alt="Generated" className="w-full rounded mt-4" />}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <p className="font-semibold">Basic Video Generator (GIF-based)</p>
          <video
            width="100%"
            height="auto"
            controls
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGp1OGY2bXZpbDN3Ym5pZXY1bHFraHVybzd6aGhzN2tqenJ5ZmZydyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Z9dU6Vsm4kK3pZtK2k/giphy.mp4"
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

---