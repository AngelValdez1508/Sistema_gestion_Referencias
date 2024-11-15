USE [master]
GO
/****** Object:  Database [SGR]    Script Date: 10/11/2024 10:52:09 p. m. ******/
CREATE DATABASE [SGR]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SGR', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SGR.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SGR_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SGR_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SGR] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SGR].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SGR] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SGR] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SGR] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SGR] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SGR] SET ARITHABORT OFF 
GO
ALTER DATABASE [SGR] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SGR] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SGR] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SGR] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SGR] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SGR] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SGR] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SGR] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SGR] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SGR] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SGR] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SGR] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SGR] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SGR] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SGR] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SGR] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SGR] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SGR] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SGR] SET  MULTI_USER 
GO
ALTER DATABASE [SGR] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SGR] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SGR] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SGR] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SGR] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SGR] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SGR] SET QUERY_STORE = ON
GO
ALTER DATABASE [SGR] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SGR]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 10/11/2024 10:52:09 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](100) NULL,
	[Rol] [nvarchar](50) NULL,
	[Estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT ((1)) FOR [Estado]
GO
USE [master]
GO
ALTER DATABASE [SGR] SET  READ_WRITE 
GO
