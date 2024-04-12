SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StoreStylesheets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StoreId] [int] NOT NULL,
	[Link] [varchar](256) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[StoreStylesheets] ADD  CONSTRAINT [PK_StoreStylesheets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[StoreStylesheets]  WITH CHECK ADD  CONSTRAINT [FK_StoreStylesheets_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([ID])
GO
ALTER TABLE [dbo].[StoreStylesheets] CHECK CONSTRAINT [FK_StoreStylesheets_Stores]
GO

INSERT StoreStylesheets(StoreId, Link)
SELECT 55, 'https://fonts.googleapis.com/css2?family=Ruda:wght@400..900&display=swap'
GO

INSERT StoreStylesheets(StoreId, Link)
SELECT 55, 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Ruda:wght@400..900&display=swap'
GO

INSERT StoreStylesheets(Storeid, Link)
SELECT 55, 'https://zincstoreglobaldev.blob.core.windows.net/michelin/Misc/michelin.css'


INSERT StoreStylesheets(StoreId, Link)
SELECT 54, 'https://fonts.googleapis.com/css?family=Arvo|Lato'
GO

INSERT StoreStylesheets(Storeid, Link)
SELECT 54, 'https://zincstoreglobaldev.blob.core.windows.net/sandvik/Misc/sandvik.css'
GO