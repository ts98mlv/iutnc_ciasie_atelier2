# iutnc_ciasie_atelier2 : GéoQuizz
## par <i>Théo LEGRAND, Thomas SERRES, Théo HELF et Allan IZZI</i>

### Dépôt git :
<a href="https://github.com/ts98mlv/iutnc_ciasie_atelier2">https://github.com/ts98mlv/iutnc_ciasie_atelier2</a>

Ce dépôt est constitué de 4 branches : une pour les APIs, une pour l'application mobile, 
une pour l'application BackOffice et une pour l'application FrontOffice.

### Carnet de Bord :
Nous avons utilisé Trello : <a href="https://trello.com/b/8iFkxq8M/atelier2">https://trello.com/b/8iFkxq8M/atelier2</a>.
<br>  Nous nous sommes réparti le travail comme suit : 
<ul>
    <li>Théo LEGRAND créé l'application mobile,</li>
    <li>Thomas s'occupe des APIs et du déploiement Docker,</li>
    <li>Théo HELF s'occupe de l'application FrontOffice</li>
    <li>Allan s'occupe de l'application BackOffice</li>
</ul>

Bien évidemment nous étions tout le temps en contact et sommes au courant du code des autres.

### Installation : 
<ol>
    <li>
        Envoyer les APIs sur docketu avec le fichier <i>docker-compose_docketu.yml</i> au serveur.
    </li>
    <li>
        Renommer le fichier <i>docker-compose_docketu.yml</i> en <i>docker-compose.yml</i> sur le serveur.
    </li>
    <li>
        En ssh, se connecter au serveur et entrer <code>docker-compose up</code>. Il se peut que vous soyez obligé de la lancer plusieurs fois pour avoir les 3 APIs de connectées à la base de données.
    </li>
    <li>
        Ajouter les données dans la base de données à partir du fichier bdd.sql
    </li>
    <li>Lancer les applications voulues en suivant les instructions du readme qui les accompagne.</li>
</ol>

### Pour tester : 

###### utilisateur : 
login : <code>Michel2i</code> <br>
email : <code>michel@test.fr</code> <br>
mot de passe : <code>michel</code> <br>

###### phpmyadmin
compte : <code>root</code> <br>
mdp : <code>comroot123</code>