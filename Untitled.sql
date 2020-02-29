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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_bill`
--

LOCK TABLES `api_bill` WRITE;
/*!40000 ALTER TABLE `api_bill` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_billproduct`
--

LOCK TABLES `api_billproduct` WRITE;
/*!40000 ALTER TABLE `api_billproduct` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_category`
--

LOCK TABLES `api_category` WRITE;
/*!40000 ALTER TABLE `api_category` DISABLE KEYS */;
INSERT INTO `api_category` VALUES (1,'Cereales',1);
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
  KEY `api_client_zone_id_9f0fc443_fk_api_zone_id` (`zone_id`),
  CONSTRAINT `api_client_zone_id_9f0fc443_fk_api_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `api_zone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_client`
--

LOCK TABLES `api_client` WRITE;
/*!40000 ALTER TABLE `api_client` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_currencyexchange`
--

LOCK TABLES `api_currencyexchange` WRITE;
/*!40000 ALTER TABLE `api_currencyexchange` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_delivery`
--

LOCK TABLES `api_delivery` WRITE;
/*!40000 ALTER TABLE `api_delivery` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_employee`
--

LOCK TABLES `api_employee` WRITE;
/*!40000 ALTER TABLE `api_employee` DISABLE KEYS */;
INSERT INTO `api_employee` VALUES (1,'27439108','Victoria','Acuna','04141234567',2890,'El Marqués','Mujer','1999-07-11','Gerente','victoria.ines.11@gmail.com','2020-02-29',1),(2,'27456790','Wilfredo','Machado','04145621324',3256,'Terrazas del Ávila','Hombre','2000-02-22','Gerente','wil@gmail.com','2020-02-29',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_local`
--

LOCK TABLES `api_local` WRITE;
/*!40000 ALTER TABLE `api_local` DISABLE KEYS */;
INSERT INTO `api_local` VALUES (1,'Las Mercedes','09:00:00.000000','20:00:00.000000',1,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_membership`
--

LOCK TABLES `api_membership` WRITE;
/*!40000 ALTER TABLE `api_membership` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_monthemployee`
--

LOCK TABLES `api_monthemployee` WRITE;
/*!40000 ALTER TABLE `api_monthemployee` DISABLE KEYS */;
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
  `total` double NOT NULL,
  `account_n` bigint(20) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_payment`
--

LOCK TABLES `api_payment` WRITE;
/*!40000 ALTER TABLE `api_payment` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_payment_bill`
--

LOCK TABLES `api_payment_bill` WRITE;
/*!40000 ALTER TABLE `api_payment_bill` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_pickup`
--

LOCK TABLES `api_pickup` WRITE;
/*!40000 ALTER TABLE `api_pickup` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_product`
--

LOCK TABLES `api_product` WRITE;
/*!40000 ALTER TABLE `api_product` DISABLE KEYS */;
INSERT INTO `api_product` VALUES (1,'Maple Cheerios',3,1,1,1);
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
  `discount` int(11) NOT NULL,
  `price` double NOT NULL,
  `point_cost` int(11) NOT NULL,
  `availible` tinyint(1) NOT NULL,
  `local_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_productbatch_local_id_797c859c_fk_api_local_id` (`local_id`),
  KEY `api_productbatch_product_id_033086d4_fk_api_product_id` (`product_id`),
  CONSTRAINT `api_productbatch_local_id_797c859c_fk_api_local_id` FOREIGN KEY (`local_id`) REFERENCES `api_local` (`id`),
  CONSTRAINT `api_productbatch_product_id_033086d4_fk_api_product_id` FOREIGN KEY (`product_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_productbatch`
--

LOCK TABLES `api_productbatch` WRITE;
/*!40000 ALTER TABLE `api_productbatch` DISABLE KEYS */;
INSERT INTO `api_productbatch` VALUES (1,'2021-04-12','2020-02-12',30,0,3.9,0,7,350,1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_provider`
--

LOCK TABLES `api_provider` WRITE;
/*!40000 ALTER TABLE `api_provider` DISABLE KEYS */;
INSERT INTO `api_provider` VALUES (1,'Cheerios',19807654,17824301,'Florida, USA','cheerios@cheerios.com',1);
/*!40000 ALTER TABLE `api_provider` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_zone`
--

LOCK TABLES `api_zone` WRITE;
/*!40000 ALTER TABLE `api_zone` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add currency exchange',7,'add_currencyexchange'),(26,'Can change currency exchange',7,'change_currencyexchange'),(27,'Can delete currency exchange',7,'delete_currencyexchange'),(28,'Can view currency exchange',7,'view_currencyexchange'),(29,'Can add membership',8,'add_membership'),(30,'Can change membership',8,'change_membership'),(31,'Can delete membership',8,'delete_membership'),(32,'Can view membership',8,'view_membership'),(33,'Can add product batch',9,'add_productbatch'),(34,'Can change product batch',9,'change_productbatch'),(35,'Can delete product batch',9,'delete_productbatch'),(36,'Can view product batch',9,'view_productbatch'),(37,'Can add client',10,'add_client'),(38,'Can change client',10,'change_client'),(39,'Can delete client',10,'delete_client'),(40,'Can view client',10,'view_client'),(41,'Can add product',11,'add_product'),(42,'Can change product',11,'change_product'),(43,'Can delete product',11,'delete_product'),(44,'Can view product',11,'view_product'),(45,'Can add zone',12,'add_zone'),(46,'Can change zone',12,'change_zone'),(47,'Can delete zone',12,'delete_zone'),(48,'Can view zone',12,'view_zone'),(49,'Can add payment_ bill',13,'add_payment_bill'),(50,'Can change payment_ bill',13,'change_payment_bill'),(51,'Can delete payment_ bill',13,'delete_payment_bill'),(52,'Can view payment_ bill',13,'view_payment_bill'),(53,'Can add month employee',14,'add_monthemployee'),(54,'Can change month employee',14,'change_monthemployee'),(55,'Can delete month employee',14,'delete_monthemployee'),(56,'Can view month employee',14,'view_monthemployee'),(57,'Can add category',15,'add_category'),(58,'Can change category',15,'change_category'),(59,'Can delete category',15,'delete_category'),(60,'Can view category',15,'view_category'),(61,'Can add bill product',16,'add_billproduct'),(62,'Can change bill product',16,'change_billproduct'),(63,'Can delete bill product',16,'delete_billproduct'),(64,'Can view bill product',16,'view_billproduct'),(65,'Can add local',17,'add_local'),(66,'Can change local',17,'change_local'),(67,'Can delete local',17,'delete_local'),(68,'Can view local',17,'view_local'),(69,'Can add pick up',18,'add_pickup'),(70,'Can change pick up',18,'change_pickup'),(71,'Can delete pick up',18,'delete_pickup'),(72,'Can view pick up',18,'view_pickup'),(73,'Can add bill',19,'add_bill'),(74,'Can change bill',19,'change_bill'),(75,'Can delete bill',19,'delete_bill'),(76,'Can view bill',19,'view_bill'),(77,'Can add employee',20,'add_employee'),(78,'Can change employee',20,'change_employee'),(79,'Can delete employee',20,'delete_employee'),(80,'Can view employee',20,'view_employee'),(81,'Can add payment',21,'add_payment'),(82,'Can change payment',21,'change_payment'),(83,'Can delete payment',21,'delete_payment'),(84,'Can view payment',21,'view_payment'),(85,'Can add provider',22,'add_provider'),(86,'Can change provider',22,'change_provider'),(87,'Can delete provider',22,'delete_provider'),(88,'Can view provider',22,'view_provider'),(89,'Can add delivery',23,'add_delivery'),(90,'Can change delivery',23,'change_delivery'),(91,'Can delete delivery',23,'delete_delivery'),(92,'Can view delivery',23,'view_delivery');
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$TEz25R03KAyt$tmhWqpwuX7GLzS/ptYkLObwCf5hmouo9pnIN1u56ZSQ=','2020-02-29 16:44:22.495651',1,'victoriaacuna','','','victoria.ines.11@gmail.com',1,1,'2020-02-29 16:43:16.607929');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-02-29 16:48:32.948123','1','Cheerios',1,'[{\"added\": {}}]',22,1),(2,'2020-02-29 16:48:44.644502','1','Cereales',1,'[{\"added\": {}}]',15,1),(3,'2020-02-29 16:48:47.924014','1','Maple Cheerios',1,'[{\"added\": {}}]',11,1),(4,'2020-02-29 16:50:38.749293','1','Acuna',1,'[{\"added\": {}}]',20,1),(5,'2020-02-29 16:50:41.638190','1','Local object (1)',1,'[{\"added\": {}}]',17,1),(6,'2020-02-29 16:50:46.570547','1','Maple Cheerios (E:12-Feb-2020 - V: 12-Apr-2021)',1,'[{\"added\": {}}]',9,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(19,'api','bill'),(16,'api','billproduct'),(15,'api','category'),(10,'api','client'),(7,'api','currencyexchange'),(23,'api','delivery'),(20,'api','employee'),(17,'api','local'),(8,'api','membership'),(14,'api','monthemployee'),(21,'api','payment'),(13,'api','payment_bill'),(18,'api','pickup'),(11,'api','product'),(9,'api','productbatch'),(22,'api','provider'),(12,'api','zone'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-02-29 16:22:48.832506'),(2,'auth','0001_initial','2020-02-29 16:22:48.936188'),(3,'admin','0001_initial','2020-02-29 16:22:49.152548'),(4,'admin','0002_logentry_remove_auto_add','2020-02-29 16:22:49.216828'),(5,'admin','0003_logentry_add_action_flag_choices','2020-02-29 16:22:49.228565'),(6,'contenttypes','0002_remove_content_type_name','2020-02-29 16:22:49.290747'),(7,'auth','0002_alter_permission_name_max_length','2020-02-29 16:22:49.324916'),(8,'auth','0003_alter_user_email_max_length','2020-02-29 16:22:49.349474'),(9,'auth','0004_alter_user_username_opts','2020-02-29 16:22:49.358089'),(10,'auth','0005_alter_user_last_login_null','2020-02-29 16:22:49.391572'),(11,'auth','0006_require_contenttypes_0002','2020-02-29 16:22:49.394878'),(12,'auth','0007_alter_validators_add_error_messages','2020-02-29 16:22:49.403543'),(13,'auth','0008_alter_user_username_max_length','2020-02-29 16:22:49.446347'),(14,'auth','0009_alter_user_last_name_max_length','2020-02-29 16:22:49.483090'),(15,'auth','0010_alter_group_name_max_length','2020-02-29 16:22:49.500226'),(16,'auth','0011_update_proxy_permissions','2020-02-29 16:22:49.510773'),(17,'sessions','0001_initial','2020-02-29 16:22:49.527616'),(18,'api','0001_initial','2020-02-29 16:38:03.151095');
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
INSERT INTO `django_session` VALUES ('n7uhr8mddn09qilobw2qof3or652r47k','OTQ1MGU5NzdlZWNkNjgzYTY4NWVlYTkxZTYzMGNmOGQ3MWFkODg3NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJiZDlmZTAxOTVlN2Q3NTM2ZmVjMTRiNTA3NDNiMzFiMjcyMjNkODU5In0=','2020-03-14 16:44:22.498566');
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

-- Dump completed on 2020-02-29 18:30:13
