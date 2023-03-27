class SceneMondeEntier extends Phaser.Scene {
    constructor(){
        super("SceneMondeEntier")
        this.player;
        this.controller = false;
        
    }
    init(data){

    }



    preload(){
        
        //this.load.spritesheet('perso','assets/perso.png',
        //{ frameWidth: 22, frameHeight: 32 });
        this.load.image('perso','assets/sirenes.png');
        this.load.image("Phaser_tuilesdejeu","assets/Tileset.png");
        this.load.tilemapTiledJSON("carte","assets/carteNiveau.json");

    }

    //le club des variables
    

    create(){
    
        // chargement de la carte
        const carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        const tileset = carteDuNiveau.addTilesetImage("Tileset","Phaser_tuilesdejeu");

        //les caaaaalques (oskour)
        const calqueBase = carteDuNiveau.createLayer("Calque de Tuiles 1",tileset);
        const calqueBat = carteDuNiveau.createLayer("batiments",tileset);

        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide

        //calque_plateformes.setCollisionByProperty({ estSolide: true }); 

        //joueur :
        this.player = this.physics.add.sprite(5023, 7066, 'perso');
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
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 12800, 12800);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 12800, 12800);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8);
      };

    update(){
      if (cursors.left.isDown || this.controller.left){ //si la touche gauche est appuyée
        this.player.setVelocityX(-200); //alors vitesse négative en X
        this.player.anims.play('left', true); //et animation => gauche
        }
      else if (cursors.right.isDown || this.controller.right){ //sinon si la touche droite est appuyée
        this.player.setVelocityX(200); //alors vitesse positive en X
        this.player.anims.play('right', true); //et animation => droite
        }
      else if (cursors.up.isDown ||  this.controller.up ) {
        this.player.setVelocityY(-200);
        this.player.anims.play('left', true);
      }

      else if(cursors.down.isDown|| this.controller.down){
        this.player.setVelocityY(200);
        this.player.anims.play('right', true);
      }
      else {
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);
      }
    };

    
}
