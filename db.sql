-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.41 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for smt
CREATE DATABASE IF NOT EXISTS `smt` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `smt`;

-- Dumping structure for table smt.account
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `disabled` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table smt.account: ~0 rows (approximately)
DELETE FROM `account`;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`id`, `disabled`, `password`, `username`) VALUES
	(1, NULL, '123456', 'admin');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

-- Dumping structure for table smt.factory
CREATE TABLE IF NOT EXISTS `factory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `disabled` varchar(255) DEFAULT NULL,
  `factory_code` varchar(50) NOT NULL,
  `factory_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table smt.factory: ~1 rows (approximately)
DELETE FROM `factory`;
/*!40000 ALTER TABLE `factory` DISABLE KEYS */;
INSERT INTO `factory` (`id`, `disabled`, `factory_code`, `factory_name`) VALUES
	(1, NULL, 'N1', 'WISOL');
/*!40000 ALTER TABLE `factory` ENABLE KEYS */;

-- Dumping structure for table smt.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` varchar(50) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table smt.product: ~1 rows (approximately)
DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `barcode`, `product_name`) VALUES
	(1, 'L7E0', 'L7E0');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table smt.productdtl
CREATE TABLE IF NOT EXISTS `productdtl` (
  `working_date` date NOT NULL,
  `product_id` int(11) NOT NULL,
  `exported_qty` int(11) NOT NULL,
  `remain_qty` int(11) NOT NULL,
  PRIMARY KEY (`working_date`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table smt.productdtl: ~0 rows (approximately)
DELETE FROM `productdtl`;
/*!40000 ALTER TABLE `productdtl` DISABLE KEYS */;
/*!40000 ALTER TABLE `productdtl` ENABLE KEYS */;

-- Dumping structure for table smt.productiondtl
CREATE TABLE IF NOT EXISTS `productiondtl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `WorkingDate` varchar(15) NOT NULL COMMENT 'Date format MM/DD/YYYY',
  `FactoryID` int(11) NOT NULL,
  `ShiftID` int(11) NOT NULL,
  `LineID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Finished` bit(1) NOT NULL,
  PRIMARY KEY (`WorkingDate`,`id`,`FactoryID`,`ShiftID`,`LineID`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table smt.productiondtl: ~0 rows (approximately)
DELETE FROM `productiondtl`;
/*!40000 ALTER TABLE `productiondtl` DISABLE KEYS */;
INSERT INTO `productiondtl` (`id`, `WorkingDate`, `FactoryID`, `ShiftID`, `LineID`, `Amount`, `Finished`) VALUES
	(1, '06/25/2019', 1, 1, 1, 10, b'0');
/*!40000 ALTER TABLE `productiondtl` ENABLE KEYS */;

-- Dumping structure for table smt.productionline
CREATE TABLE IF NOT EXISTS `productionline` (
  `LineID` int(11) NOT NULL AUTO_INCREMENT,
  `FactoryID` int(11) NOT NULL,
  `LineCode` varchar(50) NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Disabled` bit(1) DEFAULT NULL,
  PRIMARY KEY (`FactoryID`,`LineID`),
  KEY `LineID` (`LineID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table smt.productionline: ~2 rows (approximately)
DELETE FROM `productionline`;
/*!40000 ALTER TABLE `productionline` DISABLE KEYS */;
INSERT INTO `productionline` (`LineID`, `FactoryID`, `LineCode`, `Description`, `Disabled`) VALUES
	(1, 1, 'L1', 'Line1', NULL),
	(2, 1, 'L2', 'Line2', NULL);
/*!40000 ALTER TABLE `productionline` ENABLE KEYS */;

-- Dumping structure for table smt.productionplan
CREATE TABLE IF NOT EXISTS `productionplan` (
  `WorkingDate` varchar(15) NOT NULL COMMENT 'Date format MM/DD/YYYY',
  `FactoryID` int(11) NOT NULL,
  `LineID` int(11) NOT NULL,
  `ShiftID` int(11) NOT NULL,
  `OrderedQty` int(11) DEFAULT NULL,
  `GoodProdQty` int(11) DEFAULT NULL,
  `RemainQty` int(11) DEFAULT NULL,
  `Disabled` bit(1) DEFAULT NULL,
  PRIMARY KEY (`WorkingDate`,`FactoryID`,`LineID`,`ShiftID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table smt.productionplan: ~0 rows (approximately)
DELETE FROM `productionplan`;
/*!40000 ALTER TABLE `productionplan` DISABLE KEYS */;
INSERT INTO `productionplan` (`WorkingDate`, `FactoryID`, `LineID`, `ShiftID`, `OrderedQty`, `GoodProdQty`, `RemainQty`, `Disabled`) VALUES
	('06/25/2019', 1, 1, 1, 100, 0, 100, NULL);
/*!40000 ALTER TABLE `productionplan` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;