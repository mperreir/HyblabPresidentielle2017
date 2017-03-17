/*NbTweets par jour par candidat*/
/*Changer la table du LEFT JOIN pour récupérer un candidat*/
SELECT DA.DATE, TF.NBTWEETS
FROM date_fev_mars AS DA
LEFT JOIN (SELECT DATE, COUNT(*) AS NBTWEETS FROM tweet_Fillon GROUP BY DATE) AS TF
ON DA.date = TF.date;

/*NbReTweets par jour par candidat*/
/*Changer la table du LEFT JOIN pour récupérer un candidat*/
SELECT DA.DATE, TF.NBTWEETS
FROM date_fev_mars AS DA
LEFT JOIN (SELECT DATE, SUM(retweets) AS NBTWEETS FROM tweet_Fillon GROUP BY DATE) AS TF
ON DA.date = TF.date;

/*NbFollowers par jour par candidat*/
/*La table tw_followers_change contient déjà les données voulues*/

/*NbFacebookFans par jour par candidat*/
/*La table fb_fantotal contient déjà les données voulues*/

/*NbFacebookInteractions par jour par candidat*/
/*La table fb_interaction contient déjà les données voulues*/

/*FacebookFansChange par jour par candidat*/
/*La table fb_fans_change contient déjà les données voulues*/

/*YoutubeSubscribers par jour par candidat*/
/*La table yt_subscribers_total contient déjà les données voulues*/

/*YoutubeViews par jour par candidat*/
/*La table yt_views_change contient déjà les données voulues*/

/*Visites sites politiques par jour par candidat*/
/*Changer le nom du candidat pour récupérer les visites de son site*/
SELECT DATE, Vue
FROM visite_site_politique
WHERE nom='Fillon';