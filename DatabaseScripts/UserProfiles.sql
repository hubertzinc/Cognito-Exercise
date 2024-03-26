SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserProfiles](
	[UserName] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[CurrencyID] [int] NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[ShippingAddressID] [int] NULL,
	[BillingAddressID] [int] NULL,
	[Age] [int] NULL,
	[Gender] [nvarchar](10) NULL,
	[LanguageID] [int] NULL,
	[BusinessUnitID] [int] NULL,
	[Points] [decimal](18, 2) NULL,
	[DateModified] [datetimeoffset](7) NOT NULL,
	[DateCreated] [datetimeoffset](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Branch] [nvarchar](200) NULL,
	[SelectedCountryID] [int] NULL,
	[TimezoneOffsetMins] [int] NULL,
	[DebtorID] [int] NULL,
	[DefaultCostCentre] [nvarchar](100) NULL,
	[ExtraInfo] [nvarchar](max) NULL,
	[StoreFlag] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[UserProfiles] ADD  CONSTRAINT [PK_UserProfiles] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_Addresses] FOREIGN KEY([BillingAddressID])
REFERENCES [dbo].[Addresses] ([ID])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_Addresses]
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_Addresses1] FOREIGN KEY([ShippingAddressID])
REFERENCES [dbo].[Addresses] ([ID])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_Addresses1]
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_BusinessUnits] FOREIGN KEY([BusinessUnitID])
REFERENCES [dbo].[BusinessUnits] ([ID])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_BusinessUnits]
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_Countries] FOREIGN KEY([SelectedCountryID])
REFERENCES [dbo].[Countries] ([ID])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_Countries]
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_Languages] FOREIGN KEY([LanguageID])
REFERENCES [dbo].[Languages] ([ID])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_Languages]
GO

---------------------------------------------------------------------------

WITH RankedUsers AS (
   SELECT
      CASE
         WHEN CHARINDEX('@Ariba@', Username) > 0 THEN STUFF(
            Username,
            1,
            CHARINDEX('@', Username, CHARINDEX('@', Username) + 1),
            ''
         )
         ELSE STUFF(Username, 1, CHARINDEX('@', Username), '')
      END AS ModifiedUsername,
      [Email],
      [PhoneNumber],
      [PhoneNumberConfirmed],
      [CurrencyID],
      [FirstName],
      [LastName],
      [ShippingAddressID],
      [BillingAddressID],
      [Age],
      [Gender],
      [LanguageID],
      [BusinessUnitID],
      [Points],
      [DateModified],
      [DateCreated],
      [IsActive],
      [Branch],
      [SelectedCountryID],
      [TimezoneOffsetMins],
      [DebtorID],
      [DefaultCostCentre],
      [ExtraInfo],
      [StoreFlag],
      ROW_NUMBER() OVER (
         PARTITION BY CASE
            WHEN CHARINDEX('@Ariba@', Username) > 0 THEN STUFF(
               Username,
               1,
               CHARINDEX('@', Username, CHARINDEX('@', Username) + 1),
               ''
            )
            ELSE STUFF(Username, 1, CHARINDEX('@', Username), '')
         END
         ORDER BY
            DateCreated DESC
      ) AS rn -- Adjust the ordering as needed
   FROM
      AspNetUsers
   WHERE
      (LEN(Username) - LEN(REPLACE(Username, '@', ''))) = 2
      AND Email IS NOT NULL
)
INSERT
   UserProfiles
SELECT
   ModifiedUsername,
   [Email],
   [PhoneNumber],
   [PhoneNumberConfirmed],
   [CurrencyID],
   [FirstName],
   [LastName],
   [ShippingAddressID],
   [BillingAddressID],
   [Age],
   [Gender],
   [LanguageID],
   [BusinessUnitID],
   [Points],
   [DateModified],
   [DateCreated],
   [IsActive],
   [Branch],
   [SelectedCountryID],
   [TimezoneOffsetMins],
   [DebtorID],
   [DefaultCostCentre],
   [ExtraInfo],
   [StoreFlag]
FROM
   RankedUsers
WHERE
   rn = 1
ORDER BY
   ModifiedUsername;