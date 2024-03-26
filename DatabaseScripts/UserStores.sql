SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserStores](
	[UserName] [nvarchar](256) NOT NULL,
	[StoreId] [int] NOT NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[UserStores] ADD  CONSTRAINT [PK_UserStores] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC,
	[StoreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserStores]  WITH CHECK ADD  CONSTRAINT [FK_UserStores_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([ID])
GO
ALTER TABLE [dbo].[UserStores] CHECK CONSTRAINT [FK_UserStores_Stores]
GO
ALTER TABLE [dbo].[UserStores]  WITH CHECK ADD  CONSTRAINT [FK_UserStores_UserProfiles] FOREIGN KEY([UserName])
REFERENCES [dbo].[UserProfiles] ([UserName])
GO
ALTER TABLE [dbo].[UserStores] CHECK CONSTRAINT [FK_UserStores_UserProfiles]
GO


INSERT UserStores(UserName, StoreID)
SELECT DISTINCT up.UserName, u.StoreID
FROM UserProfiles up
    INNER JOIN AspNetUsers u ON up.UserName = u.Email
ORDER BY up.UserName, u.StoreID
GO

