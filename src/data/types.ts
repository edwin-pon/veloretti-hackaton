/** Field and document types shared by the knowledge-base extraction screens. */

export type FieldType = 'text' | 'area' | 'chips' | 'select' | 'toggle';

export type FieldValue = string | string[] | boolean;

export interface ExtractedField {
  key: string;
  label: string;
  hint: string;
  type: FieldType;
  value: FieldValue;
  /** Agent confidence in the extraction, 0–100. */
  conf: number;
  /** Where in the source document the value came from. */
  cite: string;
  /** How the agent arrived at the value. */
  reasoning: string;
  /** Verbatim line from the source document. */
  quote: string;
  rows?: number;
  options?: string[];
  chipPlaceholder?: string;
  toggleLabel?: string;
}

export interface DocumentSection {
  title: string;
  meta: string;
  fields: ExtractedField[];
}

export type DocumentKey = 'brand' | 'legal' | 'style';

export interface SourceDocument {
  key: DocumentKey;
  order: number;
  title: string;
  card: string;
  desc: string;
  intro: string;
  file: string;
  size: string;
  summaryTitle: string;
  summary: string;
  extracts: string[];
  sections: DocumentSection[];
}
