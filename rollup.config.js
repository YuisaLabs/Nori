import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.cjs",
      format: "cjs",
    },
    {
      file: "lib/index.esm.js",
      format: "esm",
    },
    {
      file: "lib/index.umd.js",
      format: "umd",
      name: "Nori",
    }
  ],
  plugins: [
    del({
      targets: ["lib/*"],
    }),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
};
