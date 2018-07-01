# Bve5 Language Support for VSCode

![bve5-language-support](images/language-support.png)

VSCodeでBveTrainsim5.7構文をサポートするための拡張です。

## Features

以下の機能をサポートしています。
- シンタックスハイライト
- コード補完
- ホバー表示
- 構文のヒント表示(シグネチャヘルプ)
- スニペット挿入
- マップファイルの距離程表示

![snippet-sample](images/snippets.gif)

現在はBveTs5.7のマップファイルのみに対応しています。その他の構文は今後対応予定です。

## Requirements

- VSCode 1.24以上

## How to use this extension?

1. [Visual Studio Code](https://code.visualstudio.com)をインストールして起動し、 `Ctrl+Shift+X`、もしくは`Cmd+Shift+X`を入力して拡張機能パネルを開いてください。 
2. [Marketplace](https://marketplace.visualstudio.com/items?itemName=aoisupersix.bve5-language-support)から`Bve5 Language Support`を検索してインストールします。
3. `Map.txt`という名前のファイルを開く/保存するか、`言語モードの選択`をクリックして`BveTs Map 2.02`を選択することで拡張を有効化することが出来ます。

## Release Notes

詳細は[CHANGELOG](CHANGELOG.md)を見てください。

### 0.2.0 - 2018/07/01
- ホバー表示の実装
- 一部抜けていた構文を追加

### 0.1.0 - 2018/06/30
- Initial release.

-----------------------------------------------------------------------------------------------------------

## License

The MIT License(MIT)

Copyright(c) 2018 aoisupersix

[License.md](LICENSE.md)
