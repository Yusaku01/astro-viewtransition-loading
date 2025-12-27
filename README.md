# astro-viewtransition-loading

Astro View Transitionと連携したローディングUIのデモ。

## 機能

- **LoadingIndicator** - 画面上部に表示されるプログレスバー
- **LoadingSpinner** - 画面中央に表示されるスピナー

両コンポーネントとも `threshold` プロパティで表示遅延を設定可能（デフォルト200ms）。

## プロジェクト構造

```
src/
├── api/           # 記事データAPI
├── components/    # ローディングUI・記事コンポーネント
├── layouts/       # レイアウト
└── pages/         # ページ
data/              # 記事データ（JSONC）
docs/              # コンポーネントドキュメント
```

## ローディングUIの切り替え

`src/layouts/Layout.astro` で使用するコンポーネントを変更：

- LoadingIndicator（プログレスバー）← 現在有効
- LoadingSpinner（スピナー）← コメントアウト中

## コマンド

| コマンド | 説明 |
|---------|------|
| `pnpm install` | 依存関係のインストール |
| `pnpm dev` | 開発サーバー起動（localhost:4321） |
| `pnpm build` | 本番ビルド |
| `pnpm preview` | ビルドのプレビュー |
