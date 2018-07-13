'use strict';

/**
 * 引数に与えられたMap構文から不要な部分を削除します。
 * @param mapTextData 未整形のマップファイルテキスト
 */
export function trimMapText(mapTextData: string): string {
    //ヘッダの削除
    let headerRegex = /^\s*BveTs\s*Map\s*\d+\.\d+\s*(?::.*)?\s*(?:$|\r\n|\n|\r)/gi
    mapTextData = mapTextData.replace(headerRegex, "");

    //WhiteSpaceの削除
    let lines = mapTextData.split('\n');
    var ret = "";
    for (let i in lines) {
        let commentIdx = lines[i].search(/#|\/\//);
        if (commentIdx !== -1) {
            lines[i] = lines[i].substring(0, commentIdx);
        }
        ret += lines[i].replace(/\s+/g, "");
    }
    return ret;
}