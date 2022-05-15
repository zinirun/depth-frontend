import parse from "html-react-parser";

const PrivacyPolicyContent = `<style>
html,
body {
	margin: 0;
	padding: 0;
}
@media only screen {
	body {
		margin: 2em auto;
		max-width: 900px;
		color: rgb(55, 53, 47);
	}
}

body {
	line-height: 1.5;
	white-space: pre-wrap;
}

a,
a.visited {
	color: inherit;
	text-decoration: underline;
}

.pdf-relative-link-path {
	font-size: 80%;
	color: #444;
}

h1,
h2,
h3 {
	letter-spacing: -0.01em;
	line-height: 1.2;
	font-weight: 600;
	margin-bottom: 0;
}

.page-title {
	font-size: 2rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.75em;
}

h1 {
	font-size: 1.875rem;
	margin-top: 1.875rem;
}

h2 {
	font-size: 1.5rem;
	margin-top: 1.5rem;
}

h3 {
	font-size: 1.25rem;
	margin-top: 1.25rem;
}

.source {
	border: 1px solid #ddd;
	border-radius: 3px;
	padding: 1.5em;
	word-break: break-all;
}

.callout {
	border-radius: 3px;
	padding: 1rem;
}

figure {
	margin: 1.25em 0;
	page-break-inside: avoid;
}

figcaption {
	opacity: 0.5;
	font-size: 85%;
	margin-top: 0.5em;
}

mark {
	background-color: transparent;
}

.indented {
	padding-left: 1.5em;
}

hr {
	background: transparent;
	display: block;
	width: 100%;
	height: 1px;
	visibility: visible;
	border: none;
	border-bottom: 1px solid rgba(55, 53, 47, 0.09);
}

img {
	max-width: 100%;
}

@media only print {
	img {
		max-height: 100vh;
		object-fit: contain;
	}
}

@page {
	margin: 1in;
}

.collection-content {
	font-size: 0.875rem;
}

.column-list {
	display: flex;
	justify-content: space-between;
}

.column {
	padding: 0 1em;
}

.column:first-child {
	padding-left: 0;
}

.column:last-child {
	padding-right: 0;
}

.table_of_contents-item {
	display: block;
	font-size: 0.875rem;
	line-height: 1.3;
	padding: 0.125rem;
}

.table_of_contents-indent-1 {
	margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
	margin-left: 3rem;
}

.table_of_contents-indent-3 {
	margin-left: 4.5rem;
}

.table_of_contents-link {
	text-decoration: none;
	opacity: 0.7;
	border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

table,
th,
td {
	border: 1px solid rgba(55, 53, 47, 0.09);
	border-collapse: collapse;
}

table {
	border-left: none;
	border-right: none;
}

th,
td {
	font-weight: normal;
	padding: 0.25em 0.5em;
	line-height: 1.5;
	min-height: 1.5em;
	text-align: left;
}

th {
	color: rgba(55, 53, 47, 0.6);
}

ol,
ul {
	margin: 0;
	margin-block-start: 0.6em;
	margin-block-end: 0.6em;
}

li > ol:first-child,
li > ul:first-child {
	margin-block-start: 0.6em;
}

ul > li {
	list-style: disc;
}

ul.to-do-list {
	text-indent: -1.7em;
}

ul.to-do-list > li {
	list-style: none;
}

.to-do-children-checked {
	text-decoration: line-through;
	opacity: 0.375;
}

ul.toggle > li {
	list-style: none;
}

ul {
	padding-inline-start: 1.7em;
}

ul > li {
	padding-left: 0.1em;
}

ol {
	padding-inline-start: 1.6em;
}

ol > li {
	padding-left: 0.2em;
}

.mono ol {
	padding-inline-start: 2em;
}

.mono ol > li {
	text-indent: -0.4em;
}

.toggle {
	padding-inline-start: 0em;
	list-style-type: none;
}

/* Indent toggle children */
.toggle > li > details {
	padding-left: 1.7em;
}

.toggle > li > details > summary {
	margin-left: -1.1em;
}

.selected-value {
	display: inline-block;
	padding: 0 0.5em;
	background: rgba(206, 205, 202, 0.5);
	border-radius: 3px;
	margin-right: 0.5em;
	margin-top: 0.3em;
	margin-bottom: 0.3em;
	white-space: nowrap;
}

.collection-title {
	display: inline-block;
	margin-right: 1em;
}
p {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}
</style><article id="a96e9e48-b1d2-4e39-aa78-f63298205285" class="page sans"><header><h1 class="page-title">개인정보 취급방침</h1></header><div class="page-body"><p id="eb9e16a3-4ded-4cb9-8dff-1a1cdb6f906f" class="">&lt;Depth Labs&gt;(&#x27;depth.so&#x27;이하 &#x27;Depth&#x27;)은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p><p id="91626c7f-fc27-4837-9215-8f47d0310cd0" class="">○ 이 개인정보처리방침은 2022년 5월 15일부터 적용됩니다.</p><h3 id="a8dbe44c-ee9b-42bb-8ab4-1aae577aac53" class=""><strong>제1조(개인정보의 처리 목적)</strong></h3><p id="25a389cc-8b8c-471b-98b7-7eab01e812f4" class=""><strong>&lt; Depth Labs &gt;(&#x27;depth.so&#x27;이하 &#x27;Depth&#x27;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</strong></p><p id="3ad90772-9cbe-4c59-8c1c-2c8cdfe7801c" class="">1. 홈페이지 회원가입 및 관리</p><p id="23bd2e24-51cd-46da-af5c-fcf1ce053d79" class="">회원자격 유지·관리 목적으로 개인정보를 처리합니다.</p><p id="fecfce9a-a7fd-48cd-b2f7-e88c693a0383" class="">2. 재화 또는 서비스 제공</p><p id="09d13ec3-2160-4320-a520-b8d04bfe788d" class="">서비스 제공, 콘텐츠 제공을 목적으로 개인정보를 처리합니다.</p><p id="76af5dfa-a8e1-4929-8eaf-f8bc7cb78745" class="">
</p><h3 id="c01b0ca6-2bf9-40fa-8403-834c119005a0" class=""><strong>제2조(개인정보의 처리 및 보유 기간)</strong></h3><p id="d48eb488-dde2-4d0c-a764-1aea5c368741" class="">① &lt; Depth Labs &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<div class="indented"><ol type="1" id="e49bbedf-dfee-41bd-9e4c-1de71076e7b6" class="numbered-list" start="1"><li>&lt;홈페이지 회원가입 및 관리&gt;<p id="ae18ff4c-09d8-483c-9394-d73cd82b5656" class="">&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p><p id="141b2969-0050-4cbc-98c7-9d20bd259647" class="">보유근거 : OTQ 서비스 이용과 컨텐츠 제공</p><p id="d342430c-8cf6-456a-8e32-f67a55a74b91" class="">관련법령 : 계약 또는 청약철회 등에 관한 기록 : 5년</p></li></ol></div></p><p id="9a048ec5-fca9-49ff-9b3b-891d1c3f6d98" class="">
</p><h3 id="8c3f4b48-0715-4b42-b487-9b5bb7fe13a0" class=""><strong>제3조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</strong></h3><p id="1cfa6e72-8efc-4068-811b-2f41f8716ca8" class="">① 정보주체는 Depth Labs에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p><p id="3a42b433-9160-44fd-9191-1a0df9fd9b80" class="">② 제1항에 따른 권리 행사는Depth Labs에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 Depth Labs은(는) 이에 대해 지체 없이 조치하겠습니다.</p><p id="66790c65-8540-4b73-953d-1269e407dd6c" class="">③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p><p id="0f50e282-1bc4-40cd-9e38-2161f5dee09e" class="">④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p><p id="3f510782-265f-42f3-a85c-e5b4d3559d09" class="">⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p><p id="dc969f44-2ddb-4d25-824d-3c0762afa2d6" class="">⑥ Depth Labs은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p><p id="a1368804-0a6c-45ee-acd5-73bdbcfa0b69" class="">
</p><h3 id="53515a28-d934-4f29-a583-7ce6f00e2df0" class=""><strong>제4조(처리하는 개인정보의 항목 작성)</strong></h3><p id="7737130b-555b-49f0-bd66-2914af2b00d6" class="">① &lt; Depth Labs &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p><ol type="1" id="369c6973-f26c-4521-bcbc-26a8199c1699" class="numbered-list" start="1"><li>&lt; 홈페이지 회원가입 및 관리 &gt;<ul id="ae3e5e23-cfc6-4e3e-8e92-aa93c3cedad5" class="bulleted-list"><li style="list-style-type:disc">필수항목 : 이메일, 휴대전화번호, 비밀번호, 로그인ID, 이름, 회사명, 접속 로그, 쿠키</li></ul></li></ol><p id="c6e1deb0-9fd1-465a-96e4-b677b99fe35c" class="">
</p><h3 id="dca4ae72-b03d-4c7b-9a13-b605a014fd0a" class=""><strong>제5조(개인정보의 파기)</strong></h3><p id="5de347b3-8937-4247-bab0-6101b5bc692e" class="">① &lt; Depth Labs &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p><p id="3b0f0d4b-6eca-4f39-892c-5a7bc86ba141" class="">② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p><p id="3ac26e54-b366-4656-8c4f-9553f4165536" class="">③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p><p id="42942c46-9642-4af8-982d-6caafe853248" class="">1. 파기절차</p><p id="805ffd3f-aade-4f68-b97a-19e7b8e19a9e" class="">&lt; Depth Labs &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; Depth Labs &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</p><p id="4c8e7eda-a25a-4825-9b67-42d10420d4f3" class="">2. 파기방법</p><p id="06741989-0a4a-4a87-b7c5-f086aaaf8c1e" class="">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p><p id="5b98b1a2-b50e-48ab-ad43-5e1c7493da38" class="">종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p><h3 id="6bc47ef5-f0fc-4d2a-ad2d-30f3797ea9ac" class="">
<strong>제6조(개인정보의 안전성 확보 조치)</strong></h3><p id="95e5bd8a-4e05-439d-80a9-8c4bc900c3d4" class=""><strong>&lt; Depth Labs &gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</strong>
1. 정기적인 자체 감사 실시</p><p id="60555f35-f969-4fc9-89cb-f676febbbbfa" class="">개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</p><p id="f1d13133-5999-44f0-a51f-fa4530efe33f" class="">2. 개인정보 취급 직원의 최소화 및 교육</p><p id="3e1920a8-5520-4d7b-8795-102159ac549b" class="">개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</p><p id="11475a95-dc21-4874-bcc7-28bf357c9245" class="">3. 내부관리계획의 수립 및 시행</p><p id="f61c1dff-2a79-4613-8e6e-67360ae5ab9a" class="">개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</p><p id="f641d2e6-2378-40b9-a91e-81802f0ddd80" class="">4. 해킹 등에 대비한 기술적 대책</p><p id="60ca160c-8a30-42a1-aa56-d7f8817f3477" class="">&lt;Depth Labs&gt;(&#x27;Depth&#x27;)은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</p><p id="041b796c-43f6-4659-b3aa-297a352c8c2f" class="">5. 개인정보의 암호화</p><p id="22309650-2921-426d-a6f7-cd077df34cef" class="">이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</p><p id="f98b8eb0-6ed8-4071-9580-441b447e4775" class="">6. 접속기록의 보관 및 위변조 방지</p><p id="82fcbc6b-e8be-4b26-b0d0-32110517603d" class="">개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며,다만, 5만명 이상의 정보주체에 관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상 보관, 관리하고 있습니다.또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</p><p id="7249de04-b200-44f7-92d4-39bc133723f7" class="">7. 개인정보에 대한 접근 제한</p><p id="88181059-5a39-4a00-947a-8cfed84e836b" class="">개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p><p id="a20a95ea-fbc4-4f05-9461-e4675f89312a" class="">8. 문서보안을 위한 잠금장치 사용</p><p id="c0c9374a-512b-478d-a8a0-01e6912ca28d" class="">개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</p><p id="26a0329c-fdeb-4879-b88f-30240934bd28" class="">9. 비인가자에 대한 출입 통제</p><p id="d0253fe8-95a6-445e-a233-15c60849b816" class="">개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</p><p id="41b12ac0-4fa5-4145-a796-41daac6a00bb" class="">
</p><h3 id="3c8f4bec-e45e-4c05-a532-4c4ecb1338b8" class="">제7조<strong>(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)</strong></h3><p id="f2511150-a02c-43da-891f-825323c45f5d" class="">① Depth Labs 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</p><p id="c05f6c7f-fced-4fa5-8269-4277814d6af9" class="">② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</p><p id="eaa00b36-d4df-4e5d-9fea-1438f2ca9de0" class="">가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</p><p id="9be9e6f3-9517-47f7-8996-2836ada7d088" class="">나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.</p><p id="3ca11b06-8034-4cd6-9438-6f6702fa2858" class="">다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p><h3 id="ba05b3ca-19c8-411b-83f9-bb92358870fd" class="">
<strong>제8조 (개인정보 보호책임자)</strong></h3><p id="606efc0f-9f91-46de-ade7-8cf5cefa8df5" class="">① Depth Labs 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
• 개인정보 보호책임자
• 성명 :허전진
• 직급 :Tech Lead
• 연락처 :01049414921, contact@depth.so
※ 개인정보 보호 담당부서로 연결됩니다.</p><p id="27d737cb-62b2-4988-ada9-b7182d4e3f48" class="">
• 개인정보 보호 담당부서
• 부서명 :개발팀
• 담당자 :허전진
• 연락처 :01049414921, zini@depth.so</p><p id="38cb43c0-4c04-4009-80c7-262f244d6204" class="">
② 정보주체께서는 Depth Labs 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. Depth Labs 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p><h3 id="f34229cd-98ce-48bc-a756-0b13d31c266e" class="">
<strong>제9조(개인정보 열람청구)</strong></h3><p id="084d4690-1466-4683-89dd-355dfdd8ca84" class=""><strong>정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.&lt; Depth Labs &gt;은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</strong>
• 개인정보 열람청구 접수·처리 부서
• 부서명 : 개발팀
• 담당자 : zini
• 연락처 : 01049414921, zini@depth.so</p><h3 id="c77b035a-3c06-448b-a317-bdaf1816a86b" class="">
<strong>제10조(권익침해 구제방법)</strong></h3><p id="494c0fe1-3cf8-4847-89f8-324af4063f7d" class="">정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p><h3 id="d0b5ef85-d0b1-4555-9165-78e53e83e02f" class="">
<strong>제11조(개인정보 처리방침 변경)</strong></h3><p id="38032ac6-797d-4319-a40d-1f048799563e" class="">① 이 개인정보처리방침은 2022년 5월 15일부터 적용됩니다.</p><p id="731d6fca-841b-412c-83fd-14fc654dd065" class="">
</p></div></article>`;

export default function PrivacyPolicyPage() {
  return <div>{parse(PrivacyPolicyContent)}</div>;
}
