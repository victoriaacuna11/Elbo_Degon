-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: Elbo_Degon_DB
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_bill`
--

DROP TABLE IF EXISTS `api_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_delivery` tinyint(1) NOT NULL,
  `date_time` datetime(6) NOT NULL,
  `subtotal` double NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_bill_client_id_6fa63cfa_fk_api_client_id` (`client_id`),
  CONSTRAINT `api_bill_client_id_6fa63cfa_fk_api_client_id` FOREIGN KEY (`client_id`) REFERENCES `api_client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_bill`
--

LOCK TABLES `api_bill` WRITE;
/*!40000 ALTER TABLE `api_bill` DISABLE KEYS */;
INSERT INTO `api_bill` VALUES (1,1,'2020-06-12 20:00:00.000000',27,1,1),(2,1,'2020-06-18 16:00:00.000000',60,1,3),(3,0,'2020-06-11 16:00:00.000000',15,1,3),(4,1,'2020-03-05 07:56:25.000000',3,1,1),(5,0,'2020-03-05 08:01:49.000000',49.2,1,1),(6,0,'2020-06-04 08:04:26.000000',26.46,1,1),(7,1,'2020-06-22 08:06:33.000000',6,1,1),(8,1,'2020-03-05 08:08:03.000000',6,1,1),(9,0,'2020-07-16 08:24:02.000000',9,1,1),(10,1,'2020-06-15 08:35:49.000000',90,1,1),(11,1,'2020-07-11 08:54:42.000000',81,1,1),(12,1,'2020-07-10 09:02:58.000000',45,1,1),(13,0,'2020-11-06 10:09:31.000000',6,1,1),(14,0,'2020-06-16 11:11:02.000000',17.1,1,1),(15,0,'2020-03-05 11:41:46.000000',51.75,1,1),(16,1,'2020-11-12 15:14:37.000000',131,1,6),(26,0,'2020-03-05 15:25:13.000000',74.4,1,3),(27,0,'2020-03-05 15:27:31.000000',23,1,4),(28,0,'2020-11-10 15:29:07.000000',41,1,4),(29,1,'2020-03-05 15:30:48.000000',105,1,5),(30,0,'2020-09-17 15:34:19.000000',80,1,5),(31,0,'2020-11-11 15:36:26.000000',20,1,2),(32,0,'2020-03-05 15:37:21.000000',110,1,6),(33,0,'2020-03-05 15:38:21.000000',22,1,6),(34,0,'2020-02-14 15:43:24.000000',138.2,1,6),(35,0,'2020-08-13 15:46:06.000000',126.8,1,6),(36,1,'2019-12-24 15:48:01.000000',104,1,1),(37,0,'2019-12-24 15:49:10.000000',25,1,1),(38,0,'2019-12-24 15:50:27.000000',44,1,2),(39,0,'2019-10-31 15:51:41.000000',14.4,1,4),(40,0,'2019-10-31 15:53:00.000000',114,1,5),(41,0,'2020-09-07 15:54:11.000000',67,1,5),(42,1,'2020-12-24 00:09:34.000000',36.3,1,1),(43,1,'2020-03-06 00:16:00.000000',33,1,1),(44,1,'2020-03-06 00:25:39.000000',20.8,1,1),(45,0,'2020-03-06 00:59:34.000000',30,1,1),(46,0,'2020-03-06 01:28:06.000000',25,1,1),(47,0,'2020-03-06 01:38:52.000000',50,1,1),(48,0,'2020-03-06 01:38:52.000000',50,1,1),(49,0,'2020-03-06 01:38:52.000000',50,1,1),(50,0,'2020-03-06 01:38:52.000000',50,1,1),(51,0,'2020-09-17 01:43:30.000000',20,1,1),(52,0,'2020-03-06 02:39:15.000000',8,1,1),(53,0,'2020-04-10 02:42:15.000000',4,1,1),(54,0,'2020-03-06 02:44:13.000000',5,1,1),(55,0,'2020-03-06 02:45:34.000000',2,1,1),(56,0,'2020-01-22 02:46:57.000000',16,1,1),(57,0,'2020-01-20 02:51:45.000000',6,1,1),(58,0,'2020-07-21 02:53:09.000000',2,1,1),(59,0,'2020-01-30 02:54:25.000000',5,1,1),(60,0,'2020-02-14 03:00:17.000000',32,1,1),(61,0,'2020-05-21 03:02:42.000000',8,1,1),(62,0,'2020-01-21 05:27:41.000000',6,1,1),(63,1,'2020-05-27 05:36:18.000000',30,1,1),(64,1,'2020-03-06 05:36:18.000000',30,1,1),(65,1,'2020-03-06 05:44:59.000000',31.4,1,1),(66,0,'2020-09-11 05:53:59.000000',12,1,1),(67,1,'2020-04-23 05:58:06.000000',15.5,1,2),(68,1,'2020-05-25 06:00:44.000000',36,1,1),(69,1,'2020-01-21 11:12:48.000000',80,1,2),(70,1,'2020-03-06 11:39:54.000000',59,1,1),(71,1,'2020-05-28 11:46:41.000000',12,1,1),(72,1,'2020-04-07 11:51:27.000000',35,1,1),(80,0,'2020-03-06 12:52:14.000000',70,1,1),(81,1,'2020-03-06 13:38:40.000000',74,1,1),(82,1,'2020-03-06 14:34:31.000000',24.1,1,6),(83,0,'2020-03-06 14:36:26.000000',4.4,1,1);
/*!40000 ALTER TABLE `api_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_billproduct`
--

DROP TABLE IF EXISTS `api_billproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_billproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `discount` double NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `batch_id` int(11) NOT NULL,
  `bill_id_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_billproduct_batch_id_28c4ab1d_fk_api_productbatch_id` (`batch_id`),
  KEY `api_billproduct_bill_id_id_d77bda7b_fk_api_bill_id` (`bill_id_id`),
  CONSTRAINT `api_billproduct_batch_id_28c4ab1d_fk_api_productbatch_id` FOREIGN KEY (`batch_id`) REFERENCES `api_productbatch` (`id`),
  CONSTRAINT `api_billproduct_bill_id_id_d77bda7b_fk_api_bill_id` FOREIGN KEY (`bill_id_id`) REFERENCES `api_bill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_billproduct`
--

LOCK TABLES `api_billproduct` WRITE;
/*!40000 ALTER TABLE `api_billproduct` DISABLE KEYS */;
INSERT INTO `api_billproduct` VALUES (1,3,0,1,1,1),(2,2,0,1,5,3),(3,1,0,1,1,3),(4,3,0,1,5,10),(5,9,0,1,1,10),(6,9,0,1,1,11),(7,4,0,1,1,12),(8,3,0,1,5,12),(9,2,0,1,5,13),(10,2,0.05,1,3,14),(11,3,0,1,5,15),(12,5,0.05,1,3,15),(13,5,0,1,19,16),(14,2,0,1,26,16),(15,10,0,1,27,16),(43,10,0,1,27,34),(44,3,0,1,6,34),(45,3,0,1,25,34),(46,5,0,1,26,34),(47,2,0,1,20,35),(48,3,0,1,24,35),(49,10,0,1,16,35),(50,10,0,1,7,35),(51,1,0,1,11,36),(52,2,0,1,14,36),(53,10,0,1,22,36),(54,1,0,1,23,37),(55,10,0,1,13,37),(56,5,0,1,19,38),(57,2,0,1,21,38),(58,1,0,1,20,39),(59,3,0,1,21,39),(60,2,0,1,13,39),(61,2,0,1,23,40),(62,10,0,1,27,40),(63,3,0,1,26,40),(64,2,0,1,6,40),(65,6,0,1,13,41),(66,3,0,1,27,41),(67,2,0,1,14,41),(68,2,0,1,7,44),(69,2,0,1,8,44),(70,5,0,1,6,45),(71,1,0,1,9,45),(72,5,0,1,9,46),(73,10,0,1,9,47),(74,10,0,1,9,48),(75,10,0,1,9,49),(76,10,0,1,9,50),(77,4,0,1,9,51),(78,4,0,1,7,52),(79,2,0,1,7,53),(80,1,0,1,6,54),(81,1,0,1,7,55),(82,2,0,1,16,56),(83,1,0,1,10,57),(84,1,0,1,7,58),(85,1,0,1,6,59),(86,4,0,1,16,60),(87,1,0,1,16,61),(88,3,0,1,7,62),(89,5,0,1,8,63),(90,5,0,1,8,64),(91,6,0,1,8,65),(92,2,0,1,10,66),(93,7,0,1,12,67),(94,2,0,1,11,68),(95,5,0,1,11,69),(96,3,0,1,14,70),(97,3,0,1,1,72),(98,10,0,1,27,80),(99,3,0,1,19,81),(100,3,0,1,11,81),(101,1,0,1,12,82),(102,4,0,1,8,82),(103,1,0,1,20,83);
/*!40000 ALTER TABLE `api_billproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_category`
--

DROP TABLE IF EXISTS `api_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_category_name_4aabb41f_uniq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_category`
--

LOCK TABLES `api_category` WRITE;
/*!40000 ALTER TABLE `api_category` DISABLE KEYS */;
INSERT INTO `api_category` VALUES (1,'Harina',1),(2,'Cereales',1),(3,'Bebidas',1),(4,'Chocolates',1),(5,'Bebidas alcoholicas',1),(6,'Salado',1),(7,'Galletas',1),(8,'Caramelos',1),(9,'Munchies',1);
/*!40000 ALTER TABLE `api_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_client`
--

DROP TABLE IF EXISTS `api_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ci` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `is_meber` tinyint(1) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `zone_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_client_ci_3f66bb82_uniq` (`ci`),
  KEY `api_client_zone_id_9f0fc443_fk_api_zone_id` (`zone_id`),
  CONSTRAINT `api_client_zone_id_9f0fc443_fk_api_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `api_zone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_client`
--

LOCK TABLES `api_client` WRITE;
/*!40000 ALTER TABLE `api_client` DISABLE KEYS */;
INSERT INTO `api_client` VALUES (1,'27439105','Victoria','Acuña',1,1,1),(2,'27422106','Luis','González',0,1,2),(3,'26456123','Juan','López',1,1,3),(4,'27123456','Valeska','Silva',1,1,4),(5,'27622058','Tutu','Castaneda',1,1,2),(6,'27086044','Romel','Clavel',1,1,6),(7,'27562000','Leonardo','Pérez',1,1,3),(8,'28900900','Gianlu','Dib',0,1,7),(9,'26564234','Pilar','Cuenca',1,1,6);
/*!40000 ALTER TABLE `api_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_currencyexchange`
--

DROP TABLE IF EXISTS `api_currencyexchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_currencyexchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bs_exchange` double NOT NULL,
  `euro_exchange` double NOT NULL,
  `date` date NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `is_Active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_currencyexchange_date_6c4bfd5a_uniq` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_currencyexchange`
--

LOCK TABLES `api_currencyexchange` WRITE;
/*!40000 ALTER TABLE `api_currencyexchange` DISABLE KEYS */;
INSERT INTO `api_currencyexchange` VALUES (1,75000,0.91,'2020-03-04',1,0),(2,80000,0.89,'2020-03-06',1,1);
/*!40000 ALTER TABLE `api_currencyexchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_delivery`
--

DROP TABLE IF EXISTS `api_delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) NOT NULL,
  `min_time` time(6) NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `bill_id_id` int(11) NOT NULL,
  `delivery_boy_id` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_delivery_bill_id_id_93394aed_fk_api_bill_id` (`bill_id_id`),
  KEY `api_delivery_delivery_boy_id_9ed9c759_fk_api_employee_id` (`delivery_boy_id`),
  KEY `api_delivery_zone_id_1cc0e9c0_fk_api_zone_id` (`zone_id`),
  CONSTRAINT `api_delivery_bill_id_id_93394aed_fk_api_bill_id` FOREIGN KEY (`bill_id_id`) REFERENCES `api_bill` (`id`),
  CONSTRAINT `api_delivery_delivery_boy_id_9ed9c759_fk_api_employee_id` FOREIGN KEY (`delivery_boy_id`) REFERENCES `api_employee` (`id`),
  CONSTRAINT `api_delivery_zone_id_1cc0e9c0_fk_api_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `api_zone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_delivery`
--

LOCK TABLES `api_delivery` WRITE;
/*!40000 ALTER TABLE `api_delivery` DISABLE KEYS */;
INSERT INTO `api_delivery` VALUES (1,'hola','04:35:00.000000',0,1,10,3,6),(2,'addresssss','04:54:00.000000',0,1,11,3,6),(3,'weno y entonces','05:02:00.000000',0,1,12,3,4),(4,'Terrazas del avila','16:00:00.000000',0,1,16,3,6),(14,'Mi casa','11:47:00.000000',0,1,36,3,1),(15,'Direccion','06:00:00.000000',0,1,44,3,4),(16,'Address','01:36:00.000000',0,1,63,3,4),(17,'Address','01:36:00.000000',0,1,64,3,4),(18,'address 1','01:44:00.000000',0,1,65,3,3),(19,'address','01:58:00.000000',0,1,67,3,3),(20,'address','03:05:00.000000',0,1,68,3,2),(21,'Caurimare','18:00:00.000000',0,1,69,3,3),(22,'address3','15:00:00.000000',0,1,70,3,4),(23,'address','10:04:00.000000',0,1,72,3,5),(24,'address','12:00:00.000000',0,1,81,3,8),(25,'mi casita','10:34:00.000000',0,1,82,3,6);
/*!40000 ALTER TABLE `api_delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_employee`
--

DROP TABLE IF EXISTS `api_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ci` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `points` int(11) NOT NULL,
  `adress` varchar(200) NOT NULL,
  `gender` varchar(60) NOT NULL,
  `birth_date` date NOT NULL,
  `job_id` varchar(60) NOT NULL,
  `email` varchar(254) NOT NULL,
  `date_hired` date NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `salary` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_employee_ci_716be420_uniq` (`ci`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_employee`
--

LOCK TABLES `api_employee` WRITE;
/*!40000 ALTER TABLE `api_employee` DISABLE KEYS */;
INSERT INTO `api_employee` VALUES (1,'27345231','Eduardo','López','04145629900',2500,'Los Samanes','Hombre','1980-02-23','Gerente','edu@gmail.com','2020-03-04',1,400),(2,'24356123','Daniela','Escobar','04249886678',2300,'Valle Arriba','Mujer','1990-05-24','Gerente','dani@gmail.com','2020-03-04',1,200),(3,'23878909','Jane','Doe','04123452678',1200,'Terrazas del Ávila','Mujer','1993-09-12','Repartidor','janed@gmail.com','2020-03-04',1,150),(4,'27256890','Romel','Clavel','04145672233',2180,'Terrazas del Ávila','Hombre','1999-03-12','Repartidor','toty@gmail.com','2020-03-05',1,200),(5,'20000000','Christian','Guillen','4146466466',1000,'Su casita linda','Hombre','1975-03-11','Cajero','guillen@email.com','2016-03-09',1,200),(6,'27567435','Fabiola','Gutierrez','4143567823',1700,'Macaracuay','Mujer','1993-03-09','Gerente','fabiola@gmail.com','2018-03-08',1,200),(7,'27567432','Valeria','Trotta','4126574325',1000000,'Valle Arriba','Mujer','1999-12-13','Gerente','valeria@gmail.com','2019-03-12',1,200);
/*!40000 ALTER TABLE `api_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_local`
--

DROP TABLE IF EXISTS `api_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) NOT NULL,
  `opening_time` time(6) NOT NULL,
  `closing_time` time(6) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `manager_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_local_manager_id_2e127c29_fk_api_employee_id` (`manager_id`),
  CONSTRAINT `api_local_manager_id_2e127c29_fk_api_employee_id` FOREIGN KEY (`manager_id`) REFERENCES `api_employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_local`
--

LOCK TABLES `api_local` WRITE;
/*!40000 ALTER TABLE `api_local` DISABLE KEYS */;
INSERT INTO `api_local` VALUES (1,'Las Mercedes','09:00:00.000000','20:00:00.000000',1,1),(2,'La Castellana','09:00:00.000000','20:00:00.000000',1,2),(3,'Valle Arriba','09:00:00.000000','20:00:00.000000',1,2);
/*!40000 ALTER TABLE `api_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_membership`
--

DROP TABLE IF EXISTS `api_membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_membership` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `points` int(11) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `gender` varchar(60) NOT NULL,
  `address` varchar(200) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(254) NOT NULL,
  `date_registered` date NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `availible` tinyint(1) NOT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_membership_client_id_e8fb21fc_fk_api_client_id` (`client_id`),
  CONSTRAINT `api_membership_client_id_e8fb21fc_fk_api_client_id` FOREIGN KEY (`client_id`) REFERENCES `api_client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_membership`
--

LOCK TABLES `api_membership` WRITE;
/*!40000 ALTER TABLE `api_membership` DISABLE KEYS */;
INSERT INTO `api_membership` VALUES (1,2295,4141413109,'Mujer','El Marqués','1999-07-11','victoria.acuna@correo.unimet.edu.ve','2020-03-04','password',1,1),(2,1050,4123456712,'Hombre','Caurimare','1999-11-03','juani@gmail.com','2020-03-04','password',1,3),(3,945,4246782309,'Mujer','Los Naranjos','1999-06-28','veka@gmail.com','2020-03-04','password',1,4),(4,0,4141822978,'Otro','Manzanares Este','2000-06-02','luis@luis.com','2020-03-05','twice',1,5),(5,235,4143218933,'Hombre','Terrazas del avila calle 4','1999-03-12','romel@email.com','2020-03-05','123',1,6),(6,0,4127864534,'Mujer','Terrazas del Avila','1991-03-11','pilar@gmail.com','2020-02-03','password',1,9);
/*!40000 ALTER TABLE `api_membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_monthemployee`
--

DROP TABLE IF EXISTS `api_monthemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_monthemployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_monthemployee_employee_id_ffc5bb57_fk_api_employee_id` (`employee_id`),
  CONSTRAINT `api_monthemployee_employee_id_ffc5bb57_fk_api_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `api_employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_monthemployee`
--

LOCK TABLES `api_monthemployee` WRITE;
/*!40000 ALTER TABLE `api_monthemployee` DISABLE KEYS */;
INSERT INTO `api_monthemployee` VALUES (1,'Julio',2019,1,4),(2,'Agosto',2019,1,2),(3,'Mayo',2019,1,5),(4,'Abril',2019,1,2),(5,'Julio',2019,1,3);
/*!40000 ALTER TABLE `api_monthemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_payment`
--

DROP TABLE IF EXISTS `api_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_method` varchar(60) NOT NULL,
  `currency` varchar(60) NOT NULL,
  `amount` double NOT NULL,
  `account_n` bigint(20) DEFAULT NULL,
  `availible` tinyint(1) NOT NULL,
  `account_holder` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_payment`
--

LOCK TABLES `api_payment` WRITE;
/*!40000 ALTER TABLE `api_payment` DISABLE KEYS */;
INSERT INTO `api_payment` VALUES (1,'Online','Dolares',10,56787624356,1,'Juan Lopez'),(2,'Efectivo','Bolivares',7.4,NULL,1,NULL),(3,'Online','Dolares',90,2333,1,'vicky vick'),(4,'Efectivo','Euros',15,NULL,1,NULL),(5,'Online','Bolivares',20,7888888,1,'its me xoxo'),(6,'Efectivo','Dolares',15,NULL,1,NULL),(7,'Online','Dolares',2.2,2333333,1,'xoxoxo'),(8,'Efectivo','Bolivares',6.96,NULL,1,NULL),(9,'Efectivo','Bolivares',19.84,NULL,1,NULL),(10,'Efectivo','Dolares',23,NULL,1,NULL),(11,'Online','Dolares',30.03,1223321,1,'vics'),(12,'Efectivo','Euros',7,NULL,1,NULL),(13,'Efectivo','Dolares',151.96,NULL,1,NULL),(14,'Efectivo','Dolares',151.96,NULL,1,NULL),(15,'Efectivo','Dolares',151.96,NULL,1,NULL),(16,'Efectivo','Dolares',151.96,NULL,1,NULL),(17,'Efectivo','Dolares',151.96,NULL,1,NULL),(18,'Efectivo','Dolares',151.96,NULL,1,NULL),(19,'Efectivo','Dolares',151.96,NULL,1,NULL),(20,'Efectivo','Dolares',151.96,NULL,1,NULL),(21,'Efectivo','Dolares',151.96,NULL,1,NULL),(22,'Efectivo','Dolares',151.96,NULL,1,NULL),(23,'Online','Dolares',86.3,123456789,1,'Juan'),(24,'Efectivo','Bolivares',26.68,NULL,1,NULL),(25,'Efectivo','Dolares',121.8,NULL,1,NULL),(26,'Efectivo','Dolares',60,NULL,1,NULL),(27,'Efectivo','Euros',32.8,NULL,1,NULL),(28,'Efectivo','Dolares',160.31,NULL,1,NULL),(29,'Efectivo','Dolares',100,NULL,1,NULL),(30,'Efectivo','Euros',47.09,NULL,1,NULL),(31,'Efectivo','Dolares',120.64,NULL,1,NULL),(32,'Efectivo','Dolares',29,NULL,1,NULL),(33,'Efectivo','Dolares',51.04,NULL,1,NULL),(34,'Efectivo','Bolivares',16.7,NULL,1,NULL),(35,'Efectivo','Dolares',132.24,NULL,1,NULL),(36,'Efectivo','Bolivares',70,NULL,1,NULL),(37,'Efectivo','Dolares',7.72,NULL,1,NULL),(38,'Online','Bolivares',12.11,56784563457,1,'Victoria Acuña'),(39,'Efectivo','Dolares',30,NULL,1,NULL),(40,'Efectivo','Dolares',25,NULL,1,NULL),(41,'Online','Bolivares',13.28,1234567890,1,'Victoria Acuña'),(42,'Efectivo','Dolares',20,NULL,1,NULL),(43,'Online','Bolivares',4.13,12345678900987,1,'Victoria Acuna'),(44,'Online','Bolivares',4.8,55544466789,1,'vic'),(45,'Efectivo','Dolares',20,NULL,1,NULL),(46,'Online','Euros',10,123456789998,1,'vic'),(47,'Efectivo','Bolivares',29,NULL,1,NULL),(48,'Efectivo','Dolares',58,NULL,1,NULL),(49,'Efectivo','Bolivares',58,NULL,1,NULL),(50,'Efectivo','Bolivares',58,NULL,1,NULL),(51,'Efectivo','Bolivares',58,NULL,1,NULL),(52,'Efectivo','Dolares',23.2,NULL,1,NULL),(53,'Efectivo','Bolivares',9.28,NULL,1,NULL),(54,'Efectivo','Bolivares',4.64,NULL,1,NULL),(55,'Efectivo','Bolivares',5.8,NULL,1,NULL),(56,'Efectivo','Bolivares',2.32,NULL,1,NULL),(57,'Efectivo','Dolares',18.56,NULL,1,NULL),(58,'Efectivo','Bolivares',6.96,NULL,1,NULL),(59,'Efectivo','Bolivares',2.32,NULL,1,NULL),(60,'Efectivo','Bolivares',5.8,NULL,1,NULL),(61,'Efectivo','Bolivares',37.12,NULL,1,NULL),(62,'Efectivo','Bolivares',9.28,NULL,1,NULL),(63,'Efectivo','Bolivares',1.96,NULL,1,NULL),(64,'Efectivo','Dolares',19.8,NULL,1,NULL),(65,'Efectivo','Dolares',14.8,NULL,1,NULL),(66,'Online','Euros',6.42,67776446,1,'Vic'),(67,'Efectivo','Dolares',15,NULL,1,NULL),(68,'Online','Bolivares',3.42,5533467876,1,'Cralos'),(69,'Efectivo','Euros',3,NULL,1,NULL),(70,'Efectivo','Euros',17.98,NULL,1,NULL),(71,'Efectivo','Euros',15,NULL,1,NULL),(72,'Online','Dolares',16.76,56653224567,1,'vic'),(73,'Efectivo','Bolivares',92.8,NULL,1,NULL),(74,'Online','Bolivares',18.44,5166251561128,1,'Victoria Acuna'),(75,'Efectivo','Dolares',25,NULL,1,NULL),(76,'Efectivo','Dolares',25.6,NULL,1,NULL),(77,'Online','Dolares',81.2,6772552426181,1,'Victoria'),(78,'Efectivo','Dolares',50,NULL,1,NULL),(79,'Online','Dolares',25.84,2625362727727,1,'Vic'),(80,'Online','Dolares',17.96,123456789,1,'Yo'),(81,'Efectivo','Dolares',10,NULL,1,NULL);
/*!40000 ALTER TABLE `api_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_payment_bill`
--

DROP TABLE IF EXISTS `api_payment_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_payment_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `availible` tinyint(1) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_payment_bill_bill_id_b2d2ad2b_fk_api_bill_id` (`bill_id`),
  KEY `api_payment_bill_payment_id_9a87adf6_fk_api_payment_id` (`payment_id`),
  CONSTRAINT `api_payment_bill_bill_id_b2d2ad2b_fk_api_bill_id` FOREIGN KEY (`bill_id`) REFERENCES `api_bill` (`id`),
  CONSTRAINT `api_payment_bill_payment_id_9a87adf6_fk_api_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `api_payment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_payment_bill`
--

LOCK TABLES `api_payment_bill` WRITE;
/*!40000 ALTER TABLE `api_payment_bill` DISABLE KEYS */;
INSERT INTO `api_payment_bill` VALUES (1,1,3,1),(2,1,3,2),(3,1,11,3),(4,1,12,5),(5,1,12,4),(6,1,12,6),(7,1,12,7),(8,1,13,8),(9,1,14,9),(10,1,15,11),(11,1,15,12),(12,1,15,10),(13,1,16,13),(23,1,34,28),(24,1,35,29),(25,1,35,30),(26,1,36,31),(27,1,37,32),(28,1,38,33),(29,1,39,34),(30,1,40,35),(31,1,41,36),(32,1,41,37),(33,1,44,42),(34,1,44,43),(35,1,45,45),(36,1,45,44),(37,1,45,46),(38,1,46,47),(39,1,47,48),(40,1,48,49),(41,1,49,50),(42,1,50,51),(43,1,51,52),(44,1,52,53),(45,1,53,54),(46,1,54,55),(47,1,55,56),(48,1,56,57),(49,1,57,58),(50,1,58,59),(51,1,59,60),(52,1,60,61),(53,1,61,62),(54,1,62,63),(55,1,63,64),(56,1,64,65),(57,1,65,66),(58,1,65,67),(59,1,66,68),(60,1,66,69),(61,1,67,70),(62,1,69,73),(63,1,70,74),(64,1,70,75),(65,1,72,76),(66,1,80,77),(67,1,81,78),(68,1,81,79),(69,1,82,80),(70,1,82,81);
/*!40000 ALTER TABLE `api_payment_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_pickup`
--

DROP TABLE IF EXISTS `api_pickup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_pickup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pick_up_time` time(6) NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `bill_id_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_pickup_bill_id_id_a0acce50_fk_api_bill_id` (`bill_id_id`),
  KEY `api_pickup_local_id_0d2cd9ba_fk_api_local_id` (`local_id`),
  CONSTRAINT `api_pickup_bill_id_id_a0acce50_fk_api_bill_id` FOREIGN KEY (`bill_id_id`) REFERENCES `api_bill` (`id`),
  CONSTRAINT `api_pickup_local_id_0d2cd9ba_fk_api_local_id` FOREIGN KEY (`local_id`) REFERENCES `api_local` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_pickup`
--

LOCK TABLES `api_pickup` WRITE;
/*!40000 ALTER TABLE `api_pickup` DISABLE KEYS */;
INSERT INTO `api_pickup` VALUES (1,'06:09:00.000000',0,1,13,1),(2,'07:10:00.000000',0,1,14,1),(3,'07:41:00.000000',0,1,15,1),(4,'11:25:00.000000',0,1,26,1),(5,'11:27:00.000000',0,1,27,1),(6,'11:28:00.000000',0,1,28,1),(7,'11:34:00.000000',0,1,30,1),(8,'11:43:00.000000',0,1,34,1),(9,'11:46:00.000000',0,1,35,1),(10,'11:49:00.000000',0,1,37,1),(11,'11:50:00.000000',0,1,38,1),(12,'11:51:00.000000',0,1,39,1),(13,'11:52:00.000000',0,1,40,1),(14,'11:54:00.000000',0,1,41,1),(15,'04:04:00.000000',0,1,45,1),(16,'21:27:00.000000',0,1,46,1),(17,'21:38:00.000000',0,1,47,1),(18,'21:38:00.000000',0,1,48,1),(19,'21:38:00.000000',0,1,49,1),(20,'21:38:00.000000',0,1,50,1),(21,'21:43:00.000000',0,1,51,1),(22,'22:39:00.000000',0,1,52,1),(23,'22:42:00.000000',0,1,53,1),(24,'22:44:00.000000',0,1,54,1),(25,'22:45:00.000000',0,1,55,1),(26,'22:46:00.000000',0,1,56,1),(27,'22:51:00.000000',0,1,57,1),(28,'22:52:00.000000',0,1,58,1),(29,'22:54:00.000000',0,1,59,1),(30,'23:00:00.000000',0,1,60,1),(31,'23:02:00.000000',0,1,61,1),(32,'01:27:00.000000',0,1,62,1),(33,'01:53:00.000000',0,1,66,1),(34,'08:52:00.000000',0,1,80,1),(35,'10:36:00.000000',0,1,83,1);
/*!40000 ALTER TABLE `api_pickup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_product`
--

DROP TABLE IF EXISTS `api_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(60) NOT NULL,
  `hall` int(11) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `category_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_product_provider_id_5f170ca1_fk_api_provider_id` (`provider_id`),
  KEY `api_product_category_id_a2b9d1e7_fk_api_category_id` (`category_id`),
  CONSTRAINT `api_product_category_id_a2b9d1e7_fk_api_category_id` FOREIGN KEY (`category_id`) REFERENCES `api_category` (`id`),
  CONSTRAINT `api_product_provider_id_5f170ca1_fk_api_provider_id` FOREIGN KEY (`provider_id`) REFERENCES `api_provider` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_product`
--

LOCK TABLES `api_product` WRITE;
/*!40000 ALTER TABLE `api_product` DISABLE KEYS */;
INSERT INTO `api_product` VALUES (1,'Harina Pan',3,1,1,1),(2,'Maple Cheerios',1,1,2,2),(3,'Cheerios Oat Crunch',1,1,2,2),(4,'Nestea',5,1,3,3),(5,'Nutella',6,1,4,4),(6,'Ron Santa Teresa',6,1,5,5),(7,'Zucaritas',1,1,2,3),(8,'Abecitos',14,1,2,4),(9,'Bajo Cero',7,1,5,5),(10,'Reeses',5,1,4,3),(11,'Heineken',12,1,5,1),(12,'Black Label',1,1,5,5),(13,'Platanitos',2,1,6,6),(14,'Beef Jerky',4,1,6,6),(15,'Sal de roca marina',4,1,6,6),(16,'Savoy blanco',4,1,4,7),(17,'Galleta Rica',3,1,7,7),(18,'Cookies and Cream',3,1,7,7),(19,'JollyRancher',5,1,8,7),(20,'Doritos',4,1,6,6),(21,'hola',2,1,2,5);
/*!40000 ALTER TABLE `api_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_productbatch`
--

DROP TABLE IF EXISTS `api_productbatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_productbatch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expiration_date` date NOT NULL,
  `elaboration_date` date NOT NULL,
  `actual_quantity` bigint(20) NOT NULL,
  `quantity_sold` bigint(20) NOT NULL,
  `cost` double NOT NULL,
  `discount` double NOT NULL,
  `price` double NOT NULL,
  `point_cost` double NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `local_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_productbatch_local_id_797c859c_fk_api_local_id` (`local_id`),
  KEY `api_productbatch_product_id_033086d4_fk_api_product_id` (`product_id`),
  CONSTRAINT `api_productbatch_local_id_797c859c_fk_api_local_id` FOREIGN KEY (`local_id`) REFERENCES `api_local` (`id`),
  CONSTRAINT `api_productbatch_product_id_033086d4_fk_api_product_id` FOREIGN KEY (`product_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_productbatch`
--

LOCK TABLES `api_productbatch` WRITE;
/*!40000 ALTER TABLE `api_productbatch` DISABLE KEYS */;
INSERT INTO `api_productbatch` VALUES (1,'2021-03-04','2020-03-04',24,3,4,0,9,450,1,1,5),(2,'2020-03-01','2019-03-01',2,28,4,0,9,450,1,1,5),(3,'2021-01-01','2020-03-04',0,23,4,0.05,9,450,0,1,5),(4,'2021-02-02','2020-03-04',26,4,4,0.02,9,450,1,2,5),(5,'2021-03-04','2020-03-04',1,10,0.9,0,3,150,1,1,4),(6,'2020-09-10','2020-01-14',42,2,3.2,0,5,500,1,1,1),(7,'2020-09-24','2019-08-11',24,11,1.2,0,2,200,1,1,2),(8,'2021-06-18','2019-08-11',28,17,2.5,0,4.4,440,1,1,3),(9,'2020-12-16','2019-10-08',0,44,3.2,0,5,500,0,1,4),(10,'2021-01-14','2019-10-07',47,3,4.5,0,6,600,1,1,5),(11,'2025-01-21','2019-08-05',32,8,9.5,0,15,15000,1,1,6),(12,'2021-01-22','2019-04-22',39,8,1,0,1.5,150,1,1,7),(13,'2020-10-14','2019-10-14',47,0,1.3,0,2,200,1,1,8),(14,'2022-04-21','2019-06-18',35,3,12,0,17,1700,1,1,9),(15,'2021-01-21','2020-03-05',50,0,5,0,10,1000,1,1,2),(16,'2021-01-15','2020-03-05',33,7,3.2,0,8,800,1,1,3),(17,'2020-12-18','2020-03-05',50,0,15,0,20,2000,1,1,6),(18,'2020-03-05','2020-03-05',50,0,5,0,10,1000,1,1,7),(19,'2021-01-21','2020-03-05',25,3,5,0,8,800,1,1,10),(20,'2030-03-05','2020-03-05',37,1,2.5,0,4.4,440,1,1,11),(21,'2022-03-05','2020-03-05',43,0,1,0,2,200,1,1,13),(22,'2023-03-05','2020-03-05',40,0,2.5,0,5,500,1,1,14),(23,'2030-03-05','2020-03-05',47,0,3.2,0,5,500,1,1,15),(24,'2022-03-05','2020-03-05',40,0,4,0,6,600,1,1,16),(25,'2025-03-05','2020-03-05',47,0,2.5,0,4.4,440,1,1,17),(26,'2026-03-05','2020-03-05',25,0,5,0,8,800,1,1,18),(27,'2023-03-05','2020-03-05',10,10,3.9,0,7,700,1,1,19),(28,'2019-03-08','2020-03-06',30,0,3,0,5,300,1,2,1);
/*!40000 ALTER TABLE `api_productbatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_provider`
--

DROP TABLE IF EXISTS `api_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_provider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `main_phone` bigint(20) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(254) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_provider`
--

LOCK TABLES `api_provider` WRITE;
/*!40000 ALTER TABLE `api_provider` DISABLE KEYS */;
INSERT INTO `api_provider` VALUES (1,'Empresas Polar',2123451289,4147862435,'Los Ruices','e.polar@gmail.com',1),(2,'Cheerios',14567892,14562310,'Florida, US','cheerios@gmail.com',1),(3,'Nestle',2123452112,2127895555,'La Castellana','nestle@gmail.com',1),(4,'Importadora ABC',2123127812,2126718998,'La Guaira','impaba@gmail.com',1),(5,'Proveedor de licores',4142227170,4125556677,'Los campitos','lic@ores.com',1),(6,'Proveedor Salado',12345676755,164732647312,'Calle Salada','salado@email.com',1),(7,'Proveedor Dulce',4147676767,2120002020,'Calle Dulce','dulce@email.com',1);
/*!40000 ALTER TABLE `api_provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_tax`
--

DROP TABLE IF EXISTS `api_tax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax` double NOT NULL,
  `date` date NOT NULL,
  `is_Active` tinyint(1) NOT NULL,
  `available` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tax`
--

LOCK TABLES `api_tax` WRITE;
/*!40000 ALTER TABLE `api_tax` DISABLE KEYS */;
INSERT INTO `api_tax` VALUES (1,0.16,'2020-03-04',1,1);
/*!40000 ALTER TABLE `api_tax` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_zone`
--

DROP TABLE IF EXISTS `api_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_zone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `cost` double NOT NULL,
  `availible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_zone_name_1c1c5474_uniq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_zone`
--

LOCK TABLES `api_zone` WRITE;
/*!40000 ALTER TABLE `api_zone` DISABLE KEYS */;
INSERT INTO `api_zone` VALUES (1,'El Marqués',5,1),(2,'Baruta',6,1),(3,'Caurimare',5,1),(4,'Los Naranjos',8,1),(5,'Valle Arriba',8,1),(6,'Terrazas del Ávila',5,1),(7,'Miranda',7,1),(8,'Los Samanes',5,1);
/*!40000 ALTER TABLE `api_zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add bill',7,'add_bill'),(26,'Can change bill',7,'change_bill'),(27,'Can delete bill',7,'delete_bill'),(28,'Can view bill',7,'view_bill'),(29,'Can add category',8,'add_category'),(30,'Can change category',8,'change_category'),(31,'Can delete category',8,'delete_category'),(32,'Can view category',8,'view_category'),(33,'Can add client',9,'add_client'),(34,'Can change client',9,'change_client'),(35,'Can delete client',9,'delete_client'),(36,'Can view client',9,'view_client'),(37,'Can add currency exchange',10,'add_currencyexchange'),(38,'Can change currency exchange',10,'change_currencyexchange'),(39,'Can delete currency exchange',10,'delete_currencyexchange'),(40,'Can view currency exchange',10,'view_currencyexchange'),(41,'Can add employee',11,'add_employee'),(42,'Can change employee',11,'change_employee'),(43,'Can delete employee',11,'delete_employee'),(44,'Can view employee',11,'view_employee'),(45,'Can add local',12,'add_local'),(46,'Can change local',12,'change_local'),(47,'Can delete local',12,'delete_local'),(48,'Can view local',12,'view_local'),(49,'Can add payment',13,'add_payment'),(50,'Can change payment',13,'change_payment'),(51,'Can delete payment',13,'delete_payment'),(52,'Can view payment',13,'view_payment'),(53,'Can add product',14,'add_product'),(54,'Can change product',14,'change_product'),(55,'Can delete product',14,'delete_product'),(56,'Can view product',14,'view_product'),(57,'Can add provider',15,'add_provider'),(58,'Can change provider',15,'change_provider'),(59,'Can delete provider',15,'delete_provider'),(60,'Can view provider',15,'view_provider'),(61,'Can add zone',16,'add_zone'),(62,'Can change zone',16,'change_zone'),(63,'Can delete zone',16,'delete_zone'),(64,'Can view zone',16,'view_zone'),(65,'Can add product batch',17,'add_productbatch'),(66,'Can change product batch',17,'change_productbatch'),(67,'Can delete product batch',17,'delete_productbatch'),(68,'Can view product batch',17,'view_productbatch'),(69,'Can add pick up',18,'add_pickup'),(70,'Can change pick up',18,'change_pickup'),(71,'Can delete pick up',18,'delete_pickup'),(72,'Can view pick up',18,'view_pickup'),(73,'Can add payment_ bill',19,'add_payment_bill'),(74,'Can change payment_ bill',19,'change_payment_bill'),(75,'Can delete payment_ bill',19,'delete_payment_bill'),(76,'Can view payment_ bill',19,'view_payment_bill'),(77,'Can add month employee',20,'add_monthemployee'),(78,'Can change month employee',20,'change_monthemployee'),(79,'Can delete month employee',20,'delete_monthemployee'),(80,'Can view month employee',20,'view_monthemployee'),(81,'Can add membership',21,'add_membership'),(82,'Can change membership',21,'change_membership'),(83,'Can delete membership',21,'delete_membership'),(84,'Can view membership',21,'view_membership'),(85,'Can add delivery',22,'add_delivery'),(86,'Can change delivery',22,'change_delivery'),(87,'Can delete delivery',22,'delete_delivery'),(88,'Can view delivery',22,'view_delivery'),(89,'Can add bill product',23,'add_billproduct'),(90,'Can change bill product',23,'change_billproduct'),(91,'Can delete bill product',23,'delete_billproduct'),(92,'Can view bill product',23,'view_billproduct'),(93,'Can add tax',24,'add_tax'),(94,'Can change tax',24,'change_tax'),(95,'Can delete tax',24,'delete_tax'),(96,'Can view tax',24,'view_tax');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$qnY7stUB1U1d$k6LAtTmTeyyus6/eq0bVXlzAqG4BMB1pTxeBA7zMiEU=','2020-03-04 19:45:00.549616',1,'victoriaacuna','','','victoria.ines.11@gmail.com',1,1,'2020-03-04 19:44:47.005507');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-03-04 19:45:38.154817','1','El Marqués',1,'[{\"added\": {}}]',16,1),(2,'2020-03-04 19:45:41.190398','1','Victoria',1,'[{\"added\": {}}]',9,1),(3,'2020-03-04 19:46:07.389405','2','Baruta',1,'[{\"added\": {}}]',16,1),(4,'2020-03-04 19:46:10.542519','2','Luis',1,'[{\"added\": {}}]',9,1),(5,'2020-03-04 19:46:39.598092','3','Caurimare',1,'[{\"added\": {}}]',16,1),(6,'2020-03-04 19:46:43.186602','3','Juan',1,'[{\"added\": {}}]',9,1),(7,'2020-03-04 19:47:05.539978','4','Los Naranjos',1,'[{\"added\": {}}]',16,1),(8,'2020-03-04 19:47:07.155844','4','Valeska',1,'[{\"added\": {}}]',9,1),(9,'2020-03-04 19:48:02.503678','1','victoria.acuna@correo.unimet.edu.ve',1,'[{\"added\": {}}]',21,1),(10,'2020-03-04 19:49:36.585239','2','juani@gmail.com',1,'[{\"added\": {}}]',21,1),(11,'2020-03-04 19:50:19.176214','3','veka@gmail.com',1,'[{\"added\": {}}]',21,1),(12,'2020-03-04 19:51:02.827486','1','Empresas Polar',1,'[{\"added\": {}}]',15,1),(13,'2020-03-04 19:51:14.135056','1','Harina',1,'[{\"added\": {}}]',8,1),(14,'2020-03-04 19:51:18.643734','1','Harina Pan',1,'[{\"added\": {}}]',14,1),(15,'2020-03-04 19:51:53.979847','2','Cheerios',1,'[{\"added\": {}}]',15,1),(16,'2020-03-04 19:52:09.705790','2','Cereales',1,'[{\"added\": {}}]',8,1),(17,'2020-03-04 19:52:13.618977','2','Maple Cheerios',1,'[{\"added\": {}}]',14,1),(18,'2020-03-04 19:52:27.995772','3','Cheerios Oat Crunch',1,'[{\"added\": {}}]',14,1),(19,'2020-03-04 19:54:00.219406','3','Nestle',1,'[{\"added\": {}}]',15,1),(20,'2020-03-04 19:54:11.534229','3','Bebidas',1,'[{\"added\": {}}]',8,1),(21,'2020-03-04 19:54:17.686142','4','Nestea',1,'[{\"added\": {}}]',14,1),(22,'2020-03-04 19:55:03.785120','4','Importadora ABC',1,'[{\"added\": {}}]',15,1),(23,'2020-03-04 19:55:15.219389','4','Chocolates',1,'[{\"added\": {}}]',8,1),(24,'2020-03-04 19:55:20.385313','5','Nutella',1,'[{\"added\": {}}]',14,1),(25,'2020-03-04 19:55:43.695643','1','0.16 (04-Mar-2020)',1,'[{\"added\": {}}]',24,1),(26,'2020-03-04 19:56:03.232420','5','Valle Arriba',1,'[{\"added\": {}}]',16,1),(27,'2020-03-04 19:56:16.043534','6','Terrazas del Ávila',1,'[{\"added\": {}}]',16,1),(28,'2020-03-04 19:58:50.092689','1','López',1,'[{\"added\": {}}]',11,1),(29,'2020-03-04 19:58:52.742027','1','Local object (1)',1,'[{\"added\": {}}]',12,1),(30,'2020-03-04 19:58:58.183073','1','Nutella (E:04-Mar-2020 - V: 04-Mar-2021)',1,'[{\"added\": {}}]',17,1),(31,'2020-03-04 20:00:10.714944','2','Escobar',1,'[{\"added\": {}}]',11,1),(32,'2020-03-04 20:00:16.591329','2','Local object (2)',1,'[{\"added\": {}}]',12,1),(33,'2020-03-04 20:01:28.632905','2','Nutella (E:01-Mar-2019 - V: 01-Mar-2020)',1,'[{\"added\": {}}]',17,1),(34,'2020-03-04 20:02:13.803610','3','Nutella (E:04-Mar-2020 - V: 01-Jan-2021)',1,'[{\"added\": {}}]',17,1),(35,'2020-03-04 20:03:01.820328','4','Nutella (E:04-Mar-2020 - V: 02-Feb-2021)',1,'[{\"added\": {}}]',17,1),(36,'2020-03-04 20:03:49.594213','1','CI cliente: 27439105 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(37,'2020-03-04 20:04:16.574348','2','CI cliente: 26456123 - Subtotal: 60.0',1,'[{\"added\": {}}]',7,1),(38,'2020-03-04 20:05:00.922811','1','BillProduct object (1)',1,'[{\"added\": {}}]',23,1),(39,'2020-03-04 20:05:13.511507','1','CI cliente: 27439105 - Subtotal: 27.0',2,'[{\"changed\": {\"fields\": [\"Subtotal\"]}}]',7,1),(40,'2020-03-04 20:06:00.367475','5','Nestea (E:04-Mar-2020 - V: 04-Mar-2021)',1,'[{\"added\": {}}]',17,1),(41,'2020-03-04 20:06:35.321128','3','CI cliente: 26456123 - Subtotal: 15.0',1,'[{\"added\": {}}]',7,1),(42,'2020-03-04 20:06:52.946758','2','BillProduct object (2)',1,'[{\"added\": {}}]',23,1),(43,'2020-03-04 20:07:10.642052','3','BillProduct object (3)',1,'[{\"added\": {}}]',23,1),(44,'2020-03-04 20:07:55.732160','1','Método de pago: Online - Monto: 10.0 - Moneda: Dolares',1,'[{\"added\": {}}]',13,1),(45,'2020-03-04 20:08:00.797632','1','Cliente CI:26456123 - Monto: 10.0 - Instrumento: Online - Fecha factura: 04-Mar-2020',1,'[{\"added\": {}}]',19,1),(46,'2020-03-04 20:08:45.673987','2','Método de pago: Efectivo - Monto: 55.68 - Moneda: Bolivares',1,'[{\"added\": {}}]',13,1),(47,'2020-03-04 20:08:48.049375','2','Cliente CI:26456123 - Monto: 55.68 - Instrumento: Efectivo - Fecha factura: 04-Mar-2020',1,'[{\"added\": {}}]',19,1),(48,'2020-03-04 20:10:37.814994','2','Método de pago: Efectivo - Monto: 5.0 - Moneda: Bolivares',2,'[{\"changed\": {\"fields\": [\"Amount\", \"Account n\", \"Account holder\"]}}]',13,1),(49,'2020-03-04 20:11:00.542928','1','04-Mar-2020',1,'[{\"added\": {}}]',10,1),(50,'2020-03-04 20:12:04.745273','3','Doe',1,'[{\"added\": {}}]',11,1),(51,'2020-03-04 20:13:25.192888','2','Método de pago: Efectivo - Monto: 7.4 - Moneda: Bolivares',2,'[{\"changed\": {\"fields\": [\"Amount\"]}}]',13,1),(52,'2020-03-04 22:55:35.016035','5','Nestea (E:04-Mar-2020 - V: 04-Mar-2021)',2,'[{\"changed\": {\"fields\": [\"Actual quantity\"]}}]',17,1),(53,'2020-03-05 02:35:11.200470','4','Clavel',1,'[{\"added\": {}}]',11,1),(54,'2020-03-05 02:35:42.360666','4','Clavel',2,'[{\"changed\": {\"fields\": [\"Availible\"]}}]',11,1),(55,'2020-03-05 02:40:31.981079','4','Clavel',2,'[{\"changed\": {\"fields\": [\"Availible\"]}}]',11,1),(56,'2020-03-05 02:40:50.348957','3','Doe',2,'[{\"changed\": {\"fields\": [\"Availible\"]}}]',11,1),(57,'2020-03-05 04:38:53.457526','3','Doe',2,'[{\"changed\": {\"fields\": [\"Availible\"]}}]',11,1),(58,'2020-03-05 04:39:32.321903','4','Clavel',2,'[{\"changed\": {\"fields\": [\"Availible\"]}}]',11,1),(59,'2020-03-05 04:39:37.616266','3','Doe',2,'[]',11,1),(60,'2020-03-05 14:32:37.453764','5','Proveedor de licores',1,'[{\"added\": {}}]',15,1),(61,'2020-03-05 14:33:21.233588','5','Bebidas alcoholicas',1,'[{\"added\": {}}]',8,1),(62,'2020-03-05 14:33:47.360935','6','Ron Santa Teresa',1,'[{\"added\": {}}]',14,1),(63,'2020-03-05 14:34:07.449470','7','Zucaritas',1,'[{\"added\": {}}]',14,1),(64,'2020-03-05 14:34:30.866391','8','Abecitos',1,'[{\"added\": {}}]',14,1),(65,'2020-03-05 14:34:51.737410','9','Bajo Cero',1,'[{\"added\": {}}]',14,1),(66,'2020-03-05 14:41:41.105329','6','Harina Pan (E:14-Jan-2020 - V: 10-Sep-2020)',1,'[{\"added\": {}}]',17,1),(67,'2020-03-05 14:42:27.648572','7','Maple Cheerios (E:11-Aug-2019 - V: 24-Sep-2020)',1,'[{\"added\": {}}]',17,1),(68,'2020-03-05 14:43:27.418960','8','Cheerios Oat Crunch (E:11-Aug-2019 - V: 18-Jun-2021)',1,'[{\"added\": {}}]',17,1),(69,'2020-03-05 14:44:04.143818','9','Nestea (E:08-Oct-2019 - V: 16-Dec-2020)',1,'[{\"added\": {}}]',17,1),(70,'2020-03-05 14:44:43.979181','10','Nutella (E:07-Oct-2019 - V: 14-Jan-2021)',1,'[{\"added\": {}}]',17,1),(71,'2020-03-05 14:46:22.622251','11','Ron Santa Teresa (E:05-Aug-2019 - V: 21-Jan-2025)',1,'[{\"added\": {}}]',17,1),(72,'2020-03-05 14:47:18.576263','12','Zucaritas (E:22-Apr-2019 - V: 22-Jan-2021)',1,'[{\"added\": {}}]',17,1),(73,'2020-03-05 14:47:52.905062','13','Abecitos (E:14-Oct-2019 - V: 14-Oct-2020)',1,'[{\"added\": {}}]',17,1),(74,'2020-03-05 14:48:36.309465','14','Bajo Cero (E:18-Jun-2019 - V: 21-Apr-2022)',1,'[{\"added\": {}}]',17,1),(75,'2020-03-05 14:50:05.285214','10','Reeses',1,'[{\"added\": {}}]',14,1),(76,'2020-03-05 14:50:47.446381','11','Heineken',1,'[{\"added\": {}}]',14,1),(77,'2020-03-05 14:51:08.455363','12','Black Label',1,'[{\"added\": {}}]',14,1),(78,'2020-03-05 14:52:38.049355','6','Proveedor Salado',1,'[{\"added\": {}}]',15,1),(79,'2020-03-05 14:54:09.747228','7','Proveedor Dulce',1,'[{\"added\": {}}]',15,1),(80,'2020-03-05 14:54:26.933470','6','Salado',1,'[{\"added\": {}}]',8,1),(81,'2020-03-05 14:54:31.785150','13','Platanitos',1,'[{\"added\": {}}]',14,1),(82,'2020-03-05 14:54:45.951100','14','Beef Jerky',1,'[{\"added\": {}}]',14,1),(83,'2020-03-05 14:55:01.332810','15','Sal de roca marina',1,'[{\"added\": {}}]',14,1),(84,'2020-03-05 14:55:21.769619','16','Savoy blanco',1,'[{\"added\": {}}]',14,1),(85,'2020-03-05 14:55:54.037255','7','Galletas',1,'[{\"added\": {}}]',8,1),(86,'2020-03-05 14:56:16.457628','17','Galleta Rica',1,'[{\"added\": {}}]',14,1),(87,'2020-03-05 14:56:44.126151','18','Cookies and Cream',1,'[{\"added\": {}}]',14,1),(88,'2020-03-05 14:57:41.360386','8','Caramelos',1,'[{\"added\": {}}]',8,1),(89,'2020-03-05 14:57:46.342491','19','JollyRancher',1,'[{\"added\": {}}]',14,1),(90,'2020-03-05 14:58:52.665469','15','Maple Cheerios (E:05-Mar-2020 - V: 21-Jan-2021)',1,'[{\"added\": {}}]',17,1),(91,'2020-03-05 14:59:41.891926','16','Cheerios Oat Crunch (E:05-Mar-2020 - V: 15-Jan-2021)',1,'[{\"added\": {}}]',17,1),(92,'2020-03-05 15:00:13.933549','17','Ron Santa Teresa (E:05-Mar-2020 - V: 18-Dec-2020)',1,'[{\"added\": {}}]',17,1),(93,'2020-03-05 15:00:36.365220','18','Zucaritas (E:05-Mar-2020 - V: 05-Mar-2020)',1,'[{\"added\": {}}]',17,1),(94,'2020-03-05 15:01:04.075383','19','Reeses (E:05-Mar-2020 - V: 21-Jan-2021)',1,'[{\"added\": {}}]',17,1),(95,'2020-03-05 15:01:37.575507','20','Heineken (E:05-Mar-2020 - V: 05-Mar-2030)',1,'[{\"added\": {}}]',17,1),(96,'2020-03-05 15:02:12.399277','21','Platanitos (E:05-Mar-2020 - V: 05-Mar-2022)',1,'[{\"added\": {}}]',17,1),(97,'2020-03-05 15:02:49.008978','22','Beef Jerky (E:05-Mar-2020 - V: 05-Mar-2023)',1,'[{\"added\": {}}]',17,1),(98,'2020-03-05 15:03:10.584442','23','Sal de roca marina (E:05-Mar-2020 - V: 05-Mar-2030)',1,'[{\"added\": {}}]',17,1),(99,'2020-03-05 15:03:39.096194','24','Savoy blanco (E:05-Mar-2020 - V: 05-Mar-2022)',1,'[{\"added\": {}}]',17,1),(100,'2020-03-05 15:04:08.941963','25','Galleta Rica (E:05-Mar-2020 - V: 05-Mar-2025)',1,'[{\"added\": {}}]',17,1),(101,'2020-03-05 15:04:35.905513','26','Cookies and Cream (E:05-Mar-2020 - V: 05-Mar-2026)',1,'[{\"added\": {}}]',17,1),(102,'2020-03-05 15:05:02.116078','27','JollyRancher (E:05-Mar-2020 - V: 05-Mar-2023)',1,'[{\"added\": {}}]',17,1),(103,'2020-03-05 15:19:47.554628','25','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(104,'2020-03-05 15:19:47.558697','24','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(105,'2020-03-05 15:19:47.560325','23','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(106,'2020-03-05 15:19:47.562260','22','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(107,'2020-03-05 15:19:47.563857','21','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(108,'2020-03-05 15:19:47.565553','20','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(109,'2020-03-05 15:19:47.567302','19','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(110,'2020-03-05 15:19:47.569267','18','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(111,'2020-03-05 15:19:47.571019','17','CI cliente: 27086044 - Subtotal: 131.0',3,'',7,1),(112,'2020-03-05 15:56:37.042623','34','CI cliente: 27086044 - Subtotal: 138.2',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(113,'2020-03-05 15:56:46.934803','35','CI cliente: 27086044 - Subtotal: 126.8',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(114,'2020-03-05 15:56:56.652359','36','CI cliente: 27439105 - Subtotal: 104.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(115,'2020-03-05 15:57:05.707220','37','CI cliente: 27439105 - Subtotal: 25.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(116,'2020-03-05 15:57:28.121266','38','CI cliente: 27422106 - Subtotal: 44.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(117,'2020-03-05 15:57:52.531995','39','CI cliente: 27123456 - Subtotal: 14.4',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(118,'2020-03-05 15:58:00.943695','40','CI cliente: 27622058 - Subtotal: 114.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(119,'2020-03-05 16:00:59.198937','6','Guitierritos',1,'[{\"added\": {}}]',11,1),(120,'2020-03-05 16:01:47.570783','7','Leonardo',1,'[{\"added\": {}}]',9,1),(121,'2020-03-05 16:02:22.643358','7','Miranda',1,'[{\"added\": {}}]',16,1),(122,'2020-03-05 16:02:33.823535','8','Gianlu',1,'[{\"added\": {}}]',9,1),(123,'2020-03-06 12:00:10.496197','73','CI cliente: 27123456 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(124,'2020-03-06 12:00:37.903490','74','CI cliente: 27086044 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(125,'2020-03-06 12:00:47.937136','75','CI cliente: 28900900 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(126,'2020-03-06 12:01:02.745682','76','CI cliente: 27562000 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(127,'2020-03-06 12:01:14.596058','77','CI cliente: 27123456 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(128,'2020-03-06 12:01:28.452994','78','CI cliente: 27562000 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(129,'2020-03-06 12:01:39.458702','79','CI cliente: 27622058 - Subtotal: 30.0',1,'[{\"added\": {}}]',7,1),(130,'2020-03-06 12:02:32.756775','79','CI cliente: 27622058 - Subtotal: 30.0',3,'',7,1),(131,'2020-03-06 12:02:32.760007','78','CI cliente: 27562000 - Subtotal: 30.0',3,'',7,1),(132,'2020-03-06 12:02:32.769069','77','CI cliente: 27123456 - Subtotal: 30.0',3,'',7,1),(133,'2020-03-06 12:02:32.772714','76','CI cliente: 27562000 - Subtotal: 30.0',3,'',7,1),(134,'2020-03-06 12:02:32.775920','75','CI cliente: 28900900 - Subtotal: 30.0',3,'',7,1),(135,'2020-03-06 12:02:32.778381','74','CI cliente: 27086044 - Subtotal: 30.0',3,'',7,1),(136,'2020-03-06 12:02:32.781290','73','CI cliente: 27123456 - Subtotal: 30.0',3,'',7,1),(137,'2020-03-06 12:02:41.824199','71','CI cliente: 27439105 - Subtotal: 12.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(138,'2020-03-06 12:02:43.238063','71','CI cliente: 27439105 - Subtotal: 12.0',2,'[]',7,1),(139,'2020-03-06 12:02:50.729169','68','CI cliente: 27439105 - Subtotal: 36.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(140,'2020-03-06 12:02:57.881692','63','CI cliente: 27439105 - Subtotal: 30.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(141,'2020-03-06 12:03:08.387778','61','CI cliente: 27439105 - Subtotal: 8.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(142,'2020-03-06 12:03:22.875650','60','CI cliente: 27439105 - Subtotal: 32.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(143,'2020-03-06 12:03:32.991248','53','CI cliente: 27439105 - Subtotal: 4.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(144,'2020-03-06 12:03:41.653168','53','CI cliente: 27439105 - Subtotal: 4.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(145,'2020-03-06 12:03:47.954377','72','CI cliente: 27439105 - Subtotal: 35.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(146,'2020-03-06 12:03:55.879811','67','CI cliente: 27422106 - Subtotal: 15.5',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(147,'2020-03-06 12:04:06.024491','69','CI cliente: 27422106 - Subtotal: 80.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(148,'2020-03-06 12:04:14.938320','62','CI cliente: 27439105 - Subtotal: 6.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(149,'2020-03-06 12:04:22.179353','59','CI cliente: 27439105 - Subtotal: 5.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(150,'2020-03-06 12:04:40.531954','56','CI cliente: 27439105 - Subtotal: 16.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(151,'2020-03-06 12:04:49.126535','57','CI cliente: 27439105 - Subtotal: 6.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(152,'2020-03-06 12:04:59.335451','1','CI cliente: 27439105 - Subtotal: 27.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(153,'2020-03-06 12:05:09.779101','2','CI cliente: 26456123 - Subtotal: 60.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(154,'2020-03-06 12:05:21.029436','3','CI cliente: 26456123 - Subtotal: 15.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(155,'2020-03-06 12:05:33.128274','6','CI cliente: 27439105 - Subtotal: 26.46',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(156,'2020-03-06 12:05:54.518288','7','CI cliente: 27439105 - Subtotal: 6.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(157,'2020-03-06 12:06:03.055427','9','CI cliente: 27439105 - Subtotal: 9.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(158,'2020-03-06 12:06:13.484017','14','CI cliente: 27439105 - Subtotal: 17.1',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(159,'2020-03-06 12:06:22.784751','10','CI cliente: 27439105 - Subtotal: 90.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(160,'2020-03-06 12:06:32.746934','11','CI cliente: 27439105 - Subtotal: 81.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(161,'2020-03-06 12:06:42.535689','12','CI cliente: 27439105 - Subtotal: 45.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(162,'2020-03-06 12:06:48.628228','40','CI cliente: 27622058 - Subtotal: 114.0',2,'[]',7,1),(163,'2020-03-06 12:06:57.109159','58','CI cliente: 27439105 - Subtotal: 2.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(164,'2020-03-06 12:07:03.333847','56','CI cliente: 27439105 - Subtotal: 16.0',2,'[]',7,1),(165,'2020-03-06 12:07:20.839530','35','CI cliente: 27086044 - Subtotal: 126.8',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(166,'2020-03-06 12:07:46.078128','42','CI cliente: 27439105 - Subtotal: 36.3',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(167,'2020-03-06 12:09:20.619361','51','CI cliente: 27439105 - Subtotal: 20.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(168,'2020-03-06 12:09:33.071485','66','CI cliente: 27439105 - Subtotal: 12.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(169,'2020-03-06 12:09:44.268307','13','CI cliente: 27439105 - Subtotal: 6.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(170,'2020-03-06 12:09:53.974039','41','CI cliente: 27622058 - Subtotal: 67.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(171,'2020-03-06 12:10:02.298382','41','CI cliente: 27622058 - Subtotal: 67.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(172,'2020-03-06 12:10:27.965350','30','CI cliente: 27622058 - Subtotal: 80.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(173,'2020-03-06 12:10:42.933326','31','CI cliente: 27422106 - Subtotal: 20.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(174,'2020-03-06 12:10:53.921890','16','CI cliente: 27086044 - Subtotal: 131.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1),(175,'2020-03-06 12:11:15.692368','28','CI cliente: 27123456 - Subtotal: 41.0',2,'[{\"changed\": {\"fields\": [\"Date time\"]}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'api','bill'),(23,'api','billproduct'),(8,'api','category'),(9,'api','client'),(10,'api','currencyexchange'),(22,'api','delivery'),(11,'api','employee'),(12,'api','local'),(21,'api','membership'),(20,'api','monthemployee'),(13,'api','payment'),(19,'api','payment_bill'),(18,'api','pickup'),(14,'api','product'),(17,'api','productbatch'),(15,'api','provider'),(24,'api','tax'),(16,'api','zone'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-03-04 19:42:44.236330'),(2,'auth','0001_initial','2020-03-04 19:42:44.336401'),(3,'admin','0001_initial','2020-03-04 19:42:44.549829'),(4,'admin','0002_logentry_remove_auto_add','2020-03-04 19:42:44.612572'),(5,'admin','0003_logentry_add_action_flag_choices','2020-03-04 19:42:44.624771'),(6,'api','0001_initial','2020-03-04 19:42:45.062306'),(7,'api','0002_auto_20200304_1942','2020-03-04 19:42:45.755319'),(8,'contenttypes','0002_remove_content_type_name','2020-03-04 19:42:45.834759'),(9,'auth','0002_alter_permission_name_max_length','2020-03-04 19:42:45.866471'),(10,'auth','0003_alter_user_email_max_length','2020-03-04 19:42:45.889459'),(11,'auth','0004_alter_user_username_opts','2020-03-04 19:42:45.900165'),(12,'auth','0005_alter_user_last_login_null','2020-03-04 19:42:45.933829'),(13,'auth','0006_require_contenttypes_0002','2020-03-04 19:42:45.938016'),(14,'auth','0007_alter_validators_add_error_messages','2020-03-04 19:42:45.947106'),(15,'auth','0008_alter_user_username_max_length','2020-03-04 19:42:45.986471'),(16,'auth','0009_alter_user_last_name_max_length','2020-03-04 19:42:46.024264'),(17,'auth','0010_alter_group_name_max_length','2020-03-04 19:42:46.044078'),(18,'auth','0011_update_proxy_permissions','2020-03-04 19:42:46.066845'),(19,'sessions','0001_initial','2020-03-04 19:42:46.089052'),(20,'api','0003_auto_20200304_2009','2020-03-04 20:09:29.649350'),(21,'api','0004_auto_20200304_2010','2020-03-04 20:10:18.865805');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('m54t2se6ienaxvuyzz8efd1az2xgr7mn','NzlkODM3NGFkZWQ3OTBkZTA5ZmZkY2YzNWNlMGRhMjVkZDliYzFkYTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlNzY0MDI1ZTk5NDI3YTBjOGZhM2M4OGM2M2IzMzM1ODc3MzVkMGI1In0=','2020-03-18 19:45:00.560890');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-06 11:23:48
