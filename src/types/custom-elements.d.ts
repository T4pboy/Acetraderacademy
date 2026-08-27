import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Lets TSX recognize Wistia's <wistia-player> custom element (used by
// WistiaVideo.tsx). Module augmentation of "react", per React 19's
// documented approach for typing custom elements.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "media-id": string;
        aspect?: number | string;
      };
    }
  }
}
