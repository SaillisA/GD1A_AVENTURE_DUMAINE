class SceneBoutique extends Phaser.Scene {
    constructor(){
        super("SceneBoutique")
        this.player;
        this.controller = false;
        this.tileset;
        
    }
    init(data){
      this.bulleAirBool = data.bulleAirBool
      this.pvJoueur = data.pvJoueura
      this.coordoneeX = data.coordoneeX
      this.coordoneeY = data.coordoneeX
      this.perlesJoueur = data.perlesJoueur
      this.dechBool = data.dechBool
    }
    preload(){
      //this.load.spritesheet('perso','assets/perso.png',
      //{ frameWidth: 22, frameHeight: 32 }); //ne fonctionne pas
      this.load.image('perso','assets/sirenes.png');
      this.load.image("Phaser_tuilesdejeuBouBou","assets/tileset_shop.png");
      this.load.tilemapTiledJSON("carteboubou","assets/carteBoutique.json");
      this.load.image("transparent","assets/invisible.png");
      this.load.image("vendeurImg","assets/vendeur.png")
      
    }
    //le club des variables
    
    create(){
      // chargement de la carte
      this.carteDuNiveau = this.add.tilemap("carteboubou");
      // chargement du jeu de tuiles
      this.tileset = this.carteDuNiveau.addTilesetImage("tileset_shop","Phaser_tuilesdejeuBouBou");
      //les caaaaalques (oskour)
      this.calqueSolBoutique = this.carteDuNiveau.createLayer("sol",this.tileset);
      this.calqueMursBoutique = this.carteDuNiveau.createLayer("murs",this.tileset);
      // définition des tuiles de plateformes qui sont solides
      // utilisation de la propriété estSolide
      
      this.calqueMursBoutique.setCollisionByProperty({ estSolideBoutique: true }); 
      
      //joueur :
      
      this.player = this.physics.add.sprite(512, 1472, 'perso');
      this.player.setSize(40, 90)
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.world.setBounds(0, 0, 1024, 1600);
      //  ajout du champs de la caméra de taille identique à celle du monde
      this.cameras.main.setBounds(0, 0, 1024, 1600);
      // ancrage de la caméra sur le joueur
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setZoom(0.8);
      this.physics.add.collider(this.player,this.calqueMursBoutique);  


      //Porte sortie du donjon
      this.popoSortieBoutique = this.physics.add.group({immovable : true ,allowGravity : false});

      this.calque_porteSortieBoutique = this.carteDuNiveau.getObjectLayer("sortieBoutique");
      this.calque_porteSortieBoutique.objects.forEach(calque_porteSortieBoutique => {
        this.inutile = this.popoSortieBoutique.create(calque_porteSortieBoutique.x+64,calque_porteSortieBoutique.y+32,"transparent"); 
      });
      this.physics.add.overlap(this.player,this.popoSortieBoutique,this.teleportationSortieBoutique,null,this);
    
      //vendeur
      this.venven = this.physics.add.group({immovable : true ,allowGravity : false});
      this.calque_vendeur = this.carteDuNiveau.getObjectLayer("vendeur");
      this.calque_vendeur.objects.forEach(calque_vendeur => {
        this.inutile = this.venven.create(calque_vendeur.x+64,calque_vendeur.y+32,"vendeurImg"); 
      });
      this.physics.add.collider(this.player,this.venven,this.acheterPowerUp,null,this);
    };
  
  
  
    update(){
      if (this.cursors.left.isDown || this.controller.left) { //si la touche gauche est appuyée
      this.player.setVelocityX(-250); //alors vitesse négative en X
      }
      else if (this.cursors.right.isDown || this.controller.right) { //sinon si la touche droite est appuyée
        this.player.setVelocityX(250); //alors vitesse positive en X
      }
      else {
        this.player.setVelocityX(0)
      }
      if (this.cursors.up.isDown || this.controller.up) {
        this.player.setVelocityY(-250);
      }
      else if (this.cursors.down.isDown || this.controller.down) {
        this.player.setVelocityY(250);
      }
      else {
        this.player.setVelocityY(0);
      }
    };
    teleportationSortieBoutique(){
      this.coordoneeX = 6976;
      this.coordoneeY = 6464;
      this.scene.start('SceneMondeEntier',{bulleAirBool : this.bulleAirBool,pvJoueur : this.pvJoueur,coordoneeX:this.coordoneeX,coordoneeY : this.coordoneeY,perlesJoueur : this.perlesJoueur,dechBool: data.dechBool})
    }
    acheterPowerUp(){
      if(this.perlesJoueur >= 100){
        this.perlesJoueur = this.perlesJoueur - 100;
        dechBool = true;
      }
    }
  }
  