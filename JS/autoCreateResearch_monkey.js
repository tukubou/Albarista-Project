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
        const div_info_bar = /** @type {HTMLElement} */ (document.querySelector("[id=s-result-info-bar-content]"));
        var pTag = document.createElement('p');
        var bTag = document.createElement('button');
        bTag.textContent = "リサーチ管理表作成実行";
        bTag.onclick= function() {
            var index = 0;
            const  intervalId =  setInterval(function(){
                const result_ul = /** @type {HTMLElement} */ (document.querySelector("[id=s-results-list-atf]"));
                const result_li = result_ul.getElementsByTagName('li');
                const container = result_li[index].getElementsByClassName("s-item-container");
                const asin = result_li[index].getAttribute("data-asin");
                localStorage.setItem(index,asin);
                const spacing_base = container[0].getElementsByClassName("a-spacing-base");
                const  position_relative = spacing_base[0].getElementsByTagName("div");
                const a = position_relative[0].getElementsByTagName("a");
                a[0].click();
                index++;
                if(index > 5){ // 一旦5商品
                    clearInterval(intervalId);
                }
            },  2000);
        };
        div_info_bar.appendChild(bTag);
    }else {
        // その他の画面
        for(var j = 0; j < localStorage.length; j++ ){
            const key = localStorage.key(j)
            // 検索結果で保存したASINで遷移先を判断
            if(href.includes(localStorage.getItem(key))){
                // ランキング読み込みのためwaitは長め
                await wait(3000);
                getSelerData(key);
                localStorage.removeItem(key);
                window.close();
                break;
            }
        }
    }
    function getSelerData(key) {
        const div_organizations = /** @type {HTMLElement} */ (document.querySelector("[class='organizationInfo_description']"));
        const a_brand = /** @type {HTMLElement} */ (document.querySelector("[id='bylineInfo']"));
        const span_price = /** @type {HTMLElement} */ (document.querySelector("[id='priceblock_ourprice']"));
        const div_enrich_container = /** @type {HTMLElement} */ (document.querySelector("[class='enrich-container']"));
        const div_enrich_result = div_enrich_container.getElementsByTagName("div");
        const span_enrich_result = div_enrich_result[0].getElementsByTagName("span");
        const category = span_enrich_result[0].textContent;
        const ranking = span_enrich_result[1].textContent.replace( /位/g , "" ).replace( /,/g , "" );
        const url = href;
        // すべてのカスタマーレビューを表示するページに遷移するのが面倒なので全レビュー×割合でgood/badレビューを算出する
        var span_totalReviewCount = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-medium totalReviewCount']"));
        span_totalReviewCount = (!span_totalReviewCount) ? 0 : Number(span_totalReviewCount.textContent) ;
        var a_review_5star = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-base a-link-normal 5star histogram-review-count']"));
        a_review_5star = (!a_review_5star) ? 0 : Number(a_review_5star.textContent.slice( 0, -1 )) ;
        var a_review_4star = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-base a-link-normal 4star histogram-review-count']"));
        a_review_4star = (!a_review_4star) ? 0 : Number(a_review_4star.textContent.slice( 0, -1 )) ;
        var a_review_3star = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-base a-link-normal 3star histogram-review-count']"));
        a_review_3star = (!a_review_3star) ? 0 : Number(a_review_3star.textContent.slice( 0, -1 )) ;
        var a_review_2star = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-base a-link-normal 2star histogram-review-count']"));
        a_review_2star = (!a_review_2star) ? 0 : Number(a_review_2star.textContent.slice( 0, -1 )) ;
        var a_review_1star = /** @type {HTMLElement} */ (document.querySelector("[class='a-size-base a-link-normal 1star histogram-review-count']"));
        a_review_1star = (!a_review_1star) ? 0 : Number(a_review_1star.textContent.slice( 0, -1 )) ;
        const review_good = Math.round((a_review_4star + a_review_5star) * span_totalReviewCount / 100);
        const review_bad = Math.round((a_review_1star + a_review_2star + a_review_3star) * span_totalReviewCount / 100);

        // windows だと ¥" でエスケープ　macだと \" でエスケープ
        const params ="{\"index\":"+key+",\"brand\":\""+a_brand.textContent+"\",\"price\":"+Number(span_price.textContent.replace( /￥/g , "" ).replace( /,/g , "" ))+",\"category\":\""+category+"\",\"ranking\":"+ranking+",\"url\":\""+url+"\",\"review\":{\"good\":"+review_good+",\"bad\":"+review_bad+"}}"
        console.log(params);
        post(params);
    }
    function post(params) {
        // GAS側に投げる
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://script.google.com/macros/s/AKfycbxO08pz9Fu0oUfiJS-GhNK6PeQNoHPpn5ni5H1cY4ZwCxTLaf8/exec",
            data: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            onload: function(response) {
                console.log("posted " + response);
            }
        });
    }
    function wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
})();
