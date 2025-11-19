import { h } from 'preact';
import { Rotation } from '@embedpdf/models';
import { ViewportPluginConfig } from '@embedpdf/plugin-viewport/preact';
import { ScrollPluginConfig, ScrollStrategy } from '@embedpdf/plugin-scroll/preact';
import { SpreadMode, SpreadPluginConfig } from '@embedpdf/plugin-spread/preact';
import { MenuItem, GlobalStoreState, UIComponentType, UIPluginConfig } from '@embedpdf/plugin-ui/preact';
import { ZoomMode, ZoomPluginConfig } from '@embedpdf/plugin-zoom/preact';
import { RotatePluginConfig } from '@embedpdf/plugin-rotate/preact';
import { TilingPluginConfig } from '@embedpdf/plugin-tiling/preact';
import { ThumbnailPluginConfig } from '@embedpdf/plugin-thumbnail/preact';
export { ScrollStrategy, ZoomMode, SpreadMode, Rotation };
export interface PluginConfigs {
    viewport?: ViewportPluginConfig;
    scroll?: ScrollPluginConfig;
    zoom?: ZoomPluginConfig;
    spread?: SpreadPluginConfig;
    rotate?: RotatePluginConfig;
    tiling?: TilingPluginConfig;
    thumbnail?: ThumbnailPluginConfig;
}
export interface PDFViewerConfig {
    src: string;
    worker?: boolean;
    wasmUrl?: string;
    plugins?: PluginConfigs;
    log?: boolean;
}
interface PDFViewerProps {
    config: PDFViewerConfig;
}
type State = GlobalStoreState<{}>;
export declare const menuItems: Record<string, MenuItem<State>>;
export declare const components: Record<string, UIComponentType<State>>;
export declare const uiConfig: UIPluginConfig;
export declare function PDFViewer({ config }: PDFViewerProps): h.JSX.Element;
//# sourceMappingURL=app.d.ts.map