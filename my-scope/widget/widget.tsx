import React, { useState } from "react";
import "@moxiworks/mds/dist/styles/mds-core.css";
import "@moxiworks/mds";
import {
  applyPolyfills,
  defineCustomElements,
  JSX as LocalJSX,
} from "@moxiworks/mds/loader";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], "ref"> | HTMLAttributes<T>;
};

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type StencilToReact<
  T = LocalJSX.IntrinsicElements,
  U = HTMLElementTagNameMap
> = StencilProps<T> & ReactProps<U>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact {}
  }
}

// Stencil setup
applyPolyfills().then(() => {
  defineCustomElements();
});

export function Widget() {
  const [count, setCount] = useState(0);

  return (
    <div className="mds">
      <div className="flex items-center space-x-16">
        <mx-button btn-type="action" onClick={() => setCount(count - 1)}>
          &ndash;
        </mx-button>
        <mx-input value={count.toString()} readonly className="w-128" />
        <mx-button btn-type="action" onClick={() => setCount(count + 1)}>
          +
        </mx-button>
      </div>
    </div>
  );
}
