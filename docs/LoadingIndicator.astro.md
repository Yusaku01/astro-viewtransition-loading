# LoadingIndicator.astro の仕組み

## 目的

Astro View Transitions の画面遷移中に、画面上部へ進捗バー型のインジケータを表示します。短い遷移では出さないためのしきい値も持ちます。

## Props

- color: バーの色。デフォルトは `#0969da`。
- height: バーの高さ。デフォルトは `3px`。
- class: ルート要素のクラス名。デフォルトは `astro-loading-indicator`。
- animationDuration: 進捗やフェードの基本時間 (ms)。デフォルトは `300`。
- threshold: しきい値 (ms)。`false` または `0` 以下で即時開始。デフォルトは `200`。

## しきい値 (threshold) の仕組み

- 遷移開始 (`astro:before-preparation`) でタイマーを開始し、指定時間が経過したら表示します。
- 遷移が早く終わった場合は `astro:before-swap` でタイマーを解除するため、表示されません。
- 事前予測ではなく、実際の経過時間を計測して判断しています。

## UI/CSS 構造

- `position: fixed` で画面上部に固定した横長バー。
- `transform: scaleX(var(--progress))` で伸縮し、`transform-origin` を左端に固定。
- `opacity` と `transform` をトランジションで滑らかに。
- RTL 環境では `transform-origin` を右端に変更。

## 動作フロー

1. 初期化時に `div` を生成して `document.body` の先頭に挿入。
2. `astro:before-preparation` で遷移準備が始まると、しきい値用のタイマーをセット。
3. 表示中は一定間隔で `--progress` を少しずつ増やし、擬似的な進捗を表現。
4. `astro:before-swap` でタイマーを解除し、必要なら表示開始済みのバーを完了処理へ移行。
5. 新しいドキュメント側にも要素を移し、`progress=1` -> フェードアウト -> 初期状態へ戻す。

## 状態管理

- `window.__astroLoadingIndicator` により二重初期化を防止します。複数回読み込まれても初期化は一度だけです。
- `isActive` は表示中かどうかのフラグです。
- `trickleInterval` は表示中に進捗を擬似的に進めるタイマーです。
- `thresholdTimeout` は「しきい値を超えたら表示開始する」ための待機タイマーです。

## 使いどころ

遷移中の視覚的フィードバックがほしいが、内容全体を覆うローディングは不要なときに適しています。
