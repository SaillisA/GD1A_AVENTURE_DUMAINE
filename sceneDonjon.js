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
    this.load.image("boutonNormal","assets/boubou.png");
    this.load.image("boutonPresser","assets/boubouPresser.png");
    this.load.image("murCote","assets/murDJCote.png")
    this.load.image("murFace","assets/murDJFace.png")
    this.load.image("solVide","assets/solTrou.png")
  }

  
  create(){
    // chargement de la carte
    this.carteDuNiveau = this.add.tilemap("cartedede");

    // chargement du jeu de tuiles
    this.tileset = this.carteDuNiveau.addTilesetImage("tileset_donjon","Phaser_tuilesdejeuDede");

    //les caaaaalques (oskour)
    this.calqueSolDonjon = this.carteDuNiveau.createLayer("sol",this.tileset);
    this.calqueMursDonjon = this.carteDuNiveau.createLayer("murs",this.tileset);
    this.calqueBoutonPresser = this.carteDuNiveau.createLayer("boutons",this.tileset);
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    this.calqueMursDonjon.setCollisionByProperty({ estSolide: true }); 
    
    //joueur :
    this.player = this.physics.add.sprite(928, 1050, 'perso');
    this.player.setSize(40, 90)

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

    //coliders
    this.physics.add.collider(this.player,this.calqueMursDonjon);

    //LES MURS QUI BOUGENT
    //Mur 1murQuiBouge
    this.mumu1 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_mur1 = this.carteDuNiveau.getObjectLayer("murQuiBouge1");
    this.calque_mur1.objects.forEach(calque_mur1 => {
      this.inutile = this.mumu1.create(calque_mur1.x+32,calque_mur1.y+64,"murCote"); 
    });
    this.collisionmur1 = this.physics.add.collider(this.player,this.mumu1,null,null,this);
    //Mur 2murQuiBouge
    this.mumu2 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_mur2 = this.carteDuNiveau.getObjectLayer("murQuiBouge2");
    this.calque_mur2.objects.forEach(calque_mur2 => {
      this.inutile = this.mumu2.create(calque_mur2.x+64,calque_mur2.y+32,"murFace"); 
    });
    this.collisionmur2 = this.physics.add.collider(this.player,this.mumu2,null,null,this);
    //Mur 2murQuiBouge
    this.mumu3 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_mur3 = this.carteDuNiveau.getObjectLayer("murQuiBouge3");
    this.calque_mur3.objects.forEach(calque_mur3 => {
      this.inutile = this.mumu3.create(calque_mur3.x+32,calque_mur3.y+64,"murCote"); 
    });
    this.collisionmur3 = this.physics.add.collider(this.player,this.mumu3,null,null,this);

    //PONTS
    //Pont1
    this.ponpon1 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_pont1 = this.carteDuNiveau.getObjectLayer("pont1");
    this.calque_pont1.objects.forEach(calque_pont1 => {
      this.inutile = this.ponpon1.create(calque_pont1.x+64,calque_pont1.y+32,"solVide"); 
    });
    this.collisionpont1 = this.physics.add.collider(this.player,this.ponpon1,null,null,this);
    //Pont2
    this.ponpon2 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_pont2 = this.carteDuNiveau.getObjectLayer("pont2");
    this.calque_pont2.objects.forEach(calque_pont2 => {
      this.inutile = this.ponpon2.create(calque_pont2.x+64,calque_pont2.y+32,"solVide"); 
    });
    this.collisionpont2 = this.physics.add.collider(this.player,this.ponpon2,null,null,this);
    //Pont3
    this.ponpon3 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_pont3 = this.carteDuNiveau.getObjectLayer("pont3");
    this.calque_pont3.objects.forEach(calque_pont3 => {
      this.inutile = this.ponpon3.create(calque_pont3.x+64,calque_pont3.y+32,"solVide"); 
    });
    this.collisionpont3 = this.physics.add.collider(this.player,this.ponpon3,null,null,this);

    //LES BOUTONS
    //Bouton salle1
    this.bobo1 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_bouton1 = this.carteDuNiveau.getObjectLayer("bouton1");
    this.calque_bouton1.objects.forEach(calque_bouton1 => {
      this.inutile = this.bobo1.create(calque_bouton1.x+32,calque_bouton1.y+32,"boutonNormal"); 
    });
    this.physics.add.overlap(this.player,this.bobo1,this.pressionbouton1,null,this);
    //Bouton salle2
    this.bobo2 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_bouton2 = this.carteDuNiveau.getObjectLayer("bouton2");
    this.calque_bouton2.objects.forEach(calque_bouton2 => {
      this.inutile = this.bobo2.create(calque_bouton2.x+32,calque_bouton2.y+32,"boutonNormal"); 
    });
    this.physics.add.overlap(this.player,this.bobo2,this.pressionbouton2,null,this);
    
    


    //Porte sortie du donjon
    this.popoSortieDonjon = this.physics.add.group({immovable : true ,allowGravity : false});
        
    this.calque_porteSortieDonjon = this.carteDuNiveau.getObjectLayer("porteSortie");
    this.calque_porteSortieDonjon.objects.forEach(calque_porteSortieDonjon => {
      this.inutile = this.popoSortieDonjon.create(calque_porteSortieDonjon.x+96,calque_porteSortieDonjon.y+32,"transparent"); 
    });
    this.physics.add.overlap(this.player,this.popoSortieDonjon,this.teleportationSortieDonjon,null,this);


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
  teleportationSortieDonjon(){
    this.scene.start('SceneMondeEntier')
  }
  pressionbouton1(player){
    this.bobo1.setVisible(false);
    this.physics.world.removeCollider(this.collisionmur1)
    this.mumu1.setVisible(false);
    

  }
  pressionbouton2(player){
    this.bobo2.setVisible(false);
    this.physics.world.removeCollider(this.collisionmur2)
    this.mumu2.setVisible(false);
    this.physics.world.removeCollider(this.collisionpont1)
    this.ponpon1.setVisible(false);
  }

}
