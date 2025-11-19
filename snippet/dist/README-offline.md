# EmbedPDF 离线使用指南

## 📦 已编译文件说明

已成功编译 `@embedpdf/snippet` 包，所有文件位于 `dist` 目录下。

### 核心文件

| 文件名 | 大小 | 说明 |
|--------|------|------|
| `embedpdf.js` | 0.05 KB | 主入口文件（ESM 模块） |
| `embedpdf-5926cb22.js` | 494.58 KB | 核心库（包含所有插件） |
| `worker-engine-de49cddb.js` | 573.87 KB | PDF Worker 渲染引擎 |
| `direct-engine-9996aac8.js` | 248.10 KB | 直接渲染引擎 |
| `hammer-e1aXHboh-6cda5c0f.js` | 19.87 KB | 手势支持库 |
| `pdfium.wasm` | ~3.7 MB | PDF 渲染核心（WebAssembly） |

### 示例 PDF 文件

- `demo.pdf` - 演示文档
- `demo-annotations.pdf` - 注释示例
- `ebook.pdf` - 电子书示例

## 🚀 快速开始

### 方法一：使用提供的示例

1. 在浏览器中打开 `demo-offline.html`
2. 需要使用本地 Web 服务器（不能直接用 `file://` 协议）

**启动本地服务器：**

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js http-server
npx http-server -p 8000

# 使用 PHP
php -S localhost:8000
```

然后访问：`http://localhost:8000/demo-offline.html`

### 方法二：集成到您的项目

将以下文件复制到您的项目目录：

```
your-project/
├── embedpdf.js
├── embedpdf-5926cb22.js
├── worker-engine-de49cddb.js
├── direct-engine-9996aac8.js
├── hammer-e1aXHboh-6cda5c0f.js
├── pdfium.wasm
└── your-pdf-file.pdf
```

在您的 HTML 中使用：

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
    import EmbedPDF from './embedpdf.js';
 
    const viewer = EmbedPDF.init({
      type: 'container',
      target: document.getElementById('pdf-viewer'),
      src: './your-pdf-file.pdf'
    });
  </script>
</body>
</html>
```

## ⚙️ 配置选项

```javascript
const viewer = EmbedPDF.init({
  type: 'container',              // 或 'inline'
  target: document.getElementById('pdf-viewer'),
  src: './your-pdf.pdf',          // PDF 文件路径
  
  // 可选配置
  initialPage: 1,                 // 初始页码
  zoom: 1.0,                      // 初始缩放级别
  enableAnnotations: true,        // 启用注释
  enableSearch: true,             // 启用搜索
  enablePrint: true,              // 启用打印
  enableDownload: true,           // 启用下载
  theme: 'light'                  // 主题: 'light' 或 'dark'
});
```

## 📡 API 方法

```javascript
// 页面导航
viewer.goToPage(pageNumber);
viewer.nextPage();
viewer.previousPage();

// 缩放控制
viewer.zoomIn();
viewer.zoomOut();
viewer.setZoom(1.5);

// 旋转
viewer.rotate(90);  // 顺时针旋转 90 度

// 事件监听
viewer.on('documentLoaded', () => {
  console.log('文档已加载');
});

viewer.on('pageChange', (page) => {
  console.log('当前页:', page);
});

viewer.on('error', (error) => {
  console.error('错误:', error);
});
```

## 🌐 部署注意事项

### 1. 跨域资源共享 (CORS)

如果 PDF 文件来自不同的域，需要配置 CORS 头：

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Range
```

### 2. SharedArrayBuffer 支持

PDF 渲染引擎使用 WebAssembly 和 SharedArrayBuffer，需要设置以下 HTTP 头：

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**Nginx 配置示例：**

```nginx
location / {
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
}
```

**Apache 配置示例：**

```apache
<IfModule mod_headers.c>
    Header set Cross-Origin-Opener-Policy "same-origin"
    Header set Cross-Origin-Embedder-Policy "require-corp"
</IfModule>
```

### 3. 文件大小优化

- `pdfium.wasm` 文件较大（~3.7MB），建议启用 gzip 压缩
- 可以配置 CDN 加速静态资源

## 📝 对比官方 CDN 版本

### 官方 CDN 版本（在线）

```html
<script async type="module">
  import EmbedPDF from 'https://snippet.embedpdf.com/embedpdf.js';
  
  const viewer = EmbedPDF.init({
    type: 'container',
    target: document.getElementById('pdf-viewer'),
    src: 'https://snippet.embedpdf.com/ebook.pdf'
  });
</script>
```

### 离线版本（本地）

```html
<script type="module">
  import EmbedPDF from './embedpdf.js';
  
  const viewer = EmbedPDF.init({
    type: 'container',
    target: document.getElementById('pdf-viewer'),
    src: './ebook.pdf'
  });
</script>
```

**差异：**
- ✅ 完全相同的 API
- ✅ 所有功能一致
- ✅ 无需互联网连接
- ⚠️ 需要自己托管文件（~5 MB）
- ⚠️ 需要配置 Web 服务器响应头

## 🔧 重新编译

如果需要重新编译：

```bash
# 安装依赖
pnpm install

# 编译 snippet 包
pnpm run build:snippet

# 编译后的文件在 snippet/dist 目录
```

## 💡 常见问题

### Q: 为什么不能直接用 `file://` 协议打开？

A: ES 模块和 WASM 需要通过 HTTP(S) 协议加载，浏览器安全限制不允许从 `file://` 加载这些资源。

### Q: PDF 加载失败怎么办？

A: 检查以下几点：
1. PDF 文件路径是否正确
2. Web 服务器是否正确配置
3. 浏览器控制台是否有 CORS 错误
4. SharedArrayBuffer 相关的响应头是否设置

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器：
- Chrome 89+
- Firefox 89+
- Safari 15.2+
- Edge 89+

## 📄 许可证

MIT License

---

✨ 编译完成！现在您可以完全离线使用 EmbedPDF 了！
