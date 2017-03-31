# Descriptif du projet

Média : CitizenPress

Sujet : Les assesseurs et scrutateurs

Equipe : Les Dépouilleurs

Patricipants : 
- Quentin Billaud
- Jimmy Doré
- Aurélien Gauvrit
- Margaux Leroy
- Camille Masset
- Tom Marrucci
- Kevin Monteau

EDNA : Camille, Kevin et Margaux

Polytech : Aurélien, Jimmy, Tom et Quentin

## Sujet
Le projet pars d'un constat simple : il **manque d'assesseurs et de scrutateurs** les jours de scrutin.

Nous proposons donc un outil en ligne permettant de **visualiser** les bureaux de vote les jours de scrutin par rapport à leurs taux de remplissage des assesseurs et scrutateurs. Il permet ensuite de **s'inscrire** à un bureau sélectionné.

L'outil permet également de gérer les demandes d'un bureau.

# Installation
Lancer `node server.js` et se connecter à http://localhost:8080/citizen_press/

# Informations complémentaires
Seule la ville de Nantes a été utilisé pour ce projet.

Ce projet est avant tout un **démonstrateur**, il ne sera en aucun cas utilisé par la ville de Nantes le jour des élections.

Néanmoins il permet de montrer qu'un réel besoin existe et qu'un outil de ce genre permettrait d'inciter les gens à être bénévole pour les jours de scrutin.

## Accès page président
Pour accéder à la page de gestion des demandes, se connecter à http://localhost:8080/citizen_press/president/:idBureau où idBureau correspond à l'identifiant du bureau sur lequel ou souhaite gérer les demandes.