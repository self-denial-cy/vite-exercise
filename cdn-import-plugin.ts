/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
export default function () {
  return {
    name: 'esbuild:cdn',
    setup(build) {
      build.onResolve({ filter: /^https?:\/\// }, (args) => {
        console.log(args.path);
        return {
          path: args.path,
          namespace: 'cdn',
        };
      });
    },
  };
}
