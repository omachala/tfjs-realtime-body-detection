/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface TfjsPosenet {}
  interface TfjsPosenetAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'TfjsPosenet': Components.TfjsPosenet;
  }

  interface StencilIntrinsicElements {
    'tfjs-posenet': Components.TfjsPosenetAttributes;
  }


  interface HTMLTfjsPosenetElement extends Components.TfjsPosenet, HTMLStencilElement {}
  var HTMLTfjsPosenetElement: {
    prototype: HTMLTfjsPosenetElement;
    new (): HTMLTfjsPosenetElement;
  };

  interface HTMLElementTagNameMap {
    'tfjs-posenet': HTMLTfjsPosenetElement
  }

  interface ElementTagNameMap {
    'tfjs-posenet': HTMLTfjsPosenetElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}