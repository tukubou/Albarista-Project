// @ts-check
// ==UserScript==
// @name     Amazon自動操作
// @version      1.0
// @description Amazon自動操作
// @author       anonymouse
// @match        https://www.amazon.co.jp/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async() => {
    const href = location.href;
    await wait(0.7);
     if (href.includes("https://www.amazon.co.jp/s/")) {
         // 検索結果画面
        localStorage.clear();
        const divInfoBar = /** @type {HTMLElement} */ (document.querySelector("[id=s-result-info-bar-content]"));
        let bTag = document.createElement('button');
        bTag.textContent = "リサーチ管理表作成実行";
        bTag.onclick = function() {
            if(confirm("作成実行")) {
                let index = 0;
                 bTag.textContent = "リサーチ管理表作成中";
                const ulResult = /** @type {HTMLElement} */ (document.querySelector("[id=s-results-list-atf]"));
                const liResult = ulResult.getElementsByClassName("s-result-item s-result-card-for-container-noborder s-carded-grid celwidget");
                const intervalId = setInterval(function() {
                     bTag.textContent = "リサーチ管理表作成中    :    " + (index+1) + "件目";
                    if(liResult[index].getElementsByTagName("h5").length == 0) {
                        // スポンサープロダクトの表示がない場合
                        const asin = liResult[index].getAttribute("data-asin");
                        localStorage.setItem(index,asin);
                        const container = liResult[index].getElementsByTagName("div");
                        const spacingBase = container[0].getElementsByClassName("a-spacing-base");
                        const positionRelative = spacingBase[0].getElementsByTagName("div");
                        const aTag = positionRelative[0].getElementsByTagName("a");
                        aTag[0].click();
                    }
                    index++;
                    if(index >= liResult.length) {
                        bTag.textContent = "リサーチ管理表作成中    完了";
                        clearInterval(intervalId);
                    }
                }, 6000);
            };
        }
        divInfoBar.appendChild(bTag);
    }else {
        // その他の画面
        for(const key in localStorage) {
            // 検索結果で保存したASINで遷移先を判断
            if(href.includes(localStorage.getItem(key))) {
                // ランキング読み込みのためwaitは長め
                await wait(6000);
                getSelerData(key);
                localStorage.removeItem(key);
                window.close();
                break;
            }
        }
    }
    function getSelerData(key) {
      　　// 商品詳細ページの情報取得
        const rankingLimit = 3000;
        const divOrganizations = /** @type {HTMLElement} */ (document.querySelector("[class='organizationInfo_description']"));
        const aBrand = /** @type {HTMLElement} */ (document.querySelector("[id='bylineInfo']"));
        const spanPrice = /** @type {HTMLElement} */ (document.querySelector("[id='priceblock_ourprice']"));
        const divEnrichContainer = /** @type {HTMLElement} */ (document.querySelector("[class='enrich-container']"));
        const divEnrichResult = divEnrichContainer.getElementsByTagName("div");
        const spanEnrichResult = divEnrichResult[0].getElementsByTagName("span");
        const category = spanEnrichResult[0].textContent;
        const ranking = spanEnrichResult[1].textContent.replace( /位/g , "" ).replace( /,/g , "" );
        const image = /** @type {HTMLElement} */ (document.querySelector("[id='landingImage']"));

        // すべてのカスタマーレビューを表示するページに遷移するのが面倒なので全レビュー×割合でgood/badレビューを算出する
        let map = new Map([
            ['totalReviewCount', 0],
            ['1star', null], ['2star', null], ['3star', null],
            ['4star', null], ['5star', null]
        ]);
        for (const [key, value] of map) {
            if(key === 'totalReviewCount') {
                let countRaw = /** @type {HTMLElement} */ (document.querySelector(`[class='a-size-medium ${key}']`) );
                map.set(key,(!countRaw) ? 0 : Number(countRaw.textContent) );
            } else {
                let countRaw = /** @type {HTMLElement} */ (document.querySelector(`[class='a-size-base a-link-normal ${key} histogram-review-count']`) );
                map.set(key, (!countRaw) ? 0 : Number(countRaw.textContent.slice( 0, -1 ) ) );
            }
        }
        const reviewGood = Math.round((map.get('4star') + map.get('5star')) * map.get('totalReviewCount') / 100);
        const reviewBad = Math.round(( map.get('1star') + map.get('2star') + map.get('3star')) * map.get('totalReviewCount') / 100);

        // windows だと ¥" でエスケープ　macだと \" でエスケープ
        const params = `{\"index\": ${key} ,\"brand\":\"${aBrand.textContent}\",\"price\": ${ Number(spanPrice.textContent.replace( /￥/g , "" ).replace( /,/g , "" ))} ,
        \"category\":\"${ category}\",\"ranking\": ${ranking} ,\"rankingLimit\": ${rankingLimit} ,\"url\":\"${href}\",\"image\":\"${image.src}\",\"review\":{\"good\": ${reviewGood} ,\"bad\": ${reviewBad} }}`;
        post(params);
    }
    function post(params) {
        // GAS側に投げる
        GM_xmlhttpRequest( {
            method: "POST",
            url: "https://script.google.com/macros/s/AKfycbxO08pz9Fu0oUfiJS-GhNK6PeQNoHPpn5ni5H1cY4ZwCxTLaf8/exec",
            data: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            onload: function(response) {
            }
        });
    }
    function wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
})();
