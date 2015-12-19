var Hangman = function(answers) {
    if(!(answers instanceof Array)) { throw new Error(''); }
    this.answers = answers; // 문제 목록 (최대 5개여야 하는데 그 처리는 나중에;;)
    this.problem = '';   // 현재 풀이중인 문제
    this.idx = -1;       // 정답 인덱스
    this.guessList = ''; // 입력한 캐릭터 목록
    this.failCount = 0;// 틀린 카운트
};

// 문제 풀이를 시작
Hangman.prototype.start = function() {
    this.idx = (Math.random() * this.answers.length)|0;
    this.guessList = '';
    this.failCount = 0;
    
    this.problem = new Array(this.getAnswer().length+1).join("_");
    
    console.log("자~ 그럼 문제 하나 나갑니다 : " + this.problem);
};

// 현재 정답을 얻어온다.
Hangman.prototype.getAnswer = function() {
    return this.answers[this.idx];
};

// 문제 풀이(c에 캐릭터를 넣어 맞춰보자)
// 7번 틀리면 망ㅋ함ㅋ
Hangman.prototype.guess = function(c) {
    // c가 한글자 스트링인지 검사한다.
    if(typeof c !== 'string' || c.length!==1) {
        console.log("한 글자를 넣어야지 임마 ㅡㅡㅋ");
        return;
    }
    
    // c가 이미 guessList에 포함되었는지 본다.
    if(this.guessList.indexOf(c)>=0) {
        console.log("부른 거 또 부르지 마라. 형님 피곤하다 ㅡㅡㅋ");
        return;
    }
    
    // 현재 답에 c가 포함되었는지 검사한다.
    var ans = this.getAnswer();
    if(ans.indexOf(c)>=0) {
        // 포함되었으면 problem을 업데이트한다.
        for(var i=0; i<ans.length; ++i) {
            ans[i]==c && (this.problem = this.problem.splice(i, 1, c));
        }
        console.log('하나 맞췄네요 : ', this.problem);
        
        // 모든 단어를 다 찾았다면, 게임이 더 진행될 이유가 없음
        if(this.problem.indexOf('_')<0) {
            this.gameOver('오~~~~ 촘 하시는듯?');
        }
    } else {
        // 안 됐으면 failCount를 하나 올린다.
        console.log("땡! 지금까지" + (++this.failCount) + '개 틀리셨네요 : ' + this.problem);
        // failCount가 7??이 되면 게임 오버를 선언한다.
        if(this.failCount>=7) {
            this.gameOver('다음에는 좀 더 잘해 보셩');
        }
    }
    
    
    
    //guessList에 c를 추가한다.
    this.guessList += c;
    
    // PROFIT!!!
};

// 게임 오버 메시지
Hangman.prototype.gameOver = function(msg) {
    console.log(msg);
    console.log("**** 게임이 끝났습니다. 정답은 " + this.getAnswer() + "였습니다. ***");
    this.idx = -1;
    this.problem = '';
    this.failCount = 0;
};

// 뚜둥! 여러분 이런 건 따라하시면 안 됩니다. 
// Array.prototype.splice와 동작이 달라 ㅡㅡㅋ
// 지금 인덱스도 Array index하고 따로 놉니다. 이건 좀 나중에 고치는걸로
String.prototype.splice = function(idx, delCount, replaceStr) {
    var f = this.substr(0, idx);
    var t = this.substr(idx + delCount);   // delCount는 어따 팔아먹고?
    return f + replaceStr + t;
};

// 귀찮으니까 ㅎㅎ
var h = new Hangman(['hello', 'world', 'synapsoft', 'pikicast']);