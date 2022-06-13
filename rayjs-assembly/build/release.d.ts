/** assembly/index/width */
export declare const width: {
  /** @type `u16` */
  get value(): number
};
/** assembly/index/height */
export declare const height: {
  /** @type `u16` */
  get value(): number
};
/** assembly/index/engine */
export declare const engine: {
  /** @type `assembly/modules/rendererEngine/RendererEngine` */
  get value(): __Internref3
};
/** assembly/index/imageBuffer */
export declare const imageBuffer: {
  /** @type `~lib/typedarray/Uint32Array` */
  get value(): Uint32Array
};
/**
 * assembly/index/render
 */
export declare function render(): void;
/** assembly/modules/rendererEngine/RendererEngine */
declare class __Internref3 extends Number {
  private __nominal3: symbol;
}
