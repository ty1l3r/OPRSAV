# OPRSAV

PHP 7.3.9

App instructions.

1°) git clone https://github.com/ty1l3r/OPRSAV.git

2°) Copier coller le fichier .env (envoyé en pièce jointe) à la racine du projet 

3°) Configurer la ligne 32 du fichier .env avec vos infromations (mysql://VOTREUSERNAME:VOTREMOTDEPASSE@SERVEUR:PORT/SavPro)

4°) composer install

5°) npm install

6°) php app/console doctrine:database:create

7°) php bin/console doctrine:schema:update --force

8°) php bin/console doctrine:fixtures:load (relancer si le faker créer une donnée identique)

9°) ouvrir une console et lancer "symfony serve --no-tls"

10°) ouvrir une autre console et lancer "encore dev-server"

11°) rejoindre l'adresse "http://127.0.0.1:8000 "

12°) Pour se connecter à l'app: Email : "a@a.com", Password : "password"