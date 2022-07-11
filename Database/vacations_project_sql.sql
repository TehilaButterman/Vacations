-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2022 at 10:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_project`
--
CREATE DATABASE IF NOT EXISTS `vacations_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_project`;

-- --------------------------------------------------------

--
-- Table structure for table `followed_vacations`
--

CREATE TABLE `followed_vacations` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followed_vacations`
--

INSERT INTO `followed_vacations` (`userId`, `vacationId`) VALUES
(1, 8),
(1, 9),
(1, 10),
(3, 5),
(3, 7),
(6, 5),
(6, 7),
(6, 8),
(3, 2),
(15, 12),
(15, 11),
(3, 9),
(18, 9),
(18, 10),
(20, 7),
(20, 2),
(22, 2),
(22, 9);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleType`) VALUES
(1, 'User'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Roni', 'Zahavi', 'ronze', '59c29743128b93522e7f10b3870444f93fb8adb2da495be51819dd7b3aa23b8f9ad7bcaaa1cc2ab19367c2536962b3728a6c175341de2206914333f874daa9f6', 1),
(2, 'Shlomit', 'Rot', 'shloro', '2218dd8cd6965b890c208afa38d16e1517e8815e0c490781b312cdf6adae916c6ee472c069b8d9e8a3f3e1e4e28c1b1e407983fe14c7b1abe9b186df5e39b58f', 1),
(3, 'Eden', 'Koren', 'edko', '36248d5e83b7ad236596d78ee3c7d4b07ba29c5ff61c161cedcc204ae4058b48f44293e7825162826a97db04cc106d2683aa7616027460bd83256a73ff988fef', 1),
(4, 'Moshe', 'Marom', 'momar', '1a8d2e28d8b18f0b8e671363885f4462cd618094dcddf8745f354ed2d3a8314a97c962d1b8b3503c6685803790311e95eb7a30c46028f07d5d79febebfeaf24a', 1),
(5, 'Ronen', 'Katz', 'roka', 'd52f850e4ed0a84537e38af96ba37470a6154b2621c9f122c34f06441ebb73d1a7827650e6a616f4c44bb69cda5e9a2b3a4ec122364de7b1d07cdd59cc726f08', 1),
(6, 'Reut', 'Ofer', 'reofe', 'ec59495087e4f995c1e19892e9f9d7707914810f921471c518afa050049d755c2f8bff4fa8206a317c655c58e73e8b37039345b9c78b36d6e8292d2bdbee59d2', 1),
(7, 'Avi', 'Cohen', 'avico', '9ed1f991166d902055db85d8734fa102e0abcb66067a99bf56d7079ee2ebef4e3fdcb108b09ac86b610ad4c5bb2fb46b1e257f33f9f1e58b1a7fa6f02e86daf0', 1),
(8, 'Noa', 'Karol', 'nokaro', '9b7658cb2c51ad470c5d7c8fbd97339d2c5d8840f21d6cb8ba328eee41c5b8c736d23adfea12938fc8ddd05893b67ff89086ae9b4ffb60a1b27d3dfa626f1c9f', 1),
(9, 'Moti', 'Avni', 'moavn', '5412ad542dfe0b53bc6ec2d302959075c672652f3a55cfddf78836c7bb43d1beb93e64319ea846e7039efd98034bce01624bf1576cc10ef733c058c6281f804f', 1),
(10, 'Amiad', 'Hefer', 'amihe', 'e0971c3c88e1fc10851b6b49c6cdea6c5b7ff69156bb8323bbb012d6dbf1d7f4baf5f47618f7dd61017767bdfeb382d5be2c74c2c385fa4e1405c36a48b4eb0f', 1),
(11, 'Shira', 'Chen', 'shirchen', '1edd64f6e2590176b4f88ddff65e78422b11855a9b67a36a1b1726467e82e00830b68f8bb9995c12dad8fd25afac1b031073884c5d74b8baa6f974e1494cc097', 1),
(12, 'Yaniv', 'Gol', 'yagol', 'cd10e45990344266c25f379470e0a54289dddd71469a9ce581417d1334985c90ca52d6c9e2ef776c191b7aa194694d28367aab8d8daf7aed4d5bc570980aabfa', 1),
(13, 'Itay', 'Galnir', 'igalni', 'f79daf0ccf297e17d27d79485b96b97c4f9a43791eeab0eac91df0a69828a1f739bf23f3705e3503d23766dd7a0992f85f0af87b5c243ce42fc1925d61f9d5e8', 1),
(14, 'Tomer', 'Privas', 'tomerpri', '2ceb371cbfc7d8fa89f2dcaec72a93d75b6f6d076907c1af19166e6ab72e1e5fc1c0ef7adeb21b64f3d2f4d7481c2e253fb098b37e6b5bda68c669165ad222f5', 1),
(15, 'Tehila', 'Butterman', 'tbutterm', '86c242b0833256e3b4e5a095d1703c3602ea8fc380d9c552aedd3f967868a7f9f2cc9b96b8eaa6de89b570744ea4b3741264d3d3a3b545a90447c8269887ec8b', 2),
(17, 'Riki', 'Radin', 'rikiasheradin', 'b670bb18c0498653bf4d0375a5fb0c856f3c87967fb2f0658bc1284fa19cfe2bf3e7e2df5cc048e1851690e0d09f3da20c3d9627764a5cc0910a80b0cdcbf31a', 1),
(18, 'Tomer', 'Yogev', 'tomeryog', 'bc78351b7c4d78d7ae3afe8d896d407147defbc5d3c024181e7a760af51e14e0bda2a374888ba4287648b78d2935fbd40258bb7ba33dab4fd1580e464a373123', 1),
(19, 'Moshiko', 'Goldberg', 'moshigold', '96fc0b5fde5daa5d7ba6fbb8b3f84b00b6a9e19a188a1da960ece3188b8f4b939d27641666bb0703d1406147a4e80a1a4fd30f5708a63b35fff5214de806691c', 1),
(20, 'Roni', 'Cagan', 'ronicag', '1233c35b0d4dee0cba37da7e42f66f4b1d40ff288eb8acef6afe64d34d39eac3201f9c276223ac0f8fc46c8ba43dab141de74aa7b5f58f68bfcf0c023e180ad1', 1),
(21, 'Yoni', 'Rotem', 'yoniro', 'f33e562a465509a8181980dabdd984c1e9f04b4f54297ed441e7ba62e81798cffe370a80f924b4f79347ff1e76270e4d73f79ccc03b58119112b903e18d283ae', 1),
(22, 'Yosi', 'Biton', 'yosibiton', 'b984c1b77290cf53b847c5628c6d39bb1415951207b87ae2896acd6b0324764f195c980fbb88331f396b34b1d7ebd19a51f735a0fef9ea86e4c2b07aee91a600', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations_details`
--

