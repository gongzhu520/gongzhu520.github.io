document.addEventListener('DOMContentLoaded', () => {
    // --- [데이터 정의] ---
    // 여기에 항목을 추가하면 체크박스가 자동으로 생깁니다.
    const dataOptions = {
        twitter: ["일상", "RT", "맘찍", "인용트", "글", "그림", "채팅로그", "우울", "욕설", "탐라대화", "앓이", "썰풀이", "OOC제작(배포)", "드림", "연성"],
        play: ["제작", "소비", "OOC"],
        cp: ["HL", "BL", "GL", "ALL", "NCP", "리버시블", "논리버시블", "다인"],
        platform: ["제타", "로판", "케이브덕", "크랙", "블룸", "위프", "펄스", "피즈챗", "잉크챗", "팅글", "멜팅", "캐럿", "러비더비", "플레이툰", "바베챗", "츄챗", "루모", "루나챗", "프엔", "도키챗", "버블챗", "로플챗", "Janitor", "Saucepan", "C.ai", "Pygmalion", "CrushOn", "SpicyChat", "chai.ai", "pephop"],
        tags: ["#멀티(다인)", "#시뮬레이션", "#탑/깁", "#바텀/텍", "#수위", "#연인", "#친구", "#배우자", "#첫사랑", "#짝사랑", "#구원", "#동거", "#플러팅", "#연상", "#연하", "#이웃", "#애증", "#가족", "#NTR", "#NTL", "#순애", "#키잡/역키잡", "#후회", "#복수", "#욕망", "#수치", "#소유욕", "#중년", "#집착", "#근친", "#짭근", "#쓰레기", "#조폭", "#유혹", "#로맨스", "#판타지", "#역사", "#SF", "#이세계", "#무협", "#느와르", "#코미디", "#힐링", "#액션", "#재난", "#공포", "#모험", "#조난", "#방탈출", "#던전", "#신화", "#동화", "#동양풍", "#빙의", "#서양풍", "#황실/왕실", "#환생", "#현대", "#일상", "#변신", "#군인", "#오메가버스", "#센티넬버스", "#학원물", "#음침", "#자낮", "#스토커", "#츤데레", "#쿨데레", "#얀데레", "#다정", "#순정", "#능글", "#햇살", "#히어로/히로인", "#빌런", "#소심", "#무뚝뚝", "#까칠", "#연예인", "#도미넌트", "#서브미시브", "#마조히스트", "#새디스트", "#오타쿠", "#인외", "#천사", "#악마", "#서큐/인큐", "#귀신", "#엘프", "#오크", "#뱀파이어", "#외계인", "#로봇", "#동물", "#수인", "#퍼리", "#용", "#장발", "#안경", "#피어싱", "#동정/처녀"]
    };

    // --- [1. 체크박스 생성기] ---
    function createCheckboxes(containerId, options, viewId, isTag = false) {
        const container = document.getElementById(containerId);
        const viewContainer = document.getElementById(viewId);

        options.forEach(opt => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = opt;
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            container.appendChild(label);

            // 이벤트 리스너: 체크할 때마다 미리보기 갱신
            input.addEventListener('change', () => {
                updateViewList(container, viewContainer, isTag);
            });
        });
    }

    // 화면 갱신 함수
    function updateViewList(inputContainer, viewContainer, isTag) {
        const checked = inputContainer.querySelectorAll('input:checked');
        viewContainer.innerHTML = ''; // 초기화
        
        checked.forEach(chk => {
            const span = document.createElement('span');
            span.textContent = chk.value;
            span.className = isTag ? 'tag-span' : 'list-item';
            viewContainer.appendChild(span);
        });
    }

    // 초기화 실행
    createCheckboxes('checkTwitter', dataOptions.twitter, 'viewTwitter');
    createCheckboxes('checkPlay', dataOptions.play, 'viewPlay');
    createCheckboxes('checkCp', dataOptions.cp, 'viewCp');
    createCheckboxes('checkPlatform', dataOptions.platform, 'viewPlatform');
    createCheckboxes('checkTags', dataOptions.tags, 'viewTags', true);


    // --- [2. 기본 텍스트 및 선택박스 연결] ---
    function bindText(inputId, viewId) {
        document.getElementById(inputId).addEventListener('input', (e) => {
            document.getElementById(viewId).innerText = e.target.value;
        });
    }
    bindText('inputNick', 'viewNick');
    bindText('inputActivity', 'viewActivity');
    bindText('selectAge', 'viewAge');
    bindText('selectFub', 'viewFub');
    bindText('selectRel', 'viewRel');
    bindText('inputPerm', 'viewPerm');
    bindText('inputMine', 'viewMine');
    bindText('inputEtc', 'viewEtc');

    // --- [3. 색상 변경] ---
    const root = document.documentElement;
    document.getElementById('bgPicker').addEventListener('input', (e) => {
        root.style.setProperty('--bg-color', e.target.value);
    });
    document.getElementById('textPicker').addEventListener('input', (e) => {
        root.style.setProperty('--accent-color', e.target.value);
    });

    // --- [4. 이미지 업로드 (페르소나)] ---
    document.getElementById('filePersona').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                document.getElementById('viewPersona').innerHTML = `<img src="${evt.target.result}">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- [5. 이미지 업로드 (정실캐 5칸)] ---
    const favInputs = document.querySelectorAll('.file-fav');
    const favSlots = document.querySelectorAll('.fav-slot');

    favInputs.forEach((input, idx) => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file && favSlots[idx]) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    favSlots[idx].innerHTML = `<img src="${evt.target.result}">`;
                };
                reader.readAsDataURL(file);
            }
        });
    });
});

// --- [6. 이미지 저장 기능] ---
function downloadImage() {
    const captureArea = document.getElementById('captureArea');
    
    // html2canvas 옵션: 고해상도, 투명 배경 방지
    html2canvas(captureArea, {
        scale: 2,
        backgroundColor: null // CSS 배경색을 따름
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'AI_Chat_Profile.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}