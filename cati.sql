/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : cati

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2016-11-07 12:15:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id_admin` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `rut` varchar(15) NOT NULL,
  `pass` varchar(63) NOT NULL,
  `email` varchar(127) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'Anghelo', '19125145-8', 'root', 'root@mail.mail');
INSERT INTO `admin` VALUES ('2', 'Mono', '19306593-7', '456', 'mono@mono.mono');

-- ----------------------------
-- Table structure for call
-- ----------------------------
DROP TABLE IF EXISTS `call`;
CREATE TABLE `call` (
  `id_call` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `duration` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL COMMENT 'interviewer',
  `id_contact` int(10) unsigned NOT NULL COMMENT 'interviewee',
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id_call`),
  KEY `user` (`id_user`),
  KEY `contact` (`id_contact`),
  CONSTRAINT `contact` FOREIGN KEY (`id_contact`) REFERENCES `contact` (`id_contact`),
  CONSTRAINT `user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of call
-- ----------------------------

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id_client` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `email` varchar(63) NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of client
-- ----------------------------
INSERT INTO `client` VALUES ('1', 'CLIENTE 1', 'cliente@empresa.pais');
INSERT INTO `client` VALUES ('2', 'CLIENTE 2', 'cliente2@empresa2.pais2');

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id_contact` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id_project` int(10) unsigned NOT NULL,
  `state` varchar(255) DEFAULT 'No llamado',
  PRIMARY KEY (`id_contact`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contact
-- ----------------------------
INSERT INTO `contact` VALUES ('1', 'juan', 'ximenes', '56538253', null, '8', 'si');
INSERT INTO `contact` VALUES ('2', 'marcelo', 'treimun', '74362822', null, '8', 'si');
INSERT INTO `contact` VALUES ('3', 'pedro', 'hernandez', '53323857', null, '8', 'no');
INSERT INTO `contact` VALUES ('4', 'juan', 'duarte', '76453857', null, '8', 'Temporalmente inactivo');
INSERT INTO `contact` VALUES ('5', 'pablo', 'ibarra', '63535869', null, '8', 'si');
INSERT INTO `contact` VALUES ('6', 'gabriela', 'perez', '76453987', null, '8', 'si');
INSERT INTO `contact` VALUES ('7', 'juan', 'ximenes', '56538253', null, '9', 'si');
INSERT INTO `contact` VALUES ('8', 'marcelo', 'treimun', '74362822', null, '9', 'si');
INSERT INTO `contact` VALUES ('9', 'pedro', 'hernandez', '53323857', null, '9', 'no');
INSERT INTO `contact` VALUES ('10', 'juan', 'duarte', '76453857', null, '9', 'no');
INSERT INTO `contact` VALUES ('11', 'pablo', 'ibarra', '63535869', null, '9', 'si');
INSERT INTO `contact` VALUES ('12', 'gabriela', 'perez', '76453987', null, '9', 'si');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id_project` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finish_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_client` int(10) unsigned NOT NULL,
  `url_survey` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_project`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('7', 'test1', '2222-02-02 00:00:00', '3333-02-20 00:00:00', '1', 'http://pagina.com/asd', '1');
INSERT INTO `project` VALUES ('8', 'asdfdsf', '2222-02-02 00:00:00', '3333-02-02 00:00:00', '1', 'https://encuestas100porcientorealnofake1linkmufullhd.com', '0');
INSERT INTO `project` VALUES ('9', 'sdasd', '2017-02-02 00:00:00', '2018-03-03 00:00:00', '2', 'http://asddasd.asdasd.asd', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `rut` varchar(15) NOT NULL,
  `pass` varchar(63) NOT NULL,
  `email` varchar(127) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Anghelo', '19125145-8', 'Anghelo95', 'angheloalf95@gmail.com');
INSERT INTO `user` VALUES ('2', 'Ignacio', '19306593-7', '123', 'maill@mail.mail');
INSERT INTO `user` VALUES ('4', 'Alf', '19125145-8', 'Clave', 'mail@mail.com');
