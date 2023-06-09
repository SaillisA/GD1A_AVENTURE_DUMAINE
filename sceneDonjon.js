class SceneDonjon extends Phaser.Scene {
  constructor(){
      super("SceneDonjon")
      this.player;
      this.controller = false;
      this.tileset;
      this.bulleAirCD = false;
      this.bulleAirBool = false;    
  }
  init(data){
    this.bulleAirBool = data.bulleAirBool;
    this.pvJoueur = data.pvJoueur;
    this.coordoneeX = data.coordoneeX;
    this.coordoneeY = data.coordoneeY;
    this.perlesJoueur = data.perlesJoueur
    this.dechBool = data.dechBool
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
    this.load.image("murCote","assets/murDJCote.png");
    this.load.image("murFace","assets/murDJFace.png");
    this.load.image("murFace3","assets/murDJFace3.png");
    this.load.image("solVide","assets/solTrou.png");
    this.load.image("collierPowerUp","assets/collierBulle.png");
    this.load.image("bulleImg","assets/bulleAir.png");
    this.load.image("mons1","assets/monstre1.png");
    this.load.image("mons2","assets/monstre2.png");
  }

  
  create(){
    this.keyA =this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.bulleAirCD = false;
    this.directionPlayer = "down";

    // chargement de la carte
    this.carteDuNiveau = this.add.tilemap("cartedede");

    // chargement du jeu de tuiles
    this.tileset = this.carteDuNiveau.addTilesetImage("tileset_donjon","Phaser_tuilesdejeuDede");

    //les calques
    this.calqueSolDonjon = this.carteDuNiveau.createLayer("sol",this.tileset);
    this.calqueMursDonjon = this.carteDuNiveau.createLayer("murs",this.tileset);
    this.calqueBoutonPresser = this.carteDuNiveau.createLayer("boutons",this.tileset);

    this.calqueMursDonjon.setCollisionByProperty({ estSolide: true }); 
    
    //joueur :
    this.player = this.physics.add.sprite(928, 1050, 'perso');
    this.player.setSize(40, 90)

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.setBounds(0, 0, 1984, 1216);

    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1984, 1216);
    //11 10
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);

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
    //Mur 3murQuiBouge
    this.mumu3 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_mur3 = this.carteDuNiveau.getObjectLayer("murQuiBouge3");
    this.calque_mur3.objects.forEach(calque_mur3 => {
      this.inutile = this.mumu3.create(calque_mur3.x+32,calque_mur3.y+64,"murCote"); 
    });
    this.collisionmur3 = this.physics.add.collider(this.player,this.mumu3,null,null,this);
    //Mur 4murQuiBouge
    this.mumu4 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_mur4 = this.carteDuNiveau.getObjectLayer("murQuiBouge4");
    this.calque_mur4.objects.forEach(calque_mur4 => {
      this.inutile = this.mumu4.create(calque_mur4.x+96,calque_mur4.y+32,"murFace3"); 
    });
    this.collisionmur4 = this.physics.add.collider(this.player,this.mumu4,null,null,this);
    //on le désactive car il sera réactivé quand le joueur prendra le power up
    this.physics.world.removeCollider(this.collisionmur4)
    this.mumu4.setVisible(false);



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
    //Bouton salle3
    this.bobo3 = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_bouton3 = this.carteDuNiveau.getObjectLayer("bouton3");
    this.calque_bouton3.objects.forEach(calque_bouton3 => {
      this.inutile = this.bobo3.create(calque_bouton3.x+32,calque_bouton3.y+32,"boutonNormal"); 
    });
    this.physics.add.overlap(this.player,this.bobo3,this.pressionbouton3,null,this);
    
    //mob
    this.monmon = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_monstre = this.carteDuNiveau.getObjectLayer("mob");
    this.calque_monstre.objects.forEach(calque_monstre => {
      this.inutile = this.monmon.create(calque_monstre.x+32,calque_monstre.y+32,"mons2"); 
    });
    this.physics.add.overlap(this.player,this.monmon,this.pressionbouton3,null,this);

    //Collier power up bulle d'air
    this.coco = this.physics.add.group({immovable : true ,allowGravity : false});

    this.calque_collier = this.carteDuNiveau.getObjectLayer("collier");
    this.calque_collier.objects.forEach(calque_collier => {
      this.inutile = this.coco.create(calque_collier.x+32,calque_collier.y+32,"collierPowerUp"); 
    });
    this.physics.add.overlap(this.player,this.coco,this.powerUpDebloquer,null,this);

    //Porte sortie du donjon
    this.popoSortieDonjon = this.physics.add.group({immovable : true ,allowGravity : false});
        
    this.calque_porteSortieDonjon = this.carteDuNiveau.getObjectLayer("porteSortie");
    this.calque_porteSortieDonjon.objects.forEach(calque_porteSortieDonjon => {
      this.inutile = this.popoSortieDonjon.create(calque_porteSortieDonjon.x+96,calque_porteSortieDonjon.y+32,"transparent"); 
    });
    this.physics.add.overlap(this.player,this.popoSortieDonjon,this.teleportationSortieDonjon,null,this);

    //Power Up bulle d'air et ses collisions
    this.bubulle = this.physics.add.group();
    this.physics.add.collider(this.bubulle, this.bobo2,this.pressionbouton2,null,this);
    this.physics.add.collider(this.bubulle, this.bobo3,this.pressionbouton3,null,this);
    this.physics.add.collider(this.bubulle, this.monmon,this.monstreMeurt,null,this);

    };



  update(){
    if (this.cursors.left.isDown || this.controller.left) { //si la touche gauche est appuyée
    this.player.setVelocityX(-250); //alors vitesse négative en X
    this.directionPlayer = "left"
    }
    else if (this.cursors.right.isDown || this.controller.right) { //sinon si la touche droite est appuyée
      this.player.setVelocityX(250); //alors vitesse positive en X
      this.directionPlayer = "right"
    }
    else {
      this.player.setVelocityX(0)
    }
    if (this.cursors.up.isDown || this.controller.up) {
      this.player.setVelocityY(-250);
      this.directionPlayer = "up"
    }
    else if (this.cursors.down.isDown || this.controller.down) {
      this.player.setVelocityY(250);
      this.directionPlayer="down"
    }
    else {
      this.player.setVelocityY(0);
    }
    if((this.keyA.isDown)&&(this.bulleAirBool == true)&&(this.bulleAirCD == false)){
      if(this.directionPlayer == "up"){
        this.bubulle.create(this.player.x, this.player.y, "bulleImg").body.setVelocityY(-300);
      }
      if(this.directionPlayer == "down"){
        this.bubulle.create(this.player.x, this.player.y, "bulleImg").body.setVelocityY(300);
      }
      if(this.directionPlayer == "left"){
        this.bubulle.create(this.player.x, this.player.y, "bulleImg").body.setVelocityX(-300);
      }
      if(this.directionPlayer == "right"){
        this.bubulle.create(this.player.x, this.player.y, "bulleImg").body.setVelocityX(300);
      }
      this.bulleAirCD = true;
      this.time.delayedCall(500, this.cdBulle, [], this);
    }
  };
  
  monstreMeurt(player){
    this.monmon.setVisible(false)
    this.physics.world.removeCollider(this.monmon)
    this.bubulle.setVisible(false)
  }
  teleportationSortieDonjon(){
    this.coordoneeX = 2176
    this.coordoneeY =10557
    this.scene.start('SceneMondeEntier',{bulleAirBool : this.bulleAirBool,pvJoueur : this.pvJoueur,coordoneeX:this.coordoneeX,coordoneeY : this.coordoneeY,perlesJoueur : this.perlesJoueur,dechBool: data.dechBool})
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
    this.bubulle.setVisible(false);
  }
  pressionbouton3(player){
    this.bobo3.setVisible(false);
    this.physics.world.removeCollider(this.collisionmur3)
    this.mumu3.setVisible(false);
    this.physics.world.removeCollider(this.collisionpont2)
    this.ponpon2.setVisible(false);
    this.physics.world.removeCollider(this.collisionmur4)
    this.mumu4.setVisible(false);
    this.bubulle.setVisible(false);

  }
  powerUpDebloquer(){
    this.coco.setVisible(false);
    this.bulleAirBool = true;
    this.physics.world.addCollider(this.collisionmur4)
    this.mumu4.setVisible(true);
  }
  cdBulle(){
    this.bulleAirCD = false;
  }
}
