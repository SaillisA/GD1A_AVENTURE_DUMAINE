class SceneDonjon extends Phaser.Scene {
  constructor(){
      super("SceneDonjon")
      this.player;
      this.controller = false;
      this.tileset;
      
  }
  init(data){
  }
  preload(){
    //this.load.spritesheet('perso','assets/perso.png',
    //{ frameWidth: 22, frameHeight: 32 });
    this.load.image('perso','assets/sirenes.png');
    this.load.image("Phaser_tuilesdejeuDede","assets/tileset_donjon.png");
    this.load.tilemapTiledJSON("cartedede","assets/carteDonjon.json");
    this.load.image("transparent","assets/invisible.png");
  }
  //le club des variables
  
  create(){
    // chargement de la carte
    this.carteDuNiveau = this.add.tilemap("cartedede");
    // chargement du jeu de tuiles
    this.tileset = this.carteDuNiveau.addTilesetImage("tileset_donjon","Phaser_tuilesdejeuDede");
    //les caaaaalques (oskour)
    this.calqueSolDonjon = this.carteDuNiveau.createLayer("sol",this.tileset);
    this.calqueMursDonjon = this.carteDuNiveau.createLayer("murs",this.tileset);
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    
    this.calqueMursDonjon.setCollisionByProperty({ estSolide: true }); 
    
    //joueur :
    
    this.player = this.physics.add.sprite(928, 1108, 'perso');
    /*this.player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'perso', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
        frameRate: 10,
        repeat: -1
    });*/
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.setBounds(0, 0, 1856, 1216);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1856, 1216);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.8);
    this.physics.add.collider(this.player,this.calqueMursDonjon);
    };
  update(){
    if (this.cursors.left.isDown || this.controller.left) { //si la touche gauche est appuyée
    this.player.setVelocityX(-250); //alors vitesse négative en X
    this.player.anims.play('left', true); //et animation => gauche
    }
    else if (this.cursors.right.isDown || this.controller.right) { //sinon si la touche droite est appuyée
      this.player.setVelocityX(250); //alors vitesse positive en X
      this.player.anims.play('right', true); //et animation => droite
    }
    else {
      this.player.setVelocityX(0)
    }
    if (this.cursors.up.isDown || this.controller.up) {
      this.player.setVelocityY(-250);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.down.isDown || this.controller.down) {
      this.player.setVelocityY(250);
      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityY(0);
    }
  };
}
