# xyz-pdf-snippet

编译自embyed-pdf-viewer，官方提供的cdn无法离线使用，打了个包，把wasm加了进去

[![npm version](https://img.shields.io/npm/v/xyz-pdf-snippet.svg)](https://www.npmjs.com/package/xyz-pdf-snippet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-DBeidachazi-blue)](https://github.com/DBeidachazi/embed-pdf-viewer)

A complete, offline-capable PDF viewer built on EmbedPDF. Perfect for applications that need robust PDF viewing without relying on external CDNs.

## ✨ Features

- 📄 **Full PDF Support** - Render any PDF document with high fidelity
- 🔍 **Search** - Find text within PDFs
- 📝 **Annotations** - Add notes, highlights, and comments
- 🔄 **Rotate & Zoom** - Full control over document viewing
- 📱 **Responsive** - Works on desktop and mobile devices
- 🖨️ **Print** - Print documents directly from the viewer
- 💾 **Download** - Export PDFs with or without annotations
- 🎨 **Customizable** - Theming and UI customization options
- 🚀 **WebAssembly Powered** - Fast rendering using PDFium
- 📦 **Offline First** - No CDN dependencies, all assets bundled

## 📦 Installation

```bash
npm install xyz-pdf-snippet
```

or

```bash
yarn add xyz-pdf-snippet
```

or

```bash
pnpm add xyz-pdf-snippet
```

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>PDF Viewer</title>
</head>
<body>
  <div id="pdf-viewer" style="height: 600px"></div>

  <script type="module">
    import EmbedPDF from 'xyz-pdf-snippet';
 
    const viewer = EmbedPDF.init({
      type: 'container',
      target: document.getElementById('pdf-viewer'),
      src: './your-document.pdf'
    });

    // Optional: Listen to events
    viewer.on('documentLoaded', () => {
      console.log('PDF loaded successfully!');
    });
  </script>
</body>
</html>
```

### With Module Bundler (Webpack, Vite, etc.)

```javascript
import EmbedPDF from 'xyz-pdf-snippet';

const viewer = EmbedPDF.init({
  type: 'container',
  target: document.getElementById('pdf-viewer'),
  src: '/path/to/document.pdf'
});
```

### React Example

```jsx
import { useEffect, useRef } from 'react';
import EmbedPDF from 'xyz-pdf-snippet';

function PDFViewer({ pdfUrl }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = EmbedPDF.init({
      type: 'container',
      target: viewerRef.current,
      src: pdfUrl
    });

    return () => {
      // Cleanup if needed
    };
  }, [pdfUrl]);

  return <div ref={viewerRef} style={{ height: '600px' }} />;
}
```

### Vue Example

```vue
<template>
  <div ref="viewerRef" style="height: 600px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EmbedPDF from 'xyz-pdf-snippet';

const props = defineProps({
  pdfUrl: String
});

const viewerRef = ref(null);

onMounted(() => {
  EmbedPDF.init({
    type: 'container',
    target: viewerRef.value,
    src: props.pdfUrl
  });
});
</script>
```

## ⚙️ Configuration Options

```javascript
const viewer = EmbedPDF.init({
  // Required
  type: 'container',              // 'container' or 'inline'
  target: HTMLElement,            // DOM element to mount viewer
  src: string,                    // PDF file path or URL
  
  // Optional
  initialPage: 1,                 // Starting page number
  zoom: 1.0,                      // Initial zoom level (0.5 - 3.0)
  enableAnnotations: true,        // Enable annotation tools
  enableSearch: true,             // Enable text search
  enablePrint: true,              // Enable printing
  enableDownload: true,           // Enable download button
  enableFullscreen: true,         // Enable fullscreen mode
  theme: 'light',                 // 'light' or 'dark'
  toolbar: true,                  // Show/hide toolbar
  sidebar: true                   // Show/hide sidebar
});
```

## 📡 API Reference

### Methods

```javascript
// Navigation
viewer.goToPage(pageNumber: number): void
viewer.nextPage(): void
viewer.previousPage(): void
viewer.getPageCount(): number
viewer.getCurrentPage(): number

