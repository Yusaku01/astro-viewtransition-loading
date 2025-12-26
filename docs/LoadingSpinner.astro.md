# LoadingSpinner.astro の仕組み

## 目的
Astro View Transitions の画面遷移中に、画面中央へスピナー型のローディング UI を表示します。短い遷移では出さないためのしきい値も持ちます。

## Props
- color: スピナーの色。デフォルトは `#0969da`。
- size: スピナーの直径。未指定なら `height` を参照し、最終的に `32px`。
- thickness: スピナーの線幅。未指定なら `3px`。
- height: 旧互換用のサイズ指定。`size` が無い場合に利用。
- class: ルート要素のクラス名。デフォルトは `astro-loading-spinner`。
- animationDuration: 表示/非表示のフェード時間 (ms)。デフォルトは `300`。
- threshold: しきい値 (ms)。`false` または `0` 以下で即時開始。デフォルトは `200`。

## しきい値 (threshold) の仕組み
- 遷移開始 (`astro:before-preparation`) でタイマーを開始し、指定時間が経過したら表示します。
- 遷移が早く終わった場合は `astro:before-swap` でタイマーを解除するため、表示されません。
- 事前予測ではなく、実際の経過時間を計測して判断しています。

## UI/CSS 構造
- 画面全体 (`inset: 0`) に固定し、`display: grid` で中央配置。
- スピナー本体は `::before` 疑似要素。
  - 円形ボーダーを作り、右・上側のみ透明にして回転させることでスピナーに見せる。
- `data-active="true"` のときのみ `opacity: 1` になり表示。
- `pointer-events: none` なので操作は阻害しません。
- 回転速度は `spinDuration = max(600, animationDuration * 4)` で決定。

## 動作フロー
1. 初期化時に `div` を生成して `document.body` の先頭に挿入。
2. `astro:before-preparation` で遷移準備が始まると、しきい値用のタイマーをセット。
3. `astro:before-swap` でタイマーを解除し、新しいドキュメント側にも要素を移して表示を解除。

## 状態管理
- `window.__astroLoadingSpinner` により二重初期化を防止します。複数回読み込まれても初期化は一度だけです。
- `isActive` は表示中かどうかのフラグです。
- `thresholdTimeout` は「しきい値を超えたら表示開始する」ための待機タイマーです。

## 使いどころ
ページ全体のローディング状態を強調したい場合に適しています。
