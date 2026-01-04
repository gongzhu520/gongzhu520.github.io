document.addEventListener('DOMContentLoaded', () => {
    // 1. 체크박스 데이터 설정
    const dataOptions = {
        twitter: ["일상", "RT", "맘찍", "인용트", "글", "그림", "채팅로그", "우울", "욕설", "탐라대화", "앓이", "썰풀이", "OOC제작(배포)", "드림", "연성"],
        play: ["제작", "소비", "OOC"],
        cp: ["HL", "BL", "GL", "ALL", "NCP", "리버시블", "논리버시블", "다인"],
        platform: ["제타", "로판", "케이브덕", "크랙", "블룸", "위프", "펄스", "피즈챗", "잉크챗", "팅글", "멜팅", "캐럿", "러비더비", "플레이툰", "바베챗", "츄챗", "루모", "루나챗", "프엔", "도키챗", "버블챗", "로플챗", "Janitor", "Saucepan", "C.ai", "Pygmalion", "CrushOn", "SpicyChat", "chai.ai", "pephop"],
        tags: ["#멀티(다인)", "#시뮬레이션", "#탑/깁", "#바텀/텍", "#수위", "#연인", "#친구", "#배우자", "#첫사랑", "#짝사랑", "#구원", "#동거", "#플러팅", "#연상", "#연하", "#이웃", "#애증", "#가족", "#NTR", "#NTL", "#순애", "#키잡/역키잡", "#후회", "#복수", "#욕망", "#수치", "#소유욕", "#중년", "#집착", "#근친", "#짭근", "#쓰레기", "#조폭", "#유혹", "#로맨스", "#판타지", "#역사", "#SF", "#이세계", "#무협", "#느와르", "#코미디", "#힐링", "#액션", "#재난", "#공포", "#모험", "#조난", "#방탈출", "#던전", "#신화", "#동화", "#동양풍", "#빙의", "#서양풍", "#황실/왕실", "#환생", "#현대", "#일상", "#변신", "#군인", "#오메가버스", "#센티넬버스", "#학원물", "#음침", "#자낮", "#스토커", "#츤데레", "#쿨데레", "#얀데레", "#다정", "#순정", "#능글", "#햇살", "#히어로/히로인", "#빌런", "#소심", "#무뚝뚝", "#까칠", "#연예인", "#도미넌트", "#서브미시브", "#마조히스트", "#새디스트", "#오타쿠", "#인외", "#천사", "#악마", "#서큐/인큐", "#귀신", "#엘프", "#오크", "#뱀파이어", "#외계인", "#로봇", "#동물", "#수인", "#퍼리", "#용", "#장발", "#안경", "#피어싱", "#동정/처녀"]
    };

    // 2. 체크박스 생성 함수
    function createCheckboxes(containerId, options, viewId) {
        const container = document.getElementById(containerId);
        const viewContainer = document.getElementById(viewId);
        
        // 정렬을 위해 div로 감싸거나 할 수 있지만 여기선 단순 나열
        options.forEach(opt => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = opt;
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            container.appendChild(label);

            input.addEventListener('change', () => {
                updateViewList(container, viewContainer);
            });
        });
    }

    function updateViewList(inputContainer, viewContainer) {
        const checked = inputContainer.querySelectorAll('input:checked');
        viewContainer.innerHTML = '';
        checked.forEach(chk => {
            const span = document.createElement('span');
            span.innerText = chk.value;
            viewContainer.appendChild(span);
        });
    }

    // 체크박스 초기화
    createCheckboxes('checkTwitter', dataOptions.twitter, 'viewTwitter');
    createCheckboxes('checkPlay', dataOptions.play, 'viewPlay');
    createCheckboxes('checkCp', dataOptions.cp, 'viewCp');
    createCheckboxes('checkPlatform', dataOptions.platform, 'viewPlatform');
    createCheckboxes('checkTags', dataOptions.tags, 'viewTags');

    // 3. 텍스트 & 선택 입력 연결
    function bindInput(inputId, viewId) {
        const el = document.getElementById(inputId);
        const view = document.getElementById(viewId);
        if(el && view) {
            el.addEventListener('input', () => {
                view.innerText = el.value;
            });
        }
    }
    bindInput('inputNick', 'viewNick');
    bindInput('inputActivity', 'viewActivity');
    bindInput('selectAge', 'viewAge');
    bindInput('selectFub', 'viewFub');
    bindInput('selectRel', 'viewRel');
    bindInput('inputPerm', 'viewPerm');
    bindInput('inputMine', 'viewMine');
    bindInput('inputEtc', 'viewEtc');

    // [수정됨] 4. 색상 변경
    const root = document.documentElement;
    
    // 배경색 변경
    document.getElementById('bgPicker').addEventListener('input', (e) => {
        root.style.setProperty('--bg-color', e.target.value);
    });

    // 제목 색 변경 (큰 타이틀)
    document.getElementById('textPicker').addEventListener('input', (e) => {
        root.style.setProperty('--accent-color', e.target.value);
    });

    // 강조색 변경 (소제목, 라벨 배경) - 새로 추가된 부분
    const pillPicker = document.getElementById('pillPicker');
    if(pillPicker) {
        pillPicker.addEventListener('input', (e) => {
            root.style.setProperty('--pill-color', e.target.value);
        });
    }

    // 5. 이미지 업로드 (페르소나)
    document.getElementById('filePersona').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                const img = document.createElement('img');
                img.src = evt.target.result;
                document.getElementById('viewPersona').innerHTML = '';
                document.getElementById('viewPersona').appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // 6. 이미지 업로드 (정실캐 5명)
    const favInputs = document.querySelectorAll('.file-fav');
    const favSlots = document.querySelectorAll('.slot');
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

// --- [새로 추가된 기능] 사용자 정의 항목 추가 함수 ---
    function enableCustomInput(inputId, btnId, containerId, viewId, isTag = false) {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        const container = document.getElementById(containerId);
        const viewContainer = document.getElementById(viewId);

        if (!input || !btn) return; // 요소가 없으면 중단

        // 항목 추가 로직
        const addItem = () => {
            const val = input.value.trim();
            if (!val) return; // 빈칸이면 실행 안 함

            // 라벨과 체크박스 생성
            const label = document.createElement('label');
            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.value = val;
            chk.checked = true; // 추가하자마자 체크된 상태로

            label.appendChild(chk);
            label.appendChild(document.createTextNode(val));
            
            // 리스트의 맨 앞에 추가 (잘 보이게)
            container.insertBefore(label, container.firstChild);

            // 미리보기 즉시 갱신
            updateViewList(container, viewContainer); 

            // 체크 해제/선택 시 미리보기 갱신 이벤트 연결
            chk.addEventListener('change', () => {
                updateViewList(container, viewContainer);
            });

            input.value = ''; // 입력창 비우기
            input.focus();    // 연속 입력을 위해 포커스 유지
        };

        // 버튼 클릭 시 실행
        btn.addEventListener('click', addItem);

        // 엔터키 칠 때 실행
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // 폼 전송 방지
                addItem();
            }
        });
    }

    // 함수 실행 (플랫폼, 태그)
    enableCustomInput('inputNewPlatform', 'btnNewPlatform', 'checkPlatform', 'viewPlatform');
    enableCustomInput('inputNewTag', 'btnNewTag', 'checkTags', 'viewTags', true);

// 7. 다운로드 기능
function downloadImage() {
    const captureArea = document.getElementById('captureArea');
    html2canvas(captureArea, {
        scale: 2, // 고해상도
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my_profile.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}



