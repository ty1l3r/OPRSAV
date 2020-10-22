# OPRSAV

PHP 7.3.9

App instructions.

1°) git clone https://github.com/ty1l3r/OPRSAV.git

2°) Copier coller le fichier .env (envoyé en pièce jointe) à la racine du projet 

3°) copier/coller le fichier jwt en pièce jointe dans le repertoire "congif"

4°) Configurer la ligne 32 du fichier .env avec vos infromations (mysql://VotreUserName:VotreMotDePasse@VotreServeur:PORT/NomDeLaBdd)

5°) composer install

6°) npm install

7°) php bin/console doctrine:database:create

8°) php bin/console doctrine:schema:update --force

9°) php bin/console doctrine:fixtures:load 
(Le faker genère parfois des données identiques:
SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'a.regnier@savpro.com' for key 'UNIQ_1483A5E9E7927C74')
Si tel est le cas, relancer la commande une nouvelle fois. 

10°) ouvrir une console et lancer "symfony serve --no-tls"

11°) ouvrir une autre console et lancer "encore dev-server"

12°) rejoindre l'adresse du web server symfony

13°) Pour se connecter à l'app: Email : "a@a.com", Password : "password"