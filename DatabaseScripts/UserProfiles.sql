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