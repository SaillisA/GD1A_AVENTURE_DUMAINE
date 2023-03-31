class SceneMondeEntier extends Phaser.Scene {
    constructor(){
        super("SceneMondeEntier")
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
        this.load.image("Phaser_tuilesdejeu","assets/Tileset.png");
        this.load.tilemapTiledJSON("carte","assets/carteNiveau.json");
        this.load.image("transparent","assets/invisible.png");

    }

    //le club des variables
    

    create(){
    
        // chargement de la carte
        this.carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        this.tileset = this.carteDuNiveau.addTilesetImage("Tileset","Phaser_tuilesdejeu");

        //les caaaaalques (oskour)
        this.calqueSolMondo = this.carteDuNiveau.createLayer("sol",this.tileset);
        this.calqueHouseVivi = this.carteDuNiveau.createLayer("maisonsVillage",this.tileset);
        this.calqueBat = this.carteDuNiveau.createLayer("bateau",this.tileset);
        this.calqueHab = this.carteDuNiveau.createLayer("habitants",this.tileset);
        this.calqueMursMondo = this.carteDuNiveau.createLayer("murs",this.tileset);


        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calqueMursMondo.setCollisionByProperty({ sosoSolide: true });
        //calque_plateformes.setCollisionByProperty({ estSolide: true }); 

        //joueur :
        this.player = this.physics.add.sprite(2113, 11520, 'perso');
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
        this.physics.world.setBounds(0, 0, 13440, 13440);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 13440, 13440);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8);


        this.popoDonjon = this.physics.add.group({immovable : true ,allowGravity : false});
        
        this.calque_porteDonjon = this.carteDuNiveau.getObjectLayer("entreDonjon");
        this.calque_porteDonjon.objects.forEach(calque_porteDonjon => {
          this.inutile = this.popoDonjon.create(calque_porteDonjon.x,calque_porteDonjon.y,"transparent");
        });
        this.physics.add.overlap(this.player,this.popoDonjon,this.teleportationDonjon,null,this);

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
      };
    }

    teleportationDonjon(){
      this.scene.start('SceneDonjon')

    };
}