// Zoom
viewer.zoomIn(): void
viewer.zoomOut(): void
viewer.setZoom(level: number): void
viewer.fitToWidth(): void
viewer.fitToPage(): void

// Rotation
viewer.rotate(degrees: number): void  // 90, 180, 270, etc.

// Search
viewer.search(text: string): void
viewer.clearSearch(): void

// Download & Print
viewer.download(filename?: string): void
viewer.print(): void

// Fullscreen
viewer.enterFullscreen(): void
viewer.exitFullscreen(): void
```

### Events

```javascript
// Document events
viewer.on('documentLoaded', () => {
  console.log('Document loaded');
});

viewer.on('documentError', (error) => {
  console.error('Failed to load document:', error);
});

// Page events
viewer.on('pageChange', (pageNumber) => {
  console.log('Current page:', pageNumber);
});

// Zoom events
viewer.on('zoomChange', (zoomLevel) => {
  console.log('Zoom level:', zoomLevel);
});

// Annotation events
viewer.on('annotationAdded', (annotation) => {
  console.log('Annotation added:', annotation);
});

viewer.on('annotationUpdated', (annotation) => {
  console.log('Annotation updated:', annotation);
});

viewer.on('annotationDeleted', (annotationId) => {
  console.log('Annotation deleted:', annotationId);
});

// Remove event listener
const handler = (page) => console.log(page);
viewer.on('pageChange', handler);
viewer.off('pageChange', handler);
```

## 🌐 Server Configuration

### Important: Cross-Origin Headers

This package uses WebAssembly and SharedArrayBuffer, which require specific HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Nginx Configuration

```nginx
location / {
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
}
```

### Apache Configuration

```apache
<IfModule mod_headers.c>
    Header set Cross-Origin-Opener-Policy "same-origin"
    Header set Cross-Origin-Embedder-Policy "require-corp"
</IfModule>
```

### Vite Configuration

```javascript
// vite.config.js
export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
```

### Webpack Dev Server

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};
```

## 📦 What's Included

- **embedpdf.js** - Main entry point (ESM module)
- **embedpdf-5926cb22.js** - Core library (~495 KB)
- **worker-engine-de49cddb.js** - PDF rendering engine (~574 KB)
- **direct-engine-9996aac8.js** - Direct rendering fallback (~248 KB)
- **hammer-e1aXHboh-6cda5c0f.js** - Touch gesture support (~20 KB)
- **pdfium.wasm** - PDF rendering core (~3.7 MB)
- TypeScript definitions included

**Total size: ~5 MB** (gzip recommended for production)

## 🔧 Troubleshooting

### PDF fails to load

1. Check browser console for CORS errors
2. Verify server headers are set correctly
3. Ensure PDF path is correct
4. Check browser compatibility

### Module not found errors

Make sure your bundler can handle ES modules and WASM files. For Webpack, you may need:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: 'asset/resource',
      },
    ],
  },
};
```

### Performance issues

1. Enable gzip/brotli compression on your server
2. Use CDN for static assets
3. Consider lazy loading for large PDFs
4. Reduce initial zoom level for better initial render

## 🌍 Browser Support

- Chrome 89+
- Firefox 89+
- Safari 15.2+
- Edge 89+

Requires support for:
- ES Modules
- WebAssembly
- SharedArrayBuffer
- Web Workers

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built on top of [EmbedPDF](https://github.com/embed-pdf-viewer/embed-pdf-viewer) - an amazing open-source PDF viewer.

## 🤝 Contributing

Issues and pull requests are welcome! Please feel free to contribute to the [GitHub repository](https://github.com/DBeidachazi/embed-pdf-viewer).

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/DBeidachazi/embed-pdf-viewer/issues)
- Check existing issues for solutions
- Review the documentation

---

Made with ❤️ by [DBeidachazi](https://github.com/DBeidachazi)