CREATE TABLE `vacations_details` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `target` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations_details`
--

INSERT INTO `vacations_details` (`vacationId`, `description`, `fromDate`, `toDate`, `price`, `imageName`, `target`) VALUES
(2, 'Known for its popular shops and acclaimed art galleries, there\'s plenty to explore in Prague. Check out top attractions like Charles Bridge and Prague Astronomical Clock, perfect places!', '2022-12-31', '2023-01-10', 20000, '9a1be9fc-543f-4754-a35c-d83cc7f94768.jpg', 'Prague'),
(3, 'Chamonix is the capital of the French Alps and is known as the extreme capital and contains an endless list of adrenaline activities. For an unforgettable experience!', '2022-10-09', '2022-10-16', 35000, 'c54306ac-057c-4869-8bfa-cfe60fca0c64.jpg', 'French'),
(5, 'The Istrian peninsula is located in the northwestern part of Croatia. Along its beautiful shores lie fortified ancient towns. One of the well-known towns is Rovinj. A magical, colorful and beautiful town. Come and visit!', '2022-08-26', '2022-09-03', 23000, '293d006d-1f08-403a-8668-35e52d167e89.jpg', 'Budapest'),
(6, 'Scotland - A dramatic and breathtaking view of mountains, hills and valleys, countless lakes and spectacular beaches. The highest mountain is Ben Nevis and is 1343 meters high. Exact place for you!\r\n', '2023-02-10', '2023-02-24', 20300, '51dc1a55-1c16-4713-94d3-3d9820efc1b3.jpg', 'Ben Nevis - Scotland'),
(7, 'Slovakia is a paradise for all nature lovers. This beautiful country has almost everything: towering peaks, dense forests, green valleys, rivers and streams, lakes, waterfalls, deep canyons and thousands of caves.', '2022-07-23', '2022-08-01', 25700, '1ec4092f-078f-4b9e-b3e8-27ef8be0c561.webp', 'Slovakia'),
(8, 'Austria! One of the most beautiful countries in Europe. It has everything from everything: spectacular views, lakes, cable cars, waterfalls, amazing scenic routes, picturesque towns and interesting open-air museums.', '2022-08-24', '2022-09-02', 28000, '0c8ad990-da9b-4302-90ae-824953db9709.jpg', 'Austria'),
(9, 'The Loire Valley is located 250 km southwest of Paris. The valley stretches along the Loire River, and is full of hiking and biking trails. Its landscapes are green, lush with vineyards, forests and agricultural fields.', '2022-10-10', '2022-10-22', 19800, '41f9d9a3-82f8-437e-baa0-8207f52e069c.jpg', 'Loire - French'),
(10, 'Montenegro - an amazing area that is part of the Dinaric Alps and the Adriatic coast. A trip to Montenegro can combine nature and hiking along with ancient coastal towns and rest alongside the pristine beaches.', '2022-10-07', '2022-10-19', 24300, '30638fe8-5981-4946-97ed-3a817bd4b033.jpg', 'Montenegro'),
(11, 'The perfect vacation for you - in the Pyrenees you will find breathtaking views, special nature reserves with a whole world of animals and vegetation as well as ancient historic buildings!', '2022-12-11', '2022-12-25', 31000, 'a707aa3f-4569-4e69-a342-69c0d6cc5ab1.jpg', 'Pyrenees'),
(12, 'The perfect vacation for you - the most prestigious summer you have ever imagined. Want to relax on the beach, sip tea over the clouds or connect to nature in the desert under the stars? Welcome to Abu Dhabi.', '2022-11-30', '2022-12-13', 34500, '0b0e8c55-6f27-438f-b21a-0774c9d8f021.jpg', 'Abu Dhabi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followed_vacations`
--
ALTER TABLE `followed_vacations`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId_ibfk_1` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`role`);

--
-- Indexes for table `vacations_details`
--
ALTER TABLE `vacations_details`
  ADD PRIMARY KEY (`vacationId`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `vacations_details`
--
ALTER TABLE `vacations_details`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followed_vacations`
--
ALTER TABLE `followed_vacations`
  ADD CONSTRAINT `followed_vacations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `vacationId_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations_details` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
