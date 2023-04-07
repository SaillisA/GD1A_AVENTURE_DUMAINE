class firstScreen extends Phaser.Scene {
    constructor(){
        super("firstScreen")
        
    }
    init(data){
    }
    preload(){
        this.load.image('eau1','assets/ecran/m1.png');
        this.load.image('eau1','assets/ecran/m2.png');
        this.load.image('eau3','assets/ecran/m3.png');
        this.load.image('eau4','assets/ecran/m4.png');
        this.load.image('eau5','assets/ecran/m5.png');
        this.load.image('eau6','assets/ecran/m6.png');
        this.load.image('eau7','assets/ecran/m7.png');
        this.load.image('eau8','assets/ecran/m8.png');
        this.load.image('eau9','assets/ecran/m9.png');
        this.load.image('eau10','assets/ecran/m10.png');
        this.load.image('eau11','assets/ecran/m11.png');
        this.load.image('eau12','assets/ecran/m12.png');
        this.load.image('eau13','assets/ecran/m13.png');
        this.load.image('eau14','assets/ecran/m14.png');
        this.load.image('pearl','assets/ecran/titre.png');
    }
    create(){
        this.listeTroBelle = ['eau1',
        'eau1',
        'eau3',
        'eau4',
        'eau5',
        'eau6',
        'eau7',
        'eau8',
        'eau9',
        'eau10',
        'eau11',
        'eau12',
        'eau13',
        'eau14'];
        this.add.image(0,0,"eau1").setOrigin(0,0);
        this.bouton_play = this.add.image(500, 400, "pearl").setDepth(1).setInteractive({ cursor: 'pointer' }).setScale(0.6);
        this.bouton_play.on("pointerdown",this.afficherTroBo,this);
    }
    update(){

    }
    afficherTroBo(){
        let timeTime = 100;
        for (let step = 0; step < 14 ; step ++){
            this.time.delayedCall(timeTime, () => {this.add.image(0,0,this.listeTroBelle[step]).setOrigin(0,0)} , [], this);
            timeTime += 100;
            if(step == 13){
                this.time.delayedCall(timeTime, () => {this.scene.start("SceneMondeEntier")},[],this);
            }
        }
        
    }
}