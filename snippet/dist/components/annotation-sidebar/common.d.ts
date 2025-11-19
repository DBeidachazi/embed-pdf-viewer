import { PdfAnnotationObject } from '@embedpdf/models';
import { TrackedAnnotation } from '@embedpdf/plugin-annotation';
export interface SidebarPropsBase<T extends PdfAnnotationObject = PdfAnnotationObject> {
    selected: TrackedAnnotation<T> | null;
    subtype: T['type'];
    activeVariant: string | null;
    colorPresets: string[];
    intent?: string;
}
//# sourceMappingURL=common.d.ts.map