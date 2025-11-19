/** @jsxImportSource preact */
import { h } from 'preact';
import { PdfAnnotationSubtype, PdfAnnotationObject } from '@embedpdf/models';
import { SidebarPropsBase } from './common';
type SidebarComponent<S extends PdfAnnotationSubtype> = (p: SidebarPropsBase<Extract<PdfAnnotationObject, {
    type: S;
}>>) => h.JSX.Element | null;
interface SidebarEntry<S extends PdfAnnotationSubtype> {
    component: SidebarComponent<S>;
    title?: string | ((p: SidebarPropsBase<Extract<PdfAnnotationObject, {
        type: S;
    }>>) => string);
}
type SidebarRegistry = Partial<{
    [K in PdfAnnotationSubtype]: SidebarEntry<K>;
}>;
export declare const SIDEbars: SidebarRegistry;
export {};
//# sourceMappingURL=registry.d.ts.map