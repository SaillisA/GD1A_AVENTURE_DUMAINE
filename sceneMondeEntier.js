class SceneMondeEntier extends Phaser.Scene {
    constructor(){
        super("SceneMondeEntier")
        this.player;
        this.controller = false;
        this.tileset;
        this.argent =0;
        this.argentTexte;
        
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
      this.load.image("Phaser_tuilesdejeu","assets/Tileset.png");
      this.load.tilemapTiledJSON("carte","assets/carteNiveau.json");
      this.load.image("transparent","assets/invisible.png");
      this.load.image("bulleImg","assets/bulleAir.png");
      this.load.image("dechImg","assets/dechainement.png");
    }

    create(){
      this.keyA =this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.bulleAirCD = false;
      this.directionPlayer = "down";
      this.keyZ =this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      this.bulleAirCD = false;

        // chargement de la carte
        this.carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        this.tileset = this.carteDuNiveau.addTilesetImage("Tileset","Phaser_tuilesdejeu");

        //les caaaaalques (oskour)
        this.calqueSolMondo = this.carteDuNiveau.createLayer("sol",this.tileset);
        this.calqueHouseVivi = this.carteDuNiveau.createLayer("maisonsVillage",this.tileset);
        this.calqueHab = this.carteDuNiveau.createLayer("habitants",this.tileset);
        this.calqueMursMondo = this.carteDuNiveau.createLayer("murs",this.tileset);


        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calqueMursMondo.setCollisionByProperty({ sosoSolide: true });
        //calque_plateformes.setCollisionByProperty({ estSolide: true }); 

        //joueur :
        this.player = this.physics.add.sprite(this.coordoneeX, this.coordoneeY, 'perso');
        this.player.setSize(40, 90)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 13440, 11840);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 13440, 11840);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8);

        this.argentTexte=this.add.text(16,16,'score: 0',{fontSize:'32px',fill:'#000'});
        //affiche un texte à l’écran, pour le score
        

        //Porte accès donjon
        this.popoDonjon = this.physics.add.group({immovable : true ,allowGravity : false});
        
        this.calque_porteDonjon = this.carteDuNiveau.getObjectLayer("entreDonjon");
        this.calque_porteDonjon.objects.forEach(calque_porteDonjon => {
          this.inutile = this.popoDonjon.create(calque_porteDonjon.x+64,calque_porteDonjon.y+32,"transparent"); 
        });
        this.physics.add.overlap(this.player,this.popoDonjon,this.teleportationDonjon,null,this);

        //Porte accès boutique
        this.popoBoutique = this.physics.add.group({immovable : true ,allowGravity : false});
        
        this.calque_porteBoutique = this.carteDuNiveau.getObjectLayer("entreShop");
        this.calque_porteBoutique.objects.forEach(calque_porteBoutique => {
          this.inutile = this.popoBoutique.create(calque_porteBoutique.x+64,calque_porteBoutique.y+32,"transparent"); 
        });
        this.physics.add.overlap(this.player,this.popoBoutique,this.teleportationBoutique,null,this);

        //Power Up bulle d'air
        this.bubulle = this.physics.add.group();
        //this.physics.add.collider(this.bubulle, ,this.(),null,this);

        this.dedech = this.physics.add.group();
        //this.physics.add.collider(this.dedech,this.(),null,this);

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

    }

    teleportationDonjon(){
      this.scene.start('SceneDonjon',{bulleAirBool : this.bulleAirBool,pvJoueur : this.pvJoueur,coordoneeX:this.coordoneeX,coordoneeY : this.coordoneeY,perlesJoueur : this.perlesJoueur,dechBool: data.dechBool})

    };
    teleportationBoutique(){
      this.scene.start('SceneBoutique',{bulleAirBool : this.bulleAirBool,pvJoueur : this.pvJoueur,coordoneeX:this.coordoneeX,coordoneeY : this.coordoneeY,perlesJoueur : this.perlesJoueur,dechBool: data.dechBool})
    };
    recuperationArgent(){
      this.argentTexte.setText('Perles: ' + argent); //met à jour l’affichage de l'argent
    };
    perdPv(){
      this.bulleAirBool = this.bulleAirBool -1;
      if(this.pvJoueur == 4){
  
      }
      if(this.pvJoueur == 3){
        
      }
      if(this.pvJoueur == 2){
        
      }
      if(this.pvJoueur == 1){
        
      }
      if(this.pvJoueur == 0){
        this.scene.start('GameOver')
      }
    };
    cdBulle(){
      this.bulleAirCD = false;
    };
}
