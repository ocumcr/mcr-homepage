import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    // プロジェクトのルートディレクトリ
    root: "./",

    build: {
        // ビルド出力先
        outDir: "dist",
        sourcemap: true,

        rollupOptions: {
            // 読み込むHTMLのエントリーポイント
            // load-content.ts などで動的に読み込むHTMLファイルも
            // 静的アセットとしてコピーされるよう、公開ディレクトリに配置するか
            // ここで明示的に指定する必要があります。
            input: {
                main: resolve(__dirname, "src/main.ts"),
            },
            output: {
                // 出力ファイル名のフォーマット（キャッシュ対策）
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },

    // 拡張子が .ts のファイルをそのまま扱えるように設定
    esbuild: {
        target: "esnext",
    },
})
