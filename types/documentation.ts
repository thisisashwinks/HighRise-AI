export interface ComponentDocProps {
  name: string;
  category: string;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  anatomy: Array<{
    number: number;
    name: string;
    description: string;
  }>;
  variants: Array<{
    name: string;
    description: string;
  }>;
  states: Array<{
    name: string;
    description: string;
  }>;
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
  usageGuidelines: {
    do: string[];
    dont: string[];
  };
  aiConsiderations?: {
    invocation: string;
    latency: string;
    uncertainty: string;
    manualOverride: string;
    context: string;
    safety?: string;
    dataVisibility?: string;
  };
  accessibility: {
    keyboard: string[];
    screenReader: string[];
    ariaHints: string[];
  };
  relatedComponents: string[];
  examples?: Array<{
    title: string;
    description?: string;
    figmaUrl?: string;
    figmaNodeId?: string;
    imageUrl?: string;
    code?: string;
    interactive?: boolean;
  }>;
}

