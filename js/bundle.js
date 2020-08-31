(function () {
	'use strict';

	var Scene = Laya.Scene;
	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    var test;
	    (function (test) {
	        class battleFieldUI extends Scene {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/battleField");
	            }
	        }
	        test.battleFieldUI = battleFieldUI;
	        REG("ui.test.battleFieldUI", battleFieldUI);
	        class MainUiUI extends Scene {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/MainUi");
	            }
	        }
	        test.MainUiUI = MainUiUI;
	        REG("ui.test.MainUiUI", MainUiUI);
	        class outLineEffectUI extends Scene {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/outLineEffect");
	            }
	        }
	        test.outLineEffectUI = outLineEffectUI;
	        REG("ui.test.outLineEffectUI", outLineEffectUI);
	    })(test = ui.test || (ui.test = {}));
	})(ui || (ui = {}));

	class AniName {
	    static i2AniFunction(t) {
	        return this.i2AniMap.get(t);
	    }
	}
	AniName.idle = "guy_idle";
	AniName.chargingA = "guy_chargingA";
	AniName.chargingB = "guy_chargingB";
	AniName.dash = "guy_dash";
	AniName.fall = "guy_fall";
	AniName.hurt = "guy_hurt";
	AniName.loseBalanc = "guy_loseBalanc";
	AniName.roll = "guy_roll";
	AniName.Lady_die = "enemy/Lady_die";
	AniName.Lady_idle = "enemy/Lady_idle";
	AniName.fat_die = "enemy/fat_die";
	AniName.fat_idle = "enemy/fat_idle";
	AniName.slim_die = "enemy/slim_die";
	AniName.slim_idle = "enemy/slim_idle";
	AniName.NoPeeSign_die = "item/NoPeeSign_die";
	AniName.NoPeeSign_idle = "item/NoPeeSign_idle";
	AniName.car_die = "item/car_die";
	AniName.car_idle = "item/car_idle";
	AniName.oildrum_die = "item/oildrum_die";
	AniName.oildrum_idle = "item/oildrum_idle";
	AniName.ttrlSign_die = "item/ttrlSign_die";
	AniName.ttrlSign_idle = "item/ttrlSign_idle";

	class BezierPath {
	    static CreateBezierPoints(anchorpoints, pointAmount) {
	        var points = [];
	        for (var i = 0; i < pointAmount; i++) {
	            var point = this.MultiPointBezier(anchorpoints, i / pointAmount);
	            points.push(point);
	        }
	        return points;
	    }
	    static MultiPointBezier(points, t) {
	        let len = points.length;
	        let x = 0, y = 0;
	        for (let i = 0; i < len; i++) {
	            let point = points[i];
	            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
	            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
	        }
	        return { x: x, y: y };
	    }
	    static erxiangshi(start, end) {
	        let cs = 1, bcs = 1;
	        while (end > 0) {
	            cs *= start;
	            bcs *= end;
	            start--;
	            end--;
	        }
	        return (cs / bcs);
	    }
	    ;
	}

	class Configuration {
	}
	Configuration.C_DAY = 24 * 60 * 60 * 1000;
	Configuration.InitScene = "test/MainUi.scene";
	Configuration.audioPlay = true;
	Configuration.startCgPlay = false;
	Configuration.endCgPlay = false;
	Configuration.currentAlreadyLevel = 1;
	Configuration.currentSelectLevel = 1;
	Configuration.holdGoldNum = 0;
	Configuration.levelNum = 20;
	Configuration.soundChannel = null;
	Configuration.hitGetCoin = 0;
	Configuration.hitGetTime = 0;
	Configuration.hitSlimNum = 0;
	Configuration.hitFatNum = 0;
	Configuration.rankId = 255;
	Configuration.adsNum = 0;
	Configuration.canAds = false;
	Configuration.currenSelectSkill = 0;
	Configuration.achieveMentData1 = false;
	Configuration.achieveMentData2 = false;
	Configuration.achieveMentData3 = false;
	Configuration.achieveMentData4 = false;
	Configuration.achieveMentData5 = false;
	Configuration.achieveMentData6 = false;

	class AudioPlayUtils {
	    constructor() {
	    }
	    static playAudio(src) {
	        Laya.SoundManager.playSound(src);
	    }
	    static playMusic(src) {
	        Configuration.soundChannel = Laya.SoundManager.playMusic(src, 0);
	    }
	    static changeAll() {
	        if (Configuration.audioPlay == false) {
	            Laya.SoundManager.soundVolume = 0;
	            Laya.SoundManager.setMusicVolume(0);
	        }
	        else {
	            Laya.SoundManager.soundVolume = 1;
	            Laya.SoundManager.setMusicVolume(1);
	        }
	    }
	}

	class LocalStore {
	    static loadValue(key) {
	        return Laya.LocalStorage.getItem(key);
	    }
	    static SaveValue(key, value) {
	        Laya.LocalStorage.setItem(key, value);
	    }
	    static loadBoolValue(key) {
	        return Boolean(Number(Laya.LocalStorage.getItem(key)));
	    }
	    static SaveBoolValue(key, value) {
	        Laya.LocalStorage.setItem(key, String(Number(value)));
	    }
	}
	LocalStore.audioPlay = "audioPlay";
	LocalStore.animStartCgPlay = "animStartCgPlay";
	LocalStore.animEndCgPlay = "animEndCgPlay";
	LocalStore.curMaxLevel = "currenceLevel";
	LocalStore.curSelectLevel = "currenceSeLevel";
	LocalStore.holdMoney = "holdMoney";
	LocalStore.hitGetCoin = "hitGetCoin";
	LocalStore.hitGetCoinTime = "hitGetCoinTime";
	LocalStore.hitSlimNum = "hitSlimNum";
	LocalStore.hitFatNum = "hitFatNum";
	LocalStore.adsNum = "adsNum";
	LocalStore.adsTime = "adsTime";
	LocalStore.jumpSkill = "jumpSkill";
	LocalStore.runSkill = "rushSkill";
	LocalStore.rollSkill = "rollSkill";
	LocalStore.currenSelectSkill = "currenSelectSkill";
	LocalStore.CrazyMode = "crazyMode";

	class Enemy extends Laya.Script {
	    constructor() {
	        super();
	        this.tid = 0;
	        this.xPos = 0;
	        this.yPos = 0;
	        this.type = 0;
	        this.forceSize = 0.35;
	        this.c = 0;
	        this.shakeTime = 0.02;
	        this.aniSpeedImpact = 10;
	        this.isbeHit = false;
	    }
	    onEnable() {
	        this.isfirstC = false;
	        if (this.idleAni != null) {
	            if (this.idleAni.lastIndexOf(".") != -1) {
	                var sprite = this.owner.getChildByName("sprite");
	                sprite.loadImage("battle/" + this.idleAni);
	            }
	            else {
	                var ani = this.owner.getChildByName("ani");
	                ani.interval = 100;
	                ani.play(0, true, this.idleAni);
	            }
	        }
	        if (this.isbeHit == true) {
	            GameUI.instance.enemyNum++;
	        }
	    }
	    onTriggerEnter(other, self, contact) {
	        if (this.type != 0 && GameUI.instance.canTrigger == true) {
	            GameUI.instance.onSubSpeed(this.c, this.forceSize);
	            var owner = this.owner;
	            if (other.label === "player") {
	                if (this.tid == 103) {
	                    var roleAni = GameUI.instance.player.getChildByName("ani");
	                    roleAni.play(0, false, AniName.hurt);
	                    roleAni.on(Laya.Event.COMPLETE, this, this.hurtEnd);
	                }
	                if (this.isbeHit == true) {
	                    GameUI.instance.addScore(1);
	                }
	                if (this.isfirstC == false) {
	                    this.isfirstC = true;
	                    var ani = owner.getChildByName("ani");
	                    var sprite = owner.getChildByName("sprite");
	                    if (this.beHitAudio != null) {
	                        if (Configuration.audioPlay == true)
	                            AudioPlayUtils.playAudio("sound/" + this.beHitAudio + ".wav");
	                    }
	                    if (this.idleAni == "bulletin") {
	                        sprite.destroy();
	                        if (ani != null) {
	                            ani = new Laya.Animation();
	                            this.owner.addChild(ani);
	                            ani.loadAtlas((this.beHitAni), Laya.Handler.create(this, this.onLoaded, [ani]));
	                        }
	                    }
	                    else if (this.beHitAni == "null" && this.type == 1) {
	                        Laya.Tween.to(sprite, { x: (sprite.x + 600), y: (sprite.y - 500), scaleX: 0.3, scaleY: 0.3, rotation: 90, complete: Laya.Handler.create(this, this.onde) }, 500);
	                        if (this.tid == 106) {
	                            this.onGetCoin(0, 5);
	                        }
	                    }
	                    else if (this.type == 2 && this.beHitAni.length > 2) {
	                        let points = [];
	                        console.log("x" + ani.x + "," + "y" + ani.y);
	                        let point1 = new Laya.Point(sprite.x, sprite.y);
	                        let point2 = new Laya.Point(sprite.x + 600, sprite.y - 500);
	                        let point3 = new Laya.Point(sprite.x + 600, sprite.y - 200);
	                        points.push(point1);
	                        points.push(point2);
	                        points.push(point3);
	                        let array = BezierPath.CreateBezierPoints(points, 60);
	                        console.log(array);
	                        if (this.beHitAni == AniName.fat_die.substr(6, 100)) {
	                            AudioPlayUtils.playAudio("sound/pangzi.wav");
	                            Configuration.hitFatNum++;
	                            LocalStore.SaveValue(LocalStore.hitFatNum, (String)(Configuration.hitFatNum));
	                        }
	                        else if (this.beHitAni == AniName.slim_die.substr(6, 100)) {
	                            AudioPlayUtils.playAudio("sound/slim.wav");
	                            Configuration.hitSlimNum++;
	                            LocalStore.SaveValue(LocalStore.hitSlimNum, (String)(Configuration.hitSlimNum));
	                        }
	                        else if (this.beHitAni == AniName.Lady_die.substr(6, 100)) {
	                            AudioPlayUtils.playAudio("sound/godDead.wav");
	                            Laya.timer.once(200, this, this.onGameOver);
	                        }
	                        let index = 0;
	                        Laya.timer.frameLoop(1, this, function () {
	                            if (index > array.length - 1) {
	                                index = 0;
	                                Laya.timer.clearAll(this);
	                                return;
	                            }
	                            ani.pos(array[index].x, array[index].y);
	                            index++;
	                        });
	                        ani.play(0, false, this.beHitAni);
	                        if (this.tid == 203) {
	                            this.onGetCoin(5, 10);
	                        }
	                        else if (this.tid == 205) {
	                            this.onGetCoin(20, 30);
	                        }
	                        else if (this.tid == 206) {
	                            this.onGetCoin(10, 20);
	                        }
	                    }
	                    else {
	                    }
	                }
	            }
	        }
	    }
	    hurtEnd() {
	        var roleAni = GameUI.instance.player.getChildByName("ani");
	        roleAni.play(0, true, AniName.dash);
	        roleAni.off(Laya.Event.COMPLETE, this, this.hurtEnd);
	    }
	    onde() {
	        this.owner.destroy();
	    }
	    onGameOver() {
	        GameUI.instance.Gameover();
	    }
	    onLoaded(t) {
	        t.play(0, false);
	    }
	    onUpdate() {
	    }
	    onGetCoin(minNum, MaxNum) {
	        var canGetCoin = Math.floor(Math.random() * (MaxNum - minNum) + minNum);
	        var days = new Date();
	        if (LocalStore.loadValue(LocalStore.hitGetCoinTime) == null || (Number(LocalStore.loadValue(LocalStore.hitGetCoinTime) + Configuration.C_DAY) >= days.getTime())) {
	            LocalStore.SaveValue(LocalStore.hitGetCoinTime, String(days.getTime()));
	            Configuration.hitGetCoin = 0;
	            LocalStore.SaveValue(LocalStore.hitGetCoin, String(Configuration.hitGetCoin));
	        }
	        if (Configuration.hitGetCoin + canGetCoin <= 100) {
	            Configuration.hitGetCoin += canGetCoin;
	            Configuration.holdGoldNum += canGetCoin;
	            GameUI.instance.goldGetText.text = "你获得" + canGetCoin + "枚金币";
	            AudioPlayUtils.playAudio("sound/coin.mp3");
	            LocalStore.SaveValue(LocalStore.holdMoney, (String)(Configuration.holdGoldNum));
	            LocalStore.SaveValue(LocalStore.hitGetCoin, String(Configuration.hitGetCoin));
	            Laya.Tween.to(GameUI.instance.goldPanel, { y: 850, ease: Laya.Ease.backOut }, 300, function () {
	                Laya.timer.once(3000, this, function () {
	                    Laya.Tween.to(GameUI.instance.goldPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	                });
	            });
	        }
	        else if (Configuration.hitGetCoin < 100) {
	            canGetCoin = 100 - Configuration.hitGetCoin;
	            Configuration.hitGetCoin = 100;
	            Configuration.holdGoldNum += canGetCoin;
	            GameUI.instance.goldGetText.text = "你获得" + canGetCoin + "枚金币";
	            AudioPlayUtils.playAudio("sound/coin.mp3");
	            LocalStore.SaveValue(LocalStore.holdMoney, (String)(Configuration.holdGoldNum));
	            LocalStore.SaveValue(LocalStore.hitGetCoin, String(Configuration.hitGetCoin));
	            Laya.Tween.to(GameUI.instance.goldPanel, { y: 850, ease: Laya.Ease.backOut }, 300, function () {
	                Laya.timer.once(3000, this, function () {
	                    Laya.Tween.to(GameUI.instance.goldPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	                });
	            });
	        }
	        else {
	            GameUI.instance.goldGetText.text = "你当日可领取的金额已满";
	            Laya.Tween.to(GameUI.instance.goldPanel, { y: 850, ease: Laya.Ease.backOut }, 300, function () {
	                Laya.timer.once(3000, this, function () {
	                    Laya.Tween.to(GameUI.instance.goldPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	                });
	            });
	        }
	    }
	    onDisable() {
	        Laya.Pool.recover("bullet", this.owner);
	    }
	}

	var RigidBody = Laya.RigidBody;
	class GameControl extends Laya.Script {
	    constructor() {
	        super();
	        this.rountClickTime = 1000;
	        this.forceSize = 10;
	        this.aniInterVal = 30;
	        this.mouseMoveSpeed = 30;
	        this.intervalTime = 15000;
	        this.manMaxSpeed = 10;
	        this.manMinSpeed = 70;
	        this.allTime = 0;
	        this._time = 0;
	        this.boardLength = 0;
	        this.cDistance = 0;
	        this.isRealseSkill = false;
	        this.canRealseSkill = false;
	    }
	    onEnable() {
	        this._gameBox = this.owner.getChildByName("gameBox");
	    }
	    onUpdate() {
	        var now = Date.now();
	        if (now - this._time > this.rountClickTime && this.isFirstClick == false) {
	            this.clickOver();
	        }
	        var ctrlBool = Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.CONTROL);
	        var altBool = Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.ALTERNATE);
	        var dBool = Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.ALTERNATE);
	        if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.F2)) {
	            Laya.Scene.load(Configuration.InitScene, Laya.Handler.create(this, this.onReturnHome));
	        }
	        if (ctrlBool == true && altBool == true && dBool == true) {
	            Laya.enableDebugPanel();
	            console.log("调试模式已经打开");
	        }
	    }
	    onReturnHome() {
	        Laya.Scene.open(Configuration.InitScene, true);
	    }
	    createBox() {
	    }
	    onStageClick(e) {
	        var roleAni = GameUI.instance.player.getChildByName("ani");
	        var groud = GameUI.instance.group;
	        if (this.isStart == true) {
	            if (this.isRealseSkill == false && Configuration.currenSelectSkill != 0 && this.canRealseSkill == true) {
	                this.onRealseSkill();
	            }
	            if (this.isClickOver == false && Math.abs(groud.x) < 50) {
	                if (this.isFirstClick == true) {
	                    this._time = Date.now();
	                    this.allTime = Date.now();
	                    this.isFirstClick = false;
	                    console.log("第一次点击");
	                    GameUI.instance.playerOutLint.visible = false;
	                    AudioPlayUtils.playAudio("sound/xuli.wav");
	                    GameUI.instance.leftArrow.stop();
	                    GameUI.instance.rightArrow.stop();
	                    GameUI.instance.leftArrow.visible = false;
	                    GameUI.instance.rightArrow.visible = false;
	                    roleAni.stop();
	                    roleAni.play(0, false, AniName.chargingA);
	                }
	                else {
	                    let now = Date.now();
	                    e.stopPropagation();
	                    if (now - this._time < this.rountClickTime) {
	                        this._time = now;
	                    }
	                }
	                GameUI.instance.progress.value += (0.1 * (Math.random() * 3));
	                if (GameUI.instance.progress.value >= 0.7) {
	                    if (this.isPlay2 == false) {
	                        roleAni.play(0, false, AniName.chargingB);
	                        this.isPlay2 = true;
	                    }
	                }
	                Laya.timer.once(100, this, function () {
	                    GameUI.instance.progress.value -= 0.03 * (Math.random() * 5);
	                });
	            }
	        }
	    }
	    clickOver() {
	        if (this.isClickOver == false && this.isRountOver == false) {
	            this.isClickOver = true;
	            console.log("charge Complete");
	            var player = GameUI.instance.player;
	            var rig = player.getComponent(RigidBody);
	            var roleAni = player.getChildByName("ani");
	            roleAni.stop();
	            var now = Date.now();
	            var force = (now - this.allTime);
	            this.cDistance = (GameUI.instance.progress.value + force / (100 * 1000) + Math.random() * 0.15 - Math.random() * 0.15) * this.boardLength;
	            roleAni.interval = 100 / (GameUI.instance.progress.value + force / (100 * 1000));
	            roleAni.play(0, true, AniName.dash);
	            Laya.Tween.to(player, { x: 600 }, (500 + 5000 / (force / 200)));
	            Laya.timer.once(100, this, this.onCanRelaseSkill);
	            Laya.timer.once(500, this, this.onPlayerMoveComplete);
	            rig.setVelocity({ x: 0.01, y: 0 });
	        }
	    }
	    onCanRelaseSkill() {
	        this.canRealseSkill = true;
	    }
	    onPlayerMoveComplete() {
	        console.log("猛男冲击完成");
	        Laya.timer.loop(100, this, this.onPlayerMove2);
	    }
	    onPlayerMove2() {
	        var rig = this.player.getComponent(RigidBody);
	        var roleAni = this.player.getChildByName("ani");
	        rig.setVelocity({ x: 0.01, y: 0 });
	        if (Math.abs(this.groud.x - this.player.x) >= this.cDistance + 5) {
	            Laya.timer.clear(this, this.onPlayerMove2);
	            roleAni.stop();
	            this.isRountOver = true;
	            roleAni.play(0, true, AniName.idle);
	            this.isRountOver = true;
	            this.canRealseSkill = false;
	            GameUI.instance.Determineoutcome();
	        }
	        var rate = Math.abs(this.groud.x - this.player.x) / Math.abs(this.cDistance + 5) * this.cDistance / this.boardLength;
	        GameUI.instance.progress.value = (this.cDistance / this.boardLength) - rate;
	        if (Math.abs(this.groud.x - this.player.x) >= 6798) {
	            console.log("男人掉下悬崖,gg");
	            Laya.timer.clear(this, this.onPlayerMove2);
	            roleAni.stop();
	            roleAni.interval = 100;
	            AudioPlayUtils.playAudio("sound/aaaa.wav");
	            Laya.SoundManager.stopMusic();
	            roleAni.play(0, false, AniName.fall);
	        }
	        this.bgSpriteList.forEach(function (e) {
	            console.log(roleAni.interval);
	            e.x -= (10 + 3000 / roleAni.interval);
	        });
	        this.sky.x -= 1;
	        GameUI.instance.grass.x -= 5;
	    }
	    startGame() {
	        if (!this.isStart) {
	            Laya.timer.once(200, this, this.onStartGame);
	        }
	        GameUI.instance.rightArrow.visible = true;
	        GameUI.instance.leftArrow.play(0, true);
	        GameUI.instance.rightArrow.play(0, true);
	    }
	    onMouseMove(e) {
	        if (this.isStart == true && this.isFirstClick == true) {
	            var groud = GameUI.instance.group;
	            var player = GameUI.instance.player;
	            var widthStart = 750;
	            var widthEnd = 850;
	            var timeDelata = (Laya.timer.delta / 1000) * this.mouseMoveSpeed;
	            if (e.stageX > widthEnd) {
	                if (GameUI.instance.leftArrow.visible == false) {
	                }
	                if (groud.x - (e.stageX - widthEnd) * timeDelata >= -6000) {
	                    GameUI.instance.grass.x = GameUI.instance.grass.x - (e.stageX - widthEnd) * timeDelata;
	                    player.x = player.x - (e.stageX - widthEnd) * timeDelata;
	                    this.bgSpriteList.forEach(function (w) {
	                        w.x = w.x - (e.stageX - widthEnd) * timeDelata;
	                    });
	                    GameUI.instance.leftArrow.visible = true;
	                    GameUI.instance.rightArrow.visible = true;
	                    if (GameUI.instance.leftArrow.isPlaying == false) {
	                        GameUI.instance.leftArrow.play(0, true);
	                    }
	                    if (GameUI.instance.rightArrow.isPlaying == false) {
	                        GameUI.instance.rightArrow.play(0, true);
	                    }
	                }
	                else {
	                    GameUI.instance.leftArrow.visible = true;
	                    GameUI.instance.rightArrow.visible = false;
	                    if (GameUI.instance.leftArrow.isPlaying == false) {
	                        GameUI.instance.leftArrow.play(0, true);
	                    }
	                    player.x = -6000;
	                    var grassen = GameUI.instance.grass.getComponent(Enemy);
	                    GameUI.instance.grass.x = grassen.xPos - 6000;
	                    this.bgSpriteList.forEach(function (w) {
	                        var en = w.getComponent(Enemy);
	                        if (en != null) {
	                            w.x = en.xPos - 6000;
	                        }
	                    });
	                }
	            }
	            else if (e.stageX < widthStart) {
	                if (groud.x + Math.abs(e.stageX - widthStart) * timeDelata <= 0) {
	                    GameUI.instance.grass.x = GameUI.instance.grass.x + Math.abs(e.stageX - widthStart) * timeDelata;
	                    player.x = player.x + Math.abs(e.stageX - widthStart) * timeDelata;
	                    this.bgSpriteList.forEach(function (w) {
	                        w.x = w.x + Math.abs(e.stageX - widthStart) * timeDelata;
	                    });
	                    GameUI.instance.leftArrow.visible = true;
	                    GameUI.instance.rightArrow.visible = true;
	                    if (GameUI.instance.leftArrow.isPlaying == false) {
	                        GameUI.instance.leftArrow.play(0, true);
	                    }
	                    if (GameUI.instance.rightArrow.isPlaying == false) {
	                        GameUI.instance.rightArrow.play(0, true);
	                    }
	                }
	                else {
	                    GameUI.instance.rightArrow.visible = true;
	                    GameUI.instance.leftArrow.visible = false;
	                    if (GameUI.instance.rightArrow.isPlaying == false) {
	                        GameUI.instance.rightArrow.play(0, true);
	                    }
	                    player.x = -5;
	                    player.y = 228.8007205282979;
	                    var grassen = GameUI.instance.grass.getComponent(Enemy);
	                    GameUI.instance.grass.x = -10;
	                    this.bgSpriteList.forEach(function (w) {
	                        var en = w.getComponent(Enemy);
	                        if (en != null) {
	                            w.x = en.xPos;
	                            w.y = en.yPos;
	                        }
	                    });
	                }
	            }
	            if (e.stageY < 225) {
	            }
	            else if (e.stageY > 675) {
	            }
	        }
	    }
	    onRealseSkill() {
	        if (this.isRealseSkill == false) {
	            switch (Configuration.currenSelectSkill) {
	                case 1:
	                    this.run();
	                    break;
	                case 2:
	                    this.jump();
	                    break;
	                case 3:
	                    this.roll();
	                    break;
	            }
	            this.isRealseSkill = true;
	            GameUI.instance.ball.visible = false;
	        }
	    }
	    run() {
	        var roleAni = this.player.getChildByName("ani");
	        roleAni.interval = 50;
	        this.cDistance += 1000;
	    }
	    jump() {
	        var roleAni = this.player.getChildByName("ani");
	        GameUI.instance.canTrigger = false;
	        Laya.Tween.to(this.player, { y: 0 }, (300), null, Laya.Handler.create(this, this.jumpEnd));
	    }
	    jumpEnd() {
	        Laya.Tween.to(this.player, { y: 201 }, (300), null);
	        GameUI.instance.canTrigger = true;
	    }
	    roll() {
	        GameUI.instance.canTrigger = false;
	        var roleAni = this.player.getChildByName("ani");
	        roleAni.stop();
	        roleAni.interval = 80;
	        this.cDistance += 500;
	        roleAni.play(0, true, AniName.roll);
	        roleAni.on(Laya.Event.COMPLETE, this, this.rollEnd);
	    }
	    rollEnd() {
	        var roleAni = GameUI.instance.player.getChildByName("ani");
	        var now = Date.now();
	        var force = (now - this.allTime);
	        roleAni.interval = 100 / (GameUI.instance.progress.value + force / (100 * 1000));
	        roleAni.play(0, true, AniName.dash);
	        roleAni.off(Laya.Event.COMPLETE, this, this.rollEnd);
	        GameUI.instance.canTrigger = true;
	    }
	    onStartGame() {
	        GameUI.instance.playerOutLint.visible = true;
	        Laya.timer.once(200, this, this.onRealStartGame);
	    }
	    onRealStartGame() {
	        this.isPlay2 = false;
	        this.isStart = true;
	        this.enabled = true;
	        this.isClickOver = false;
	        this.isFirstClick = true;
	        this.isRountOver = false;
	        GameUI.instance.canTrigger = true;
	        this.sky = GameUI.instance.sky;
	        this.groud = GameUI.instance.group;
	        this.player = GameUI.instance.player;
	        this.isRealseSkill = false;
	        this.canRealseSkill = false;
	        GameUI.instance.score.text = ("敌人：" + GameUI.instance._score + "/" + GameUI.instance.enemyNum);
	    }
	    stopGame() {
	        Laya.timer.clearAll(this);
	        this.isStart = false;
	        var player = GameUI.instance.player;
	        var rig = player.getComponent(RigidBody);
	        var roleAni = player.getChildByName("ani");
	        roleAni.stop();
	        roleAni.play(0, true, AniName.idle);
	    }
	}

	class ShakeCamera extends Laya.Script {
	    constructor() {
	        super();
	    }
	    enebleShake(enable) {
	        this.enableShake = enable;
	        if (this.enableShake == true) {
	            Laya.timer.clear(this, this.update);
	            Laya.timer.loop(100, this, this.update);
	        }
	        else
	            Laya.timer.clear(this, this.update);
	    }
	    init(cam, shakeTime, extent = 200) {
	        this.camera = cam;
	        this.shakeTime = shakeTime;
	        this.extent = extent;
	        this.enableShake = false;
	    }
	    update(en) {
	        if (this.enableShake && this.camera != null) {
	            if (this.shakeTime > 0) {
	                this.shakeTime - Laya.timer.delta;
	                if (this.shakeTime < 0) {
	                    this.camera.pos(0, 0);
	                    this.enableShake = false;
	                }
	                else {
	                    var posY = Math.floor(-this.extent * 0.5 + this.extent * Math.random());
	                    this.camera.pos(0, posY);
	                }
	            }
	        }
	    }
	}

	var battleFieldUI = ui.test.battleFieldUI;
	class GameUI extends battleFieldUI {
	    constructor() {
	        super();
	        this.canTrigger = false;
	        GameUI.instance = this;
	        this.autoDestroyAtClosed = true;
	        this.level = Configuration.currentSelectLevel;
	        LocalStore.SaveValue(LocalStore.curSelectLevel, String(this.level));
	        this.page = 1;
	        this.ball.play(0, true);
	    }
	    comicNext() {
	        AudioPlayUtils.playAudio("sound/11906.wav");
	        this.page++;
	        if (this.page <= 3) {
	            this.comic.skin = "comic/op" + this.page + ".png";
	        }
	        if (this.page == 4) {
	            this.comic.skin = "comic/ed" + (this.page - 3) + ".png";
	            this.comic.visible = false;
	        }
	        else if (this.page > 4) {
	            this.comic.skin = "comic/ed" + (this.page - 3) + ".png";
	        }
	    }
	    onEnable() {
	        this._control = this.getComponent(GameControl);
	        this._shakeCamera = this.getComponent(ShakeCamera);
	        this.tip.on(Laya.Event.CLICK, this, this.onTipClick);
	        this.returnHome.clickHandler = Laya.Handler.create(this, this.onReturnHome);
	        this.onLoaded();
	        this.nextLevel.on(Laya.Event.CLICK, this, this.onClickRestart);
	        if (Configuration.startCgPlay == false) {
	            this.comic.on(Laya.Event.CLICK, this, this.comicNext);
	            this.comic.visible = true;
	            LocalStore.SaveBoolValue(LocalStore.animStartCgPlay, true);
	        }
	        else {
	            this.comic.visible = false;
	        }
	    }
	    onReturnHome() {
	        Laya.Scene.load(Configuration.InitScene, Laya.Handler.create(this, this.onReturnHome2));
	    }
	    onReturnHome2() {
	        Laya.Scene.open(Configuration.InitScene, true);
	    }
	    onTipClick(e) {
	        this.tip.visible = false;
	        this._score = 0;
	        this.score.text = ("敌人：" + this._score + "/" + this.enemyNum);
	        this._control.startGame();
	        this.playerOutLint.visible = true;
	        this.playAni();
	    }
	    Gameover() {
	        Laya.timer.once(2000, this, this.Gameover2);
	        if (Configuration.audioPlay == true)
	            Laya.SoundManager.playSound("sound/630.wav", 1, Laya.Handler.create(this, this.restart));
	        Laya.SoundManager.stopMusic();
	        this.isGameOver = true;
	    }
	    Gameover2() {
	        this.overGame.text = "Game Over";
	    }
	    Determineoutcome() {
	        if (this.isGameOver == false)
	            Laya.timer.once(2000, this, this.Determineoutcome2);
	    }
	    Determineoutcome2() {
	        if (this._score >= this.enemyNum) {
	            this.overGame.text = "You Win";
	            this.nextLevel.visible = true;
	            this.nextLevel.text = "下一关";
	            this.level++;
	            if (Configuration.currentAlreadyLevel < this.level) {
	                Configuration.currentAlreadyLevel = this.level;
	                LocalStore.SaveValue(LocalStore.curMaxLevel, String(this.level));
	            }
	            Configuration.currentSelectLevel = this.level;
	            LocalStore.SaveValue(LocalStore.curSelectLevel, String(this.level));
	            Configuration.currentAlreadyLevel = Number(LocalStore.loadValue(LocalStore.curSelectLevel));
	            if (this.level >= Configuration.levelNum + 1) {
	                this.comic.visible = true;
	            }
	            this.nextLevel.on(Laya.Event.CLICK, this, this.onClickRestart);
	        }
	        else {
	            this.overGame.text = "你没有打倒全部的敌人";
	            this.overGame.visible = true;
	            Laya.timer.once(2000, this, this.restart);
	            Laya.SoundManager.stopMusic();
	        }
	    }
	    restart() {
	        if (this.nextLevel != null) {
	            this.nextLevel.visible = true;
	            this.nextLevel.text = "Restart";
	        }
	        this._control.stopGame();
	        this.isGameOver = false;
	    }
	    onClickRestart() {
	        this.group.x = -2;
	        if (this.level == 1)
	            this.bulletin.visible = true;
	        else
	            this.bulletin.visible = false;
	        this.sky.x = -10;
	        var roleAni = this.player.getChildByName("ani");
	        roleAni.play(0, true, AniName.idle);
	        this.player.x = -2;
	        this.player.y = 228;
	        GameUI.instance.nextLevel.visible = false;
	        GameUI.instance.overGame.text = "";
	        this.clearEnemy();
	        this._score = 0;
	        this.onLoaded();
	        this.score.text = ("敌人：" + this._score + "/" + this.enemyNum);
	        this._control.onStartGame();
	        this.player.rotation = 0;
	    }
	    addScore(value = 1) {
	        this._score += value;
	        this.score.changeText("敌人：" + this._score + "/" + this.enemyNum);
	    }
	    clearEnemy() {
	        for (var i = 0; i < this.enemyLength; i++) {
	            var obj = GameUI.instance.getChildByName("Enemy");
	            if (obj != null)
	                obj.destroy();
	        }
	    }
	    onLoaded() {
	        this.enemyNum = 0;
	        if (Configuration.currenSelectSkill != 0) {
	            this.ball.visible = true;
	        }
	        else
	            this.ball.visible = false;
	        var colorMatrix = [
	            0, 0, 1, 0, 1,
	            0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0,
	            0, 0, 0, 1, 0,
	        ];
	        var redFilter = new Laya.ColorFilter(colorMatrix);
	        var roleAni = this.player.getChildByName("ani");
	        if (Configuration.crazyMode == true) {
	            roleAni.filters = [redFilter];
	        }
	        roleAni.interval = this._control.aniInterVal;
	        if (this.level == 1)
	            this.bulletin.visible = true;
	        else
	            this.bulletin.visible = false;
	        roleAni.loadImages(this.aniUrl(AniName.chargingA, 2), AniName.chargingA);
	        roleAni.loadImages(this.aniUrl(AniName.chargingB, 4), AniName.chargingB);
	        roleAni.loadImages(this.aniUrl(AniName.fall, 2), AniName.fall);
	        roleAni.loadImages(this.aniUrl(AniName.dash, 6), AniName.dash);
	        roleAni.loadImages(this.aniUrl(AniName.hurt, 3), AniName.hurt);
	        roleAni.loadImages(this.aniUrl(AniName.roll, 5), AniName.roll);
	        roleAni.loadImages(this.aniUrl(AniName.idle, 3), AniName.idle);
	        roleAni.play(0, true, AniName.idle);
	        Laya.SoundManager.musicVolume = 0.3;
	        console.log("-------人物动画载入---------" + this._control.aniInterVal);
	        Laya.Animation.createFrames(this.aniUrl(AniName.Lady_die, 1), AniName.Lady_die.substr(6, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.Lady_idle, 2), AniName.Lady_idle.substr(6, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.fat_idle, 2), AniName.fat_idle.substr(6, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.fat_die, 7), AniName.fat_die.substr(6, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.slim_idle, 1), AniName.slim_idle.substr(6, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.slim_die, 6), AniName.slim_die.substr(6, 100));
	        console.log("-------物品动画载入---------" + this._control.aniInterVal + AniName.NoPeeSign_die.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.NoPeeSign_die, 7), AniName.NoPeeSign_die.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.NoPeeSign_idle, 1), AniName.NoPeeSign_idle.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.car_die, 5), AniName.car_die.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.car_idle, 1), AniName.car_idle.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.oildrum_die, 6), AniName.oildrum_die.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.oildrum_idle, 1), AniName.oildrum_idle.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.ttrlSign_die, 5), AniName.ttrlSign_die.substr(5, 100));
	        Laya.Animation.createFrames(this.aniUrl(AniName.ttrlSign_idle, 1), AniName.ttrlSign_idle.substr(5, 100));
	        console.log(AniName.car_die.substr(5, 100));
	        this.onLoadEnemy();
	        console.log("-------敌人单位载入---------" + this._control.aniInterVal);
	    }
	    playAni() {
	        this.playerOutLint.ani1.play(0, true);
	    }
	    aniUrl(aniName, length) {
	        var urls = [];
	        for (var i = 0; i < length; i++) {
	            urls.push("ani/" + aniName + i + ".png");
	        }
	        return urls;
	    }
	    stopGame() {
	        this._control.stopGame();
	    }
	    onLoadEnemy() {
	        this._control.bgSpriteList = [];
	        this._control.bgSpriteList.push(this.bulletin);
	        this._control.bgSpriteList.push(this.group);
	        this.onLoadJson("level" + this.level + ".json");
	    }
	    onShakeCamera(time, extent) {
	    }
	    onSubSpeed(c, size) {
	        var rate = (1 - ((c / 100) * size));
	        this._control.cDistance = this._control.cDistance * rate;
	    }
	    onLoadJson(t) {
	        Laya.loader.load("res/conf/" + t, Laya.Handler.create(this, function () {
	            var json = Laya.loader.getRes("res/conf/" + t);
	            var boardLength = json["Length"];
	            this.isGameOver = false;
	            GameUI.instance._control.boardLength = 6803 * boardLength / 100;
	            var enemys = json["enemy"];
	            GameUI.instance.enemyLength = enemys.length;
	            for (var i = 0; i < enemys.length; i++) {
	                let box = Laya.Pool.getItemByCreateFun("enemy" + i, GameUI.instance._control.enemy.create, GameUI.instance._control.enemy);
	                var enemy = box.getComponent(Enemy);
	                var en = enemys[i];
	                enemy.c = Number(en["C"]);
	                enemy.forceSize = en["Size"];
	                enemy.beHitAudio = en["audioSrc"];
	                enemy.tid = en["id"];
	                enemy.idleAni = en["idleAni"];
	                enemy.isbeHit = en["isbeHit"];
	                enemy.name = en["name"];
	                enemy.xPos = (en["posX"] / boardLength) * GameUI.instance._control.boardLength;
	                enemy.yPos = en["posY"] + 241;
	                enemy.shakeTime = en["shakeTime"];
	                enemy.aniSpeedImpact = en["speedipa"];
	                enemy.type = en["type"];
	                enemy.beHitAni = en["beHitAni"];
	                GameUI.instance.scene.addChild(box);
	                box.pos(enemy.xPos, enemy.yPos);
	                this._control.bgSpriteList.push(box);
	            }
	        }), null, Laya.Loader.JSON);
	    }
	}

	class achievementSys {
	    static regeneral() {
	        this.date1 = {
	            pro: { value: (Configuration.hitFatNum / 10) >= 1 ? 1 : (Configuration.hitFatNum / 10) },
	            reward: { text: "奖励30金币" },
	            des: { text: "击倒10名胖坏蛋" },
	            com: { label: (Configuration.achieveMentData1 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData1, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatFatTen, null, false) }
	        };
	        this.date2 = {
	            pro: { value: (Configuration.hitSlimNum / 10) >= 1 ? 1 : (Configuration.hitSlimNum / 10) },
	            reward: { text: "奖励30金币" },
	            des: { text: "击倒10名瘦坏蛋" },
	            com: { label: (Configuration.achieveMentData2 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData2, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatSlitTen, null, false) }
	        };
	        this.date3 = {
	            pro: { value: (Configuration.hitFatNum / 25) >= 1 ? 1 : (Configuration.hitFatNum / 25) },
	            reward: { text: "奖励50金币" },
	            des: { text: "击倒25名胖坏蛋" },
	            com: { label: (Configuration.achieveMentData3 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData3, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatFatTweentyFive, null, false) }
	        };
	        this.date4 = {
	            pro: { value: (Configuration.hitSlimNum / 25) >= 1 ? 1 : (Configuration.hitSlimNum / 25) },
	            reward: { text: "奖励50金币" },
	            des: { text: "击倒25名瘦坏蛋" },
	            com: { label: (Configuration.achieveMentData4 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData4, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatSlitTweentyFive, null, false) }
	        };
	        this.date5 = {
	            pro: { value: ((Configuration.hitFatNum + Configuration.hitSlimNum) / 50) >= 1 ? 1 : ((Configuration.hitFatNum + Configuration.hitSlimNum) / 50) },
	            reward: { text: "奖励100金币" },
	            des: { text: "击倒50名坏蛋" },
	            com: { label: (Configuration.achieveMentData5 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData5, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatAllfivety, null, false) }
	        };
	        this.date6 = {
	            pro: { value: ((Configuration.hitFatNum + Configuration.hitSlimNum) / 100) >= 1 ? 1 : ((Configuration.hitFatNum + Configuration.hitSlimNum) / 100) },
	            reward: { text: "奖励200金币" },
	            des: { text: "击倒100名坏蛋" },
	            com: { label: (Configuration.achieveMentData6 == false) ? "完成" : "已经完成", disabled: Configuration.achieveMentData6, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatAllhundred, null, false) }
	        };
	    }
	    static onBeatSlitTen() {
	        var isAchieve = (Configuration.hitSlimNum / 10) >= 1 ? true : false;
	        if (isAchieve == true) {
	            MainUi.instance.onGetCoin(30);
	            Configuration.achieveMentData2 = true;
	            LocalStore.SaveBoolValue("achieveMentData2", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	    static onBeatFatTen() {
	        var isAchieve = (Configuration.hitFatNum / 10) >= 1 ? true : false;
	        if (isAchieve) {
	            MainUi.instance.onGetCoin(30);
	            Configuration.achieveMentData1 = true;
	            LocalStore.SaveBoolValue("achieveMentData1", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	    static onBeatSlitTweentyFive() {
	        var isAchieve = (Configuration.hitSlimNum / 25) >= 1 ? true : false;
	        if (isAchieve) {
	            MainUi.instance.onGetCoin(50);
	            Configuration.achieveMentData4 = true;
	            LocalStore.SaveBoolValue("achieveMentData4", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	    static onBeatFatTweentyFive() {
	        var isAchieve = (Configuration.hitFatNum / 25) >= 1 ? true : false;
	        if (isAchieve) {
	            MainUi.instance.onGetCoin(50);
	            Configuration.achieveMentData3 = true;
	            LocalStore.SaveBoolValue("achieveMentData3", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	    static onBeatAllfivety() {
	        var isAchieve = ((Configuration.hitFatNum + Configuration.hitSlimNum) / 50) >= 1 ? true : false;
	        if (isAchieve) {
	            MainUi.instance.onGetCoin(100);
	            Configuration.achieveMentData5 = true;
	            LocalStore.SaveBoolValue("achieveMentData5", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	    static onBeatAllhundred() {
	        var isAchieve = ((Configuration.hitFatNum + Configuration.hitSlimNum) / 100) >= 1 ? true : false;
	        if (isAchieve) {
	            MainUi.instance.onGetCoin(200);
	            Configuration.achieveMentData6 = true;
	            LocalStore.SaveBoolValue("achieveMentData6", true);
	            MainUi.instance.initAchievement();
	        }
	        else {
	            MainUi.instance.alertMessage("你没有达成这项成就");
	        }
	    }
	}
	achievementSys.num = 6;
	achievementSys.date1 = {
	    pro: { value: 0 },
	    reward: { text: "奖励30金币" },
	    des: { text: "击倒10名胖坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatFatTen, null, false) }
	};
	achievementSys.date2 = {
	    pro: { value: 0 },
	    reward: { text: "奖励30金币" },
	    des: { text: "击倒10名瘦坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatSlitTen, null, false) }
	};
	achievementSys.date3 = {
	    pro: { value: 0 },
	    reward: { text: "奖励50金币" },
	    des: { text: "击倒25名胖坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatFatTweentyFive, null, false) }
	};
	achievementSys.date4 = {
	    pro: { value: 0 },
	    reward: { text: "奖励50金币" },
	    des: { text: "击倒25名瘦坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatSlitTweentyFive, null, false) }
	};
	achievementSys.date5 = {
	    pro: { value: 0 },
	    reward: { text: "奖励100金币" },
	    des: { text: "击倒50名坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatAllfivety, null, false) }
	};
	achievementSys.date6 = {
	    pro: { value: 0 },
	    reward: { text: "奖励200金币" },
	    des: { text: "击倒100名坏蛋" },
	    com: { label: "完成", disabled: false, clickHandler: Laya.Handler.create(achievementSys, achievementSys.onBeatAllhundred, null, false) }
	};

	var main = ui.test.MainUiUI;
	var Handle = Laya.Handler;
	class MainUi extends main {
	    constructor() {
	        super();
	        this.jumpSkillNum = 100;
	        this.runSkillNum = 50;
	        this.rollSkillNum = 200;
	        this.CreazyModeNum = 500;
	        this.startCgNum = 10;
	        this.unlockCgNum = 50;
	        MainUi.instance = this;
	        this.detail.clickHandler = Handle.create(this, this.onDetail, null, false);
	        this.StartGame.clickHandler = Handle.create(this, this.onStartGBefore);
	        this.Start2.clickHandler = Handle.create(this, this.onStartG);
	        this.select.clickHandler = Handle.create(this, this.onSelect, null, false);
	        this.shop.clickHandler = Handle.create(this, this.onShop, null, false);
	        this.btnClose.clickHandler = Handle.create(this, this.onClose, null, false);
	        this.jumpbuy.clickHandler = Handle.create(this, this.onJumpBuy, null, false);
	        this.runbuy.clickHandler = Handle.create(this, this.onRunBuy, null, false);
	        this.rollbuy.clickHandler = Handle.create(this, this.onRollBuy, null, false);
	        this.buyStartCg.clickHandler = Handle.create(this, this.onBuyStartCg, null, false);
	        this.buyUnlockNext.clickHandler = Handle.create(this, this.onBuyUnlockNext, null, false);
	        this.buyCrezyMode.clickHandler = Handle.create(this, this.onBuyCreazyMode, null, false);
	        this.jump.clickHandler = Handle.create(this, this.onSelectSkill, [2], false);
	        this.run.clickHandler = Handle.create(this, this.onSelectSkill, [1], false);
	        this.roll.clickHandler = Handle.create(this, this.onSelectSkill, [3], false);
	        this.normal.clickHandler = Handle.create(this, this.onNormalSelect, null, false);
	        this.crazyMode.clickHandler = Handle.create(this, this.onCrazyModeSelect, null, false);
	        this.addT.clickHandler = Handle.create(this, this.getMoneyV, null, false);
	        this.ys.clickHandler = Handle.create(this, this.ysHandle, null, false);
	        this.ns.clickHandler = Handle.create(this, this.nsHandle, null, false);
	        this.check.on(Laya.Event.CLICK, this, this.AudioSourceClick);
	        this.girl.clickHandler = Handle.create(this, this.onRank, null, false);
	        this.player.on(Laya.Event.CLICK, this, this.onAchievement);
	        this.list.visible = false;
	        if (localStorage.getItem("audioPlay") != null) {
	            var audioPlayBool = Boolean(Number(localStorage.getItem("audioPlay")));
	            Configuration.audioPlay = audioPlayBool;
	            this.check.selected = audioPlayBool;
	        }
	        if (LocalStore.loadBoolValue(LocalStore.animStartCgPlay) != null) {
	            Configuration.startCgPlay = LocalStore.loadBoolValue(LocalStore.animStartCgPlay);
	        }
	        if (LocalStore.loadValue(LocalStore.curMaxLevel) != null) {
	            Configuration.currentAlreadyLevel = Number(LocalStore.loadValue(LocalStore.curMaxLevel));
	        }
	        if (LocalStore.loadValue(LocalStore.curSelectLevel) != null) {
	            Configuration.currentSelectLevel = Number(LocalStore.loadValue(LocalStore.curSelectLevel));
	        }
	        if (LocalStore.loadValue(LocalStore.holdMoney) != null) {
	            Configuration.holdGoldNum = Number(LocalStore.loadValue(LocalStore.holdMoney));
	        }
	        if (LocalStore.loadValue(LocalStore.hitGetCoin) != null) {
	            Configuration.hitGetCoin = Number(LocalStore.loadValue(LocalStore.hitGetCoin));
	        }
	        if (LocalStore.loadValue(LocalStore.hitSlimNum) != null) {
	            Configuration.hitSlimNum = Number(LocalStore.loadValue(LocalStore.hitSlimNum));
	        }
	        if (LocalStore.loadValue(LocalStore.hitFatNum) != null) {
	            Configuration.hitFatNum = Number(LocalStore.loadValue(LocalStore.hitFatNum));
	        }
	        if (LocalStore.loadValue(LocalStore.adsNum) != null) {
	            Configuration.adsNum = Number(LocalStore.loadValue(LocalStore.adsNum));
	        }
	        if (LocalStore.loadBoolValue(LocalStore.adsTime) != null) {
	            Configuration.canAds = LocalStore.loadBoolValue(LocalStore.adsTime);
	        }
	        if (LocalStore.loadValue(LocalStore.CrazyMode) != null) {
	            Configuration.crazyMode = LocalStore.loadBoolValue(LocalStore.CrazyMode);
	        }
	        if (LocalStore.loadValue(LocalStore.jumpSkill) != null) {
	            Configuration.jumpSkill = LocalStore.loadBoolValue(LocalStore.jumpSkill);
	        }
	        if (LocalStore.loadValue(LocalStore.rollSkill) != null) {
	            Configuration.rollSkill = LocalStore.loadBoolValue(LocalStore.rollSkill);
	        }
	        if (LocalStore.loadValue(LocalStore.runSkill) != null) {
	            Configuration.rushSKill = LocalStore.loadBoolValue(LocalStore.runSkill);
	        }
	        if (LocalStore.loadValue(LocalStore.currenSelectSkill) != null) {
	            Configuration.currenSelectSkill = (Number)(LocalStore.loadValue(LocalStore.currenSelectSkill));
	        }
	        for (var i = 1; i <= achievementSys.num; i++) {
	            if (LocalStore.loadValue("achieveMentData" + i) != null) {
	                Configuration["achieveMentData" + i] = LocalStore.loadBoolValue("achieveMentData" + i);
	            }
	            if (LocalStore.loadValue("achieveMentData" + i + "Num") != null) {
	                Configuration["achieveMentData" + i + "Num"] = (Number)(LocalStore.loadValue("achieveMentData" + i + "Num"));
	            }
	        }
	        if (Configuration.jumpSkill == true) {
	            this.jump.disabled = false;
	            this.jumpbuy.visible = false;
	        }
	        if (Configuration.rollSkill == true) {
	            this.roll.disabled = false;
	            this.rollbuy.visible = false;
	        }
	        if (Configuration.rushSKill == true) {
	            this.run.disabled = false;
	            this.runbuy.visible = false;
	        }
	        this.curMaxLevel = Configuration.currentAlreadyLevel;
	        AudioPlayUtils.changeAll();
	        this.onSelectSkill(Configuration.currenSelectSkill);
	        this.init();
	        if (Configuration.adsNum < 0 || Configuration.canAds == false) {
	        }
	        if (Configuration.crazyMode == true) {
	            this.onCrazyModeSelect();
	        }
	    }
	    onAchievement() {
	        this.baseVisble();
	        this.achievement.visible = true;
	    }
	    onRank() {
	        var score = Configuration.hitFatNum + Configuration.hitSlimNum;
	    }
	    rankback(res) {
	        console.log('提交结果：', res.data.score, res.data.rank);
	        Laya.Browser.window.h5api.showRankList();
	    }
	    ysHandle() {
	        Configuration.adsNum--;
	        this.adsLabel.text = "（当前次数:" + Configuration.adsNum + "）";
	        Laya.Browser.window.h5api.playAd(this.playAdcallback);
	        var randomMoney = Math.floor(Math.random() * (25 - 5) + 5);
	        this.onGetCoin(randomMoney);
	    }
	    callback(data) {
	        console.log("是否可播放广告", data.canPlayAd, "剩余次数", data.remain);
	        Configuration.adsNum = data.remain;
	        Configuration.canAds = data.canPlayAd;
	        LocalStore.SaveBoolValue(LocalStore.adsTime, Configuration.canAds);
	        LocalStore.SaveValue(LocalStore.adsNum, String(Configuration.adsNum));
	    }
	    playAdcallback(obj) {
	        console.log('代码:' + obj.code + ',消息:' + obj.message);
	        if (obj.code === 10000) {
	            console.log('开始播放');
	        }
	        else if (obj.code === 10001) {
	            console.log('播放结束');
	        }
	        else {
	            console.log('广告异常');
	        }
	    }
	    nsHandle() {
	        this.getMoneyPanel.visible = false;
	        this.btnClose.visible = true;
	    }
	    onSelectSkill(skillIndex) {
	        if (Configuration.jumpSkill == true)
	            this.jump.disabled = false;
	        if (Configuration.rushSKill == true)
	            this.run.disabled = false;
	        if (Configuration.rollSkill == true)
	            this.roll.disabled = false;
	        if (skillIndex == 1) {
	            this.run.disabled = true;
	        }
	        else if (skillIndex == 2) {
	            this.jump.disabled = true;
	        }
	        else if (skillIndex == 3) {
	            this.roll.disabled = true;
	        }
	        Configuration.currenSelectSkill = skillIndex;
	        this.skillSelect.x = 153 + (skillIndex - 1) * 300;
	        LocalStore.SaveValue(LocalStore.currenSelectSkill, String(skillIndex));
	        if (skillIndex != 0)
	            this.skillSelect.visible = true;
	        else
	            this.skillSelect.visible = false;
	    }
	    onNormalSelect() {
	        Configuration.crazyMode = false;
	        LocalStore.SaveBoolValue(LocalStore.CrazyMode, false);
	        this.manSelect.x = 437;
	        this.normal.disabled = false;
	        this.crazyMode.disabled = true;
	    }
	    onCrazyModeSelect() {
	        Configuration.crazyMode = true;
	        LocalStore.SaveBoolValue(LocalStore.CrazyMode, true);
	        this.manSelect.x = 744;
	        this.crazyMode.disabled = false;
	        this.normal.disabled = true;
	    }
	    onClose() {
	        this.panel.visible = false;
	        this.StartGame.visible = true;
	        this.select.visible = true;
	        this.shop.visible = true;
	        this.check.visible = true;
	        this.title.visible = true;
	        this.shopContent.visible = false;
	        this.rule.visible = false;
	        this.Start2.visible = false;
	        this.list.visible = false;
	        this.player.visible = true;
	        this.girl.visible = true;
	        this.achievement.visible = false;
	    }
	    init() {
	        AudioPlayUtils.playMusic("res/bgm.mp3");
	        this.initLevel();
	        this.initAchievement();
	        Laya.Scene.load(GameConfig.startScene);
	    }
	    initLevel() {
	        var dates;
	        dates = [];
	        for (var level = 1; level <= Configuration.levelNum; level++) {
	            var date;
	            if (level <= this.curMaxLevel) {
	                date = { btn: { label: "" + level, clickHandler: Handle.create(this, this.selectLevel, [level], true) } };
	            }
	            else {
	                date = { btn: { label: "" + level, skin: "comp/label.png", labelColors: "#000000", disabled: true } };
	            }
	            dates.push(date);
	        }
	        this.list.array = dates;
	    }
	    initAchievement() {
	        var dates;
	        dates = [];
	        achievementSys.regeneral();
	        for (var num = 1; num <= achievementSys.num; num++) {
	            dates.push(achievementSys["date" + num]);
	        }
	        this.achiList.array = dates;
	    }
	    selectLevel(level) {
	        Configuration.currentSelectLevel = level;
	        Laya.Scene.open(GameConfig.startScene, true);
	    }
	    AudioSourceClick(level) {
	        Configuration.audioPlay = this.check.selected;
	        localStorage.setItem("audioPlay", String(Number(this.check.selected)));
	        console.log(this.check.selected);
	        AudioPlayUtils.changeAll();
	    }
	    baseVisble() {
	        this.onClose();
	        this.panel.visible = true;
	        this.StartGame.visible = false;
	        this.select.visible = false;
	        this.title.visible = false;
	        this.shop.visible = false;
	        this.check.visible = false;
	        this.girl.visible = false;
	    }
	    onShop() {
	        this.baseVisble();
	        this.shopContent.visible = true;
	        this.hold.text = "" + Configuration.holdGoldNum;
	    }
	    onSelect() {
	        this.baseVisble();
	        this.list.visible = true;
	        this.list.selectedIndex = 6;
	        this.player.visible = false;
	    }
	    onStartGBefore() {
	        if (Configuration.startCgPlay == false) {
	            this.onDetail();
	        }
	        else
	            this.onStartG();
	    }
	    onStartG() {
	        Laya.loader.load(["res/battle.atlas"], Laya.Handler.create(this, function () { Laya.Scene.open(GameConfig.startScene, true); }));
	    }
	    onDetail() {
	        this.baseVisble();
	        this.shopContent.visible = false;
	        this.rule.visible = true;
	        this.Start2.visible = true;
	        this.list.visible = false;
	    }
	    onJumpBuy() {
	        this.onBuyItem("跳跃", this.jumpSkillNum, LocalStore.jumpSkill, 0, [this.jump, this.jumpbuy], 2);
	    }
	    onRunBuy() {
	        this.onBuyItem("冲刺", this.runSkillNum, LocalStore.runSkill, 0, [this.run, this.runbuy], 1);
	    }
	    onRollBuy() {
	        this.onBuyItem("翻滚", this.rollSkillNum, LocalStore.rollSkill, 0, [this.roll, this.rollbuy], 3);
	    }
	    onBuyCreazyMode() {
	        this.onBuyItem("暴走模式", this.CreazyModeNum, LocalStore.CrazyMode, 0, [this.crazyMode, this.buyCrezyMode], 0);
	    }
	    onBuyStartCg() {
	        this.onBuyItem("开头动画", this.startCgNum, "startcg", 1);
	    }
	    onBuyUnlockNext() {
	        this.onBuyItem("下一关", this.unlockCgNum, "unlockNext", 2);
	    }
	    onBuyItem(realName, itemPrice, itemName, unLockItem, btnItem = null, skillIndex = null) {
	        if (Configuration.holdGoldNum >= itemPrice) {
	            Configuration.holdGoldNum -= itemPrice;
	            this.hold.text = "" + Configuration.holdGoldNum;
	            LocalStore.SaveValue(LocalStore.holdMoney, (String)(Configuration.holdGoldNum));
	            if (unLockItem == 0) {
	                this.GetText.text = "你购买了“" + realName + "”";
	                LocalStore.SaveBoolValue(itemName, true);
	                Configuration[itemName] = true;
	                btnItem[0].disabled = false;
	                for (var i = 1; i < btnItem.length; i++)
	                    btnItem[i].visible = false;
	                if (skillIndex != 0)
	                    this.onSelectSkill(skillIndex);
	                else
	                    this.onCrazyModeSelect();
	            }
	            else {
	                this.GetText.text = "你解锁了“" + realName + "”";
	                if (unLockItem == 1) {
	                    Configuration.startCgPlay = false;
	                    LocalStore.SaveBoolValue(LocalStore.animStartCgPlay, false);
	                }
	                else if (unLockItem == 2) {
	                    Configuration.currentAlreadyLevel++;
	                    LocalStore.SaveValue(LocalStore.curMaxLevel, String(Configuration.currentAlreadyLevel));
	                    this.curMaxLevel = Configuration.currentAlreadyLevel;
	                    this.initLevel();
	                }
	            }
	            AudioPlayUtils.playAudio("sound/Cash.mp3");
	            Laya.Tween.to(this.alertPanel, { y: 850, ease: Laya.Ease.backOut }, 300, null, Handle.create(this, function () {
	                Laya.timer.once(1000, this, function () {
	                    Laya.Tween.to(this.alertPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	                }, [this.alertPanel]);
	            }));
	        }
	        else {
	            this.GetText.text = "你的金钱不够";
	            Laya.Tween.to(this.alertPanel, { y: 850, ease: Laya.Ease.backOut }, 300, null, Handle.create(this, function () {
	                Laya.timer.once(1000, this, function () {
	                    Laya.Tween.to(this.alertPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	                }, [this.alertPanel]);
	            }));
	            this.getMoneyV();
	        }
	    }
	    getMoneyV() {
	        if (Configuration.adsNum > 0 && Configuration.canAds) {
	            this.getMoneyPanel.visible = true;
	            this.btnClose.visible = false;
	        }
	    }
	    onGetCoin(canGetCoin) {
	        var days = new Date();
	        Configuration.holdGoldNum += canGetCoin;
	        this.alertMessage("你获得" + canGetCoin + "枚金币");
	    }
	    alertMessage(message) {
	        this.GetText.text = message;
	        LocalStore.SaveValue(LocalStore.holdMoney, (String)(Configuration.holdGoldNum));
	        Laya.Tween.to(this.alertPanel, { y: 850, ease: Laya.Ease.backOut }, 300, null, Handle.create(this, function () {
	            Laya.timer.once(1000, this, function () {
	                Laya.Tween.to(this.alertPanel, { y: 900, ease: Laya.Ease.backOut }, 300);
	            }, [this.alertPanel]);
	        }));
	    }
	}

	var Event = Laya.Event;
	class HpSizeUtil extends Laya.Button {
	    constructor() {
	        super();
	        this.storeValue = this.scaleX;
	        console.log(this.name + "/" + this.storeValue + "/n");
	        this.on(Event.CLICK, this, this.onClickFunction);
	        this.on(Event.MOUSE_OVER, this, this.onMouse_Over);
	        this.on(Event.MOUSE_OUT, this, this.onMouse_Out);
	    }
	    onClickFunction() {
	        this.scaleX = this.storeValue + this.storeValue / 5;
	        this.scaleY = this.storeValue + this.storeValue / 5;
	        Laya.timer.once(200, this, this.onClickFunctionCallBack);
	    }
	    onMouse_Over() {
	        this.scaleX = this.storeValue + this.storeValue / 10;
	        this.scaleY = this.storeValue + this.storeValue / 10;
	    }
	    onMouse_Out() {
	        this.scaleX = this.storeValue;
	        this.scaleY = this.storeValue;
	    }
	    onClickFunctionCallBack() {
	        if (this.storeValue >= this.storeValue) {
	            this.scale(this.storeValue, this.storeValue);
	        }
	        else {
	            this.scaleX = this.storeValue;
	            this.scaleY = this.storeValue;
	        }
	    }
	}

	class Bullet extends Laya.Script {
	    constructor() { super(); }
	    onEnable() {
	        var rig = this.owner.getComponent(Laya.RigidBody);
	        rig.setVelocity({ x: 0, y: -10 });
	    }
	    onTriggerEnter(other, self, contact) {
	        this.owner.removeSelf();
	    }
	    onUpdate() {
	        if (this.owner.y < -10) {
	            this.owner.removeSelf();
	        }
	    }
	    onDisable() {
	        Laya.Pool.recover("bullet", this.owner);
	    }
	}

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("script/GameUI.ts", GameUI);
	        reg("script/Enemy.ts", Enemy);
	        reg("script/GameControl.ts", GameControl);
	        reg("script/ShakeCamera.ts", ShakeCamera);
	        reg("script/MainUI.ts", MainUi);
	        reg("script/HpSizeUtil.ts", HpSizeUtil);
	        reg("script/Bullet.ts", Bullet);
	    }
	}
	GameConfig.width = 1600;
	GameConfig.height = 900;
	GameConfig.scaleMode = "fixedwidth";
	GameConfig.screenMode = "horizontal";
	GameConfig.alignV = "top";
	GameConfig.alignH = "left";
	GameConfig.startScene = "test/battleField.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;
	GameConfig.init();

	class Main {
	    constructor() {
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.alignV = GameConfig.alignV;
	        Laya.stage.alignH = GameConfig.alignH;
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError(true);
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	        Configuration.InitScene && Laya.Scene.open(Configuration.InitScene);
	        Laya.Mouse.cursor = 'url("battle/mouse.png"),auto';
	    }
	}
	new Main();

}());
//# sourceMappingURL=bundle.js.map
