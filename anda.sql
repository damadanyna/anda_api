-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: anda_tsena
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abonement`
--

DROP TABLE IF EXISTS `abonement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abonement` (
  `abo_id` int NOT NULL AUTO_INCREMENT,
  `fourn_id` int NOT NULL,
  `client_id` int NOT NULL,
  `abo_data_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`abo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abonement`
--

LOCK TABLES `abonement` WRITE;
/*!40000 ALTER TABLE `abonement` DISABLE KEYS */;
/*!40000 ALTER TABLE `abonement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_label` varchar(60) NOT NULL,
  `cat_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'Informatique','2023-02-17 14:30:43'),(2,'Cuisine','2023-02-17 14:30:54'),(3,'Livre','2023-02-17 14:31:03'),(4,'Quincallerie','2023-02-17 14:31:12'),(5,'Décoration','2023-02-17 14:31:35'),(6,'Mode','2023-02-17 14:31:45'),(7,'Vêtement','2023-02-17 14:31:59'),(8,'Mecanique','2023-02-17 14:32:45'),(9,'electronique','2023-02-17 15:01:19');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` varchar(100) NOT NULL,
  `client_nom` varchar(150) NOT NULL,
  `client_tel` varchar(50) NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `client_date_naiss` varchar(255) NOT NULL,
  `client_local` varchar(150) NOT NULL,
  `client_pwd` varchar(150) NOT NULL,
  `client_img_midle` varchar(60) DEFAULT NULL,
  `client_img_big` varchar(60) DEFAULT NULL,
  `client_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('a5fd9irxnok','Dama','tel','email','1998-04-02','2','mdp',NULL,NULL,'2023-09-01 22:07:13');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emmotion`
--

DROP TABLE IF EXISTS `emmotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emmotion` (
  `emm_id` int NOT NULL AUTO_INCREMENT,
  `emm_ico` text NOT NULL,
  `emm_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`emm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emmotion`
--

LOCK TABLES `emmotion` WRITE;
/*!40000 ALTER TABLE `emmotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `emmotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fournisseur` (
  `fourn_id` int NOT NULL AUTO_INCREMENT,
  `ville_id` int DEFAULT NULL,
  `localisation_` varchar(150) NOT NULL,
  `fourn_name` varchar(150) NOT NULL,
  `fourn_email` varchar(150) NOT NULL,
  `fourn_nif` varchar(150) NOT NULL,
  `fourn_stat` varchar(150) NOT NULL,
  `fourn_tel` text NOT NULL,
  `fourn_pass` text NOT NULL,
  `fourn_status` tinyint(1) NOT NULL,
  `fourn_img_log_middle` varchar(60) DEFAULT NULL,
  `fourn_img_bg` varchar(60) DEFAULT NULL,
  `fourn_img_log_big` varchar(60) DEFAULT NULL,
  `fourn_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fourn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fournisseur`
--

LOCK TABLES `fournisseur` WRITE;
/*!40000 ALTER TABLE `fournisseur` DISABLE KEYS */;
INSERT INTO `fournisseur` VALUES (1,301,'Talatamaty','AnDa','damadany@gmail.com','fif','stat','tel','mdp',1,'anda_img_1691350951505.jpg','null','anda_img_1691350951505.jpg','2023-02-10 11:56:33'),(2,301,'antarandolo','Anda','damadanyna@gmail.com','455555','1111111','06544444','d',1,NULL,'null ',NULL,'2023-02-10 11:58:51'),(4,101,'Ambodirano','Truc Astuce','astuce@gmail.com','444','4444','phone','12',1,'anda_img_1691350910611.jpg','null','anda_img_1691350910611.jpg','2023-02-15 11:31:29'),(5,2,'Fianara','Ma Boutique','damadany@gmail.com','122222','2000','tel_','0',1,'anda_img_1678689003021.jpg','null',NULL,'2023-03-13 08:25:19'),(6,4,'io','Cyber Punk','cyberpunk.yahoo.fr','544','45000411','0345502175','poopsd',1,'anda_img_1690200566082.jpg','null',NULL,'2023-07-24 15:07:31'),(7,4,'ppkpok','Carrefour','crf','12','12','034522455','d',1,NULL,'null',NULL,'2023-07-30 01:41:10'),(8,4,'Talatamaty','virtual','vir','4556','1000','45','v',1,'anda_img_1691351014693.jpg','null','anda_img_1691351014693.jpg','2023-07-30 01:56:45'),(13,4,'vg','vg','vg','vg','vg','vg','vg',1,'anda_img_1693400351195.jpg','null','anda_img_1693400351195.jpg','2023-07-30 02:38:37'),(15,4,'cp','Computer Store','cp','cp','cp','+2611178951','cp',1,'anda_img_1691422056248.jpg','null','anda_img_1691422056248.jpg','2023-07-30 02:48:48');
/*!40000 ALTER TABLE `fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `prod_id` varchar(100) NOT NULL,
  `img_midle` varchar(100) NOT NULL,
  `img_big` varchar(100) NOT NULL,
  `img_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1135,'h2vcf2i64g','anda_img_1691452170136.jpg','anda_img_1691452170136.jpg','2023-08-08 02:49:30'),(1136,'jqmbppw0coh','anda_img_1691452170236.jpg','anda_img_1691452170236.jpg','2023-08-08 02:49:31'),(1137,'422gw8eist','anda_img_1691452171180.jpg','anda_img_1691452171180.jpg','2023-08-08 02:49:31'),(1138,'cxog1zm7s1','anda_img_1691452171462.jpg','anda_img_1691452171462.jpg','2023-08-08 02:49:31'),(1139,'nzxw8eiwef','anda_img_1691452171741.jpg','anda_img_1691452171741.jpg','2023-08-08 02:49:31'),(1140,'g21dmygj69l','anda_img_1691452172127.jpg','anda_img_1691452172127.jpg','2023-08-08 02:49:32'),(1141,'762of1ioyw','anda_img_1691452172366.jpg','anda_img_1691452172366.jpg','2023-08-08 02:49:32'),(1142,'qddtc5h2nz','anda_img_1691452172623.jpg','anda_img_1691452172623.jpg','2023-08-08 02:49:33'),(1143,'3bgec30i52','anda_img_1691452173105.jpg','anda_img_1691452173105.jpg','2023-08-08 02:49:33'),(1144,'mnrznlhmhg','anda_img_1691452173375.jpg','anda_img_1691452173375.jpg','2023-08-08 02:49:33'),(1145,'iu73kvxcvi','anda_img_1691452173701.jpg','anda_img_1691452173701.jpg','2023-08-08 02:49:34'),(1146,'xjhos62nsr','anda_img_1691452174012.jpg','anda_img_1691452174012.jpg','2023-08-08 02:49:34'),(1147,'9r3ng8hdyf','anda_img_1691452174338.jpg','anda_img_1691452174338.jpg','2023-08-08 02:49:34'),(1148,'r309oh5you','anda_img_1691452174834.jpg','anda_img_1691452174834.jpg','2023-08-08 02:49:35'),(1149,'zs6zaaz3np','anda_img_1691452175166.jpg','anda_img_1691452175166.jpg','2023-08-08 02:49:35'),(1150,'lhfrop8ufz','anda_img_1691452175432.jpg','anda_img_1691452175432.jpg','2023-08-08 02:49:35'),(1151,'xs24nyvkik','anda_img_1691452175832.jpg','anda_img_1691452175832.jpg','2023-08-08 02:49:36'),(1152,'xfk7zfw2g2','anda_img_1691452176112.jpg','anda_img_1691452176112.jpg','2023-08-08 02:49:36'),(1153,'hgwajwnizg','anda_img_1691452176300.jpg','anda_img_1691452176300.jpg','2023-08-08 02:49:36'),(1154,'6l0u0gsrca','anda_img_1691452177018.jpg','anda_img_1691452177018.jpg','2023-08-08 02:49:37'),(1155,'ayoo5aj7z9','anda_img_1691452177310.jpg','anda_img_1691452177310.jpg','2023-08-08 02:49:37'),(1156,'t4uautiwzu','anda_img_1691452177511.jpg','anda_img_1691452177511.jpg','2023-08-08 02:49:37'),(1157,'qfy5509ruf','anda_img_1691452177940.jpg','anda_img_1691452177940.jpg','2023-08-08 02:49:38'),(1158,'gywi6ldo03','anda_img_1691452178239.jpg','anda_img_1691452178239.jpg','2023-08-08 02:49:38'),(1159,'146qw8tr0w','anda_img_1691452178539.jpg','anda_img_1691452178539.jpg','2023-08-08 02:49:38'),(1160,'5h4d09w8tw','anda_img_1691452178911.jpg','anda_img_1691452178911.jpg','2023-08-08 02:49:39'),(1161,'ws1eupq99c','anda_img_1691452179102.jpg','anda_img_1691452179102.jpg','2023-08-08 02:49:39'),(1162,'y5edhue3ta','anda_img_1691452179566.jpg','anda_img_1691452179566.jpg','2023-08-08 02:49:40'),(1163,'rriisjc6us','anda_img_1691452179930.jpg','anda_img_1691452179930.jpg','2023-08-08 02:49:40'),(1164,'jzxwwkgk4b','anda_img_1691452180683.jpg','anda_img_1691452180683.jpg','2023-08-08 02:49:40'),(1165,'n41vtk0iwol','anda_img_1691452181231.jpg','anda_img_1691452181231.jpg','2023-08-08 02:49:42'),(1166,'ronud0t2lx','anda_img_1691452180944.jpg','anda_img_1691452180944.jpg','2023-08-08 02:49:42'),(1167,'g9p3cf3dq9f','anda_img_1691452181687.jpg','anda_img_1691452181687.jpg','2023-08-08 02:49:43'),(1168,'8rbnp7nacq','anda_img_1691452182815.jpg','anda_img_1691452182815.jpg','2023-08-08 02:49:43'),(1169,'iegjwbyuc9','anda_img_1691452183432.jpg','anda_img_1691452183432.jpg','2023-08-08 02:49:43'),(1170,'opct7mgati','anda_img_1691452183711.jpg','anda_img_1691452183711.jpg','2023-08-08 02:49:43'),(1171,'791l76wg4g','anda_img_1691452183975.jpg','anda_img_1691452183975.jpg','2023-08-08 02:49:44'),(1172,'gcv9chvtctk','anda_img_1691452184338.jpg','anda_img_1691452184338.jpg','2023-08-08 02:49:44'),(1173,'f9yiivd4y5i','anda_img_1691452184605.jpg','anda_img_1691452184605.jpg','2023-08-08 02:49:44'),(1174,'md8hxxovwd','anda_img_1691452184920.jpg','anda_img_1691452184920.jpg','2023-08-08 02:49:45'),(1175,'f8r720w6mc','anda_img_1691452185215.jpg','anda_img_1691452185215.jpg','2023-08-08 02:49:45'),(1176,'venw5oic6','anda_img_1691452185530.jpg','anda_img_1691452185530.jpg','2023-08-08 02:49:45'),(1177,'h8npsilnb3j','anda_img_1691452185846.jpg','anda_img_1691452185846.jpg','2023-08-08 02:49:46'),(1178,'qoo929bzaw','anda_img_1691452186215.jpg','anda_img_1691452186215.jpg','2023-08-08 02:49:46'),(1179,'uvq89mzi4r','anda_img_1691452186473.jpg','anda_img_1691452186473.jpg','2023-08-08 02:49:46'),(1180,'n7tdhl2ec2','anda_img_1691452186812.jpg','anda_img_1691452186812.jpg','2023-08-08 02:49:46'),(1181,'sjpirtyzh3','anda_img_1691452187205.jpg','anda_img_1691452187205.jpg','2023-08-08 02:49:47'),(1182,'5nfclx96je','anda_img_1691452187453.jpg','anda_img_1691452187453.jpg','2023-08-08 02:49:48'),(1183,'fut4vtd6v4','anda_img_1691452187678.jpg','anda_img_1691452187678.jpg','2023-08-08 02:49:48'),(1184,'qtuozs8cwx','anda_img_1691452188696.jpg','anda_img_1691452188696.jpg','2023-08-08 02:49:48'),(1185,'t6top44be2','anda_img_1691452254812.jpg','anda_img_1691452254812.jpg','2023-08-08 02:50:55'),(1186,'n7rg7cczkk','anda_img_1691452254841.jpg','anda_img_1691452254841.jpg','2023-08-08 02:50:55'),(1187,'pjphxrqnt4','anda_img_1691452255844.jpg','anda_img_1691452255844.jpg','2023-08-08 02:50:56'),(1188,'bzoz9uxub2','anda_img_1691452256128.jpg','anda_img_1691452256128.jpg','2023-08-08 02:50:56'),(1189,'pql7hnfdt9','anda_img_1691452256347.jpg','anda_img_1691452256347.jpg','2023-08-08 02:50:56'),(1190,'55nebpg8ai','anda_img_1691452257044.jpg','anda_img_1691452257044.jpg','2023-08-08 02:50:58'),(1191,'8twm876b6g','anda_img_1691452257352.jpg','anda_img_1691452257352.jpg','2023-08-08 02:50:58'),(1192,'1qddsd475s','anda_img_1691452258143.jpg','anda_img_1691452258143.jpg','2023-08-08 02:50:59'),(1193,'34osjrkzjf','anda_img_1691452259313.jpg','anda_img_1691452259313.jpg','2023-08-08 02:51:00'),(1194,'mbxj8edeh1','anda_img_1691452259654.jpg','anda_img_1691452259654.jpg','2023-08-08 02:51:00'),(1195,'14d7imqdu6','anda_img_1691452259900.jpg','anda_img_1691452259900.jpg','2023-08-08 02:51:00'),(1196,'7o48594xn7l','anda_img_1691452260416.jpg','anda_img_1691452260416.jpg','2023-08-08 02:51:00'),(1197,'tgmuqhkmiz','anda_img_1691452260847.jpg','anda_img_1691452260847.jpg','2023-08-08 02:51:01'),(1198,'xacb254aq6h','anda_img_1691452261057.jpg','anda_img_1691452261057.jpg','2023-08-08 02:51:01'),(1199,'fgijc4j1jn','anda_img_1691452261487.jpg','anda_img_1691452261487.jpg','2023-08-08 02:51:01'),(1200,'u0lbam0d9j','anda_img_1691452262151.jpg','anda_img_1691452262151.jpg','2023-08-08 02:51:02'),(1201,'eprwdbfjtm','anda_img_1691452261968.jpg','anda_img_1691452261968.jpg','2023-08-08 02:51:02'),(1202,'6o990q5gmth','anda_img_1691452262861.jpg','anda_img_1691452262861.jpg','2023-08-08 02:51:03'),(1203,'vqqakqqkjs','anda_img_1691452263095.jpg','anda_img_1691452263095.jpg','2023-08-08 02:51:03'),(1204,'uy37kljcae','anda_img_1691452262540.jpg','anda_img_1691452262540.jpg','2023-08-08 02:51:03'),(1205,'baafeq2vw3','anda_img_1691452263560.jpg','anda_img_1691452263560.jpg','2023-08-08 02:51:04'),(1206,'mq9rawgspug','anda_img_1691452264050.jpg','anda_img_1691452264050.jpg','2023-08-08 02:51:04'),(1207,'gdyjgqafdf','anda_img_1691452264389.jpg','anda_img_1691452264389.jpg','2023-08-08 02:51:04'),(1208,'uoeb6w9d07','anda_img_1691452265016.jpg','anda_img_1691452265016.jpg','2023-08-08 02:51:05'),(1209,'vp1ycolmhc','anda_img_1691452264831.jpg','anda_img_1691452264831.jpg','2023-08-08 02:51:05'),(1210,'yhkmsy1k78f','anda_img_1691452265530.jpg','anda_img_1691452265530.jpg','2023-08-08 02:51:06'),(1211,'vf0gn6ws0ig','anda_img_1691452266392.jpg','anda_img_1691452266392.jpg','2023-08-08 02:51:07'),(1212,'cg4eyiid3p','anda_img_1691452266678.jpg','anda_img_1691452266678.jpg','2023-08-08 02:51:07'),(1213,'5lggvsdebhi','anda_img_1691452266076.jpg','anda_img_1691452266076.jpg','2023-08-08 02:51:07'),(1214,'mwbcr5loxqh','anda_img_1691452267395.jpg','anda_img_1691452267395.jpg','2023-08-08 02:51:07'),(1215,'bv7s0cvplj','anda_img_1691452267728.jpg','anda_img_1691452267728.jpg','2023-08-08 02:51:08'),(1216,'tlenyqkc8l','anda_img_1691452268221.jpg','anda_img_1691452268221.jpg','2023-08-08 02:51:08'),(1217,'drakle4kae','anda_img_1691452268872.jpg','anda_img_1691452268872.jpg','2023-08-08 02:51:09'),(1218,'qyb0khbokk','anda_img_1691452268575.jpg','anda_img_1691452268575.jpg','2023-08-08 02:51:09'),(1219,'uw6sblev06','anda_img_1691452269328.jpg','anda_img_1691452269328.jpg','2023-08-08 02:51:09'),(1220,'n82445az03','anda_img_1691452269862.jpg','anda_img_1691452269862.jpg','2023-08-08 02:51:10'),(1221,'9qv2vare7k','anda_img_1691452270503.jpg','anda_img_1691452270503.jpg','2023-08-08 02:51:10'),(1222,'9nropyffqh','anda_img_1691452270913.jpg','anda_img_1691452270913.jpg','2023-08-08 02:51:11'),(1223,'vywtudo63z','anda_img_1691452270243.jpg','anda_img_1691452270243.jpg','2023-08-08 02:51:11'),(1224,'vs3ujqx7k2','anda_img_1691452271503.jpg','anda_img_1691452271503.jpg','2023-08-08 02:51:11'),(1225,'hseth9k3hlg','anda_img_1691452271800.jpg','anda_img_1691452271800.jpg','2023-08-08 02:51:11'),(1226,'841fta8kcjl','anda_img_1691452272134.jpg','anda_img_1691452272134.jpg','2023-08-08 02:51:12'),(1227,'s8hkjiavbb','anda_img_1691452272517.jpg','anda_img_1691452272517.jpg','2023-08-08 02:51:12'),(1228,'6xhku17pewf','anda_img_1691452272801.jpg','anda_img_1691452272801.jpg','2023-08-08 02:51:13'),(1229,'qb2w85cpwj','anda_img_1691452273348.jpg','anda_img_1691452273348.jpg','2023-08-08 02:51:13'),(1230,'aiqf4npdhy','anda_img_1691452273899.jpg','anda_img_1691452273899.jpg','2023-08-08 02:51:14'),(1231,'f6yn38witr','anda_img_1691452273443.jpg','anda_img_1691452273443.jpg','2023-08-08 02:51:15'),(1232,'dj4f3h8fnyl','anda_img_1691452274309.jpg','anda_img_1691452274309.jpg','2023-08-08 02:51:16'),(1233,'w8ja5encn3','anda_img_1691452274823.jpg','anda_img_1691452274823.jpg','2023-08-08 02:51:16'),(1234,'ulcqr3gm3y','anda_img_1691452276768.jpg','anda_img_1691452276768.jpg','2023-08-08 02:51:17'),(1235,'kn00ss1sct','anda_img_1691452394916.jpg','anda_img_1691452394916.jpg','2023-08-08 02:53:15'),(1236,'iaqmiivqkd','anda_img_1691452395059.jpg','anda_img_1691452395059.jpg','2023-08-08 02:53:15'),(1237,'xjfeqat8kx','anda_img_1691452395668.jpg','anda_img_1691452395668.jpg','2023-08-08 02:53:16'),(1238,'kk4hgk9ocjf','anda_img_1691452395968.jpg','anda_img_1691452395968.jpg','2023-08-08 02:53:16'),(1239,'4tynk645qph','anda_img_1691452396358.jpg','anda_img_1691452396358.jpg','2023-08-08 02:53:16'),(1240,'f427uaj58u','anda_img_1691452396934.jpg','anda_img_1691452396934.jpg','2023-08-08 02:53:17'),(1241,'8q0jp4mejp','anda_img_1691452397288.jpg','anda_img_1691452397288.jpg','2023-08-08 02:53:18'),(1242,'2ssne32zmt','anda_img_1691452397880.jpg','anda_img_1691452397880.jpg','2023-08-08 02:53:19'),(1243,'zf8s0zgd23','anda_img_1691452398791.jpg','anda_img_1691452398791.jpg','2023-08-08 02:53:19'),(1244,'8b0in50h2r','anda_img_1691452399814.jpg','anda_img_1691452399814.jpg','2023-08-08 02:53:19'),(1245,'oxgsc9oxo','anda_img_1691452400042.jpg','anda_img_1691452400042.jpg','2023-08-08 02:53:20'),(1246,'7ly6zjm714','anda_img_1691452400315.jpg','anda_img_1691452400315.jpg','2023-08-08 02:53:20'),(1247,'61ja437st1','anda_img_1691452400748.jpg','anda_img_1691452400748.jpg','2023-08-08 02:53:20'),(1248,'fty9edhkd4i','anda_img_1691452401141.jpg','anda_img_1691452401141.jpg','2023-08-08 02:53:21'),(1249,'xx479w7k8e','anda_img_1691452401416.jpg','anda_img_1691452401416.jpg','2023-08-08 02:53:21'),(1250,'8kmuhkd0t3','anda_img_1691452401696.jpg','anda_img_1691452401696.jpg','2023-08-08 02:53:21'),(1251,'1z9r4qqs05l','anda_img_1691452402173.jpg','anda_img_1691452402173.jpg','2023-08-08 02:53:22'),(1252,'vvtjd4i6r8','anda_img_1691452402478.jpg','anda_img_1691452402478.jpg','2023-08-08 02:53:22'),(1253,'ltm8nijcyxl','anda_img_1691452402677.jpg','anda_img_1691452402677.jpg','2023-08-08 02:53:22'),(1254,'78iro49t2vl','anda_img_1691452402969.jpg','anda_img_1691452402969.jpg','2023-08-08 02:53:23'),(1255,'bjeo0avh8d','anda_img_1691452403251.jpg','anda_img_1691452403251.jpg','2023-08-08 02:53:23'),(1256,'jratiib4x6','anda_img_1691452403600.jpg','anda_img_1691452403600.jpg','2023-08-08 02:53:23'),(1257,'cp80n0fv05','anda_img_1691452403906.jpg','anda_img_1691452403906.jpg','2023-08-08 02:53:24'),(1258,'0yfsavth9f','anda_img_1691452404248.jpg','anda_img_1691452404248.jpg','2023-08-08 02:53:24'),(1259,'fevdicodxxg','anda_img_1691452404657.jpg','anda_img_1691452404657.jpg','2023-08-08 02:53:25'),(1260,'9s454smp5wf','anda_img_1691452404862.jpg','anda_img_1691452404862.jpg','2023-08-08 02:53:25'),(1261,'91zksd4d37','anda_img_1691452405246.jpg','anda_img_1691452405246.jpg','2023-08-08 02:53:25'),(1262,'sjxewvtas','anda_img_1691452405694.jpg','anda_img_1691452405694.jpg','2023-08-08 02:53:26'),(1263,'ibdn0ndi9vh','anda_img_1691452406286.jpg','anda_img_1691452406286.jpg','2023-08-08 02:53:26'),(1264,'n2wedxm41w','anda_img_1691452405955.jpg','anda_img_1691452405955.jpg','2023-08-08 02:53:26'),(1265,'wyv9n0d7tz','anda_img_1691452406712.jpg','anda_img_1691452406712.jpg','2023-08-08 02:53:27'),(1266,'uot52jqwkp','anda_img_1691452407200.jpg','anda_img_1691452407200.jpg','2023-08-08 02:53:27'),(1267,'wyfp7u6qyt','anda_img_1691452407645.jpg','anda_img_1691452407645.jpg','2023-08-08 02:53:28'),(1268,'hcak07lj2s','anda_img_1691452407902.jpg','anda_img_1691452407902.jpg','2023-08-08 02:53:28'),(1269,'tolt29p6r1','anda_img_1691452408386.jpg','anda_img_1691452408386.jpg','2023-08-08 02:53:28'),(1270,'xfjlicidtf','anda_img_1691452408691.jpg','anda_img_1691452408691.jpg','2023-08-08 02:53:28'),(1271,'79qcshqrky','anda_img_1691452409046.jpg','anda_img_1691452409046.jpg','2023-08-08 02:53:29'),(1272,'bpeswd43p6','anda_img_1691452409337.jpg','anda_img_1691452409337.jpg','2023-08-08 02:53:29'),(1273,'cgm9eh0b9n','anda_img_1691452409802.jpg','anda_img_1691452409802.jpg','2023-08-08 02:53:30'),(1274,'0e64pxrxum','anda_img_1691452409989.jpg','anda_img_1691452409989.jpg','2023-08-08 02:53:30'),(1275,'ew29thjhdp','anda_img_1691452410663.jpg','anda_img_1691452410663.jpg','2023-08-08 02:53:30'),(1276,'782ttzzxat','anda_img_1691452410898.jpg','anda_img_1691452410898.jpg','2023-08-08 02:53:32'),(1277,'m3gbny14dy','anda_img_1691452411580.jpg','anda_img_1691452411580.jpg','2023-08-08 02:53:32'),(1278,'mzkiq1b41g','anda_img_1691452412016.jpg','anda_img_1691452412016.jpg','2023-08-08 02:53:33'),(1279,'z0m88hz2ul','anda_img_1691452413051.jpg','anda_img_1691452413051.jpg','2023-08-08 02:53:33'),(1280,'1ga53204on','anda_img_1691452411253.jpg','anda_img_1691452411253.jpg','2023-08-08 02:53:34'),(1281,'8xqrkxc2kcl','anda_img_1691452413624.jpg','anda_img_1691452413624.jpg','2023-08-08 02:53:34'),(1282,'xemp5hzzsr','anda_img_1691452414455.jpg','anda_img_1691452414455.jpg','2023-08-08 02:53:34'),(1283,'vefoeeg77i','anda_img_1691452414728.jpg','anda_img_1691452414728.jpg','2023-08-08 02:53:34'),(1284,'fxsnsbt6xf','anda_img_1691452415317.jpg','anda_img_1691452415317.jpg','2023-08-08 02:53:36'),(1285,'pah8svq4yb','anda_img_1692687301112.jpg','anda_img_1692687301112.jpg','2023-08-22 09:55:01'),(1286,'pah8svq4yb','anda_img_1692687302206.jpg','anda_img_1692687302206.jpg','2023-08-22 09:55:02'),(1287,'pah8svq4yb','anda_img_1692687303335.jpg','anda_img_1692687303335.jpg','2023-08-22 09:55:03'),(1288,'pah8svq4yb','anda_img_1692687304420.jpg','anda_img_1692687304420.jpg','2023-08-22 09:55:04'),(1289,'pah8svq4yb','anda_img_1692687305598.jpg','anda_img_1692687305598.jpg','2023-08-22 09:55:05');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panier`
--

DROP TABLE IF EXISTS `panier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `panier` (
  `panier_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `panier_nbr` int NOT NULL,
  `prod_id` int NOT NULL,
  `panier_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`panier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panier`
--

LOCK TABLES `panier` WRITE;
/*!40000 ALTER TABLE `panier` DISABLE KEYS */;
/*!40000 ALTER TABLE `panier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit` (
  `prod_id` varchar(100) NOT NULL,
  `fourn_id` int NOT NULL,
  `cat_id` int NOT NULL,
  `sous_cat_id` int NOT NULL,
  `prod_label` varchar(100) NOT NULL,
  `prod_description` text NOT NULL,
  `prod_prix` int NOT NULL,
  `prod_disp` tinyint(1) NOT NULL,
  `prod_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES ('0e64pxrxum',15,1,1,'jeu-video-dishonored_1920x1...','Description du prodiut jeu-video-dishonored_1920x1...',820000,1,'2023-08-08 02:53:30'),('0yfsavth9f',15,1,1,'ipod-sketch_2560x1440','Description du prodiut ipod-sketch_2560x1440',177500,1,'2023-08-08 02:53:24'),('146qw8tr0w',13,1,1,'fond-ecran-mangas-afro-samo...','Description du prodiut fond-ecran-mangas-afro-samo...',393000,1,'2023-08-08 02:49:38'),('14d7imqdu6',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',486000,1,'2023-08-08 02:50:59'),('1ga53204on',15,1,1,'iron-man-3-2013-film_3840x2...','Description du prodiut iron-man-3-2013-film_3840x2...',398000,1,'2023-08-08 02:53:31'),('1qddsd475s',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',261500,1,'2023-08-08 02:50:58'),('1z9r4qqs05l',15,1,1,'Horror-Hand-HD-1024x576 - C...','Description du prodiut Horror-Hand-HD-1024x576 - C...',562500,1,'2023-08-08 02:53:22'),('2ssne32zmt',15,1,1,'ice-age-continental-drift_2...','Description du prodiut ice-age-continental-drift_2...',397000,1,'2023-08-08 02:53:18'),('34osjrkzjf',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',246500,1,'2023-08-08 02:50:59'),('3bgec30i52',13,1,1,'fond-ecran-jeux-plants-vs-z...','Description du prodiut fond-ecran-jeux-plants-vs-z...',967000,1,'2023-08-08 02:49:32'),('422gw8eist',13,1,1,'fond-ecran-jeux-medieval-2-...','Description du prodiut fond-ecran-jeux-medieval-2-...',80000,0,'2023-08-08 02:49:30'),('4tynk645qph',15,1,1,'hot-wheels-equipe-verte_160...','Description du prodiut hot-wheels-equipe-verte_160...',532500,1,'2023-08-08 02:53:16'),('55nebpg8ai',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',611000,1,'2023-08-08 02:50:56'),('5h4d09w8tw',13,1,1,'fond-ecran-mangas-one-piece...','Description du prodiut fond-ecran-mangas-one-piece...',106000,1,'2023-08-08 02:49:38'),('5lggvsdebhi',1,1,1,'ford-fiesta_3840x2160','Description du prodiut ford-fiesta_3840x2160',951500,1,'2023-08-08 02:51:05'),('5nfclx96je',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',969000,1,'2023-08-08 02:49:47'),('61ja437st1',15,1,1,'ils-lappellent-snow-hawk_19...','Description du prodiut ils-lappellent-snow-hawk_19...',494000,1,'2023-08-08 02:53:20'),('6l0u0gsrca',13,1,1,'fond-ecran-jeux-trine-2-004','Description du prodiut fond-ecran-jeux-trine-2-004',272500,1,'2023-08-08 02:49:36'),('6o990q5gmth',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',519000,1,'2023-08-08 02:51:02'),('6xhku17pewf',1,1,1,'gage-chess-board_2560x1440','Description du prodiut gage-chess-board_2560x1440',217500,1,'2023-08-08 02:51:12'),('762of1ioyw',13,1,1,'fond-ecran-jeux-plants-vs-z...','Description du prodiut fond-ecran-jeux-plants-vs-z...',214500,1,'2023-08-08 02:49:32'),('782ttzzxat',15,1,1,'jin-kazama_3840x2160','Description du prodiut jin-kazama_3840x2160',515500,1,'2023-08-08 02:53:30'),('78iro49t2vl',15,1,1,'in-the-dark_1920x1080','Description du prodiut in-the-dark_1920x1080',261500,1,'2023-08-08 02:53:22'),('791l76wg4g',13,1,1,'fond-ecran-sports-boxe-003','Description du prodiut fond-ecran-sports-boxe-003',929500,1,'2023-08-08 02:49:43'),('79qcshqrky',15,1,1,'jeu-concept-art_1920x1200','Description du prodiut jeu-concept-art_1920x1200',196000,1,'2023-08-08 02:53:29'),('7ly6zjm714',15,1,1,'house-music-iphone-wallpaper','Description du prodiut house-music-iphone-wallpaper',365000,1,'2023-08-08 02:53:20'),('7o48594xn7l',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',132500,1,'2023-08-08 02:51:00'),('841fta8kcjl',1,1,1,'formule-1-jeu-video_1920x1080','Description du prodiut formule-1-jeu-video_1920x1080',597000,1,'2023-08-08 02:51:12'),('8b0in50h2r',15,1,1,'Horror-Face-HD-1024x712 - C...','Description du prodiut Horror-Face-HD-1024x712 - C...',974000,1,'2023-08-08 02:53:19'),('8kmuhkd0t3',15,1,1,'Horror-Wallpaper-HD - Copie...','Description du prodiut Horror-Wallpaper-HD - Copie...',973000,1,'2023-08-08 02:53:21'),('8q0jp4mejp',15,1,1,'ice-age-continental-drift_1...','Description du prodiut ice-age-continental-drift_1...',928500,1,'2023-08-08 02:53:17'),('8rbnp7nacq',13,1,1,'fond-ecran-sports-basketbal...','Description du prodiut fond-ecran-sports-basketbal...',365500,1,'2023-08-08 02:49:42'),('8twm876b6g',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',235000,1,'2023-08-08 02:50:57'),('8xqrkxc2kcl',15,1,1,'journaux-de-lumiere_3840x2160','Description du prodiut journaux-de-lumiere_3840x2160',264500,1,'2023-08-08 02:53:33'),('91zksd4d37',15,1,1,'jeu-de-la-vie_2560x1440','Description du prodiut jeu-de-la-vie_2560x1440',783000,1,'2023-08-08 02:53:25'),('9nropyffqh',1,1,1,'funny-despicable-me-2-minio...','Description du prodiut funny-despicable-me-2-minio...',321500,1,'2023-08-08 02:51:10'),('9qv2vare7k',1,1,1,'ford-mustang-car','Description du prodiut ford-mustang-car',525000,1,'2023-08-08 02:51:10'),('9r3ng8hdyf',13,1,1,'fond-ecran-jeux-splinter-ce...','Description du prodiut fond-ecran-jeux-splinter-ce...',931500,1,'2023-08-08 02:49:34'),('9s454smp5wf',15,1,1,'iron-man-3-la-generation-de...','Description du prodiut iron-man-3-la-generation-de...',385500,1,'2023-08-08 02:53:24'),('aiqf4npdhy',1,1,1,'ghost-recon-tom-clancy-moti...','Description du prodiut ghost-recon-tom-clancy-moti...',62500,1,'2023-08-08 02:51:13'),('ayoo5aj7z9',13,1,1,'fond-ecran-jeux-trine-2-009','Description du prodiut fond-ecran-jeux-trine-2-009',643000,1,'2023-08-08 02:49:37'),('baafeq2vw3',1,1,1,'ford_mustang_burnout_gtr_hd...','Description du prodiut ford_mustang_burnout_gtr_hd...',379000,1,'2023-08-08 02:51:03'),('bjeo0avh8d',15,1,1,'interieur-bar-wallpapers-hd...','Description du prodiut interieur-bar-wallpapers-hd...',509500,1,'2023-08-08 02:53:23'),('bpeswd43p6',15,1,1,'jeu-de-course-10_1920x1080','Description du prodiut jeu-de-course-10_1920x1080',73500,1,'2023-08-08 02:53:29'),('bv7s0cvplj',1,1,1,'fondos-pantalla-paisajes-he...','Description du prodiut fondos-pantalla-paisajes-he...',693500,1,'2023-08-08 02:51:07'),('bzoz9uxub2',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',980500,1,'2023-08-08 02:50:55'),('cg4eyiid3p',1,1,1,'gears-of-war-team-3_1920x1080','Description du prodiut gears-of-war-team-3_1920x1080',191000,1,'2023-08-08 02:51:06'),('cgm9eh0b9n',15,1,1,'jeu-dead-space-3_1920x1080','Description du prodiut jeu-dead-space-3_1920x1080',474000,1,'2023-08-08 02:53:30'),('cp80n0fv05',15,1,1,'japan_bamboo_samurai_japane...','Description du prodiut japan_bamboo_samurai_japane...',206500,1,'2023-08-08 02:53:23'),('cxog1zm7s1',13,1,1,'fond-ecran-jeux-metal-gear-...','Description du prodiut fond-ecran-jeux-metal-gear-...',836500,1,'2023-08-08 02:49:31'),('dj4f3h8fnyl',1,1,1,'ghost-recon-future-soldier_...','Description du prodiut ghost-recon-future-soldier_...',573500,1,'2023-08-08 02:51:14'),('drakle4kae',1,1,1,'ghost-recon-future-soldier_...','Description du prodiut ghost-recon-future-soldier_...',505000,1,'2023-08-08 02:51:08'),('eprwdbfjtm',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',187500,1,'2023-08-08 02:51:01'),('ew29thjhdp',15,1,1,'jigoku-shoujo-fille-denfer_...','Description du prodiut jigoku-shoujo-fille-denfer_...',322500,1,'2023-08-08 02:53:30'),('f427uaj58u',15,1,1,'hyper-street-fighter_1920x1...','Description du prodiut hyper-street-fighter_1920x1...',781000,1,'2023-08-08 02:53:16'),('f6yn38witr',1,1,1,'gaara','Description du prodiut gaara',504000,1,'2023-08-08 02:51:13'),('f8r720w6mc',13,1,1,'fond-ecran-transport-divers...','Description du prodiut fond-ecran-transport-divers...',733500,1,'2023-08-08 02:49:45'),('f9yiivd4y5i',13,1,1,'fond-ecran-sports-basketbal...','Description du prodiut fond-ecran-sports-basketbal...',954500,1,'2023-08-08 02:49:44'),('fevdicodxxg',15,1,1,'je-suis-votre-ecran_2560x1440','Description du prodiut je-suis-votre-ecran_2560x1440',260500,1,'2023-08-08 02:53:24'),('fgijc4j1jn',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',718500,1,'2023-08-08 02:51:01'),('fty9edhkd4i',15,1,1,'indyeah_1920x1080','Description du prodiut indyeah_1920x1080',362500,1,'2023-08-08 02:53:20'),('fut4vtd6v4',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',853500,1,'2023-08-08 02:49:48'),('fxsnsbt6xf',15,1,1,'joie_3840x2160','Description du prodiut joie_3840x2160',689500,1,'2023-08-08 02:53:34'),('g21dmygj69l',13,1,1,'fond-ecran-jeux-plants-vs-z...','Description du prodiut fond-ecran-jeux-plants-vs-z...',686500,1,'2023-08-08 02:49:31'),('g9p3cf3dq9f',13,1,1,'fond-ecran-promos-technolog...','Description du prodiut fond-ecran-promos-technolog...',721500,1,'2023-08-08 02:49:41'),('gcv9chvtctk',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',473000,1,'2023-08-08 02:49:44'),('gdyjgqafdf',1,1,1,'formule-1-2008_2560x1440','Description du prodiut formule-1-2008_2560x1440',109500,1,'2023-08-08 02:51:04'),('gywi6ldo03',13,1,1,'fond-ecran-mangas-afro-samo...','Description du prodiut fond-ecran-mangas-afro-samo...',792000,1,'2023-08-08 02:49:38'),('h2vcf2i64g',13,1,1,'fond-ecran-jeux-medieval-2-...','Description du prodiut fond-ecran-jeux-medieval-2-...',400000,0,'2023-08-08 02:49:30'),('h8npsilnb3j',13,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',209000,0,'2023-08-08 02:49:45'),('hcak07lj2s',15,1,1,'iron-man-3-iron-man-vs-mand...','Description du prodiut iron-man-3-iron-man-vs-mand...',498000,1,'2023-08-08 02:53:27'),('hgwajwnizg',13,1,1,'fond-ecran-jeux-trine-2-015','Description du prodiut fond-ecran-jeux-trine-2-015',741000,1,'2023-08-08 02:49:36'),('hseth9k3hlg',1,1,1,'free_wallpapers_crysis_3-94...','Description du prodiut free_wallpapers_crysis_3-94...',541500,1,'2023-08-08 02:51:11'),('iaqmiivqkd',15,1,1,'iguana-invasion_1920x1080','Description du prodiut iguana-invasion_1920x1080',897500,1,'2023-08-08 02:53:15'),('ibdn0ndi9vh',15,1,1,'injustice-dieu-parmi-nous-v...','Description du prodiut injustice-dieu-parmi-nous-v...',637500,1,'2023-08-08 02:53:26'),('iegjwbyuc9',13,1,1,'fond-ecran-sports-basketbal...','Description du prodiut fond-ecran-sports-basketbal...',763500,1,'2023-08-08 02:49:43'),('iu73kvxcvi',13,1,1,'fond-ecran-jeux-starcraft-g...','Description du prodiut fond-ecran-jeux-starcraft-g...',968500,1,'2023-08-08 02:49:33'),('jqmbppw0coh',13,1,1,'fond-ecran-jeux-medieval-2-...','Description du prodiut fond-ecran-jeux-medieval-2-...',52500,0,'2023-08-08 02:49:30'),('jratiib4x6',15,1,1,'interieur-maison-wallpapers...','Description du prodiut interieur-maison-wallpapers...',143500,1,'2023-08-08 02:53:23'),('jzxwwkgk4b',13,1,1,'fond-ecran-nature-paysages-...','Description du prodiut fond-ecran-nature-paysages-...',499000,1,'2023-08-08 02:49:40'),('kk4hgk9ocjf',15,1,1,'illustration-comique_1920x1...','Description du prodiut illustration-comique_1920x1...',98500,1,'2023-08-08 02:53:15'),('kn00ss1sct',15,1,1,'Horror-Eye-HD-1024x737 - Co...','Description du prodiut Horror-Eye-HD-1024x737 - Co...',343500,1,'2023-08-08 02:53:14'),('lhfrop8ufz',13,1,1,'fond-ecran-jeux-tomb-raider...','Description du prodiut fond-ecran-jeux-tomb-raider...',483000,0,'2023-08-08 02:49:35'),('ltm8nijcyxl',15,1,1,'inglorious_basterds_desktop...','Description du prodiut inglorious_basterds_desktop...',156500,1,'2023-08-08 02:53:22'),('m3gbny14dy',15,1,1,'jeidi-fond-ecran-jeu-video-...','Description du prodiut jeidi-fond-ecran-jeu-video-...',480000,1,'2023-08-08 02:53:31'),('mbxj8edeh1',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',585000,1,'2023-08-08 02:50:59'),('md8hxxovwd',13,1,1,'fond-ecran-sports-basketbal...','Description du prodiut fond-ecran-sports-basketbal...',223500,1,'2023-08-08 02:49:44'),('mnrznlhmhg',13,1,1,'fond-ecran-jeux-splinter-ce...','Description du prodiut fond-ecran-jeux-splinter-ce...',639500,1,'2023-08-08 02:49:33'),('mq9rawgspug',1,1,1,'fonds-ecran-lamborghini-mur...','Description du prodiut fonds-ecran-lamborghini-mur...',92500,1,'2023-08-08 02:51:03'),('mwbcr5loxqh',1,1,1,'ghost-recon-future-soldier-...','Description du prodiut ghost-recon-future-soldier-...',705500,1,'2023-08-08 02:51:06'),('mzkiq1b41g',15,1,1,'joker_1920x1080','Description du prodiut joker_1920x1080',764500,1,'2023-08-08 02:53:31'),('n2wedxm41w',15,1,1,'infamous-2-logo_3840x2160','Description du prodiut infamous-2-logo_3840x2160',784500,1,'2023-08-08 02:53:25'),('n41vtk0iwol',13,1,1,'fond-ecran-promos-mode-puma...','Description du prodiut fond-ecran-promos-mode-puma...',218500,1,'2023-08-08 02:49:41'),('n7rg7cczkk',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',183500,1,'2023-08-08 02:50:55'),('n7tdhl2ec2',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',133500,1,'2023-08-08 02:49:46'),('n82445az03',1,1,1,'ghost-recon-future-soldier_...','Description du prodiut ghost-recon-future-soldier_...',440500,1,'2023-08-08 02:51:09'),('nzxw8eiwef',13,1,1,'fond-ecran-jeux-mortal-komb...','Description du prodiut fond-ecran-jeux-mortal-komb...',520000,1,'2023-08-08 02:49:31'),('opct7mgati',13,1,1,'fond-ecran-promos-sport-bur...','Description du prodiut fond-ecran-promos-sport-bur...',958000,0,'2023-08-08 02:49:43'),('oxgsc9oxo',15,1,1,'ice-age-the-meltdown_1920x1...','Description du prodiut ice-age-the-meltdown_1920x1...',91000,1,'2023-08-08 02:53:20'),('pah8svq4yb',1,1,1,'Site web','dsoijsdoijdsoijdsoifsdoifjds',10000,1,'2023-08-22 09:55:01'),('pjphxrqnt4',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',700000,1,'2023-08-08 02:50:55'),('pql7hnfdt9',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',213000,1,'2023-08-08 02:50:56'),('qb2w85cpwj',1,1,1,'germany_nazi_nazis_desktop_...','Description du prodiut germany_nazi_nazis_desktop_...',739500,1,'2023-08-08 02:51:13'),('qddtc5h2nz',13,1,1,'fond-ecran-jeux-plants-vs-z...','Description du prodiut fond-ecran-jeux-plants-vs-z...',915500,1,'2023-08-08 02:49:32'),('qfy5509ruf',13,1,1,'fond-ecran-jeux-wanted-weap...','Description du prodiut fond-ecran-jeux-wanted-weap...',254500,1,'2023-08-08 02:49:37'),('qoo929bzaw',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',864000,1,'2023-08-08 02:49:46'),('qtuozs8cwx',13,1,1,'fond-ecran-transport-autos-...','Description du prodiut fond-ecran-transport-autos-...',663000,0,'2023-08-08 02:49:48'),('qyb0khbokk',1,1,1,'gears-of-war-soldiers-monst...','Description du prodiut gears-of-war-soldiers-monst...',811000,1,'2023-08-08 02:51:08'),('r309oh5you',13,1,1,'fond-ecran-jeux-plants-vs-z...','Description du prodiut fond-ecran-jeux-plants-vs-z...',522500,1,'2023-08-08 02:49:34'),('ronud0t2lx',13,1,1,'fond-ecran-nature-paysages-...','Description du prodiut fond-ecran-nature-paysages-...',998000,1,'2023-08-08 02:49:40'),('rriisjc6us',13,1,1,'fond-ecran-nature-paysages-...','Description du prodiut fond-ecran-nature-paysages-...',308500,1,'2023-08-08 02:49:40'),('s8hkjiavbb',1,1,1,'gamer_1920x1080','Description du prodiut gamer_1920x1080',240000,1,'2023-08-08 02:51:12'),('sjpirtyzh3',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',362000,1,'2023-08-08 02:49:47'),('sjxewvtas',15,1,1,'jeux_1920x1080','Description du prodiut jeux_1920x1080',550000,1,'2023-08-08 02:53:25'),('t4uautiwzu',13,1,1,'fond-ecran-jeux-trine-2-016','Description du prodiut fond-ecran-jeux-trine-2-016',544500,1,'2023-08-08 02:49:37'),('t6top44be2',1,1,1,'Free-Download-Valentino-Ros...','Description du prodiut Free-Download-Valentino-Ros...',93500,1,'2023-08-08 02:50:54'),('tgmuqhkmiz',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',913000,1,'2023-08-08 02:51:00'),('tlenyqkc8l',1,1,1,'ghost-recon-future-soldier-...','Description du prodiut ghost-recon-future-soldier-...',895000,1,'2023-08-08 02:51:07'),('tolt29p6r1',15,1,1,'jeep-wrangler-concept-car_2...','Description du prodiut jeep-wrangler-concept-car_2...',192500,1,'2023-08-08 02:53:28'),('u0lbam0d9j',1,1,1,'fonds-ecran-hd-gratuits_11','Description du prodiut fonds-ecran-hd-gratuits_11',220500,1,'2023-08-08 02:51:02'),('ulcqr3gm3y',1,1,1,'girl-music-wallpapers-hd-19...','Description du prodiut girl-music-wallpapers-hd-19...',871500,0,'2023-08-08 02:51:16'),('uoeb6w9d07',1,1,1,'fraternite-noire_1920x1080','Description du prodiut fraternite-noire_1920x1080',334500,1,'2023-08-08 02:51:04'),('uot52jqwkp',15,1,1,'interdit_2560x1440(1)','Description du prodiut interdit_2560x1440(1)',265000,1,'2023-08-08 02:53:27'),('uvq89mzi4r',13,1,1,'fond-ecran-sports-football-...','Description du prodiut fond-ecran-sports-football-...',364000,1,'2023-08-08 02:49:46'),('uw6sblev06',1,1,1,'ghost-recon-future-soldier_...','Description du prodiut ghost-recon-future-soldier_...',125500,1,'2023-08-08 02:51:09'),('uy37kljcae',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',375000,1,'2023-08-08 02:51:02'),('vefoeeg77i',15,1,1,'johnnie-walker-whiskey-wall...','Description du prodiut johnnie-walker-whiskey-wall...',446500,1,'2023-08-08 02:53:34'),('venw5oic6',13,1,1,'fond-ecran-transport-divers...','Description du prodiut fond-ecran-transport-divers...',38500,1,'2023-08-08 02:49:45'),('vf0gn6ws0ig',1,1,1,'frontlines-fuel-of-war_2560...','Description du prodiut frontlines-fuel-of-war_2560...',862500,1,'2023-08-08 02:51:06'),('vp1ycolmhc',1,1,1,'formule-1-voiture_2560x1440','Description du prodiut formule-1-voiture_2560x1440',959000,1,'2023-08-08 02:51:04'),('vqqakqqkjs',1,1,1,'fonds-ecran-honda-civic-typ...','Description du prodiut fonds-ecran-honda-civic-typ...',988000,1,'2023-08-08 02:51:02'),('vs3ujqx7k2',1,1,1,'fonds-ecran-sexy-grand-form...','Description du prodiut fonds-ecran-sexy-grand-form...',593000,1,'2023-08-08 02:51:11'),('vvtjd4i6r8',15,1,1,'ils-lappellent-snow-hawk_19...','Description du prodiut ils-lappellent-snow-hawk_19...',661500,1,'2023-08-08 02:53:22'),('vywtudo63z',1,1,1,'ghost-recon-future-soldier_...','Description du prodiut ghost-recon-future-soldier_...',306500,1,'2023-08-08 02:51:10'),('w8ja5encn3',1,1,1,'ghost-recon-le-commandant-t...','Description du prodiut ghost-recon-le-commandant-t...',245000,1,'2023-08-08 02:51:16'),('ws1eupq99c',13,1,1,'fond-ecran-musique-christin...','Description du prodiut fond-ecran-musique-christin...',841500,1,'2023-08-08 02:49:39'),('wyfp7u6qyt',15,1,1,'ipod_3840x2160','Description du prodiut ipod_3840x2160',270500,1,'2023-08-08 02:53:27'),('wyv9n0d7tz',15,1,1,'inter_2560x1440','Description du prodiut inter_2560x1440',677500,1,'2023-08-08 02:53:26'),('xacb254aq6h',1,1,1,'fond-ecran-walls-du-jour-co...','Description du prodiut fond-ecran-walls-du-jour-co...',725500,1,'2023-08-08 02:51:00'),('xemp5hzzsr',15,1,1,'journey-2-the-mysterious-is...','Description du prodiut journey-2-the-mysterious-is...',368500,1,'2023-08-08 02:53:34'),('xfjlicidtf',15,1,1,'jessie-j_1920x1080','Description du prodiut jessie-j_1920x1080',273000,1,'2023-08-08 02:53:28'),('xfk7zfw2g2',13,1,1,'fond-ecran-jeux-the-ship-002','Description du prodiut fond-ecran-jeux-the-ship-002',654500,1,'2023-08-08 02:49:35'),('xjfeqat8kx',15,1,1,'il-ne-fait-que-tout_1920x1080','Description du prodiut il-ne-fait-que-tout_1920x1080',555500,1,'2023-08-08 02:53:15'),('xjhos62nsr',13,1,1,'fond-ecran-jeux-splinter-ce...','Description du prodiut fond-ecran-jeux-splinter-ce...',442500,0,'2023-08-08 02:49:33'),('xs24nyvkik',13,1,1,'fond-ecran-jeux-total-war-r...','Description du prodiut fond-ecran-jeux-total-war-r...',676000,0,'2023-08-08 02:49:35'),('xx479w7k8e',15,1,1,'hot-wheels-of-a-car','Description du prodiut hot-wheels-of-a-car',752000,1,'2023-08-08 02:53:21'),('y5edhue3ta',13,1,1,'fond-ecran-mangas-afro-samo...','Description du prodiut fond-ecran-mangas-afro-samo...',487000,1,'2023-08-08 02:49:39'),('yhkmsy1k78f',1,1,1,'ford-mustang-sky-background','Description du prodiut ford-mustang-sky-background',854000,1,'2023-08-08 02:51:05'),('z0m88hz2ul',15,1,1,'jouer-or-die_1920x1080','Description du prodiut jouer-or-die_1920x1080',510000,1,'2023-08-08 02:53:32'),('zf8s0zgd23',15,1,1,'ice-age-dawn-of-the-dinosau...','Description du prodiut ice-age-dawn-of-the-dinosau...',26500,1,'2023-08-08 02:53:19'),('zs6zaaz3np',13,1,1,'fond-ecran-jeux-the-sufferi...','Description du prodiut fond-ecran-jeux-the-sufferi...',382500,0,'2023-08-08 02:49:34');
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction`
--

DROP TABLE IF EXISTS `reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction` (
  `rea_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `fourn_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `rea_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rea_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction`
--

LOCK TABLES `reaction` WRITE;
/*!40000 ALTER TABLE `reaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `reaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_categorie`
--

DROP TABLE IF EXISTS `sous_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_categorie` (
  `sous_cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_id` int NOT NULL,
  `sous_cat_label` varchar(100) DEFAULT NULL,
  `sous_cat_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sous_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_categorie`
--

LOCK TABLES `sous_categorie` WRITE;
/*!40000 ALTER TABLE `sous_categorie` DISABLE KEYS */;
INSERT INTO `sous_categorie` VALUES (1,1,'ordinateur','2023-02-17 14:37:27'),(2,1,'usb','2023-02-17 14:59:05'),(3,1,'disque dure','2023-02-17 15:00:15'),(4,1,'ram','2023-02-17 15:00:32'),(5,1,'clavier','2023-02-17 15:00:49'),(6,9,'Montre','2023-02-17 15:01:39'),(7,9,'Téléphone','2023-02-17 15:01:57'),(8,9,'Cable','2023-02-17 15:02:09'),(9,9,'chargeur','2023-02-17 15:02:26'),(10,4,'tuyeau','2023-02-17 15:03:00'),(11,4,'simen','2023-02-17 15:03:11'),(12,4,'Pinceau','2023-02-17 15:03:21'),(13,4,'PVC','2023-02-17 15:03:29'),(14,4,'Piceau','2023-02-17 15:03:43'),(15,4,'Fer','2023-02-17 15:04:15'),(16,8,'Demarreur','2023-02-17 15:04:45'),(17,8,'Bindix','2023-02-17 15:04:57'),(18,8,'Ségment','2023-02-17 15:05:07'),(19,8,'Piston','2023-02-17 15:05:17'),(20,8,'Chemise','2023-02-17 15:05:25'),(21,8,'Chaine','2023-02-17 15:05:38'),(22,8,'Pneud','2023-02-17 15:05:59'),(23,8,'Geante','2023-02-17 15:06:09'),(24,7,'Tee-shirt','2023-02-17 15:07:43'),(25,7,'Short','2023-02-17 15:07:53'),(26,7,'Casquette','2023-02-17 15:08:02'),(27,7,'Chemise','2023-02-17 15:08:13'),(28,7,'Pantallon','2023-02-17 15:08:33'),(29,7,'Jupe','2023-02-17 15:08:53'),(30,7,'combinaison','2023-02-17 15:09:05');
/*!40000 ALTER TABLE `sous_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tendance`
--

DROP TABLE IF EXISTS `tendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tendance` (
  `tend_id` int NOT NULL AUTO_INCREMENT,
  `client_id` varchar(255) NOT NULL,
  `cat_id` int NOT NULL,
  `tend_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tendance`
--

LOCK TABLES `tendance` WRITE;
/*!40000 ALTER TABLE `tendance` DISABLE KEYS */;
INSERT INTO `tendance` VALUES (5,'a5fd9irxnok',1,'2023-09-02 23:11:06'),(6,'a5fd9irxnok',4,'2023-09-02 23:11:06'),(7,'a5fd9irxnok',7,'2023-09-02 23:11:06'),(8,'a5fd9irxnok',9,'2023-09-02 23:11:07');
/*!40000 ALTER TABLE `tendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewer`
--

DROP TABLE IF EXISTS `viewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewer` (
  `vue_id` int NOT NULL AUTO_INCREMENT,
  `prod_id` int NOT NULL,
  `client_id` int NOT NULL,
  `vue_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewer`
--

LOCK TABLES `viewer` WRITE;
/*!40000 ALTER TABLE `viewer` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ville`
--

DROP TABLE IF EXISTS `ville`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ville` (
  `ville_id` int NOT NULL AUTO_INCREMENT,
  `ville_label` varchar(50) NOT NULL,
  `ville_code_postal` int NOT NULL,
  `ville_local` text NOT NULL,
  `ville_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ville_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ville`
--

LOCK TABLES `ville` WRITE;
/*!40000 ALTER TABLE `ville` DISABLE KEYS */;
/*!40000 ALTER TABLE `ville` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visiteur`
--

DROP TABLE IF EXISTS `visiteur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visiteur` (
  `vis_id` int NOT NULL,
  `client_id` int NOT NULL,
  `fourn_id` int NOT NULL,
  `vis_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visiteur`
--

LOCK TABLES `visiteur` WRITE;
/*!40000 ALTER TABLE `visiteur` DISABLE KEYS */;
/*!40000 ALTER TABLE `visiteur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-03  8:14:30
