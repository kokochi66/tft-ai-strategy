<h1> 2장 Vue 인스턴스 </h1>
<h2><a href="../chap2/basic_vue.html">Vue.js의 생성자를 이용해서 기본적인 Vue 어플리케이션을 만들기</a></h2>
<pre>
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;script&gt;
    var webstore = new Vue({
        el: &apos;#app&apos;
    });
&lt;/script&gt;
</pre>
<p>
    위와같은 형태를 사용하여, 기본적인 Vue 생성자를 선언할 수 있습니다. 우리가 사용하는 CSS 선택자를 활용해서 HTML의 요소를 매치시키는데, 이 경우에 겹치는 요소가 여러가지 있으 경우에는, 첫번쨰 요소에 어플리케이션을 마운트하게 됩니다.
</p><br>
<pre>
var store = new Vue({
    el: &apos;#app&apos;,
    data: {
        sitename: &quot;Vue.js를 실습하는 페이지&quot;
    }
});
</pre>
<p>
    Vue 객체 안에 데이터를 넣으려면 위와 같이 data 객체를 추가하는 방법을 사용할 수 있습니다. 위에서 변수를 선언하여, 마운트한 어플리케이션 내에서 사용할 수 있게 됩니다.
</p><br>
<pre>
&lt;header&gt;
    &lt;h1 v-text=&quot;sitename&quot;&gt;&lt;/h1&gt;
&lt;/header&gt;
</pre>
<p>
    Vue 객체에 적용할 때에는 위와같이 data에서 적용한 변수이름을 v-text와 같은 형태로 표시하면 됩니다. 이와 관련된 더 자세항 사용방법은 Documentation을 참고하면 됩니다.
</p><br><br>

<h3>필터 함수</h3>
<pre>
var store = new Vue({
    el: &apos;#app&apos;,
    data: { // Vue 옵션에 데이터 객체를 추가하여 데이터를 표시할 수 있습니다.
        sitename: &quot;Vue.js를 실습하는 페이지&quot;,
        product: {
            id: 1,
            title: &quot;첫번째 상품&quot;,
            description: &quot;&lt;em&gt;첫번째 상품&lt;/em&gt;에 대한 설명입니다.&quot;,
            price: 2000, // 우리는 상품의 가격이 2000이 아닌 $20.00 으로 표시되길 원한다.
            image: &quot;assets/images/product_image1.jpg&quot;
        }
    }
});
</pre>
<p> 
    위와같은 코드에서, 가격정보를 2000 그대로가 아닌, $20.00과 같은 금액의 형식으로 출력하고 싶을 때,
    형식화된 값을 출력하도록 하는 필터 함수를 작성할 수 있습니다.
</p><br>
<pre>
formatPrice: function(price) {...}
</pre>
<p>
    필터 함수는 위 객체를 Vue 내부에 선언해줌으로써, 함수를 작성할 수 있습니다.
</p><br>
<pre>
&lt;p class=&quot;price&quot;&gt; {{product.price | formatPrice}} &lt;/p&gt;
</pre>
<p>
    html 내부에서는 위와같은 코드를 작성함으로써, product.price 변수에 담긴값이 필터 함수가 적용되어 출력됩니다.
</p>

