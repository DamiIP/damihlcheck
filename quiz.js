const DAMI = (() => {
  const names=['睡眠恢复型','精神活力型','眼睛用眼型','皮肤保养型','体重代谢生活型'];
  const directions=['睡眠与恢复','精神与活力','眼睛与用眼习惯','皮肤日常保养','饮食与体重管理'];
  const questions=[
    '最近两周，入睡或保持睡眠对你来说困难吗？',
    '最近两周，睡醒后仍觉得没有休息好吗？',
    '最近两周，下午容易没精神吗？',
    '最近两周，日常活动后感觉精力不够用吗？',
    '最近两周，长时间看手机或电脑后，眼睛容易疲劳吗？',
    '最近两周，你会连续用眼很久、忘记休息吗？',
    '最近两周，你觉得皮肤干燥、需要更多日常照顾吗？',
    '最近两周，保湿或防晒习惯难以保持规律吗？',
    '最近两周，三餐不规律或常在不饿时吃零食吗？',
    '最近两周，维持活动量和饮食节奏对你来说困难吗？'
  ];
  const advice=[
    ['尽量在相近时间睡觉和起床，给休息留出稳定的时间。','睡前留一段安静的放松时间，减少持续刷手机。'],
    ['把事情分成小段，中间安排短暂休息，观察一天中精力的变化。','保持规律进餐和饮水，安排适合自己的轻量活动。'],
    ['连续看屏幕时定时停下来，看看远处，让眼睛休息。','调整屏幕亮度和阅读距离，避免在昏暗环境长时间用眼。'],
    ['用温和的清洁和保湿步骤，避免频繁更换或叠加刺激性护理。','外出时注意遮阳和日常防晒，选择适合自己皮肤的方式。'],
    ['先让三餐更规律，留意蔬菜、蛋白质食物和饮水的安排。','从适合自己的散步或轻量活动开始，记录习惯而非只关注体重。']
  ];
  function calculate(answers){
    if(answers.length!==10 || answers.some(x=>!Number.isInteger(x)||x<0||x>3)) throw Error('请完成所有题目');
    const scores=names.map((_,i)=>answers[i*2]+answers[i*2+1]);
    const ranked=scores.map((score,i)=>({score,i})).sort((a,b)=>b.score-a.score||a.i-b.i);
    const max=ranked[0].score;
    const tied=ranked.filter(x=>x.score===max);
    const comprehensive=tied.length>1;
    const priorities=ranked.filter(x=>x.score>0).slice(0,2).map(x=>x.i);
    const type=comprehensive?'综合管理型':names[ranked[0].i];
    const letter=comprehensive?'F':'ABCDE'[ranked[0].i];
    const tips=max===0?['继续保持规律作息，给休息留出稳定时间。','保持规律进餐、饮水和适合自己的日常活动。','未来7天简单记录自己的状态，留意习惯与感受的变化。']:priorities.length===1?[...advice[priorities[0]],'未来7天简单记录自己的状态，留意哪些习惯让你感觉更舒适。']:[advice[priorities[0]][0],advice[priorities[1]][0],'未来7天每天记录一次状态，先从一个容易坚持的小习惯开始。'];
    return {scores,priorities,type,letter,tips,max,tied:tied.length};
  }
  return {names,directions,questions,calculate};
})();
if(typeof module!=='undefined') module.exports=DAMI;
