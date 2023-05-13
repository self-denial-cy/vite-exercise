// @ts-expect-error CDN 拉取依赖
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

confetti();

/**
 * esbuild 原生不支持通过 HTTP 从 CDN 服务上拉取对应的第三方依赖资源
 */
