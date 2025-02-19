document.addEventListener('DOMContentLoaded', function() {
    const login = document.querySelector('mdui-chip[name="login"]');
    const watch = document.querySelector('mdui-chip[name="watch"]');
    const share = document.querySelector('mdui-chip[name="share"]');
    const moderator = document.querySelector('mdui-chip[name="moderator"]');
    const coinInput = document.querySelector('#coin');
    const coinsSelect = document.querySelector('#coins');
    const experienceInput = document.querySelector('#experience');
    const targetLevelSelect = document.querySelector('#targetLevel');
    const resultButton = document.querySelector('#result');

    resultButton.addEventListener('click', function() {
        // 获取当前经验
        let experience = parseInt(experienceInput.value) || 0;
        // 获取目标等级所需经验
        let targetLevel = parseInt(targetLevelSelect.value) || 28800;
        // 获取每天投币数量
        let dailyCoins = parseInt(coinsSelect.value) || 0;
        // 获取当前金币
        let currentCoins = parseInt(coinInput.value) || 0;

        // 计算可投币天数
        let coinDays = currentCoins / dailyCoins;
        // 计算每天获得的经验
        let dailyExperience = (login.selected ? 5 : 0) + (watch.selected ? 5 : 0) + (share.selected ? 5 : 0) + dailyCoins;
        // 计算可投币加任务天数总获得的经验
        let coinExperience = dailyExperience * coinDays;

        // 计算达到目标等级所需的天数
        if (dailyCoins <= 0) {
            daysNeeded = (targetLevel - experience) / dailyExperience;
        } else if (dailyCoins > 0) {
            daysNeeded = (targetLevel - experience - coinExperience) / dailyExperience + coinDays;
        }



        // 如果没有选择任何选项或输入任何值，则不进行计算
        if (dailyExperience === 0) {
            mdui.snackbar({
                message: "看来你是不想升级了<br>请至少输入要一个值进入计算吧！",
                position: 'bottom',
                timeout: 3000
            });
            return;
        }

        // 输出结果
        if (daysNeeded <= 0) {
            mdui.snackbar({
                message: "太棒了，今天就能完成！",
                position: 'bottom',
                timeout: 3000
            });
        } else {
            mdui.snackbar({
                message: `您需要大约 ${Math.ceil(daysNeeded)} 天才能达到目标等级。`,
                position: 'bottom',
                timeout: 3000
            });
        }
    });
});