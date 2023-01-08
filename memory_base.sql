-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: memory_base
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `conge`
--

DROP TABLE IF EXISTS `conge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conge` (
  `id_conge` int NOT NULL AUTO_INCREMENT,
  `im_emp` varchar(100) DEFAULT NULL,
  `type_conge` varchar(50) DEFAULT NULL,
  `nbr_jour` int DEFAULT NULL,
  `conge_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_conge`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conge`
--

LOCK TABLES `conge` WRITE;
/*!40000 ALTER TABLE `conge` DISABLE KEYS */;
INSERT INTO `conge` VALUES (1,'1452','matPat',8,'2023-01-06 15:23:31'),(2,'2123','annuel',10,'2023-01-06 15:23:45');
/*!40000 ALTER TABLE `conge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employe`
--

DROP TABLE IF EXISTS `employe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employe` (
  `emp_im` varchar(100) NOT NULL,
  `emp_nom_prenom` varchar(100) DEFAULT NULL,
  `date_naiss` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `emp_fonction` varchar(100) NOT NULL,
  `emp_tel` varchar(50) NOT NULL,
  `emp_adresse` varchar(100) NOT NULL,
  `emp_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`emp_im`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employe`
--

LOCK TABLES `employe` WRITE;
/*!40000 ALTER TABLE `employe` DISABLE KEYS */;
INSERT INTO `employe` VALUES ('1452','Clark Kent','2022-07-08','M','Secretaire','026584684','Imandry','2022-07-14 03:53:35'),('2123','Clark Kent','2022-07-08','M','Secretaire','026584684','Imandry','2022-07-14 03:53:09'),('5484','sdfiojioj','2022-07-15','sdf','sdfdsf','dsfdsf','dsfdsf','2022-07-14 03:57:02'),('7423','dsfdsf','2022-07-09','sdf','sdfsd','fsdfsdf','sdfsdf','2022-07-14 03:56:09'),('dsooi','oidsjfoi','2022-07-15','dsfdsf','sdfdsf','sdfsdf','sdfdsfdsf','2022-07-14 05:30:26');
/*!40000 ALTER TABLE `employe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presence`
--

DROP TABLE IF EXISTS `presence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presence` (
  `id_pres` int NOT NULL AUTO_INCREMENT,
  `im_emp` varchar(100) DEFAULT NULL,
  `statut_pres` tinyint(1) DEFAULT NULL,
  `pres_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pres`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presence`
--

LOCK TABLES `presence` WRITE;
/*!40000 ALTER TABLE `presence` DISABLE KEYS */;
INSERT INTO `presence` VALUES (1,'1452',0,'2022-07-14 04:00:16'),(2,'7423',0,'2022-07-14 04:03:43'),(3,'5484',1,'2022-07-14 04:03:50'),(4,'7423',0,'2022-07-14 05:50:11'),(5,'7423',0,'2022-07-14 05:50:30'),(6,'2123',0,'2023-01-06 15:22:45');
/*!40000 ALTER TABLE `presence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `util_id` int NOT NULL AUTO_INCREMENT,
  `util_name` varchar(100) DEFAULT NULL,
  `util_email` varchar(150) DEFAULT NULL,
  `util_pass` varchar(255) DEFAULT NULL,
  `util_status` tinyint(1) NOT NULL,
  `util_date_enreg` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`util_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'Banay','d','d',1,'2022-07-14 09:43:02'),(2,'linda','aaaa','a',1,'2022-07-14 09:20:42');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-06 16:55:11
